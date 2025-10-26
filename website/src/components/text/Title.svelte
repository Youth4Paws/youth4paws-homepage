<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/dimensions.scss";
  @use "../../styles/media.scss";

  h1 {
    font-family: "Crete Round", serif;
    font-family: "Fugaz One", sans-serif;
    font-family: "Titan One", sans-serif;
    font-style: normal;
    margin: 0;
    max-width: 100%;
    hyphens: auto;
    //word-break: break-all;

    font-weight: dimensions.$fontWeightTitle;
    font-size: dimensions.$fontSizeTitle;

    @include media.phone {
      font-weight: dimensions.$fontWeightSubtitle;
      font-size: dimensions.$fontSizeSubtitle;
    }
  }
</style>

<h1 lang="de">
  {@render children()}
</h1>