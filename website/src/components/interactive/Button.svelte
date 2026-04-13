<script lang="ts">
  import type { Snippet } from "svelte";
    import Loading from "../decoration/Loading.svelte";

  interface Props {
    href?: string;
    onclick?: () => void;
    submit?: boolean;
    disabled?: boolean;
    loading?: boolean;
    children: Snippet;
  }

  let {
    href = "",
    onclick = () => {},
    submit = false,
    disabled = false,
    loading = false,
    children
  }: Props = $props();

  function click() {
    if (!disabled && !loading) onclick();
  }
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

    position: relative;

    cursor: pointer;
    user-select: none;

    &:hover, &:focus, &.loading {
      background-position: calc(-100% - 2 * dimensions.$borderWidth) 0;
      color: var(--backgroundColor);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  div.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--accentColor);
    color: var(--backgroundColor);
  }
</style>

{#if href !== undefined && href.length > 0}
  <a href={href} onclick={click} class:disabled class:loading>
    {@render contents()}
  </a>
{:else}
  <button disabled={disabled} onclick={click} type={submit ? "submit" : "button"} class:disabled class:loading>
    {@render contents()}
  </button>
{/if}

{#snippet contents()}
  {@render children()}
  {#if loading}
    <div class="loading">
      <Loading/>
    </div>
  {/if}
{/snippet}