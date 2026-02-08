<script lang="ts">
  import { Menu } from "lucide-svelte";
  import Link from "../interactive/Link.svelte";

  let scrollY = $state(0);
  let clientHeight = $state(0);
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";

  .navbar {
    $bleedLength: 0em;

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
    padding-top: calc(dimensions.$gapSmall + $bleedLength);
    margin-bottom: -$bleedLength;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    transform: translateY(-$bleedLength);
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: dimensions.$gap;

    @include media.phone {
      display: none;
    }
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.3s ease;
  }
  
  .logo:hover {
    transform: translateY(-2px);
    color: #FFFFFF;
  }
  
  .logo img {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
  }
  
  .logo:hover img {
    transform: rotate(5deg) scale(1.05);
  }
</style>

<nav class="navbar" style="--gradientPercentage: {100 - 20 * Math.min(Math.max(scrollY, 0) / (clientHeight * 2), 1)}%;" bind:clientHeight>
  <a href="/" class="logo">
    <img src="/img/logo.svg" alt="Youth4Paws Logo" />
    <span>Youth4Paws</span>
  </a>

  <div class="links">
    <Link href="/">
      Home
    </Link>
    <Link href="/impressum">
      Impressum
    </Link>
  </div>
</nav>

<svelte:window bind:scrollY/>