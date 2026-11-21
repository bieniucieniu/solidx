import { XYDrag, nodeHasDimensions, type XYDragInstance } from "@xyflow/system";
import { type JSX } from "@solidjs/web";
import { Show, createEffect, createMemo, createSignal, onSettled, untrack } from "solid-js";
import { dynamic } from "@solidjs/web";
import { NodeIdContext, useFlow } from "../context";
import { cx } from "#kit/lib/utils/xyflow/cx";
import type { FlowNode } from "#kit/lib/xyflow/types";
import { builtinNodeTypes } from "./Nodes";

export function NodeView(props: { node: FlowNode; resizeObserver: ResizeObserver }) {
  const flow = useFlow();
  const [element, setElement] = createSignal<HTMLDivElement>();
  let drag: XYDragInstance | undefined;
  const [mounted, setMounted] = createSignal(false);

  const nodeType = () => props.node.type || "default";
  const draggable = () =>
    props.node.draggable === true || (props.node.draggable === undefined && flow.nodesDraggable);
  const selectable = () =>
    props.node.selectable === true ||
    (props.node.selectable === undefined && flow.elementsSelectable);

  onSettled(() => {
    drag = XYDrag({
      getStoreItems: () => flow.getStoreItems(),
      onNodeMouseDown: (id) => flow.handleNodeClick(id),
    });
    setMounted(true);
    return () => {
      const node = untrack(element);
      if (node) props.resizeObserver.unobserve(node);
      drag?.destroy();
    };
  });

  createEffect(element, (node) => {
    if (!node) return;
    props.resizeObserver.observe(node);
    return () => props.resizeObserver.unobserve(node);
  });

  // `setNodes` with a new object for an id on screen drops `measured`, and the reused
  // element does not resize. Observing it again makes the observer report its size.
  const measured = createMemo(
    () => props.node.measured?.width !== undefined && props.node.measured?.height !== undefined,
  );
  createEffect(measured, (isMeasured, wasMeasured) => {
    const node = untrack(element);
    if (isMeasured || !wasMeasured || !node) return;
    props.resizeObserver.unobserve(node);
    props.resizeObserver.observe(node);
  });

  createEffect(
    () => ({
      node: element(),
      active: mounted() && !props.node.hidden && draggable(),
      nodeId: props.node.id,
      handleSelector: props.node.dragHandle,
      isSelectable: selectable(),
    }),
    ({ node, active, nodeId, handleSelector, isSelectable }) => {
      if (!active || !node || !drag) return;
      drag.update({
        domNode: node,
        nodeId,
        noDragClassName: "nodrag",
        handleSelector,
        isSelectable,
      });
      // Runs before the next update and when dragging is turned off or the node is hidden,
      // so a node that is no longer draggable has no drag listeners left.
      return () => drag?.destroy();
    },
  );

  const position = () => props.node.internals?.positionAbsolute ?? props.node.position;
  const NodeComponent = dynamic(
    () =>
      flow.nodeTypes[nodeType()] ??
      builtinNodeTypes[nodeType() as keyof typeof builtinNodeTypes] ??
      builtinNodeTypes.default,
  );

  return (
    <Show when={!props.node.hidden}>
      <div
        ref={setElement}
        class={cx("xy-flow__node", `xy-flow__node-${nodeType()}`, props.node.class, {
          nopan: draggable(),
          selected: props.node.selected,
          selectable: selectable(),
          draggable: draggable(),
          dragging: props.node.dragging,
        })}
        style={{
          "z-index": props.node.internals?.z ?? 0,
          transform: `translate(${position().x}px, ${position().y}px)`,
          "pointer-events": selectable() || draggable() ? "all" : "none",
          visibility: nodeHasDimensions(props.node) ? "visible" : "hidden",
          ...props.node.style,
        }}
        data-id={props.node.id}
        data-testid={`rf__node-${props.node.id}`}
        onClick={(event) => {
          event.stopPropagation();
          if (selectable()) flow.handleNodeClick(props.node.id);
        }}
      >
        {/* A node keeps its id for its lifetime: the provider reads it once. */}
        <NodeIdContext value={untrack(() => props.node.id)}>
          <NodeComponent node={props.node} />
        </NodeIdContext>
      </div>
    </Show>
  );
}

export function nodeLayerStyle(): JSX.CSSProperties {
  return { position: "absolute", width: "100%", height: "100%", top: 0, left: 0 };
}
