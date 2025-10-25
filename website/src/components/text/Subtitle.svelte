<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  h2 {
    font-family: "Crete Round", serif;
    font-family: "Fugaz One", sans-serif;
    font-family: "Titan One", sans-serif;
    font-weight: dimensions.$fontWeightSubtitle;
    font-size: dimensions.$fontSizeSubtitle;
    font-style: normal;
    margin: 0;
  }
</style>

<h2>
  {@render children()}
</h2>