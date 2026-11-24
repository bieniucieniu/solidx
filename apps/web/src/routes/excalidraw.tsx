import { type ParentProps } from "solid-js";
import { DocsLayout } from "~/components/docs-layout";

export default function ExcalidrawLayout(props: ParentProps) {
  return <DocsLayout pkg="excalidraw">{props.children}</DocsLayout>;
}
