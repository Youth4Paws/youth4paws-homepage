<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";

  b {
    font-weight: dimensions.$fontWeightBold;
  }
</style>

<b>
  {@render children()}
</b>