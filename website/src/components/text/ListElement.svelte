<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  li {
    hyphens: auto;
  }
</style>

<li lang="de">
  {@render children()}
</li>