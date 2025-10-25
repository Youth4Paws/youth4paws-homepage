<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";

  h1 {
    font-family: "Crete Round", serif;
    font-family: "Fugaz One", sans-serif;
    font-family: "Titan One", sans-serif;
    font-weight: dimensions.$fontWeightTitle;
    font-size: dimensions.$fontSizeTitle;
    font-style: normal;
    margin: 0;
  }
</style>

<h1>
  {@render children()}
</h1>