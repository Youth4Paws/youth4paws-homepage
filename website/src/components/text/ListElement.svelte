<script lang="ts">
    import { PawPrint } from "lucide-svelte";

	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  li {
    hyphens: auto;
    position: relative;
  }

  span {
    position: absolute;
    left: -.7em;
    transform: translateX(-50%);
    text-align: center;
    display: grid;
    align-items: center;
    height: dimensions.$fontSize * dimensions.$fontLineHeight;
  } 
</style>

<li lang="de">
  <span class="bullet">
    <PawPrint size={15} strokeWidth={2.5}/>
  </span>
  {@render children()}
</li>