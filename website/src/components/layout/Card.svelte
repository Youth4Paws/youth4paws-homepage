<script lang="ts">
	let { children } = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/dimensions.scss";

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

  div:hover {
    transform:
      perspective(75em)
      rotateX(4deg);
  }
</style>

<div>
  {@render children()}
</div>