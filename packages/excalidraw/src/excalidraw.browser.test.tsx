import { cleanup, render } from "@solidjs/testing-library";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser";
import {
  Excalidraw,
  useContextMenu,
  useExport,
  useHistory,
  useProperty,
  type ExcalidrawInstance,
} from "#ex/index";
import { useExcalidraw } from "#ex/solid/context";
import { convertToExcalidrawElements } from "#ex/core";
import type { ExcalidrawImperativeAPI, ExcalidrawProps } from "#ex/core";
import "#ex/style.css";

type Probe = {
  excalidraw: ExcalidrawInstance;
  history: ReturnType<typeof useHistory>;
  stroke: ReturnType<typeof useProperty<"strokeColor">>;
  contextMenu: ReturnType<typeof useContextMenu>;
  exporter: ReturnType<typeof useExport>;
};

function mount(props: ExcalidrawProps = {}) {
  let probe: Probe | undefined;
  let api: ExcalidrawImperativeAPI | undefined;
  function Probe() {
    probe = {
      excalidraw: useExcalidraw(),
      history: useHistory(),
      stroke: useProperty("strokeColor"),
      contextMenu: useContextMenu(),
      exporter: useExport(),
    };
    return null;
  }
  const screen = render(() => (
    <div style={{ width: "800px", height: "600px" }}>
      <Excalidraw {...props} onExcalidrawAPI={(next) => (api = next ?? undefined)}>
        <Probe />
      </Excalidraw>
    </div>
  ));
  return {
    container: screen.container,
    probe: () => {
      if (!probe) throw new Error("editor not mounted yet");
      return probe;
    },
    api: () => {
      if (!api) throw new Error("api not ready yet");
      return api;
    },
  };
}

const interactiveCanvas = (container: HTMLElement) => {
  const canvas = container.querySelector<HTMLCanvasElement>("canvas.interactive");
  if (!canvas) throw new Error("interactive canvas was not rendered");
  return canvas;
};

/** a pointer drag in client coordinates, the way the editor reads it */
async function drag(canvas: HTMLCanvasElement, from: [number, number], to: [number, number]) {
  // the editor handles pointer moves once per animation frame (throttleRAF)
  const frame = () => new Promise((resolve) => requestAnimationFrame(resolve));
  const init = (x: number, y: number, buttons: number): PointerEventInit => ({
    clientX: x,
    clientY: y,
    pointerId: 1,
    pointerType: "mouse",
    isPrimary: true,
    button: 0,
    buttons,
    bubbles: true,
    cancelable: true,
  });
  // synthetic pointers have no active pointer id to capture
  canvas.setPointerCapture = () => {};
  canvas.releasePointerCapture = () => {};
  // like upstream's test helpers: every event on the canvas (they bubble to
  // the window listeners the editor adds on pointer down)
  canvas.dispatchEvent(new PointerEvent("pointermove", init(from[0], from[1], 0)));
  canvas.dispatchEvent(new PointerEvent("pointerdown", init(from[0], from[1], 1)));
  for (let step = 1; step <= 4; step++) {
    const x = from[0] + ((to[0] - from[0]) * step) / 4;
    const y = from[1] + ((to[1] - from[1]) * step) / 4;
    canvas.dispatchEvent(new PointerEvent("pointermove", init(x, y, 1)));
    await frame();
  }
  canvas.dispatchEvent(new PointerEvent("pointerup", init(to[0], to[1], 0)));
}

const rect = (canvas: HTMLCanvasElement) => canvas.getBoundingClientRect();

describe("<Excalidraw>", () => {
  beforeEach(async () => {
    await page.viewport(1000, 800);
  });
  afterEach(() => cleanup());

  test("mounts the editor container and its canvas layers", async () => {
    const { container } = mount();
    await expect
      .poll(() => container.querySelector(".excalidraw.excalidraw-container"))
      .toBeTruthy();
    await expect.poll(() => container.querySelector("canvas.static")).toBeTruthy();
    expect(interactiveCanvas(container)).toBeTruthy();
    expect(container.querySelector(".excalidraw-textEditorContainer")).toBeTruthy();
  });

  test("drawing a rectangle adds an element and fires onChange", async () => {
    let changes = 0;
    const { container, probe, api } = mount({ onChange: () => changes++ });
    await expect.poll(() => container.querySelector("canvas.interactive")).toBeTruthy();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);

    api().setActiveTool({ type: "rectangle" });
    // state commits in a microtask, as React 18 batches it
    await expect.poll(() => probe().excalidraw.appState().activeTool.type).toBe("rectangle");
    const canvas = interactiveCanvas(container);
    const box = rect(canvas);
    await drag(canvas, [box.left + 100, box.top + 100], [box.left + 300, box.top + 250]);

    await expect.poll(() => probe().excalidraw.elements().length).toBe(1);
    const [element] = probe().excalidraw.elements();
    expect(element!.type).toBe("rectangle");
    expect(Math.round(element!.width)).toBe(200);
    expect(Math.round(element!.height)).toBe(150);
    expect(changes).toBeGreaterThan(0);
  });

  test("undo and redo through useHistory", async () => {
    const { container, probe, api } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);

    api().setActiveTool({ type: "ellipse" });
    await expect.poll(() => probe().excalidraw.appState().activeTool.type).toBe("ellipse");
    const canvas = interactiveCanvas(container);
    const box = rect(canvas);
    await drag(canvas, [box.left + 50, box.top + 50], [box.left + 150, box.top + 150]);
    await expect.poll(() => probe().excalidraw.elements().length).toBe(1);
    await expect.poll(() => probe().history.canUndo()).toBe(true);

    probe().history.undo();
    await expect.poll(() => probe().excalidraw.elements().length).toBe(0);
    await expect.poll(() => probe().history.canRedo()).toBe(true);

    probe().history.redo();
    await expect.poll(() => probe().excalidraw.elements().length).toBe(1);
  });

  test("api.updateScene replaces the elements", async () => {
    const { probe, api } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);

    api().updateScene({
      elements: convertToExcalidrawElements([
        { type: "diamond", x: 10, y: 10, width: 100, height: 80 },
      ]),
    });

    await expect
      .poll(() =>
        probe()
          .excalidraw.elements()
          .map((element) => element.type),
      )
      .toEqual(["diamond"]);
  });

  test("useProperty reads and writes the stroke color for new elements", async () => {
    const { probe } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);

    const before = probe().stroke.value();
    expect(typeof before).toBe("string");
    probe().stroke.set("#e03131");
    await expect.poll(() => probe().stroke.value()).toBe("#e03131");
    expect(probe().excalidraw.appState().currentItemStrokeColor).toBe("#e03131");
  });

  test("keyboard shortcuts on the focused container switch tools", async () => {
    const { container, probe } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);
    const editor = container.querySelector<HTMLDivElement>(".excalidraw")!;
    editor.focus();
    editor.dispatchEvent(new KeyboardEvent("keydown", { key: "r", code: "KeyR", bubbles: true }));
    await expect.poll(() => probe().excalidraw.appState().activeTool.type).toBe("rectangle");
  });

  test("right-click opens the context menu state with its entries", async () => {
    const { container, probe } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);
    const canvas = interactiveCanvas(container);
    const box = rect(canvas);
    canvas.dispatchEvent(
      new MouseEvent("contextmenu", {
        clientX: box.left + 200,
        clientY: box.top + 200,
        bubbles: true,
        cancelable: true,
      }),
    );
    await expect.poll(() => probe().contextMenu.open()).toBe(true);
    const names = probe()
      .contextMenu.entries()
      .flatMap((entry) => (entry.type === "action" ? [entry.name] : []));
    expect(names).toContain("selectAll");
    probe().contextMenu.close();
    await expect.poll(() => probe().contextMenu.open()).toBe(false);
  });

  test("useExport renders the scene to PNG and SVG", async () => {
    const { probe, api } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);
    api().updateScene({
      elements: convertToExcalidrawElements([
        { type: "rectangle", x: 0, y: 0, width: 120, height: 80 },
      ]),
    });
    await expect.poll(() => probe().excalidraw.elements().length).toBe(1);

    const png = await probe().exporter.toPng();
    expect(png.type).toBe("image/png");
    expect(png.size).toBeGreaterThan(0);
    const svg = await probe().exporter.toSvg({ dark: true });
    expect(svg.querySelector("path, rect")).toBeTruthy();
  });

  test("unmounting removes the canvas layers", async () => {
    const { container, probe } = mount();
    await expect.poll(() => !!probe().excalidraw.app.renderResult).toBe(true);
    cleanup();
    expect(container.querySelector("canvas.interactive")).toBeNull();
  });
});
