<script lang="ts">
  import type { Snippet } from "svelte";
  import Subtitle from "../text/Subtitle.svelte";

  interface Props {
    subtitle?: string;
    small?: boolean;
    align?: "start" | "center" | "end";
    children: Snippet;
  }

  let {
    subtitle = "",
    small = false,
    align = "start",
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";

  p {
    width: 100%;
    margin: 0;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;

    hyphens: auto;

    white-space: pre-line;
  }

  p.small {
		font-size: dimensions.$fontSizeSmall;
  }

  div {
    text-align: start;
    width: 100%;
    margin: 0;
  }

  @each $align in (start, center, end) {
    p.#{$align} {
      text-align: $align;
    }
  }
</style>

{#if subtitle !== ""}
  <div>
    <Subtitle>
      {subtitle}
    </Subtitle>
  </div>
{/if}
<p lang="de" class:small class={align}>
  {@render children()}
</p>