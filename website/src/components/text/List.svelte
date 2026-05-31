<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    ordered?: boolean;
    children: Snippet;
  }

	let {
    ordered = false,
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";

  ol, ul {
    width: 100%;
    max-width: 50em;

    padding-left: 2rem;

    font-weight: dimensions.$fontWeight;
    font-size: dimensions.$fontSize;

    text-align: start;
  
    margin: 0;
  }

  ul {
    list-style: none;
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