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
  //@include media.phone {
    section:nth-child(4n) {
      background-color: map.get(colors.$mainColors, "tertiary", "background");
      color: map.get(colors.$mainColors, "tertiary", "foreground");
    }
    section:nth-child(4n+2) {
      background-color: map.get(colors.$mainColors, "secondary", "background");
      color: map.get(colors.$mainColors, "secondary", "foreground");
    }
  //}
  //@include media.desktop-and-large {
  //  section:nth-child(4n+2) {
  //    background-color: map.get(colors.$mainColors, "secondary", "background");
  //    color: map.get(colors.$mainColors, "secondary", "foreground");
  //  }
  //  section:nth-child(4n+3) {
  //    background-color: map.get(colors.$mainColors, "tertiary", "background");
  //    color: map.get(colors.$mainColors, "tertiary", "foreground");
  //  }
  //}

  //@each $key, $val in colors.$mainColors {
  //  section.#{$key} {
  //    background-color: map.get($val, "background");
  //    color: map.get($val, "foreground");
  //  }
  //}

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