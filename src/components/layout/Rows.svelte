<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';

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

    background-color: map.get(colors.$mainColors, "secondary", "background");
    color: map.get(colors.$mainColors, "secondary", "foreground");

    //&:nth-child(even) {
    //  background-color: map.get(colors.$mainColors, "primary-variant2", "background");
    //  color: map.get(colors.$mainColors, "primary-variant2", "foreground");
    //}
  }
</style>

<div class="wrapper">
  {#each items as item (id(item))}
    <div class="entry">
      {@render template(item)}
    </div>
  {:else}
  Es wurden keine Einträge gefunden
  {/each}
</div>