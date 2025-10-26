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

  @use "../../styles/colors.scss";
  @use "../../styles/dimensions.scss";
  
  section {
    display: flex;  
    flex-direction: column;
    gap: dimensions.$gapSmall;
    align-items: center;
    padding: dimensions.$gapLarge max(dimensions.$gap, calc((100% - 50em) / 2));
    text-align: center;
  }

  @each $key, $val in colors.$mainColors {
    section.#{$key} {
      background-color: map.get($val, "background");
      color: map.get($val, "foreground");
    }
  }
</style>

<section
  class:primary={color === "primary"} 
  class:secondary={color === "secondary"} 
  class:tertiary={color === "tertiary"} 
  class:inherit={color === "inherit"} 
  id={tag}
>
  <Title>
    {title}
  </Title>

  {@render children()}
</section>