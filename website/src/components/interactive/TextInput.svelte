<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    long?: boolean;
  }

  let {
    name,
    label,
    placeholder = "",
    type = "text",
    long = false,
  }: Props = $props();

  let rand = $state(Math.floor(Math.random() * 1000000));
  let anchorName = $derived(`--anchor-${name}-${rand}`)

  let longField: HTMLTextAreaElement | undefined = $state();

  onMount(() => setTimeout(resizeLongField, 10));

  function resizeLongField() {
    if (!longField) return;
    const heightBefore = longField.getBoundingClientRect().height
    longField.style.height = `${Math.max(longField.scrollHeight, 150)}px`
    longField.style.minHeight = `${Math.max(longField.scrollHeight, 150)}px`
    const heightAfter = longField.getBoundingClientRect().height
    if (heightAfter < heightBefore) resizeLongField();
  }
</script>

<style lang="scss">
  @use "sass:map";
  @use "sass:math";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  label, textarea, input {
    --outlineColor: #{map.get(colors.$mainColors, "secondary", "background")};
  }

  label {
    background-color: var(--backgroundColor);
    color: var(--outlineColor);
    position: absolute;
    position-area: top;
    position-visibility: always;
    padding: 0 dimensions.$gapTiny;
    font-size: dimensions.$fontSizeSmall;
    text-wrap: nowrap;
    max-width: calc(anchor-size(width) - 2 * dimensions.$borderWidth - dimensions.$gapSmall);
    inset-inline-start: calc(anchor(start) + dimensions.$borderWidth + 0.5 * dimensions.$gapSmall);
    transform: translateY(50%);
    overflow: hidden;
  }

  input, textarea {
    all: unset;
    width: 100%;
    text-align: start;
    border: solid dimensions.$borderWidth var(--outlineColor);
    border-radius: dimensions.$borderRadius;
    padding: dimensions.$gapSmall calc(0.5 * dimensions.$gapSmall + dimensions.$borderWidth);

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;
  }

  textarea {
    overflow-y: hidden;
  }
</style>

<label
  for={name}
  style={`position-anchor: ${anchorName};`}
>
  {label}
</label>
{#if long}
  <textarea
    bind:this={longField}
    name={name}
    oninput={resizeLongField}
    style={`anchor-name: ${anchorName};`}
    required
  ></textarea>
{:else}
  <input
    name={name}
    placeholder={placeholder}
    style={`anchor-name: ${anchorName};`}
    type={type}
    required
  />
{/if}