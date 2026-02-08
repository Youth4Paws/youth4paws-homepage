<script>
  import Link from "../interactive/Link.svelte";
</script>

<nav class="navbar">
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

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";

  .navbar {
    all: unset;
    background-color: color-mix(in srgb, map.get(colors.$mainColors, "tertiary", "background") 90%, transparent);
    color: map.get(colors.$mainColors, "tertiary", "foreground");
    backdrop-filter: blur(1em);

    position: sticky;
    top: 0;
    z-index: 100;

    @include layout.section-dimensioning-larger;
    padding-top: dimensions.$gapSmall;
    padding-bottom: dimensions.$gapSmall;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: dimensions.$gap;
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