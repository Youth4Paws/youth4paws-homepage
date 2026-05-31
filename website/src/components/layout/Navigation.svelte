<script lang="ts">
  import { Menu } from "lucide-svelte";
  import Link from "../interactive/Link.svelte";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
    import StylizedTextLogo from "../decoration/StylizedTextLogo.svelte";

  let scrollY = $state(0);
  let clientHeight = $state(1000);
  let linksHeight = $state(0);
  let burgerOpen = $state(false);
  let navElement = $state<HTMLElement>();
  let transition = $state(false);

  function burgerClick() {
    transition = true;
    if (burgerOpen) closeNav();
    else openNav();
  }

  beforeNavigate(() => {
    transition = false;
    closeNav();
  })

  function onScroll(event:Event) {
    if (!burgerOpen || transition) return;
    transition = true;
    closeNav();
  }
  function onResize() {
    transition = false;
    closeNav();
  }

  function onClick(event: MouseEvent) {
    if (!burgerOpen) return;
    //@ts-ignore
    let e: (HTMLElement | null) = event.target;
    while (e != null && e != document.body) {
      console.log(e, navElement, e == navElement);
      if (e == navElement) return;
      e = e.parentElement;
    }
    closeNav();
    transition = true;
  }

  function closeNav() {
    burgerOpen = false;
  }
  function openNav() {
    burgerOpen = true;
  }

  function transitionEnd() {
    transition = false;
  }
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";

  nav {
    all: unset;
    box-sizing: content-box !important;
    color: map.get(colors.$mainColors, "tertiary", "foreground");
    background: linear-gradient(
      180deg,
      map.get(colors.$mainColors, "tertiary", "background") 0,
      color-mix(in srgb, map.get(colors.$mainColors, "tertiary", "background") var(--gradientPercentage), transparent) 100%
    );
    backdrop-filter: blur(dimensions.$blur);

    position: sticky;
    top: 0;
    z-index: 100;

    @include layout.section-dimensioning-larger;
    padding-bottom: dimensions.$gapSmall;
    padding-top: dimensions.$gapSmall;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    @include media.phone {
      $height: calc(1.5em + 2 * dimensions.$gapSmall);

      max-height: $height;

      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: $height auto;
      grid-template-areas: "logo burger" "links links";

      &.open {
        max-height: calc($height + var(--linksHeight));
      }

      &.transition {
        transition: max-height ease-out animations.$animationSpeed;
      }
    }
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: dimensions.$gap;
    grid-area: links;
    position: relative;

    @include media.phone {
      padding-top: dimensions.$gapSmall;
      padding-bottom: dimensions.$gapSmaller;
      flex-direction: column;
      gap: dimensions.$gapSmall;
    }
  }

  .burger {
    all: unset;
    cursor: pointer;
    display: none;
    justify-self: flex-end;
    grid-area: burger;
    width: 100%;
    height: 100%;
    left: 0;

    @include media.phone {
      display: block;
    }
  }

  .logo {
    all: unset;
    display: flex;
    align-items: center;
    gap: dimensions.$gapSmaller;
    font-size: dimensions.$fontSizeLarge;
    transition: transform animations.$animationSpeed ease-out;
    grid-area: logo;
    cursor: pointer;
  }
  
  .logo:hover {
    transform: translateY(-.1em);
  }
  
  .logo img {
    height: 1.5em;
    width: 1.5em;
    border-radius: dimensions.$borderRadiusSmall;
    transition: transform animations.$animationSpeed ease-out;
  }
  
  .logo:hover img {
    transform: rotate(5deg) scale(1.05);
  }
</style>

<nav
  class:open={burgerOpen}
  class:transition
  style="--gradientPercentage: {100 - 20 * Math.min(Math.max(scrollY, 0) / (clientHeight * 2), 1)}%; --linksHeight: {linksHeight}px"
  bind:clientHeight
  bind:this={navElement}
  ontransitionend={transitionEnd}
>
  <a href="/" class="logo">
    <img src="/img/logo.svg" alt="Youth4Paws Logo" />
    <StylizedTextLogo/>
  </a>

  <div class="links" bind:clientHeight={linksHeight}>
    <Link href="/">
      Home
    </Link>
    <Link href="/impressum">
      Impressum
    </Link>
    <Link href="/privacy">
      Datenschutz
    </Link>
  </div>

  <button class="burger" onclick={burgerClick}>
    <Menu/>
  </button>
</nav>

<svelte:window bind:scrollY onscroll={onScroll} onclick={onClick} onresize={onResize}/>