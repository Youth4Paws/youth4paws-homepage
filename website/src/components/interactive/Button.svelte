<script>
  let { href = null, children, variant = "primary", onclick } = $props();
  
  function handleClick(e) {
    if (onclick) {
      e.preventDefault();
      onclick();
    }
  }
</script>

{#if href}
  <a 
    {href} 
    class="button {variant}"
    on:click={handleClick}
  >
    {@render children()}
    <span class="button-shine"></span>
  </a>
{:else}
  <button 
    class="button {variant}"
    on:click={handleClick}
  >
    {@render children()}
    <span class="button-shine"></span>
  </button>
{/if}

<style>
  .button {
    display: inline-block;
    padding: 0.9rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    text-align: center;
    background: none;
    font-family: inherit;
  }
  
  .button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  .button:hover::before {
    left: 100%;
  }
  
  .button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .button:active {
    transform: translateY(-1px);
  }
  
  .button.primary {
    background: linear-gradient(135deg, #5F8F8C 0%, #4A7A77 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(95, 143, 140, 0.3);
  }
  
  .button.primary:hover {
    background: linear-gradient(135deg, #6FA09D 0%, #5F8F8C 100%);
    box-shadow: 0 8px 25px rgba(95, 143, 140, 0.4);
  }
  
  .button.secondary {
    background: white;
    color: #5F8F8C;
    border: 2px solid #5F8F8C;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .button.secondary:hover {
    background: #5F8F8C;
    color: white;
    border-color: #5F8F8C;
  }
  
  .button-shine {
    position: absolute;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    pointer-events: none;
  }
</style>