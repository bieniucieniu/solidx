// Framework-free editor facade: what upstream's `<Excalidraw>` (index.tsx
// `ExcalidrawBase` + `InitializeApp`) and `App.render()`'s container <div>
// do, without React. UI bindings create one, mount it into a container
// element, and feed it new props.

import {
  DEFAULT_IMAGE_OPTIONS,
  DEFAULT_UI_OPTIONS,
} from "@excalidraw/common";

import App from "./components/App";
import { mountCanvases } from "./components/canvases";
import { Fonts } from "./fonts/Fonts";
import { defaultLang, resolveLanguage, setLanguage } from "./i18n";
import polyfill from "./polyfill";

import type { ExcalidrawLocales } from "./i18n";
import type { AppProps, ExcalidrawProps } from "./types";

polyfill();

/** upstream `ExcalidrawBase`: fills in the defaults `App` expects */
export const normalizeProps = (props: ExcalidrawProps): AppProps => {
  const {
    ownerDocument = document,
    isCollaborating = false,
    langCode = defaultLang.code,
    detectScroll = true,
    handleKeyboardGlobally = false,
    autoFocus = false,
    aiEnabled,
    imageOptions,
    theme,
    onThemeChange,
  } = props;

  const canvasActions = props.UIOptions?.canvasActions;

  const UIOptions: AppProps["UIOptions"] = {
    ...props.UIOptions,
    canvasActions: {
      ...DEFAULT_UI_OPTIONS.canvasActions,
      ...canvasActions,
    },
    tools: {
      image: props.UIOptions?.tools?.image ?? true,
    },
  };

  if (canvasActions?.export) {
    UIOptions.canvasActions.export.saveFileToDisk =
      canvasActions.export?.saveFileToDisk ??
      DEFAULT_UI_OPTIONS.canvasActions.export.saveFileToDisk;
  }

  if (
    UIOptions.canvasActions.toggleTheme === null &&
    (theme == null || onThemeChange)
  ) {
    UIOptions.canvasActions.toggleTheme = true;
  }

  return {
    ...props,
    ownerDocument,
    isCollaborating,
    langCode,
    detectScroll,
    handleKeyboardGlobally,
    autoFocus,
    UIOptions,
    aiEnabled: aiEnabled !== false,
    imageOptions: {
      maxFileSizeBytes:
        imageOptions?.maxFileSizeBytes ??
        DEFAULT_IMAGE_OPTIONS.maxFileSizeBytes,
      maxWidthOrHeight:
        imageOptions?.maxWidthOrHeight ??
        DEFAULT_IMAGE_OPTIONS.maxWidthOrHeight,
    },
  } as AppProps;
};

/**
 * upstream `InitializeApp`: loads the language before the editor renders.
 * Languages other than English come from the host's `locales`.
 */
export const loadLanguage = async (
  langCode: string = defaultLang.code,
  locales?: ExcalidrawLocales,
) => {
  await setLanguage(resolveLanguage(langCode), locales?.[langCode]);
};

const CONTAINER_CLASSES = ["excalidraw", "excalidraw-container", "notranslate"];

export type ExcalidrawEditor = {
  app: App;
  /**
   * Mounts the editor into `container` (the `.excalidraw` element) and its
   * canvas layers into `canvasHost` (defaults to `container`).
   * @returns unmount
   */
  mount: (container: HTMLDivElement, canvasHost?: HTMLElement) => () => void;
  /** updates the props (a parent re-render in upstream terms) */
  setProps: (props: ExcalidrawProps) => void;
};

export const createEditor = (props: ExcalidrawProps): ExcalidrawEditor => {
  // before the scene loads, so its text measures with the host's fonts
  if (props.fonts) {
    Fonts.registerFonts(props.fonts);
  }
  const app = new App(normalizeProps(props));

  const mount = (container: HTMLDivElement, canvasHost?: HTMLElement) => {
    app.excalidrawContainerRef.current = container;

    container.setAttribute("translate", "no");
    container.tabIndex = 0;
    container.classList.add(...CONTAINER_CLASSES);

    // class names and CSS variables from the latest render; written only
    // when they differ from what was applied (this runs on every commit)
    let appliedClasses: string[] = [];
    let appliedStyle: Record<string, string> = {};
    const syncContainer = () => {
      const result = app.renderResult;
      if (!result) {
        return;
      }
      const next = [
        ...(app.props.className?.split(/\s+/).filter(Boolean) ?? []),
        ...Object.entries(result.containerClassNames)
          .filter(([, on]) => on)
          .map(([name]) => name),
      ];
      if (next.join(" ") !== appliedClasses.join(" ")) {
        container.classList.remove(...appliedClasses);
        container.classList.add(...next);
        appliedClasses = next;
      }
      for (const [key, value] of Object.entries(result.containerStyle)) {
        if (appliedStyle[key] !== value) {
          container.style.setProperty(key, value);
        }
      }
      appliedStyle = result.containerStyle;
    };

    // the container's handlers, bound when upstream binds them
    const onDrop = (event: DragEvent) => {
      if (app.renderResult?.fileDropEnabled) {
        app.handleAppOnDrop(event);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (app.renderResult?.keyboardEnabled) {
        app.onKeyDown(event);
      }
    };
    const onPointerEnterLeave = (event: PointerEvent) => {
      if (app.renderResult?.interactionEnabled) {
        app.toggleOverscrollBehavior(event);
      }
    };
    const listeners = new AbortController();
    const { signal } = listeners;
    container.addEventListener("drop", onDrop, { signal });
    container.addEventListener("keydown", onKeyDown, { signal });
    container.addEventListener("pointerenter", onPointerEnterLeave, { signal });
    container.addEventListener("pointerleave", onPointerEnterLeave, { signal });

    // block pinch-zooming on iOS outside of the content area (upstream
    // `ExcalidrawBase`), unless the host keeps browser zoom available
    const ownerDocument = container.ownerDocument;
    const interaction = app.props.interaction;
    const browserZoomAllowed =
      typeof interaction === "object" &&
      interaction !== null &&
      interaction.enabled?.browserZoom === true &&
      interaction.enabled?.navigation !== true;
    const onDocumentTouchMove = (event: TouchEvent) => {
      // @ts-ignore
      if (typeof event.scale === "number" && event.scale !== 1) {
        event.preventDefault();
      }
    };
    if (!browserZoomAllowed) {
      ownerDocument.addEventListener("touchmove", onDocumentTouchMove, {
        passive: false,
        signal,
      });
    }
    // @ts-ignore
    void import("canvas-roundrect-polyfill");

    const unmountCanvases = mountCanvases(app, canvasHost ?? container);
    const unsubscribe = app.subscribe(syncContainer);

    app.mountComponent();
    syncContainer();

    return () => {
      unsubscribe();
      app.unmountComponent();
      unmountCanvases();
      listeners.abort();
      container.classList.remove(...CONTAINER_CLASSES, ...appliedClasses);
      app.excalidrawContainerRef.current = null;
    };
  };

  return {
    app,
    mount,
    setProps: (props) => {
      if (props.fonts) {
        Fonts.registerFonts(props.fonts);
      }
      app.setProps(normalizeProps(props));
    },
  };
};
