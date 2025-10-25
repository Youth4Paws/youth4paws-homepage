<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  b {
    font-weight: dimensions.$fontWeightBold;
  }
</style>

<b>
  {@render children()}
</b>