<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    ordered?: boolean;
    children: Snippet;
  }

	let {
    ordered = false,
    children
  } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  ol, ul {
    width: 100%;
    max-width: 50em;
    margin: 0;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;

    text-align: start;
  }
</style>

{#if ordered}
  <ol>
    {@render children()}
  </ol>
{:else}
  <ul>
    {@render children()}
  </ul>
{/if}