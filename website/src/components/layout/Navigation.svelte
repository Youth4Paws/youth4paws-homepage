<script lang="ts">
  import { Menu } from "lucide-svelte";
  import Link from "../interactive/Link.svelte";
	import { afterNavigate } from "$app/navigation";

  let scrollY = $state(0);
  let clientHeight = $state(0);
  let linksHeight = $state(0);
  let burgerOpen = $state(false);
  let navElement = $state<HTMLElement>();
  let transition = $state(false);

  function burgerClick() {
    transition = true;
    if (burgerOpen) closeNav();
    else openNav();
  }

  afterNavigate(() => {
    closeNav();
  })

  function onScroll() {
    closeNav();
    transition = true;
  }
  function onResize() {
    closeNav();
    transition = false;
  }

  function onClick(event: MouseEvent) {
    if (!burgerOpen) return;
    //@ts-ignore
    let e: (HTMLElement | null) = event.target;
    while (e != null && e != document.body) {
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

  .navbar {
    all: unset;
    color: map.get(colors.$mainColors, "tertiary", "foreground");
    background: linear-gradient(
      180deg,
      map.get(colors.$mainColors, "tertiary", "background") 0,
      color-mix(in srgb, map.get(colors.$mainColors, "tertiary", "background") var(--gradientPercentage), transparent) 100%
    );
    backdrop-filter: blur(1em);

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

    @include media.phone {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: 1fr;
      grid-template-areas: "logo burger" "links links";
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

      margin-top: calc(-1 * var(--linksHeight));
      transform: translateY(var(--linksHeight));
      -webkit-backface-visibility: hidden;
    }
  }
  .links.transition {
    @include media.phone {
      transition: margin-top animations.$animationSpeed ease-out, transform animations.$animationSpeed ease-out;
    }
  }
  .open {
    margin-top: 0;
    transform: translateY(0px);
  }

  // todo: why does translateY in .links cause .burger to shift???
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
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.3s ease;
    grid-area: logo;
  }
  
  .logo:hover {
    transform: translateY(-2px);
    color: #FFFFFF;
  }
  
  .logo img {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  .logo:hover img {
    transform: rotate(5deg) scale(1.05);
  }
</style>

<nav class="navbar" style="--gradientPercentage: {100 - 20 * Math.min(Math.max(scrollY, 0) / (clientHeight * 2), 1)}%;" bind:clientHeight bind:this={navElement}>
  <a href="/" class="logo">
    <img src="/img/logo.svg" alt="Youth4Paws Logo" />
    <span>Youth4Paws</span>
  </a>

  <div class="links"
    class:open={burgerOpen}
    class:transition
    style="--linksHeight: {linksHeight}px"
    ontransitionend={transitionEnd}
    bind:clientHeight={linksHeight}
  >
    <Link href="/">
      Home
    </Link>
    <Link href="/impressum">
      Impressum
    </Link>
  </div>

  <button class="burger" onclick={burgerClick}>
    <Menu/>
  </button>
</nav>

<svelte:window bind:scrollY onscroll={onScroll} onclick={onClick} onresize={onResize}/>