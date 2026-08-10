<script lang="ts">
  import type { Snippet } from 'svelte'
  import { PawPrint } from "lucide-svelte";

	interface Props {
    children?: Snippet
    listItemIndex?: number
  }

  const { children, listItemIndex = undefined }: Props = $props()
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";

  li {
    hyphens: auto;
    position: relative;

    &:not(:first-child) {
      margin-top: dimensions.$gapSmaller;
    }
  }

  span.bullet {
    position: absolute;
    left: -.7em;
    top: -.1em;
    transform: translateX(-50%);
    text-align: center;
    display: flex;
    align-items: center;
    height: dimensions.$fontSize * dimensions.$fontLineHeight;
  } 

  span.copy {
    position: absolute;
    font-size: 0;
  }
</style>

<li lang="de">
  <span class="bullet">
    <PawPrint size={15} strokeWidth={2.5}/>
  </span>
  <span class="copy">
    •
  </span>
  {@render children?.()}
</li>