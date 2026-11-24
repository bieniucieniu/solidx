import { pointFrom } from "@excalidraw/math";

import {
  ARROW_TYPE,
  FONT_FAMILY,
  ROUNDNESS,
  STROKE_WIDTH_KEYS,
  KEYS,
  randomInteger,
  arrayToMap,
  getFontFamilyString,
  getLineHeight,
  isTransparent,
  getStrokeWidthByKey,
  reduceToCommonValue,
  invariant,
  type StrokeWidthKey,
} from "@excalidraw/common";

import {
  canBecomePolygon,
  normalizeStickyNote,
  getNonDeletedElements,
  isNonDeletedElement,
  syncStickyNoteInk,
} from "@excalidraw/element";

import {
  bindBindingElement,
  calculateFixedPointForElbowArrowBinding,
  updateBoundElements,
} from "@excalidraw/element";

import { LinearElementEditor } from "@excalidraw/element";

import { newElementWith } from "@excalidraw/element";

import {
  getBaseFontSize,
  getBaseFontSizeUpdate,
  redrawTextBoundingBox,
} from "@excalidraw/element";

import {
  isArrowElement,
  isBoundToContainer,
  isElbowArrow,
  isLinearElement,
  isLineElement,
  isStickyNoteElement,
  isTextElement,
  isUsingAdaptiveRadius,
} from "@excalidraw/element";

import {
  getColorTargetElement,
  getColorUpdate,
  hasFillStyle,
  hasStrokeColor,
} from "@excalidraw/element";

import {
  updateElbowArrowPoints,
  updateElbowArrowRoute,
  CaptureUpdateAction,
  toggleLinePolygonState,
} from "@excalidraw/element";

import { deriveStylesPanelMode } from "@excalidraw/common";

import type { LocalPoint, Radians } from "@excalidraw/math";

import type {
  Arrowhead,
  ElementsMap,
  ExcalidrawBindableElement,
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  FontFamilyValues,
  StrokeVariability,
  NonDeleted,
  NonDeletedExcalidrawElement,
  TextAlign,
  VerticalAlign,
} from "@excalidraw/element/types";

import type { ElementUpdate, Scene } from "@excalidraw/element";

import type { CaptureUpdateActionType } from "@excalidraw/element";

import { trackEvent } from "../analytics";

import { Fonts } from "../fonts";
import { t } from "../i18n";
import {
  getSelectedElements,
  isSomeElementSelected,
} from "../scene";

import {
  getColorTargetAppStateUpdates,
  resolveColorTarget,
} from "./colorTargets";
import { register } from "./register";

import type { AppClassProperties, AppState, Primitive } from "../types";

const FONT_SIZE_RELATIVE_INCREASE_STEP = 0.1;

const getStylesPanelInfo = (app: AppClassProperties) => {
  const stylesPanelMode = deriveStylesPanelMode(app.editorInterface);
  return {
    stylesPanelMode,
    isCompact: stylesPanelMode !== "full",
    isMobile: stylesPanelMode === "mobile",
  } as const;
};

export const changeProperty = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  callback: (element: NonDeletedExcalidrawElement) => ExcalidrawElement,
  includeBoundText = false,
) => {
  const selectedElementIds = arrayToMap(
    getSelectedElements(elements, appState, {
      includeBoundTextElement: includeBoundText,
    }),
  );

  return elements.map((element) => {
    if (
      selectedElementIds.get(element.id) ||
      element.id === appState.editingTextElement?.id
    ) {
      // selected & editing elements are non-deleted
      if (!isNonDeletedElement(element)) {
        // SAFETY: This should never happen, but log it just in case
        console.error(
          "[NONDELETED][INVARIANT] changeProperty(): skipping deleted selected/editing element",
        );
      }
      const nextElement = callback(element as NonDeletedExcalidrawElement);
      // sticky notes keep their data invariants (never-transparent colors,
      // solid fill, minimum size) whatever property was written; a no-op
      // normalization returns the same object
      return isStickyNoteElement(nextElement)
        ? normalizeStickyNote(nextElement)
        : nextElement;
    }
    return element;
  });
};

export const getFormValue = function <T extends Primitive>(
  elements: readonly ExcalidrawElement[],
  app: AppClassProperties,
  /**
   * input value (usually the element attribute value,
   * but depends on what the action's PanelComponent input expects)
   */
  getValue: (element: ExcalidrawElement) => T,
  elementPredicate: true | ((element: ExcalidrawElement) => boolean),
  defaultValue: T | ((isSomeElementSelected: boolean) => T),
): T {
  const editingTextElement = app.state.editingTextElement;
  const nonDeletedElements = getNonDeletedElements(elements);

  let ret: T | null = null;

  if (editingTextElement) {
    ret = getValue(editingTextElement);
  }

  if (!ret) {
    const hasSelection = isSomeElementSelected(nonDeletedElements, app.state);

    if (hasSelection) {
      const selectedElements = app.scene.getSelectedElements(app.state);
      const targetElements =
        elementPredicate === true
          ? selectedElements
          : selectedElements.filter((el) => elementPredicate(el));

      ret =
        reduceToCommonValue(targetElements, getValue) ??
        (typeof defaultValue === "function"
          ? defaultValue(true)
          : defaultValue);
    } else {
      ret =
        typeof defaultValue === "function" ? defaultValue(false) : defaultValue;
    }
  }

  return ret;
};

const offsetElementAfterFontResize = (
  prevElement: ExcalidrawTextElement,
  nextElement: ExcalidrawTextElement,
  scene: Scene,
) => {
  if (isBoundToContainer(nextElement) || !nextElement.autoResize) {
    return nextElement;
  }
  return scene.mutateElement(nextElement, {
    x:
      prevElement.textAlign === "left"
        ? prevElement.x
        : prevElement.x +
          (prevElement.width - nextElement.width) /
            (prevElement.textAlign === "center" ? 2 : 1),
    // centering vertically is non-standard, but for Excalidraw I think
    // it makes sense
    y: prevElement.y + (prevElement.height - nextElement.height) / 2,
  });
};

const changeFontSize = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  app: AppClassProperties,
  getNewFontSize: (element: ExcalidrawTextElement) => number,
  fallbackValue?: ExcalidrawTextElement["fontSize"],
) => {
  const newFontSizes = new Set<number>();
  const elementsMap = app.scene.getNonDeletedElementsMap();

  const updatedElements = changeProperty(
    elements,
    appState,
    (oldElement) => {
      if (isTextElement(oldElement)) {
        const newFontSize = getNewFontSize(oldElement);
        newFontSizes.add(newFontSize);
        const container = app.scene.getContainerElement(oldElement);

        let newElement: ExcalidrawTextElement = newElementWith(
          oldElement,
          getBaseFontSizeUpdate(oldElement, newFontSize, elementsMap),
        );
        redrawTextBoundingBox(
          newElement,
          container,
          app.scene,
          app.renderEnvironment,
        );

        newElement = offsetElementAfterFontResize(
          oldElement,
          newElement,
          app.scene,
        );

        return newElement;
      }
      return oldElement;
    },
    true,
  );

  // Update arrow elements after text elements have been updated
  getSelectedElements(elements, appState, {
    includeBoundTextElement: true,
  }).forEach((element) => {
    if (isTextElement(element)) {
      updateBoundElements(element, app.scene, {
        renderEnvironment: app.renderEnvironment,
      });
    }
  });

  return {
    elements: updatedElements,
    appState: {
      ...appState,
      // update state only if we've set all select text elements to
      // the same font size
      currentItemFontSize:
        newFontSizes.size === 1
          ? [...newFontSizes][0]
          : fallbackValue ?? appState.currentItemFontSize,
    },
    captureUpdate: CaptureUpdateAction.IMMEDIATELY,
  };
};

// -----------------------------------------------------------------------------

export const actionChangeStrokeColor = register<
  Partial<AppState> & { color?: string }
>({
  name: "changeStrokeColor",
  label: "labels.stroke",
  trackEvent: false,
  perform: (elements, appState, value) => {
    const { color, ...appStateUpdates } = value ?? {};
    if (color === undefined) {
      return {
        appState: { ...appState, ...appStateUpdates },
        captureUpdate: CaptureUpdateAction.EVENTUALLY,
      };
    }
    // resolved from the state the action runs against — never from the
    // render-time closure of the memoized picker (see `resolveColorTarget`)
    const target = resolveColorTarget(appState, elements, "strokeColor");
    const elementsMap = arrayToMap(elements);

    return {
      // a note and its label share one ink: coloring the label while editing
      // it (no selection) colors the note too — the footer paints with it
      elements: syncStickyNoteInk(
        changeProperty(
          elements,
          appState,
          (el) =>
            hasStrokeColor(el.type)
              ? newElementWith(
                  el,
                  getColorUpdate(el, "strokeColor", color, elementsMap),
                )
              : el,
          true,
        ),
        elementsMap,
      ),
      appState: {
        ...appState,
        ...appStateUpdates,
        ...getColorTargetAppStateUpdates(target, color),
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeBackgroundColor = register<
  Partial<AppState> & { color?: string }
>({
  name: "changeBackgroundColor",
  label: "labels.changeBackground",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    const { color, ...appStateUpdates } = value ?? {};
    if (color === undefined) {
      return {
        appState: { ...appState, ...appStateUpdates },
        captureUpdate: CaptureUpdateAction.EVENTUALLY,
      };
    }
    const target = resolveColorTarget(appState, elements, "backgroundColor");
    const elementsMap = arrayToMap(elements);

    let nextElements;

    const selectedElements = app.scene.getSelectedElements(appState);
    const shouldEnablePolygon =
      !isTransparent(color) &&
      // `every` is vacuously true with nothing selected (editing text)
      selectedElements.length > 0 &&
      selectedElements.every(
        (el) => isLineElement(el) && canBecomePolygon(el.points),
      );

    if (shouldEnablePolygon) {
      const selectedElementsMap = arrayToMap(selectedElements);
      nextElements = elements.map((el) => {
        if (selectedElementsMap.has(el.id) && isLineElement(el)) {
          return newElementWith(el, {
            backgroundColor: color,
            ...toggleLinePolygonState(el, true),
          });
        }
        return el;
      });
    } else {
      nextElements = changeProperty(elements, appState, (el) =>
        // a note's label passes the pick on to the note (below)
        getColorTargetElement(el, "backgroundColor", elementsMap) === el
          ? newElementWith(
              el,
              getColorUpdate(el, "backgroundColor", color, elementsMap),
            )
          : el,
      );
      // editing a note's label (no selection): the label has no fill, the
      // pick colors the note — text and background in one editing pass
      const editingText =
        appState.editingTextElement &&
        elementsMap.get(appState.editingTextElement.id);
      const editingTarget =
        editingText &&
        getColorTargetElement(editingText, "backgroundColor", elementsMap);
      if (editingTarget && editingTarget !== editingText) {
        nextElements = nextElements.map((el) =>
          el.id === editingTarget.id
            ? newElementWith(
                el,
                getColorUpdate(el, "backgroundColor", color, elementsMap),
              )
            : el,
        );
      }
    }

    return {
      elements: nextElements,
      appState: {
        ...appState,
        ...appStateUpdates,
        ...getColorTargetAppStateUpdates(target, color),
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeBucketFillBackgroundColor = register<
  Pick<AppState, "currentItemBackgroundColor">
>({
  name: "changeBucketFillBackgroundColor",
  label: "labels.changeBackground",
  trackEvent: false,
  // the bucket fill tool has no element to mutate; it shares
  // `currentItemBackgroundColor` but hides `transparent` (an invisible fill
  // would be a no-op) and shows the effective fallback color instead
  perform: (elements, appState, value) => {
    return {
      appState: {
        ...appState,
        ...value,
      },
      captureUpdate: CaptureUpdateAction.EVENTUALLY,
    };
  },
});

export const actionChangeFillStyle = register<ExcalidrawElement["fillStyle"]>({
  name: "changeFillStyle",
  label: "labels.fill",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    trackEvent(
      "element",
      "changeFillStyle",
      `${value} (${
        app.editorInterface.formFactor === "phone" ? "mobile" : "desktop"
      })`,
    );
    return {
      elements: changeProperty(elements, appState, (el) =>
        hasFillStyle(el.type) ? newElementWith(el, { fillStyle: value }) : el,
      ),
      appState: { ...appState, currentItemFillStyle: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const getStrokeWidthKeyForElement = (
  element: ExcalidrawElement,
): StrokeWidthKey | null => {
  return (
    STROKE_WIDTH_KEYS.find(
      (key) => getStrokeWidthByKey(element.type, key) === element.strokeWidth,
    ) ?? null
  );
};

const getStrokeWidthForElement = (
  element: ExcalidrawElement,
  strokeWidthKey: StrokeWidthKey,
): ExcalidrawElement["strokeWidth"] => {
  return getStrokeWidthByKey(element.type, strokeWidthKey);
};

export const actionChangeStrokeWidth = register<StrokeWidthKey>({
  name: "changeStrokeWidth",
  label: "labels.strokeWidth",
  trackEvent: false,
  perform: (elements, appState, value) => {
    invariant(value, "actionChangeStrokeWidth: value must be defined");

    return {
      elements: changeProperty(elements, appState, (el) =>
        newElementWith(el, {
          strokeWidth: getStrokeWidthForElement(el, value),
        }),
      ),
      appState: { ...appState, currentItemStrokeWidthKey: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeSloppiness = register<ExcalidrawElement["roughness"]>({
  name: "changeSloppiness",
  label: "labels.sloppiness",
  trackEvent: false,
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(elements, appState, (el) =>
        newElementWith(el, {
          seed: randomInteger(),
          roughness: value,
        }),
      ),
      appState: { ...appState, currentItemRoughness: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeFreedrawMode = register<StrokeVariability>({
  name: "changeFreedrawMode",
  label: "labels.pressure",
  trackEvent: false,
  perform: (elements, appState, value) => {
    const variability = value || "constant";

    return {
      elements: changeProperty(elements, appState, (el) => {
        if (el.type !== "freedraw") {
          return el;
        }
        return newElementWith(el, {
          strokeOptions: {
            ...el.strokeOptions,
            variability,
          },
        }) as ExcalidrawElement;
      }),
      appState: { ...appState, currentItemStrokeVariability: variability },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeStrokeStyle = register<
  ExcalidrawElement["strokeStyle"]
>({
  name: "changeStrokeStyle",
  label: "labels.strokeStyle",
  trackEvent: false,
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(elements, appState, (el) =>
        newElementWith(el, {
          strokeStyle: value,
        }),
      ),
      appState: { ...appState, currentItemStrokeStyle: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeOpacity = register<ExcalidrawElement["opacity"]>({
  name: "changeOpacity",
  label: "labels.opacity",
  trackEvent: false,
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(
        elements,
        appState,
        (el) =>
          newElementWith(el, {
            opacity: value,
          }),
        true,
      ),
      appState: { ...appState, currentItemOpacity: value },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeFontSize = register<ExcalidrawTextElement["fontSize"]>(
  {
    name: "changeFontSize",
    label: "labels.fontSize",
    trackEvent: false,
    perform: (elements, appState, value, app) => {
      return changeFontSize(
        elements,
        appState,
        app,
        () => {
          invariant(value, "actionChangeFontSize: Expected a font size value");
          return value;
        },
        value,
      );
    },
  },
);

export const actionDecreaseFontSize = register({
  name: "decreaseFontSize",
  label: "labels.decreaseFontSize",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    return changeFontSize(elements, appState, app, (element) =>
      Math.round(
        // get previous value before relative increase (doesn't work fully
        // due to rounding and float precision issues)
        (1 / (1 + FONT_SIZE_RELATIVE_INCREASE_STEP)) *
          getBaseFontSize(element, app.scene.getNonDeletedElementsMap()),
      ),
    );
  },
  keyTest: (event) => {
    return (
      event[KEYS.CTRL_OR_CMD] &&
      event.shiftKey &&
      // KEYS.COMMA needed for MacOS
      (event.key === KEYS.CHEVRON_LEFT || event.key === KEYS.COMMA)
    );
  },
});

export const actionIncreaseFontSize = register({
  name: "increaseFontSize",
  label: "labels.increaseFontSize",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    return changeFontSize(elements, appState, app, (element) =>
      Math.round(
        getBaseFontSize(element, app.scene.getNonDeletedElementsMap()) *
          (1 + FONT_SIZE_RELATIVE_INCREASE_STEP),
      ),
    );
  },
  keyTest: (event) => {
    return (
      event[KEYS.CTRL_OR_CMD] &&
      event.shiftKey &&
      // KEYS.PERIOD needed for MacOS
      (event.key === KEYS.CHEVRON_RIGHT || event.key === KEYS.PERIOD)
    );
  },
});

type ChangeFontFamilyData = Partial<
  Pick<
    AppState,
    | "openPopup"
    | "currentItemFontFamily"
    | "currentHoveredFontFamily"
    | "fontTopPicks"
  >
> & {
  /** cache of selected & editing elements populated on opened popup */
  cachedElements?: ElementsMap;
  /** flag to reset all elements to their cached versions  */
  resetAll?: true;
  /** flag to reset all containers to their cached versions */
  resetContainers?: true;
};

export const actionChangeFontFamily = register<{
  currentItemFontFamily: any;
  currentHoveredFontFamily: any;
}>({
  name: "changeFontFamily",
  label: "labels.fontFamily",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    const { cachedElements, resetAll, resetContainers, ...nextAppState } =
      value as ChangeFontFamilyData;

    if (resetAll) {
      const nextElements = changeProperty(
        elements,
        appState,
        (element) => {
          const cachedElement = cachedElements?.get(element.id);
          if (cachedElement) {
            const newElement = newElementWith(element, {
              ...cachedElement,
            } as ElementUpdate<NonDeletedExcalidrawElement>);

            return newElement;
          }

          return element;
        },
        true,
      );

      return {
        elements: nextElements,
        appState: {
          ...appState,
          ...nextAppState,
        },
        captureUpdate: CaptureUpdateAction.NEVER,
      };
    }

    invariant(value, "actionChangeFontFamily: value must be defined");

    const { currentItemFontFamily, currentHoveredFontFamily } = value;

    let nextCaptureUpdateAction: CaptureUpdateActionType =
      CaptureUpdateAction.EVENTUALLY;
    let nextFontFamily: FontFamilyValues | undefined;
    let skipOnHoverRender = false;

    if (currentItemFontFamily) {
      nextFontFamily = currentItemFontFamily;
      nextCaptureUpdateAction = CaptureUpdateAction.IMMEDIATELY;
    } else if (currentHoveredFontFamily) {
      nextFontFamily = currentHoveredFontFamily;
      nextCaptureUpdateAction = CaptureUpdateAction.EVENTUALLY;

      const selectedTextElements = getSelectedElements(elements, appState, {
        includeBoundTextElement: true,
      }).filter((element) => isTextElement(element));

      // skip on hover re-render for more than 200 text elements or for text element with more than 5000 chars combined
      if (selectedTextElements.length > 200) {
        skipOnHoverRender = true;
      } else {
        let i = 0;
        let textLengthAccumulator = 0;

        while (
          i < selectedTextElements.length &&
          textLengthAccumulator < 5000
        ) {
          const textElement = selectedTextElements[i] as ExcalidrawTextElement;
          textLengthAccumulator += textElement?.originalText.length || 0;
          i++;
        }

        if (textLengthAccumulator > 5000) {
          skipOnHoverRender = true;
        }
      }
    }

    const result = {
      appState: {
        ...appState,
        ...nextAppState,
      },
      captureUpdate: nextCaptureUpdateAction,
    };

    if (nextFontFamily && !skipOnHoverRender) {
      const elementContainerMapping = new Map<
        ExcalidrawTextElement,
        ExcalidrawElement | null
      >();
      let uniqueChars = new Set<string>();
      let skipFontFaceCheck = false;

      const fontsCache = Array.from(Fonts.loadedFontsCache.values());
      const fontFamily = Object.entries(FONT_FAMILY).find(
        ([_, value]) => value === nextFontFamily,
      )?.[0];

      // skip `document.font.check` check on hover, if at least one font family has loaded as it's super slow (could result in slightly different bbox, which is fine)
      if (
        currentHoveredFontFamily &&
        fontFamily &&
        fontsCache.some((sig) => sig.startsWith(fontFamily))
      ) {
        skipFontFaceCheck = true;
      }

      // following causes re-render so make sure we changed the family
      // otherwise it could cause unexpected issues, such as preventing opening the popover when in wysiwyg
      Object.assign(result, {
        elements: changeProperty(
          elements,
          appState,
          (oldElement) => {
            if (
              isTextElement(oldElement) &&
              (oldElement.fontFamily !== nextFontFamily ||
                currentItemFontFamily) // force update on selection
            ) {
              const newElement: ExcalidrawTextElement = newElementWith(
                oldElement,
                {
                  fontFamily: nextFontFamily,
                  lineHeight: getLineHeight(nextFontFamily!),
                },
              );

              const cachedContainer =
                cachedElements?.get(oldElement.containerId || "") || {};

              const container = app.scene.getContainerElement(oldElement);

              if (resetContainers && container && cachedContainer) {
                // reset the container back to it's cached version
                app.scene.mutateElement(container, { ...cachedContainer });
              }

              if (!skipFontFaceCheck) {
                uniqueChars = new Set([
                  ...uniqueChars,
                  ...Array.from(newElement.originalText),
                ]);
              }

              elementContainerMapping.set(newElement, container);

              return newElement;
            }

            return oldElement;
          },
          true,
        ),
      });

      // size is irrelevant, but necessary
      const fontString = `10px ${getFontFamilyString({
        fontFamily: nextFontFamily,
      })}`;
      const chars = Array.from(uniqueChars.values()).join();
      const ownerDocument = app.props.ownerDocument ?? document;

      if (skipFontFaceCheck || ownerDocument.fonts.check(fontString, chars)) {
        // we either skip the check (have at least one font face loaded) or do the check and find out all the font faces have loaded
        for (const [element, container] of elementContainerMapping) {
          // trigger synchronous redraw
          redrawTextBoundingBox(
            element,
            container,
            app.scene,
            app.renderEnvironment,
          );
        }
      } else {
        // otherwise try to load all font faces for the given chars and redraw elements once our font faces loaded
        ownerDocument.fonts.load(fontString, chars).then((fontFaces) => {
          for (const [element, container] of elementContainerMapping) {
            // use latest element state to ensure we don't have closure over an old instance in order to avoid possible race conditions (i.e. font faces load out-of-order while rapidly switching fonts)
            const latestElement = app.scene.getElement(element.id);
            const latestContainer = container
              ? app.scene.getElement(container.id)
              : null;

            if (latestElement) {
              // trigger async redraw
              redrawTextBoundingBox(
                latestElement as ExcalidrawTextElement,
                latestContainer,
                app.scene,
                app.renderEnvironment,
              );
            }
          }

          // trigger update once we've mutated all the elements, which also updates our cache
          app.fonts.onLoaded(fontFaces);
        });
      }
    }

    return result;
  },
});

export const actionChangeTextAlign = register<TextAlign>({
  name: "changeTextAlign",
  label: "Change text alignment",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    return {
      elements: changeProperty(
        elements,
        appState,
        (oldElement) => {
          if (isTextElement(oldElement)) {
            const newElement: ExcalidrawTextElement = newElementWith(
              oldElement,
              { textAlign: value },
            );
            redrawTextBoundingBox(
              newElement,
              app.scene.getContainerElement(oldElement),
              app.scene,
              app.renderEnvironment,
            );
            return newElement;
          }

          return oldElement;
        },
        true,
      ),
      appState: {
        ...appState,
        currentItemTextAlign: value,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeVerticalAlign = register<VerticalAlign>({
  name: "changeVerticalAlign",
  label: "Change vertical alignment",
  trackEvent: { category: "element" },
  perform: (elements, appState, value, app) => {
    return {
      elements: changeProperty(
        elements,
        appState,
        (oldElement) => {
          if (isTextElement(oldElement)) {
            const newElement: ExcalidrawTextElement = newElementWith(
              oldElement,
              { verticalAlign: value },
            );

            redrawTextBoundingBox(
              newElement,
              app.scene.getContainerElement(oldElement),
              app.scene,
              app.renderEnvironment,
            );
            return newElement;
          }

          return oldElement;
        },
        true,
      ),
      appState: {
        ...appState,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeRoundness = register<"sharp" | "round">({
  name: "changeRoundness",
  label: "Change edge roundness",
  trackEvent: false,
  perform: (elements, appState, value) => {
    return {
      elements: changeProperty(elements, appState, (el) => {
        if (isElbowArrow(el)) {
          return el;
        }

        const nextElement = newElementWith(el, {
          roundness:
            value === "round"
              ? {
                  type: isUsingAdaptiveRadius(el.type)
                    ? ROUNDNESS.ADAPTIVE_RADIUS
                    : ROUNDNESS.PROPORTIONAL_RADIUS,
                }
              : null,
        });

        return nextElement;
      }),
      appState: {
        ...appState,
        currentItemRoundness: value,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

const getArrowheadOptions = (flip: boolean) => {
  return {
    visibleSections: [
      {
        name: "default",
        options: [
          {
            value: null,
            text: t("labels.arrowhead_none"),
            keyBinding: "q",
          },
          {
            value: "arrow",
            text: t("labels.arrowhead_arrow"),
            keyBinding: "w",
          },
          {
            value: "triangle",
            text: t("labels.arrowhead_triangle"),
            keyBinding: "e",
          },
          {
            value: "triangle_outline",
            text: t("labels.arrowhead_triangle_outline"),
            keyBinding: "r",
          },
        ],
      },
    ],
    hiddenSections: [
      {
        name: "default",
        options: [
          {
            value: "circle",
            text: t("labels.arrowhead_circle"),
            keyBinding: "a",
          },
          {
            value: "circle_outline",
            text: t("labels.arrowhead_circle_outline"),
            keyBinding: "s",
          },
          {
            value: "diamond",
            text: t("labels.arrowhead_diamond"),
            keyBinding: "d",
          },
          {
            value: "diamond_outline",
            text: t("labels.arrowhead_diamond_outline"),
            keyBinding: "f",
          },
          {
            value: "bar",
            text: t("labels.arrowhead_bar"),
            keyBinding: "z",
          },
        ],
      },
      {
        name: t("labels.cardinality"),
        options: [
          {
            value: "cardinality_one",
            text: t("labels.arrowhead_cardinality_one"),
            keyBinding: "x",
          },
          {
            value: "cardinality_many",
            text: t("labels.arrowhead_cardinality_many"),
            keyBinding: "c",
          },
          {
            value: "cardinality_one_or_many",
            text: t("labels.arrowhead_cardinality_one_or_many"),
            keyBinding: "v",
          },
          {
            value: "cardinality_exactly_one",
            text: t("labels.arrowhead_cardinality_exactly_one"),
            keyBinding: null,
          },
          {
            value: "cardinality_zero_or_one",
            text: t("labels.arrowhead_cardinality_zero_or_one"),
            keyBinding: null,
          },
          {
            value: "cardinality_zero_or_many",
            text: t("labels.arrowhead_cardinality_zero_or_many"),
            keyBinding: null,
          },
        ],
      },
    ],
  } as const;
};

export const actionChangeArrowhead = register<{
  position: "start" | "end";
  type: Arrowhead;
}>({
  name: "changeArrowhead",
  label: "Change arrowheads",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    invariant(value, "actionChangeArrowhead: value must be defined");

    return {
      elements: changeProperty(elements, appState, (el) => {
        if (isLinearElement(el)) {
          const { position, type } = value;

          const element: ExcalidrawLinearElement = newElementWith(
            el,
            position === "start"
              ? { startArrowhead: type }
              : { endArrowhead: type },
          );
          return isElbowArrow(element)
            ? newElementWith(
                element,
                updateElbowArrowRoute(
                  element,
                  app.scene.getNonDeletedElementsMap(),
                ),
              )
            : element;
        }

        return el;
      }),
      appState: {
        ...appState,
        [value.position === "start"
          ? "currentItemStartArrowhead"
          : "currentItemEndArrowhead"]: value.type,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});

export const actionChangeArrowProperties = register({
  name: "changeArrowProperties",
  label: "Change arrow properties",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    // This action doesn't perform any changes directly
    // It's just a container for the arrow type and arrowhead actions
    return false;
  },
});

export const actionChangeArrowType = register<keyof typeof ARROW_TYPE>({
  name: "changeArrowType",
  label: "Change arrow types",
  trackEvent: false,
  perform: (elements, appState, value, app) => {
    const newElements = changeProperty(elements, appState, (el) => {
      if (!isArrowElement(el)) {
        return el;
      }
      const elementsMap = app.scene.getNonDeletedElementsMap();
      const startPoint = LinearElementEditor.getPointAtIndexGlobalCoordinates(
        el,
        0,
        elementsMap,
      );
      const endPoint = LinearElementEditor.getPointAtIndexGlobalCoordinates(
        el,
        -1,
        elementsMap,
      );
      let newElement = newElementWith(el, {
        x: value === ARROW_TYPE.elbow ? startPoint[0] : el.x,
        y: value === ARROW_TYPE.elbow ? startPoint[1] : el.y,
        roundness:
          value === ARROW_TYPE.round
            ? {
                type: ROUNDNESS.PROPORTIONAL_RADIUS,
              }
            : null,
        elbowed: value === ARROW_TYPE.elbow,
        angle: value === ARROW_TYPE.elbow ? (0 as Radians) : el.angle,
        points:
          value === ARROW_TYPE.elbow || el.elbowed
            ? [
                LinearElementEditor.pointFromAbsoluteCoords(
                  {
                    ...el,
                    x: startPoint[0],
                    y: startPoint[1],
                    angle: 0 as Radians,
                  },
                  startPoint,
                  elementsMap,
                ),
                LinearElementEditor.pointFromAbsoluteCoords(
                  {
                    ...el,
                    x: startPoint[0],
                    y: startPoint[1],
                    angle: 0 as Radians,
                  },
                  endPoint,
                  elementsMap,
                ),
              ]
            : el.points,
      });

      if (isElbowArrow(newElement)) {
        newElement.fixedSegments = null;

        const elementsMap = app.scene.getNonDeletedElementsMap();

        app.dismissLinearEditor();

        const startGlobalPoint =
          LinearElementEditor.getPointAtIndexGlobalCoordinates(
            newElement,
            0,
            elementsMap,
          );
        const endGlobalPoint =
          LinearElementEditor.getPointAtIndexGlobalCoordinates(
            newElement,
            -1,
            elementsMap,
          );
        const startElement =
          newElement.startBinding &&
          (elementsMap.get(
            newElement.startBinding.elementId,
          ) as ExcalidrawBindableElement);
        const endElement =
          newElement.endBinding &&
          (elementsMap.get(
            newElement.endBinding.elementId,
          ) as ExcalidrawBindableElement);

        const startBinding =
          startElement && newElement.startBinding
            ? {
                // @ts-ignore TS cannot discern check above
                ...newElement.startBinding!,
                ...calculateFixedPointForElbowArrowBinding(
                  newElement,
                  startElement,
                  "start",
                  elementsMap,
                  appState.zoom,
                  appState.isBindingEnabled,
                ),
              }
            : null;
        const endBinding =
          endElement && newElement.endBinding
            ? {
                // @ts-ignore TS cannot discern check above
                ...newElement.endBinding,
                ...calculateFixedPointForElbowArrowBinding(
                  newElement,
                  endElement,
                  "end",
                  elementsMap,
                  appState.zoom,
                  appState.isBindingEnabled,
                ),
              }
            : null;

        newElement = {
          ...newElement,
          startBinding,
          endBinding,
          ...updateElbowArrowPoints(newElement, elementsMap, {
            points: [startGlobalPoint, endGlobalPoint].map(
              (p): LocalPoint =>
                pointFrom(p[0] - newElement.x, p[1] - newElement.y),
            ),
            startBinding,
            endBinding,
            fixedSegments: null,
          }),
        } as typeof newElement;
      } else {
        const elementsMap = app.scene.getNonDeletedElementsMap();
        if (newElement.startBinding) {
          const startElement = elementsMap.get(
            newElement.startBinding.elementId,
          ) as NonDeleted<ExcalidrawBindableElement>;
          if (startElement) {
            bindBindingElement(
              newElement,
              startElement,
              appState.bindMode === "inside" ? "inside" : "orbit",
              "start",
              app.scene,
              appState.zoom,
            );
          }
        }
        if (newElement.endBinding) {
          const endElement = elementsMap.get(
            newElement.endBinding.elementId,
          ) as NonDeleted<ExcalidrawBindableElement>;
          if (endElement) {
            bindBindingElement(
              newElement,
              endElement,
              appState.bindMode === "inside" ? "inside" : "orbit",
              "end",
              app.scene,
              appState.zoom,
            );
          }
        }
      }

      return newElement;
    });

    const newState = {
      ...appState,
      currentItemArrowType: value,
    };

    // Change the arrow type and update any other state settings for
    // the arrow.
    const selectedId = appState.selectedLinearElement?.elementId;
    if (selectedId) {
      const selected = newElements.find((el) => el.id === selectedId);
      if (selected) {
        newState.selectedLinearElement = new LinearElementEditor(
          selected as NonDeleted<ExcalidrawLinearElement>,
          arrayToMap(elements),
        );
      }
    }

    return {
      elements: newElements,
      appState: newState,
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
});
