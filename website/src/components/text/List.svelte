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
  @use "../../styles/constants/dimensions.scss";

  ol, ul {
    width: 100%;
    max-width: 50em;

    /* vorher margin:0; -> das ist zu eng */
    margin: 1rem 0;

    /* wichtig: Platz für die absolut positionierten Paw-Icons */
    padding-left: 1.75rem;

    font-weight: dimensions.$fontWeight;
    font-size: dimensions.$fontSize;

    text-align: start;
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