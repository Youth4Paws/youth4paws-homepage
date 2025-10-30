<script lang="ts">
  import { PawPrint } from "lucide-svelte";

	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";

  li {
    hyphens: auto;
    position: relative;
  }

  span.bullet {
    position: absolute;
    left: -.7em;
    transform: translateX(-50%);
    text-align: center;
    display: grid;
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
  {@render children()}
</li>