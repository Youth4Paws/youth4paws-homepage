<script>
  import { page } from '$app/stores';
  
  let mobileMenuOpen = false;
  
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="logo">
      <img src="/img/logo.svg" alt="Youth4Paws Logo" />
      <span>Youth4Paws</span>
    </a>
    
    <button class="mobile-toggle" onclick={toggleMenu} aria-label="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <div class="nav-links" class:open={mobileMenuOpen}>
      <a href="/" class:active={$page.url.pathname === '/'}>Home</a>
      <a href="/impressum" class:active={$page.url.pathname === '/impressum'}>Impressum</a>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background: #364850;
    box-shadow: none; /* <- verhindert "Doppellinie" auf iOS */
    border-bottom: none;
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: none;
  }

  
  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  @media (min-width: 769px) {
    .nav-container {
      padding: 1rem 2rem;
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
  
  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  
  .nav-links a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .nav-links a:not(.cta-button):hover {
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    transform: translateY(-1px);
  }
  
  .nav-links a:not(.cta-button):hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 2px;
    background: #FFFFFF;
    border-radius: 2px;
  }
  
  .nav-links a.active:not(.cta-button) {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.2);
  }
  
  .nav-links a.active:not(.cta-button)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 3px;
    background: #FFFFFF;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  
  .mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .mobile-toggle span {
    width: 25px;
    height: 3px;
    background: #FFFFFF;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .mobile-toggle {
      display: flex;
    }
    
    .nav-links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;

      background: #364850; /* <- gleiche Farbe wie Navbar */
      flex-direction: column;
      gap: 0;
      padding: 0.75rem 0;

      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;

      box-shadow: none; /* <- verhindert zweite "Kante" */
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .nav-links.open {
      max-height: 400px;
    }
    
    .nav-links a {
      width: 100%;
      padding: 1rem 2rem;
      border-radius: 0;
      text-align: left;
    }
  }
</style>