<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href?: string;
    onclick?: () => void;
    submit?: boolean;
    children: Snippet;
  }

  let {
    href = "",
    onclick = () => {},
    submit = false,
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
    padding: dimensions.$gapSmall;

    color: var(--accentColor);
    z-index: 0;
    background-size: calc(200% + 2 * dimensions.$borderWidth) 100%;
    background-image: linear-gradient(to right, transparent 50%, var(--accentColor) 50%);
    border: solid dimensions.$borderWidth var(--accentColor);
    border-radius: dimensions.$borderRadius;

    transition: background-position ease-out animations.$animationSpeed, color ease-in animations.$animationSpeedFast;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    user-select: none;
  }

  button:hover, a:hover {
    background-position: calc(-100% - 2 * dimensions.$borderWidth) 0;
    color: var(--backgroundColor);
  }
</style>

{#if href !== undefined && href.length > 0}
  <a href={href} onclick={onclick}>
    {@render children()}
  </a>
{:else}
  <button onclick={onclick} type={submit ? "submit" : "button"}>
    {@render children()}
  </button>
{/if}