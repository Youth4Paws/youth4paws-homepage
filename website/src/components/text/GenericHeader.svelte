<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    level: number;
    id?: string;
    children: Snippet;
  }

  let {
    level,
    id = "",
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "sass:list";

  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";

  * {
    font-family: "Titan One", sans-serif;
    font-style: normal;
    margin: 0;
    max-width: 100%;
    hyphens: auto;
  }

  $highestFontSizeIndex: list.length(dimensions.$fontSizesTitle) - 1;
  @for $i from 1 through $highestFontSizeIndex {
    h#{$i} {
      font-size: list.nth(dimensions.$fontSizesTitle, $i);
      font-weight: list.nth(dimensions.$fontWeightsTitle, $i);

      @include media.phone {
        font-size: list.nth(dimensions.$fontSizesTitle, max($i + 1, $highestFontSizeIndex));
        font-weight: list.nth(dimensions.$fontWeightsTitle, max($i + 1, $highestFontSizeIndex));
      }
    }
  }
</style>

<svelte:element
  this={"h" + level.toString()}
  id={id || null}
  lang="de"
>
  {@render children()}
</svelte:element>


