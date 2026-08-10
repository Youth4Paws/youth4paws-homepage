<script lang="ts">
  import type { Snippet } from "svelte";
    import Loading from "../decoration/Loading.svelte";

  interface Props {
    href?: string;
    onclick?: () => void;
    submit?: boolean;
    disabled?: boolean;
    loading?: boolean;
    accent?: boolean;
    small?: boolean;
    children: Snippet;
  }

  let {
    href = "",
    onclick = () => {},
    submit = false,
    disabled = false,
    loading = false,
    accent = false,
    small = false,
    children
  }: Props = $props();

  function click() {
    if (!disabled && !loading) onclick();
  }
</script>

<style lang="scss">
  @use "sass:math";
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  button, a {
    all: unset;

    --btnColor: var(--color);
    --btnOutlineColor: var(--color);
    --btnBackgroundColor: transparent; 
    --btnHoverBackgroundColor: var(--color);
    --btnHoverColor: var(--backgroundColor);

    &.accent {
      --btnColor: #{map.get(colors.$mainColors, "accent", "foreground")};
      --btnOutlineColor: #{map.get(colors.$mainColors, "accent", "background")};
      --btnBackgroundColor: #{map.get(colors.$mainColors, "accent", "background")};
      --btnHoverBackgroundColor: #{map.get(colors.$mainColors, "accentLight", "background")};
      --btnHoverColor: #{map.get(colors.$mainColors, "accentLight", "foreground")};
    }

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;

    height: dimensions.$buttonHeight;
    padding: dimensions.$gapSmall;

    color: var(--btnColor);
    z-index: 0;
    background-size: calc(200% + 2 * dimensions.$borderWidth) 100%;
    background-image: linear-gradient(to right, var(--btnBackgroundColor) 50%, var(--btnHoverBackgroundColor) 50%);
    border: solid dimensions.$borderWidth var(--btnOutlineColor);
    border-radius: dimensions.$buttonHeight;

    transition: background-position ease-out animations.$animationSpeed, color ease-in animations.$animationSpeedFast;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    position: relative;

    cursor: pointer;
    user-select: none;

    &:not(.disabled) {
      &:hover, &:focus, &.loading {
        background-position: calc(-100% - 2 * dimensions.$borderWidth) 0;
        color: var(--btnHoverColor);
      }
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 50%;
    }

    &.small {
      padding: dimensions.$gapTiny;
    }
  }

  div.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--btnHoverBackgroundColor);
    color: var(--btnHoverColor);

    border-radius: inherit;
  }
</style>

{#if href !== undefined && href.length > 0}
  <a href={href} onclick={click} class:disabled class:loading class:accent class:small>
    {@render contents()}
  </a>
{:else}
  <button disabled={disabled} onclick={click} type={submit ? "submit" : "button"} class:disabled class:loading class:accent class:small>
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