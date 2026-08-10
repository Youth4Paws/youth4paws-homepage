<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";

  div {
    width: 100%;
    margin: 0;

    display: grid;
    grid-template-rows: auto;
    gap: dimensions.$gap;

    @include media.phone {
      grid-template-columns: 1fr;
    }
    @include media.desktop {
      grid-template-columns: 1fr 1fr;
    }
    @include media.desktop-and-large {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<div>
  {@render children()}
</div>