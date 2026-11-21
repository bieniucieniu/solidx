import { DocsPage } from "~/components/preview";
import { SliderDemo } from "~/demos/ui/slider";
import source from "~/demos/ui/slider.tsx?raw";

const snippet = `import {
  Slider,
  SliderControl,
  SliderFill,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "@solidx/kit/ui";

<Slider value={value()} onValueChange={(next) => setValue(next)} min={0} max={100}>
  <SliderValueLabel />
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
      description="A draggable value on a track."
      snippet={snippet}
      source={source}
      sourceTitle="demos/ui/slider.tsx"
    >
      <SliderDemo />
    </DocsPage>
  );
}
