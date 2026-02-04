<script>
  let { title, imgSrc, imgAlt, children, buttons } = $props();
</script>

<section class="splash">
  <div class="content-wrapper">
    <div class="text-content">
      <h1>{title}</h1>
      {@render children()}
      {#if buttons}
        <div class="button-group">
          {@render buttons()}
        </div>
      {/if}
    </div>
    
    <div class="image-content">
      {#if imgSrc}
        <div class="image-wrapper">
          <img src={imgSrc} alt={imgAlt} />
          <div class="image-overlay">
            <p></p>
          </div>
        </div>
      {:else}
        <div class="placeholder">
          <div class="placeholder-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <p>Teamfoto folgt bald!</p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .splash {
    background: #FFFFFF;
    padding: 4rem 2rem;
    min-height: 600px;
    display: flex;
    align-items: center;
  }
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .text-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: #283D3C;
    line-height: 1.2;
  }
  
  .text-content :global(p) {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #4A5568;
    margin-bottom: 2rem;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .image-content {
    position: relative;
  }
  
  .image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }
  
  .image-wrapper:hover {
    transform: translateY(-5px);
  }
  
  .image-wrapper img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(40, 61, 60, 0.9), transparent);
    padding: 2rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .image-wrapper:hover .image-overlay {
    opacity: 1;
  }
  
  .image-overlay p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: white !important;
  }
  
  .placeholder {
    background: linear-gradient(135deg, #86A795 0%, #9BB8A8 100%);
    border-radius: 20px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 20px 60px rgba(134, 167, 149, 0.3);
  }
  
  .placeholder-icon {
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  .placeholder p {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: white !important;
  }
  
  @media (max-width: 968px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .text-content h1 {
      font-size: 2.5rem;
    }
    
    .image-wrapper img,
    .placeholder {
      height: 400px;
    }
  }
  
  @media (max-width: 640px) {
    .splash {
      padding: 3rem 1.5rem;
    }
    
    .text-content h1 {
      font-size: 2rem;
    }
    
    .text-content :global(p) {
      font-size: 1rem;
    }
    
    .image-wrapper img,
    .placeholder {
      height: 300px;
    }
  }
</style>