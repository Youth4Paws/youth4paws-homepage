<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href?: string;
    callback?: () => void;
    children: Snippet;
  }

  let {
    href = "",
    callback = () => {},
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "sass:math";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/dimensions.scss";

  button, a {
    all: unset;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;

    height: dimensions.$buttonHeight;
    padding: dimensions.$gapTiny dimensions.$gapSmall;

    background-color: hsla(0,100%,100%,.1);
    border-radius: math.div(dimensions.$buttonHeight, 2);

    box-shadow: 0em .05em .3em hsla(0,0%,0%,.5);

    transition: transform ease-out animations.$animationSpeedFast;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  button:hover, a:hover {
    transform: scale(110%);
  }
</style>

{#if href !== undefined && href.length > 0}
  <a href={href} onclick={callback}>
    {@render children()}
  </a>
{:else}
  <button onclick={callback}>
    {@render children()}
  </button>
{/if}
