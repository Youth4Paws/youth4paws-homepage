<script>
  let { isOpen = $bindable(false) } = $props();
  
  const email = "kenan.hacisalihoglu.stud@gmail.com";
  const phone = "+49 176 46294142";
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfkZnRMkfYqmAogcmZO-QIvRO4pYBJaL3cyih6Q_iDFknKy0g/viewform?usp=dialog";
  
  let copiedEmail = $state(false);
  let copiedPhone = $state(false);
  
  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        copiedEmail = true;
        setTimeout(() => copiedEmail = false, 2000);
      } else {
        copiedPhone = true;
        setTimeout(() => copiedPhone = false, 2000);
      }
    });
  }
  
  function closeModal(e) {
    if (e.target === e.currentTarget) {
      isOpen = false;
    }
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

{#if isOpen}
  <div 
    class="modal-backdrop" 
    onclick={closeModal}
    onkeydown={handleKeydown}
    role="presentation"
  >
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button 
        class="close-button" 
        onclick={() => isOpen = false}
        aria-label="Modal schließen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <h2 id="modal-title">Unterstützung anfragen</h2>
      <p class="subtitle">Wähle, wie du uns kontaktieren möchtest</p>
      
      <div class="contact-options">
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>E-Mail</h3>
          <p class="contact-value">{email}</p>
          <button class="copy-button" onclick={() => copyToClipboard(email, 'email')}>
            {copiedEmail ? '✓ Kopiert!' : 'In Zwischenablage kopieren'}
          </button>
        </div>
        
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3>Telefon</h3>
          <p class="contact-value">{phone}</p>
          <button class="copy-button" onclick={() => copyToClipboard(phone, 'phone')}>
            {copiedPhone ? '✓ Kopiert!' : 'In Zwischenablage kopieren'}
          </button>
        </div>
        
        <div class="contact-card">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </div>
          <h3>Kontaktformular</h3>
          <p class="contact-value">Fülle unser Online-Formular aus</p>
          <a href={formUrl} target="_blank" rel="noopener noreferrer" class="form-button">
            Zum Formular →
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .modal-content {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .close-button:hover {
    background: #F5F5F5;
    color: #333;
  }
  
  h2 {
    font-size: 2rem;
    color: #283D3C;
    margin: 0 0 0.5rem 0;
  }
  
  .subtitle {
    color: #666;
    margin: 0 0 2rem 0;
    font-size: 1rem;
  }
  
  .contact-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .contact-card {
    background: linear-gradient(to bottom, #F8F9FA 0%, #F0F2F4 100%);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(95, 143, 140, 0.15);
    border-color: #5F8F8C;
  }
  
  .icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #5F8F8C 0%, #4A7A77 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }
  
  .contact-card h3 {
    font-size: 1.3rem;
    color: #283D3C;
    margin: 0 0 0.75rem 0;
  }
  
  .contact-value {
    font-size: 1rem;
    color: #666;
    margin: 0 0 1.5rem 0;
    word-break: break-all;
  }
  
  .copy-button,
  .form-button {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: #5F8F8C;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }
  
  .copy-button:hover,
  .form-button:hover {
    background: #4A7A77;
    transform: scale(1.02);
  }
  
  .copy-button:active,
  .form-button:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    .modal-content {
      padding: 2rem 1.5rem;
    }
    
    .contact-options {
      grid-template-columns: 1fr;
    }
    
    h2 {
      font-size: 1.5rem;
    }
  }
</style>