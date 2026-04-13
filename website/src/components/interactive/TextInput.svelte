<script lang="ts">
    import { onMount } from "svelte";

  interface Props {
    name: string;
    label: string;
    placeholder?: string;
    long?: boolean;
  }

  let {
    name,
    label,
    placeholder = "",
    long = false,
  }: Props = $props();

  let rand = $state(Math.floor(Math.random() * 1000000));
  let anchorName = $derived(`--anchor-${name}-${rand}`)

  let longField: HTMLTextAreaElement | undefined = $state();

  onMount(() => setTimeout(resizeLongField, 10));

  function resizeLongField() {
    if (!longField) return;
    longField.style.height = `${Math.max(longField.scrollHeight, 80)}px`
  }
</script>

<style lang="scss">
  @use "sass:math";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  label {
    background-color: var(--backgroundColor);
    position: absolute;
    position-area: top left;
    padding: 0 dimensions.$gapTiny;
    font-size: dimensions.$fontSizeSmall;
    text-wrap: nowrap;
    max-width: calc(anchor-size(width) - 2 * dimensions.$borderWidth - dimensions.$gapSmall);
    inset-inline-start: calc(anchor(start) + dimensions.$borderWidth + calc(0.5 * dimensions.$gapSmall));
    transform: translateY(50%);
    overflow: hidden;
  }

  input, textarea {
    all: unset;
    width: 100%;
    text-align: start;
    border: solid dimensions.$borderWidth var(--accentColor);
    border-radius: dimensions.$borderRadius;
    padding: dimensions.$gapSmall;
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
    onchange={resizeLongField}
    style={`anchor-name: ${anchorName};`}
  ></textarea>
{:else}
  <input
    name={name}
    placeholder={placeholder}
    style={`anchor-name: ${anchorName};`}
  />
{/if}