import {
  ConnectionLineType,
  PanOnScrollMode,
  XYPanZoom,
  addEdge as addEdgeSystem,
  adoptUserNodes,
  createDevWarn,
  fitViewport,
  getElementsToRemove,
  infiniteExtent,
  initialConnection,
  panBy as panBySystem,
  pointToRendererPoint,
  rendererPointToPoint,
  updateAbsolutePositions,
  updateConnectionLookup,
  updateNodeInternals as updateNodeInternalsSystem,
  type Connection,
  type ConnectionState,
  type EdgeChange,
  type EdgeLookup,
  type FitViewOptionsBase,
  type InternalNodeBase,
  type InternalNodeUpdate,
  type NodeChange,
  type NodeHandleBounds,
  type NodeLookup,
  type NodeOrigin,
  type PanZoomInstance,
  type ParentLookup,
  type SelectionRect,
  type Transform,
  type UpdateNodePositions,
  type Viewport,
  type XYPosition,
  type ZIndexMode,
} from "@xyflow/system";
import { type Accessor, createEffect, createStore, onSettled, reconcile, untrack } from "solid-js";
import {
  applyEdgeChanges,
  applyNodeChanges,
  getSelectionChanges,
} from "#kit/lib/utils/xyflow/changes";
import type { FlowEdge, FlowNode, FlowOptions } from "./types";

const onError = createDevWarn("xyflow", "https://reactflow.dev/");
const nodeOriginDefault: NodeOrigin = [0, 0];
const zIndexMode: ZIndexMode = "basic";

type Selection = SelectionRect & { startX: number; startY: number };

export type Flow = ReturnType<typeof createFlow>;

function cloneNodes(nodes: FlowNode[]): FlowNode[] {
  return nodes.map((node) => ({
    ...node,
    position: { ...node.position },
    data: { ...node.data },
    measured: node.measured ? { ...node.measured } : undefined,
  }));
}

function cloneEdges(edges: FlowEdge[]): FlowEdge[] {
  return edges.map((edge) => ({ ...edge, data: edge.data ? { ...edge.data } : undefined }));
}

export function createFlow(options: Accessor<FlowOptions> = () => ({})) {
  const initial = untrack(options);
  const nodeLookup: NodeLookup<InternalNodeBase<FlowNode>> = new Map();
  const parentLookup: ParentLookup<InternalNodeBase<FlowNode>> = new Map();
  const connectionLookup = new Map();
  const edgeLookup: EdgeLookup<FlowEdge> = new Map();
  const nodeIndex = new Map<string, number>();
  const edgeIndex = new Map<string, number>();

  let panZoom: PanZoomInstance | null = null;
  let domNode: HTMLDivElement | undefined;
  let currentOptions = initial;

  const origin = initial.nodeOrigin ?? nodeOriginDefault;
  const extent = initial.nodeExtent ?? infiniteExtent;
  const seededNodes = cloneNodes(initial.nodes ?? []);
  const seededEdges = cloneEdges(initial.edges ?? []);

  const adopted = adoptUserNodes(seededNodes, nodeLookup, parentLookup, {
    nodeOrigin: origin,
    nodeExtent: extent,
    elevateNodesOnSelect: true,
    zIndexMode,
  });
  updateConnectionLookup(connectionLookup, edgeLookup, seededEdges);

  const viewport = initial.defaultViewport ?? { x: 0, y: 0, zoom: 1 };

  const current = {
    nodes: seededNodes.map(publishNode),
    edges: seededEdges,
    transform: [viewport.x, viewport.y, viewport.zoom] as Transform,
    viewport,
    width: 0,
    height: 0,
    minZoom: initial.minZoom ?? 0.5,
    maxZoom: initial.maxZoom ?? 2,
    nodeOrigin: origin,
    nodeExtent: extent,
    nodesInitialized: adopted.nodesInitialized,
    fitViewQueued: initial.fitView ?? false,
    fitViewOptions: initial.fitViewOptions,
    nodesDraggable: initial.nodesDraggable ?? true,
    nodesConnectable: initial.nodesConnectable ?? true,
    elementsSelectable: initial.elementsSelectable ?? true,
    snapToGrid: initial.snapToGrid ?? false,
    snapGrid: initial.snapGrid ?? ([15, 15] as [number, number]),
    selectionOnDrag: initial.selectionOnDrag ?? false,
    connectionLineType: initial.connectionLineType ?? ConnectionLineType.Bezier,
    nodeTypes: initial.nodeTypes ?? {},
    edgeTypes: initial.edgeTypes ?? {},
    connection: { ...initialConnection } as ConnectionState<InternalNodeBase<FlowNode>>,
    connectionClickStartHandle: null as {
      nodeId: string;
      type: "source" | "target";
      id: string | null;
    } | null,
    userSelectionActive: false,
    userSelectionRect: null as Selection | null,
    selectionKeyPressed: false,
    multiSelectionActive: false,
    paneDragging: false,
    nodesSelectionActive: false,
  };
  type FlowState = typeof current;

  // `state` is what JSX and memos read. `current` is a plain mirror that the imperative code
  // below reads: Solid 2 stages store writes until the next microtask, and xyflow's system
  // callbacks read a value right after writing it.
  const [state, setState] = createStore<FlowState>({ ...current });

  function set(patch: Partial<FlowState>) {
    Object.assign(current, patch);
    setState((draft) => {
      for (const key of Object.keys(patch) as (keyof FlowState)[]) {
        if (key === "nodes" || key === "edges") reconcile(patch[key], "id")(draft[key]);
        else (draft as Record<string, unknown>)[key] = patch[key];
      }
    });
  }

  rebuildIndexes();

  function copyHandleBounds(bounds: NodeHandleBounds | undefined): NodeHandleBounds | undefined {
    if (!bounds) return undefined;
    const copyList = (handles: NodeHandleBounds["source"]) =>
      handles?.map((handle) => ({ ...handle })) ?? null;
    return {
      source: copyList(bounds.source),
      target: copyList(bounds.target),
    };
  }

  function publishNode(node: FlowNode): FlowNode {
    const internal = nodeLookup.get(node.id);
    if (!internal) return node;
    return {
      ...node,
      measured: {
        width: internal.measured?.width,
        height: internal.measured?.height,
      },
      internals: {
        positionAbsolute: {
          x: internal.internals.positionAbsolute.x,
          y: internal.internals.positionAbsolute.y,
        },
        z: internal.internals.z,
        handleBounds: copyHandleBounds(internal.internals.handleBounds),
      },
    };
  }

  function rebuildIndexes() {
    nodeIndex.clear();
    edgeIndex.clear();
    current.nodes.forEach((node, index) => nodeIndex.set(node.id, index));
    current.edges.forEach((edge, index) => edgeIndex.set(edge.id, index));
  }

  function setNodes(nodes: FlowNode[]) {
    const { nodesInitialized } = adoptUserNodes(nodes, nodeLookup, parentLookup, {
      nodeOrigin: current.nodeOrigin,
      nodeExtent: current.nodeExtent,
      elevateNodesOnSelect: true,
      checkEquality: true,
      zIndexMode,
    });
    set({ nodes: nodes.map(publishNode) });
    set({ nodesInitialized: nodesInitialized });
    rebuildIndexes();
    if (current.fitViewQueued && nodesInitialized) {
      void resolveFitView();
    }
  }

  function setEdges(edges: FlowEdge[]) {
    updateConnectionLookup(connectionLookup, edgeLookup, edges);
    set({ edges: edges });
    rebuildIndexes();
  }

  function triggerNodeChanges(changes: NodeChange<FlowNode>[]) {
    if (!changes.length) return;
    setNodes(applyNodeChanges(changes, current.nodes));
    currentOptions.onNodesChange?.(changes);
  }

  function triggerEdgeChanges(changes: EdgeChange<FlowEdge>[]) {
    if (!changes.length) return;
    setEdges(applyEdgeChanges(changes, current.edges));
    currentOptions.onEdgesChange?.(changes);
  }

  const updateNodePositions: UpdateNodePositions = (nodeDragItems, dragging = false) => {
    const changes: NodeChange<FlowNode>[] = [];
    for (const [id, dragItem] of nodeDragItems) {
      if (!("position" in dragItem) || !dragItem.position) continue;
      changes.push({
        id,
        type: "position",
        position: dragItem.position,
        dragging,
      });
    }
    triggerNodeChanges(changes);
  };

  function panBy(delta: XYPosition) {
    return panBySystem({
      delta,
      panZoom,
      transform: current.transform,
      translateExtent: infiniteExtent,
      width: current.width,
      height: current.height,
    });
  }

  async function resolveFitView() {
    if (!panZoom || !current.width || !current.height) return false;
    const fitted = await fitViewport(
      {
        nodes: nodeLookup,
        width: current.width,
        height: current.height,
        panZoom,
        minZoom: current.minZoom,
        maxZoom: current.maxZoom,
      },
      current.fitViewOptions,
    );
    set({ fitViewQueued: false });
    return fitted;
  }

  function updateNodeInternals(updates: Map<string, InternalNodeUpdate>) {
    const { changes, updatedInternals } = updateNodeInternalsSystem(
      updates,
      nodeLookup,
      parentLookup,
      domNode ?? null,
      current.nodeOrigin,
      current.nodeExtent,
      zIndexMode,
    );
    if (!updatedInternals) return;
    updateAbsolutePositions(nodeLookup, parentLookup, {
      nodeOrigin: current.nodeOrigin,
      nodeExtent: current.nodeExtent,
      zIndexMode,
    });
    if (changes.length) triggerNodeChanges(changes);
    else setNodes(current.nodes);
  }

  function resetSelectedElements() {
    const nodeChanges = getSelectionChanges(nodeLookup, new Set());
    const edgeChanges = getSelectionChanges(edgeLookup, new Set());
    triggerNodeChanges(nodeChanges as NodeChange<FlowNode>[]);
    triggerEdgeChanges(edgeChanges as EdgeChange<FlowEdge>[]);
  }

  function addSelectedNodes(ids: string[]) {
    if (current.multiSelectionActive) {
      triggerNodeChanges(ids.map((id) => ({ id, type: "select" as const, selected: true })));
      return;
    }
    triggerNodeChanges(getSelectionChanges(nodeLookup, new Set(ids)) as NodeChange<FlowNode>[]);
    triggerEdgeChanges(getSelectionChanges(edgeLookup) as EdgeChange<FlowEdge>[]);
  }

  function addSelectedEdges(ids: string[]) {
    if (current.multiSelectionActive) {
      triggerEdgeChanges(ids.map((id) => ({ id, type: "select" as const, selected: true })));
      return;
    }
    triggerEdgeChanges(getSelectionChanges(edgeLookup, new Set(ids)) as EdgeChange<FlowEdge>[]);
    triggerNodeChanges(getSelectionChanges(nodeLookup, new Set()) as NodeChange<FlowNode>[]);
  }

  function unselectNodesAndEdges(params?: {
    nodes?: Array<{ id: string; selected?: boolean }>;
    edges?: Array<{ id: string; selected?: boolean }>;
  }) {
    const nodes = params?.nodes ?? current.nodes;
    const edges = params?.edges ?? current.edges;
    triggerNodeChanges(
      nodes
        .filter((node) => node.selected)
        .map((node) => ({ id: node.id, type: "select" as const, selected: false })),
    );
    triggerEdgeChanges(
      edges
        .filter((edge) => edge.selected)
        .map((edge) => ({ id: edge.id, type: "select" as const, selected: false })),
    );
  }

  function handleNodeClick(id: string) {
    const node = nodeLookup.get(id);
    if (!node) return;
    set({ nodesSelectionActive: false });
    if (!node.selected) addSelectedNodes([id]);
    else if (current.multiSelectionActive) unselectNodesAndEdges({ nodes: [node], edges: [] });
  }

  function connect(connection: Connection) {
    const edges = current.edges;
    setEdges(addEdgeSystem(connection, edges, { onError }));
    currentOptions.onConnect?.(connection);
    set({ connectionClickStartHandle: null });
  }

  function updateInteraction() {
    panZoom?.update({
      zoomOnScroll: true,
      zoomOnPinch: true,
      panOnScroll: false,
      panOnScrollMode: PanOnScrollMode.Free,
      panOnScrollSpeed: 0.5,
      zoomOnDoubleClick: true,
      panOnDrag: !current.selectionKeyPressed,
      panActivationKeyPressed: false,
      zoomActivationKeyPressed: false,
      preventScrolling: true,
      noPanClassName: "nopan",
      noWheelClassName: "nowheel",
      userSelectionActive: current.userSelectionActive,
      lib: "xy",
      onTransformChange: (transform) => {
        set({ transform: [transform[0], transform[1], transform[2]] });
        set({ viewport: { x: transform[0], y: transform[1], zoom: transform[2] } });
      },
      connectionInProgress: current.connection.inProgress,
      // Pan starts on any pointer move; drag-to-select is handled by Pane, not by XYPanZoom.
      paneDragThreshold: 0,
    });
  }

  function measureNodes() {
    if (!domNode) return;
    const updates = new Map<string, InternalNodeUpdate>();
    for (const nodeElement of domNode.querySelectorAll<HTMLDivElement>(".xy-flow__node")) {
      const id = nodeElement.getAttribute("data-id");
      if (!id) continue;
      updates.set(id, { id, nodeElement, force: true });
    }
    if (updates.size) updateNodeInternals(updates);
  }

  function attach(root: HTMLDivElement, renderer: HTMLDivElement) {
    domNode = root;
    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      set({ width: rect.width, height: rect.height });
      if (current.fitViewQueued && current.nodesInitialized) {
        void resolveFitView();
      }
    });
    resizeObserver.observe(root);

    panZoom = XYPanZoom({
      domNode: renderer,
      minZoom: current.minZoom,
      maxZoom: current.maxZoom,
      translateExtent: infiniteExtent,
      viewport: current.viewport,
      onDraggingChange: (paneDragging) => set({ paneDragging: paneDragging }),
    });

    const next = panZoom.getViewport();
    set({ transform: [next.x, next.y, next.zoom] });
    set({ viewport: next });
    panZoom.setScaleExtent([current.minZoom, current.maxZoom]);
    updateInteraction();
    measureNodes();

    return () => {
      resizeObserver.disconnect();
      panZoom?.destroy();
      panZoom = null;
      domNode = undefined;
    };
  }

  function getNode(id: string) {
    const index = nodeIndex.get(id);
    if (index === undefined) return undefined;
    return state.nodes[index];
  }

  let seenNodes = initial.nodes;
  let seenEdges = initial.edges;

  createEffect(
    options,
    (opts) => {
      currentOptions = opts;
      set({
        minZoom: opts.minZoom ?? 0.5,
        maxZoom: opts.maxZoom ?? 2,
        nodesDraggable: opts.nodesDraggable ?? true,
        nodesConnectable: opts.nodesConnectable ?? true,
        elementsSelectable: opts.elementsSelectable ?? true,
        snapToGrid: opts.snapToGrid ?? false,
        snapGrid: opts.snapGrid ?? [15, 15],
        selectionOnDrag: opts.selectionOnDrag ?? false,
        connectionLineType: opts.connectionLineType ?? ConnectionLineType.Bezier,
        nodeTypes: opts.nodeTypes ?? {},
        edgeTypes: opts.edgeTypes ?? {},
        nodeOrigin: opts.nodeOrigin ?? nodeOriginDefault,
        nodeExtent: opts.nodeExtent ?? infiniteExtent,
      });
      panZoom?.setScaleExtent([opts.minZoom ?? 0.5, opts.maxZoom ?? 2]);
      if (opts.nodes && opts.nodes !== seenNodes) {
        seenNodes = opts.nodes;
        setNodes(cloneNodes(opts.nodes));
      }
      if (opts.edges && opts.edges !== seenEdges) {
        seenEdges = opts.edges;
        setEdges(cloneEdges(opts.edges));
      }
    },
    { defer: true },
  );

  onSettled(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "Shift") set({ selectionKeyPressed: true });
      if (event.key === "Shift" || event.key === "Meta" || event.key === "Control") {
        set({ multiSelectionActive: true });
      }
      if ((event.key === "Backspace" || event.key === "Delete") && !isTyping(event)) {
        const nodes = current.nodes.filter((node) => node.selected);
        const edges = current.edges.filter((edge) => edge.selected);
        if (nodes.length || edges.length) void deleteElements({ nodes, edges });
      }
    };
    const up = (event: KeyboardEvent) => {
      if (event.key === "Shift") set({ selectionKeyPressed: false });
      if (event.key === "Shift" || event.key === "Meta" || event.key === "Control") {
        const still = event.shiftKey || event.metaKey || event.ctrlKey;
        set({ multiSelectionActive: still });
        if (!event.shiftKey) set({ selectionKeyPressed: false });
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  });

  async function deleteElements(params?: {
    nodes?: Partial<FlowNode>[];
    edges?: Partial<FlowEdge>[];
  }) {
    const nodes = current.nodes;
    const edges = current.edges;
    const removed = await getElementsToRemove({
      nodesToRemove: params?.nodes ?? nodes.filter((node) => node.selected),
      edgesToRemove: params?.edges ?? edges.filter((edge) => edge.selected),
      nodes,
      edges,
    });
    if (removed.edges.length) {
      triggerEdgeChanges(removed.edges.map((edge) => ({ id: edge.id, type: "remove" as const })));
    }
    if (removed.nodes.length) {
      triggerNodeChanges(removed.nodes.map((node) => ({ id: node.id, type: "remove" as const })));
    }
  }

  function screenToFlowPosition(position: XYPosition): XYPosition {
    const bounds = domNode?.getBoundingClientRect();
    return pointToRendererPoint(
      {
        x: position.x - (bounds?.left ?? 0),
        y: position.y - (bounds?.top ?? 0),
      },
      current.transform,
      current.snapToGrid,
      current.snapGrid,
    );
  }

  function flowToScreenPosition(position: XYPosition): XYPosition {
    const bounds = domNode?.getBoundingClientRect();
    const screen = rendererPointToPoint(position, current.transform);
    return { x: screen.x + (bounds?.left ?? 0), y: screen.y + (bounds?.top ?? 0) };
  }

  return {
    get nodes() {
      return state.nodes;
    },
    get edges() {
      return state.edges;
    },
    get transform() {
      return state.transform;
    },
    get viewport() {
      return state.viewport;
    },
    get width() {
      return state.width;
    },
    get height() {
      return state.height;
    },
    get minZoom() {
      return state.minZoom;
    },
    get maxZoom() {
      return state.maxZoom;
    },
    get nodesDraggable() {
      return state.nodesDraggable;
    },
    get nodesConnectable() {
      return state.nodesConnectable;
    },
    get elementsSelectable() {
      return state.elementsSelectable;
    },
    get selectionOnDrag() {
      return state.selectionOnDrag;
    },
    get selectionKeyPressed() {
      return state.selectionKeyPressed;
    },
    get multiSelectionActive() {
      return state.multiSelectionActive;
    },
    get paneDragging() {
      return state.paneDragging;
    },
    get connection() {
      return state.connection;
    },
    /** The connection as last written, for system callbacks that read it right after a write. */
    getConnection() {
      return current.connection;
    },
    get connectionLineType() {
      return state.connectionLineType;
    },
    get nodeTypes() {
      return state.nodeTypes;
    },
    get edgeTypes() {
      return state.edgeTypes;
    },
    get connectionClickStartHandle() {
      return state.connectionClickStartHandle;
    },
    get userSelectionActive() {
      return state.userSelectionActive;
    },
    get userSelectionRect() {
      return state.userSelectionRect;
    },
    nodeLookup,
    edgeLookup,
    connectionLookup,
    getNode,
    setNodes,
    setEdges,
    updateNode(id: string, patch: Partial<FlowNode>) {
      const nodes = current.nodes.map((node) => {
        if (node.id !== id) return node;
        return {
          ...node,
          ...patch,
          id: node.id,
          data: patch.data ? { ...node.data, ...patch.data } : node.data,
          position: patch.position ? { ...node.position, ...patch.position } : node.position,
        };
      });
      setNodes(nodes);
    },
    addEdge(connection: Connection | FlowEdge) {
      setEdges(addEdgeSystem(connection, current.edges, { onError }));
    },
    async fitView(fitViewOptions?: FitViewOptionsBase) {
      set({ fitViewQueued: true });
      if (fitViewOptions) set({ fitViewOptions: fitViewOptions });
      return resolveFitView();
    },
    zoomIn() {
      return panZoom?.scaleBy(1.2) ?? Promise.resolve(false);
    },
    zoomOut() {
      return panZoom?.scaleBy(1 / 1.2) ?? Promise.resolve(false);
    },
    zoomTo(zoom: number) {
      return panZoom?.scaleTo(zoom) ?? Promise.resolve(false);
    },
    async setViewport(next: Viewport) {
      set({ viewport: next });
      set({ transform: [next.x, next.y, next.zoom] });
      await panZoom?.setViewport(next);
    },
    screenToFlowPosition,
    flowToScreenPosition,
    deleteElements,
    updateNodeInternals,
    triggerNodeChanges,
    triggerEdgeChanges,
    resetSelectedElements,
    addSelectedNodes,
    addSelectedEdges,
    unselectNodesAndEdges,
    handleNodeClick,
    connect,
    panBy,
    updateInteraction,
    attach,
    setConnection(connection: ConnectionState<InternalNodeBase<FlowNode>>) {
      set({ connection: connection });
    },
    cancelConnection() {
      set({ connection: { ...initialConnection } });
    },
    setConnectionClickStart(
      handle: { nodeId: string; type: "source" | "target"; id: string | null } | null,
    ) {
      set({ connectionClickStartHandle: handle });
    },
    setSelection(rect: Selection | null, active: boolean) {
      set({ userSelectionRect: rect });
      set({ userSelectionActive: active });
    },
    getStoreItems() {
      return {
        nodes: current.nodes,
        nodeLookup,
        edges: current.edges,
        nodeExtent: current.nodeExtent,
        snapGrid: current.snapGrid,
        snapToGrid: current.snapToGrid,
        nodeOrigin: current.nodeOrigin,
        multiSelectionActive: current.multiSelectionActive,
        domNode: domNode ?? null,
        transform: current.transform,
        autoPanOnNodeDrag: true,
        nodesDraggable: current.nodesDraggable,
        selectNodesOnDrag: true,
        // A threshold above 0 records the crossing event as the origin and skips it,
        // so a drag delivered as one move never changes the node.
        nodeDragThreshold: 0,
        panBy,
        unselectNodesAndEdges,
        updateNodePositions,
        autoPanSpeed: 15,
        onError,
      };
    },
  };
}

function isTyping(event: KeyboardEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
