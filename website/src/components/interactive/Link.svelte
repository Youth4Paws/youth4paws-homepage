<script lang="ts">
  import type { Snippet } from "svelte";
  import { page } from "$app/state";

  interface Props {
    href: string;
    children: Snippet;
  }

  let {
    href,
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/dimensions.scss";

  a {
    position: relative;
    color: currentColor;
    text-decoration: inherit;
    cursor: pointer;
    width: max-content;
  }

  span {
    position: static;
    white-space: nowrap;
    width: 100%;
  }

  span::after {
      content: "";
      display: block;
      position: absolute;
      transform: scaleX(0%);
      width: 100%;
      left: 0;
      bottom: dimensions.$borderWidth * -1;
      height: dimensions.$borderWidth;
      transition: transform animations.$animationSpeedFast ease-out;
      background-color: currentColor;
      border-radius: dimensions.$borderWidth * 0.5;
  }

  a:hover > span::after, span.active::after {
      transform: scaleX(100%);
  }

  span::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: dimensions.$borderWidth;
      background-color: currentColor;
      opacity: .1;
      bottom: dimensions.$borderWidth * -1;
      border-radius: dimensions.$borderWidth * 0.5;
      left: 0;
  }
</style>

<a href={href}>
  <span class:active={page.url.pathname === href}>
    {@render children()}
  </span>
</a>