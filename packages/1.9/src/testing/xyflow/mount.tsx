import { cleanup, render } from "@solidjs/testing-library";
import { afterEach, beforeEach, expect } from "vite-plus/test";
import { page, type Locator } from "vite-plus/test/browser";
import { Background, Controls } from "@solidx/kit-1.9/xyflow/panels";
import {
  Flow,
  Handle,
  Position,
  createFlow,
  type FlowNode,
  type FlowStore,
} from "#/components/xyflow/index";
import type { FlowOptions } from "#/lib/xyflow/types";
import "#/components/xyflow/style.css";

export type ElementAssertion = {
  toBeVisible: () => Promise<void>;
  toBeInTheDocument: () => Promise<void>;
};

export function element(target: Locator | Element) {
  return (
    expect as unknown as {
      element: (target: Locator | Element) => ElementAssertion;
    }
  ).element(target);
}

export function TextNode(props: { node: FlowNode }) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <span>{typeof props.node.data.label === "string" ? props.node.data.label : ""}</span>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export const nodes: FlowNode[] = [
  { id: "1", position: { x: 80, y: 80 }, data: { label: "1" } },
  { id: "2", position: { x: 80, y: 240 }, data: { label: "2" } },
];

export function mountFlow(options: FlowOptions) {
  let flow!: FlowStore;
  const screen = render(() => {
    flow = createFlow(() => options);
    return (
      <Flow flow={flow} style={{ width: "800px", height: "600px" }}>
        <Background />
        <Controls />
      </Flow>
    );
  });
  return { flow, view: page.elementLocator(screen.container) };
}

export function installFlowBrowser() {
  beforeEach(async () => {
    await page.viewport(1000, 800);
  });

  afterEach(() => {
    cleanup();
  });
}

export function readTransform(node: Element) {
  const raw = node instanceof HTMLElement ? node.style.transform : "";
  const translate = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(raw);
  const scale = /scale\(([-\d.]+)\)/.exec(raw);
  return {
    x: translate ? Number(translate[1]) : Number.NaN,
    y: translate ? Number(translate[2]) : Number.NaN,
    scale: scale ? Number(scale[1]) : Number.NaN,
    raw,
  };
}

export function nodeTransform(view: Locator, id: string) {
  return readTransform(view.getByTestId(`rf__node-${id}`).element());
}

export function viewportTransform(view: Locator) {
  return readTransform(view.getByTestId("rf__viewport").element());
}
