<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  p {
    width: 100%;
    margin: 0;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;

    text-align: start;
  }
</style>

<p>
  {@render children()}
</p>