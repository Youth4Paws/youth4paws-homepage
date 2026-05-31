<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    name: string;
    children: Snippet;
  }

  let {
    name,
    children,
  }: Props = $props();

  let checked = $state(false);
</script>

<style lang="scss">
  @use "sass:math";
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  div {
    display: inline-flex;
    gap: dimensions.$gapSmaller;
    align-items: center;
    width: 100%;
    justify-content: end;
  }

  label {
    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;
  }

  input {
    --outlineColor: #{map.get(colors.$mainColors, "secondary", "background")};

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;

    appearance: none;
    margin: 0;
    width: dimensions.$checkboxHeight;
    height: dimensions.$checkboxHeight;
    border: solid dimensions.$borderWidth var(--outlineColor);
    border-radius: dimensions.$borderRadius;
    flex-shrink: 0;
    
    position: relative;

    cursor: pointer;

    &::before {
      font-weight: dimensions.$fontWeight;
      font-size: dimensions.$fontSize;
      line-height: dimensions.$fontLineHeight;
      content: "✔";
      position: absolute;
      width: 100%;
      height: 100%;
      color: var(--backgroundColor);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--outlineColor);
      transform: scale(0) translate(-2px, -2px);
      transition: transform ease-out animations.$animationSpeedFast;
      border: solid 2px var(--outlineColor);
      border-radius: inherit; 
    }

    &:checked::before {
      transform: scale(100%) translate(-2px, -2px);
    }
  }
</style>

<div>
  <label
    for={name}
  >
    {@render children()}
  </label>

  <input
    name={name}
    type="checkbox"
    bind:checked
    required
  />
</div>