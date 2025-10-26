<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";
  @use "../../styles/media.scss";

  h2 {
    font-family: "Crete Round", serif;
    font-family: "Fugaz One", sans-serif;
    font-family: "Titan One", sans-serif;
    font-style: normal;
    margin: 0;
    max-width: 100%;
    hyphens: auto;
    //word-break: break-all;

    font-weight: dimensions.$fontWeightSubtitle;
    font-size: dimensions.$fontSizeSubtitle;

    @include media.phone {
      font-weight: dimensions.$fontWeightSubsubtitle;
      font-size: dimensions.$fontSizeSubsubtitle;
    }
  }
</style>

<h2 lang="de">
  {@render children()}
</h2>