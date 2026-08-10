<script lang="ts" generics="T">
  import { ArrowRight } from '@lucide/svelte';
  import { ArrowLeft } from 'lucide-svelte';
  import { onMount, type Snippet } from 'svelte';
  import Button from '../interactive/Button.svelte';
  import { page } from "$app/state";
  import { goto } from "$app/navigation";

  const perPage = 10;

  interface Props {
    items: T[];
    template: Snippet<[T]>;
    id: (item: T) => string;
  }

  let {
    items,
    template,
    id,
  }: Props = $props();

  // Pagination variables
  let pageCount = $derived(Math.ceil(items.length / perPage));

  let previousPageNumber = $state(0);
  let pageNumber = $state(0);

  function clampPageNumber(num: number) {
    return Math.min(Math.max(num, 0), pageCount-1);
  }

  // Read the "page" parameter from the url
  onMount(() => {
    pageNumber = clampPageNumber((Number.parseInt(page.url.searchParams.get("page") || "1")-1));
  })

  // Set "page" parameter in the url to reflect the current pagination state
  $effect(() => {
    pageCount;
    pageNumber = clampPageNumber(pageNumber);
    if (pageNumber == previousPageNumber) return;
    previousPageNumber = pageNumber;

    const searchParams = new URLSearchParams(page.url.searchParams);
    searchParams.set("page", (pageNumber + 1).toString());
    goto(`?${searchParams.toString()}`, { 
      replaceState: true, 
      keepFocus: true, 
      noScroll: true 
    });
  })
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/colors.scss";

  div.wrapper {
    display: flex;
    flex-direction: column;
    gap: dimensions.$gapTiny;
    width: 100%;
  }
  
  div.entry {
    padding: dimensions.$gapSmall;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: dimensions.$gapSmall;

    &:first-child {
      border-top-left-radius: dimensions.$borderRadius;
      border-top-right-radius: dimensions.$borderRadius;
    }

    &:last-child {
      border-bottom-left-radius: dimensions.$borderRadius;
      border-bottom-right-radius: dimensions.$borderRadius;
    }

    //background-color: map.get(colors.$mainColors, "primary-variant", "background");
    //color: map.get(colors.$mainColors, "primary-variant", "foreground");
    border: solid dimensions.$borderWidth var(--color);

    //&:nth-child(even) {
    //  background-color: map.get(colors.$mainColors, "primary-variant2", "background");
    //  color: map.get(colors.$mainColors, "primary-variant2", "foreground");
    //}
  }

  div.pageButtons {
    display: flex;
    flex-direction: row;
    gap: dimensions.$gapTiny;

    span {
      padding: dimensions.$gapTiny dimensions.$gapSmaller;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 8em;
    }
  }
</style>

{@render pageButtons()}
<div class="wrapper">
  {#each items.slice(perPage * pageNumber, perPage * (pageNumber + 1)) as item (id(item))}
    <div class="entry">
      {@render template(item)}
    </div>
  {:else}
  Es wurden keine Einträge gefunden
  {/each}
</div>
{@render pageButtons()}

{#snippet pageButtons()}
  <div class="pageButtons">
    <Button small disabled={pageNumber <= 0} onclick={() => pageNumber--}>
      <ArrowLeft/>
    </Button>
    <span class="pageCount">Seite {pageNumber+1} von {pageCount}</span>
    <Button small disabled={pageNumber >= pageCount-1} onclick={() => pageNumber++}>
      <ArrowRight/>
    </Button>
  </div>
{/snippet}