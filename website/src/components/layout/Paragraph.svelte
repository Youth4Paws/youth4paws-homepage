<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  p {
    width: 100%;
    max-width: 50em;
    margin: 0;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;

    text-align: justify;
  }
</style>

<p>
  {@render children()}
</p>