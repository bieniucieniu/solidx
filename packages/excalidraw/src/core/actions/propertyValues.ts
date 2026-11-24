// Headless replacement for the value reads of upstream's property
// `PanelComponent`s (actions/actionProperties.tsx). Each entry reads the
// current value the way its panel did (the selection's common value, or the
// `currentItem*` default with nothing selected, or `null` when mixed), maps a
// UI value to what the action's `perform` takes (`updateData(...)`), and names
// the `getShapeActionPredicates` flag that decides whether the panel shows it.

import {
  ARROW_TYPE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  VERTICAL_ALIGN,
} from "@excalidraw/common";
import {
  getBaseFontSize,
  getBoundTextElement,
  getColorTargetElement,
  hasFillStyle,
  isArrowElement,
  isTextElement,
} from "@excalidraw/element";

import { getFormValue, getStrokeWidthKeyForElement } from "./actionProperties";
import { resolveColorTarget } from "./colorTargets";

import type { ActionName } from "./types";
import type { ShapeActionPredicates } from "../components/shapeActionPredicates";
import type { AppClassProperties } from "../types";
import type {
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawTextElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";

type Primitive = string | number | boolean | null | undefined;

export type PropertyDescriptor<V extends Primitive = Primitive> = {
  /** the action that applies the value */
  action: ActionName;
  /** the `getShapeActionPredicates` flag that shows this property */
  flag: keyof ShapeActionPredicates;
  /** current value; `null` when the selection is mixed */
  get: (app: AppClassProperties) => V | null;
  /** the action's `perform` value for a UI value; the value itself if omitted */
  toActionValue?: (value: V) => unknown;
};

const elementsOf = (app: AppClassProperties) =>
  app.scene.getNonDeletedElements();

/** a plain element property: the selection's common value, else `currentItem*` */
const elementProperty =
  <V extends Primitive>(
    pick: (element: ExcalidrawElement) => V | null | undefined,
    applies: ((element: ExcalidrawElement) => boolean) | true,
    fallback: (app: AppClassProperties) => V | null,
  ) =>
  (app: AppClassProperties) =>
    getFormValue(elementsOf(app), app, pick, applies, (hasSelection) =>
      hasSelection ? null : fallback(app),
    ) as V | null;

/** a text property, read from text elements or the text bound to a container */
const textProperty =
  <V extends Primitive>(
    pick: (
      text: ExcalidrawTextElement,
      elementsMap: NonDeletedSceneElementsMap,
    ) => V,
    fallback: (app: AppClassProperties) => V,
    /** the element's own value; defaults to `isTextElement` */
    ownValue: (element: ExcalidrawElement) => boolean = isTextElement,
  ) =>
  (app: AppClassProperties) => {
    const elementsMap = app.scene.getNonDeletedElementsMap();
    return getFormValue(
      elementsOf(app),
      app,
      (element) => {
        if (ownValue(element)) {
          return pick(element as ExcalidrawTextElement, elementsMap);
        }
        const boundTextElement = getBoundTextElement(element, elementsMap);
        return boundTextElement ? pick(boundTextElement, elementsMap) : null;
      },
      (element) =>
        isTextElement(element) ||
        getBoundTextElement(element, elementsMap) !== null,
      (hasSelection) => (hasSelection ? null : fallback(app)),
    ) as V | null;
  };

/** a color property: the selection's common value, else the color target's */
const colorProperty =
  (
    key: "strokeColor" | "backgroundColor",
    pick: (
      element: ExcalidrawElement,
      elementsMap: NonDeletedSceneElementsMap,
    ) => string,
  ) =>
  (app: AppClassProperties) => {
    const elements = elementsOf(app);
    const elementsMap = app.scene.getNonDeletedElementsMap();
    const target = resolveColorTarget(app.state, elements, key);
    return getFormValue(
      elements,
      app,
      (element) => pick(element, elementsMap),
      true,
      (hasSelection) => (!hasSelection ? target.currentValue : null),
    );
  };

const define = <V extends Primitive>(descriptor: PropertyDescriptor<V>) =>
  descriptor;

export const PROPERTIES = {
  strokeColor: define<string>({
    action: "changeStrokeColor",
    flag: "strokeColor",
    get: colorProperty("strokeColor", (element) => element.strokeColor),
    toActionValue: (color) => ({ color }),
  }),
  backgroundColor: define<string>({
    action: "changeBackgroundColor",
    flag: "backgroundColor",
    get: colorProperty(
      "backgroundColor",
      (element, elementsMap) =>
        getColorTargetElement(element, "backgroundColor", elementsMap)
          .backgroundColor,
    ),
    toActionValue: (color) => ({ color }),
  }),
  fillStyle: define<ExcalidrawElement["fillStyle"]>({
    action: "changeFillStyle",
    flag: "fill",
    get: elementProperty(
      (element) => element.fillStyle,
      (element) => hasFillStyle(element.type),
      (app) => app.state.currentItemFillStyle,
    ),
  }),
  strokeWidth: define<string>({
    action: "changeStrokeWidth",
    flag: "strokeWidth",
    get: elementProperty(
      getStrokeWidthKeyForElement,
      (element) => element.hasOwnProperty("strokeWidth"),
      (app) => app.state.currentItemStrokeWidthKey,
    ),
  }),
  sloppiness: define<number>({
    action: "changeSloppiness",
    flag: "sloppiness",
    get: elementProperty(
      (element) => element.roughness,
      (element) => element.hasOwnProperty("roughness"),
      (app) => app.state.currentItemRoughness,
    ),
  }),
  freedrawMode: define<string>({
    action: "changeFreedrawMode",
    flag: "freedrawMode",
    get: elementProperty(
      (element) =>
        (element as ExcalidrawFreeDrawElement).strokeOptions?.variability,
      (element) => element.type === "freedraw",
      (app) => app.state.currentItemStrokeVariability,
    ),
  }),
  strokeStyle: define<ExcalidrawElement["strokeStyle"]>({
    action: "changeStrokeStyle",
    flag: "strokeStyle",
    get: elementProperty(
      (element) => element.strokeStyle,
      (element) => element.hasOwnProperty("strokeStyle"),
      (app) => app.state.currentItemStrokeStyle,
    ),
  }),
  opacity: define<number>({
    action: "changeOpacity",
    flag: "opacity",
    get: elementProperty(
      (element) => element.opacity,
      true,
      (app) => app.state.currentItemOpacity,
    ),
  }),
  fontSize: define<number>({
    action: "changeFontSize",
    flag: "text",
    get: textProperty(
      (text, elementsMap) => getBaseFontSize(text, elementsMap),
      (app) => app.state.currentItemFontSize || DEFAULT_FONT_SIZE,
    ),
  }),
  fontFamily: define<number>({
    action: "changeFontFamily",
    flag: "text",
    get: textProperty(
      (text) => text.fontFamily,
      (app) => app.state.currentItemFontFamily || DEFAULT_FONT_FAMILY,
    ),
    toActionValue: (fontFamily) => ({
      openPopup: null,
      currentHoveredFontFamily: null,
      currentItemFontFamily: fontFamily,
    }),
  }),
  textAlign: define<string>({
    action: "changeTextAlign",
    flag: "textAlign",
    get: textProperty(
      (text) => text.textAlign,
      (app) => app.state.currentItemTextAlign,
    ),
  }),
  verticalAlign: define<string>({
    action: "changeVerticalAlign",
    flag: "verticalAlign",
    get: textProperty(
      (text) => text.verticalAlign,
      () => VERTICAL_ALIGN.MIDDLE,
      // a standalone text has no vertical align; read its container's
      (element) => isTextElement(element) && !!element.containerId,
    ),
  }),
  roundness: define<"sharp" | "round">({
    action: "changeRoundness",
    flag: "roundness",
    get: elementProperty(
      (element) => (element.roundness ? "round" : "sharp"),
      (element) =>
        !isArrowElement(element) && element.hasOwnProperty("roundness"),
      (app) => app.state.currentItemRoundness,
    ),
  }),
  arrowType: define<string>({
    action: "changeArrowType",
    flag: "arrowType",
    get: elementProperty(
      (element) =>
        isArrowElement(element)
          ? element.elbowed
            ? ARROW_TYPE.elbow
            : element.roundness
            ? ARROW_TYPE.round
            : ARROW_TYPE.sharp
          : null,
      (element) => isArrowElement(element),
      (app) => app.state.currentItemArrowType,
    ),
  }),
} satisfies Record<string, PropertyDescriptor<any>>;

export type PropertyName = keyof typeof PROPERTIES;

export type PropertyValue<N extends PropertyName> =
  (typeof PROPERTIES)[N] extends PropertyDescriptor<infer V> ? V : never;
