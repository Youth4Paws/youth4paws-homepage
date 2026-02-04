<script lang="ts">
	let { children } = $props();

  let inView = $state(false);

  let height = $state(0);
</script>

<style lang="scss">
  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";

  div {
    background: radial-gradient(ellipse at bottom, hsla(0,100%,100%,.1) 0%, hsla(0,100%,100%,.3) 100%);
    box-shadow: 0em .05em 1em color-mix(in srgb, currentColor 20%, transparent);

    padding: dimensions.$gap;
    border-radius: dimensions.$borderRadius;

    transition: transform animations.$cubic animations.$animationSpeed;

    display: flex;
    flex-direction: column;

    gap: dimensions.$gapSmall;
    justify-content: start;
  }

  @include media.desktop-and-large {
    div:hover {
      transform:
        perspective(75em)
        rotateX(4deg);
    }
  }

  .inView {
    transform:
      perspective(75em)
      rotateX(4deg);
  }
</style>

<div class:inView bind:clientHeight={height}>
  {@render children()}
</div>