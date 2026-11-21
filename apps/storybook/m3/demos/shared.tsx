import { cn } from "@solidx/kit-1.9/m3";
import type { JSX } from "solid-js";

/** Demo helpers. No app aliases, so Storybook can render the same demos. */
export function DemoRow(props: { label: string; children: JSX.Element; class?: string }) {
  return (
    <div class="flex flex-col gap-2">
      <span class="typescale-label-medium text-on-surface-variant">{props.label}</span>
      <div class={cn("flex flex-wrap items-center gap-3", props.class)}>{props.children}</div>
    </div>
  );
}

export function DemoStack(props: { children: JSX.Element; class?: string }) {
  return <div class={cn("flex w-full flex-col gap-8", props.class)}>{props.children}</div>;
}

type IconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

function icon(d: string) {
  return (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  );
}

// Material Icons paths (Apache 2.0).
export const AddIcon = icon("M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z");
export const EditIcon = icon(
  "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
);
export const FavoriteIcon = icon(
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
);
export const StarIcon = icon(
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
);
export const MenuIcon = icon("M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z");
export const MoreVertIcon = icon(
  "M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
);
export const SearchIcon = icon(
  "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
);
export const ArrowBackIcon = icon("M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z");
export const HomeIcon = icon("M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z");
export const MailIcon = icon(
  "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
);
export const PersonIcon = icon(
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
);
export const DeleteIcon = icon(
  "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
);
export const InfoIcon = icon(
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
);
export const SendIcon = icon("M2.01 21 23 12 2.01 3 2 10l15 2-15 2z");
export const ShareIcon = icon(
  "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A2.99 2.99 0 0 0 21 5a3 3 0 1 0-5.91.7L8.04 9.81a3 3 0 1 0 0 4.38l7.12 4.16a2.82 2.82 0 0 0-.08.65 2.92 2.92 0 1 0 2.92-2.92z",
);
export const SettingsIcon = icon(
  "M19.14 12.94a7.4 7.4 0 0 0 .06-.94 7.4 7.4 0 0 0-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.47.41l-.36 2.54a7.2 7.2 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.3 7.3 0 0 0-.02 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z",
);
export const CloseIcon = icon(
  "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
);
