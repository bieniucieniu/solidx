import { type JSX, type ValidComponent } from "@solidjs/web";
import { createContext, omit, useContext } from "solid-js";
import { dynamic } from "@solidjs/web";
import { cn } from "#kit/lib/utils";

const NavigationRailContext = createContext<{ expanded: boolean }>({ expanded: false });

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
  /** Expanded rail (220-360px): items show the label beside the icon in a full-width pill. */
  expanded?: boolean;
}

/**
 * Side navigation for medium and larger windows. Collapsed: 96px with labels under icons.
 * Children: NavigationRailHeader (menu button, FAB), then NavigationRailItem.
 */
export function NavigationRail(props: NavigationRailProps) {
  const rest = omit(props, "expanded");
  return (
    <NavigationRailContext
      value={{
        get expanded() {
          return props.expanded ?? false;
        },
      }}
    >
      <nav
        data-slot="navigation-rail"
        data-expanded={props.expanded ? "" : undefined}
        {...rest}
        class={cn(
          "group/navigation-rail flex h-full w-24 shrink-0 flex-col items-center gap-1 bg-surface py-11 text-on-surface-variant motion-default data-expanded:w-60 data-expanded:items-stretch data-expanded:px-5",
          props.class,
        )}
      />
    </NavigationRailContext>
  );
}

/** Top area for a menu button and a FAB or extended FAB. */
export function NavigationRailHeader(
  props: JSX.HTMLAttributes<HTMLDivElement> &
    Pick<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
      as?: ValidComponent;
    },
) {
  const rest = omit(props, "as");
  const Tag = dynamic(() => props.as ?? "div");

  return (
    <Tag
      data-slot="navigation-rail-header"
      {...rest}
      class={cn(
        "-mt-5 mb-10 flex flex-col items-center gap-1 group-data-expanded/navigation-rail:items-start",
        props.class,
      )}
    />
  );
}

export type NavigationRailItemProps = JSX.HTMLAttributes<HTMLElement> &
  Pick<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Pick<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type"> & {
    as?: ValidComponent;
    active?: boolean;
  };

export function NavigationRailItem(props: NavigationRailItemProps) {
  const context = useContext(NavigationRailContext);
  const rest = omit(props, "as", "active");
  const Tag = dynamic(() => props.as ?? "button");
  return (
    <Tag
      type={props.as ? undefined : "button"}
      data-slot="navigation-rail-item"
      data-active={props.active ? "" : undefined}
      aria-current={props.active ? "page" : undefined}
      {...rest}
      class={cn(
        "group/navigation-item relative flex cursor-pointer outline-none select-none disabled:pointer-events-none disabled:opacity-38",
        context.expanded
          ? "h-14 w-full flex-row items-center gap-3 rounded-full px-4 text-on-surface-variant state-layer motion-fast focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary data-active:bg-secondary-container data-active:text-on-secondary-container"
          : "w-full flex-col items-center gap-1 pb-1",
        props.class,
      )}
    />
  );
}

/** The icon. Collapsed, it sits in a 56x32 active indicator. */
export function NavigationRailIcon(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const context = useContext(NavigationRailContext);
  return (
    <span
      data-slot="navigation-rail-icon"
      {...props}
      class={cn(
        "relative flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-6",
        !context.expanded &&
          "h-8 w-14 rounded-full text-on-surface-variant state-layer motion-fast group-hover/navigation-item:before:opacity-8 group-focus-visible/navigation-item:outline-3 group-focus-visible/navigation-item:outline-offset-2 group-focus-visible/navigation-item:outline-secondary group-active/navigation-item:before:opacity-10 group-data-active/navigation-item:bg-secondary-container group-data-active/navigation-item:text-on-secondary-container",
        props.class,
      )}
    />
  );
}

export function NavigationRailLabel(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const context = useContext(NavigationRailContext);
  return (
    <span
      data-slot="navigation-rail-label"
      {...props}
      class={cn(
        "max-w-full truncate",
        context.expanded
          ? "flex-1 typescale-label-large"
          : "typescale-label-medium text-on-surface-variant group-data-active/navigation-item:text-secondary",
        props.class,
      )}
    />
  );
}
