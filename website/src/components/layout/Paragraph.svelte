<script lang="ts">
  import type { Snippet } from "svelte";
  import Subtitle from "../text/Subtitle.svelte";

  interface Props {
    subtitle?: string;
    small?: boolean;
    children: Snippet;
  }

  let {
    subtitle = "",
    small = false,
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

    text-align: start;

    hyphens: auto;

    white-space: pre-line;
  }

  p.small {
		font-size: dimensions.$fontSizeSmall;
  }

  div {
    width: 100%;
    margin: 0;
    text-align: start;
  }
</style>

{#if subtitle !== ""}
  <div>
    <Subtitle>
      {subtitle}
    </Subtitle>
  </div>
{/if}
<p lang="de" class:small>
  {@render children()}
</p>