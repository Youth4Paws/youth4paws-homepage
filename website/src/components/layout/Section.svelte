<script lang="ts">
  import type { Snippet } from "svelte";
  import Title from "../text/Title.svelte";

  interface Props {
    title: string;
    tag?: string;
    color?: "primary" | "secondary" | "tertiary" | "inherit";
    children: Snippet;
  }

  let {
    title,
    tag,
    color = "primary",
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";
  
  section {
    display: flex;
    flex-direction: column;
    gap: dimensions.$gapSmall;

    @include layout.section-dimensioning;
  }

  @each $key, $val in colors.$mainColors {
    section.#{$key} {
      @include layout.set-color("", $val);
    }
  }
</style>

<section
  class={color}
  id={tag}
>
  <Title>
    {title}
  </Title>

  {@render children()}
</section>
