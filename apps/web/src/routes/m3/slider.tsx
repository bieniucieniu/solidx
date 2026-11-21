import { DocsPage } from "~/components/preview";
import { SliderDemo } from "~/demos/m3/slider";
import source from "~/demos/m3/slider.tsx?raw";

const snippet = `import { Slider, SliderControl, SliderFill, SliderThumb, SliderTrack } from "@solidx/kit/m3";

<Slider defaultValue={40}>
  <SliderControl>
    <SliderTrack>
      <SliderFill />
      <SliderThumb aria-label="Volume" />
    </SliderTrack>
  </SliderControl>
</Slider>`;

export default function SliderPage() {
  return (
    <DocsPage
      title="Slider"
      description="Pick a value or range. Expressive bar handle with a gap in the track."
      snippet={snippet}
      source={source}
      sourceTitle="demos/m3/slider.tsx"
      previewClass="bg-surface text-on-surface"
    >
      <SliderDemo />
    </DocsPage>
  );
}
