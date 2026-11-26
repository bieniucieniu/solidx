import { type JSX, type ValidComponent } from "@solidjs/web";
import { omit } from "solid-js";
import { dynamic } from "@solidjs/web";
import { cn } from "#kit/lib/utils";

export interface NavigationBarProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * stacked: icon above label, the icon in a 56x32 indicator (compact windows). inline: icon and
   * label side by side in one pill (medium windows).
   */
  layout?: "stacked" | "inline";
}

/** Bottom navigation for 3 to 5 destinations on small screens. */
export function NavigationBar(props: NavigationBarProps) {
  const rest = omit(props, "layout");
  return (
    <nav
      data-slot="navigation-bar"
      data-layout={props.layout ?? "stacked"}
      {...rest}
      class={cn(
        "group/navigation-bar flex data-[layout=inline]:h-16 w-full items-stretch justify-center bg-surface-container text-on-surface-variant data-[layout=inline]:items-center data-[layout=inline]:justify-around",
        props.class,
      )}
    />
  );
}

export type NavigationBarItemProps = JSX.HTMLAttributes<HTMLElement> &
  Pick<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Pick<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type"> & {
    /** Render as a router link (`as={A}`) or `a`. Defaults to `button`. */
    as?: ValidComponent;
    /** The current destination. Sets `aria-current="page"`. */
    active?: boolean;
  };

/** One destination: NavigationBarIcon and NavigationBarLabel inside. */
export function NavigationBarItem(props: NavigationBarItemProps) {
  const rest = omit(props, "as", "active");
  const Tag = dynamic(() => props.as ?? "button");
  return (
    <Tag
      type={props.as ? undefined : "button"}
      data-slot="navigation-bar-item"
      data-active={props.active ? "" : undefined}
      aria-current={props.active ? "page" : undefined}
      {...rest}
      class={cn(
        "group/navigation-item relative flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-1 pt-1.5 pb-4 outline-none select-none disabled:pointer-events-none disabled:opacity-38 group-data-[layout=inline]/navigation-bar:h-10 group-data-[layout=inline]/navigation-bar:flex-none group-data-[layout=inline]/navigation-bar:flex-row group-data-[layout=inline]/navigation-bar:rounded-full group-data-[layout=inline]/navigation-bar:px-4 group-data-[layout=inline]/navigation-bar:py-0 group-data-[layout=inline]/navigation-bar:motion-fast group-data-[layout=inline]/navigation-bar:hover:bg-on-surface/8 group-data-[layout=inline]/navigation-bar:focus-visible:outline-3 group-data-[layout=inline]/navigation-bar:focus-visible:outline-offset-2 group-data-[layout=inline]/navigation-bar:focus-visible:outline-secondary group-data-[layout=inline]/navigation-bar:data-active:bg-secondary-container",
        props.class,
      )}
    />
  );
}

/**
 * The icon inside its 56x32 active indicator. In the inline layout the indicator also wraps the
 * label. Put a Badge in a BadgeAnchor here for counts.
 */
export function NavigationBarIcon(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="navigation-bar-icon"
      {...props}
      class={cn(
        "relative flex h-8 w-14 shrink-0 items-center justify-center rounded-full text-on-surface-variant state-layer motion-fast group-hover/navigation-item:before:opacity-8 group-focus-visible/navigation-item:outline-3 group-focus-visible/navigation-item:outline-offset-2 group-focus-visible/navigation-item:outline-secondary group-active/navigation-item:before:opacity-10 group-data-active/navigation-item:bg-secondary-container group-data-active/navigation-item:text-on-secondary-container [&_svg:not([class*='size-'])]:size-6 group-data-[layout=inline]/navigation-bar:h-auto! group-data-[layout=inline]/navigation-bar:w-auto! group-data-[layout=inline]/navigation-bar:bg-transparent! group-data-[layout=inline]/navigation-bar:text-inherit! group-data-[layout=inline]/navigation-bar:outline-none! group-data-[layout=inline]/navigation-bar:before:hidden",
        props.class,
      )}
    />
  );
}

export function NavigationBarLabel(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="navigation-bar-label"
      {...props}
      class={cn(
        "max-w-full truncate typescale-label-medium text-on-surface-variant group-data-active/navigation-item:text-secondary group-data-[layout=inline]/navigation-bar:group-data-active/navigation-item:text-on-secondary-container",
        props.class,
      )}
    />
  );
}
