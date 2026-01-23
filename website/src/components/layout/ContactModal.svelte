<script>
  let { isOpen = $bindable(false) } = $props();

  const email = "info@youth4paws.de";
  const phone = "+49 123 456789";
  const formUrl = "https://forms.google.com/YOUR_FORM_ID_HERE";

  let copiedEmail = $state(false);
  let copiedPhone = $state(false);

  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        copiedEmail = true;
        setTimeout(() => (copiedEmail = false), 2000);
      } else {
        copiedPhone = true;
        setTimeout(() => (copiedPhone = false), 2000);
      }
    });
  }

  function close() {
    isOpen = false;
  }

  function closeOnBackdrop(e) {
    if (e.target === e.currentTarget) close();
  }

  function onBackdropKeydown(e) {
    if (e.key === "Enter" || e.key === " ") close();
  }

  function onGlobalKeydown(e) {
    if (!isOpen) return;
    if (e.key === "Escape") close();
  }
</script>

<!-- ✅ MUSS auf Top-Level stehen -->
<svelte:window onkeydown={onGlobalKeydown} />

{#if isOpen}
  <div
    class="modal-backdrop"
    role="presentation"
    tabindex="0"
    aria-label="Dialog schließen"
    onclick={closeOnBackdrop}
    onkeydown={onBackdropKeydown}
  >
    <div
      class="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        class="close-button"
        onclick={close}
        aria-label="Dialog schließen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <h2 id="contact-modal-title">Unterstützung anfragen</h2>
      <p class="subtitle">Wähle, wie du uns kontaktieren möchtest</p>

      <div class="contact-options">
        <!-- EMAIL -->
        <div class="contact-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
                c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h3>E-Mail</h3>
          <p class="contact-value">{email}</p>
          <button
            type="button"
            class="copy-button"
            onclick={() => copyToClipboard(email, "email")}
          >
            {copiedEmail ? "✓ Kopiert!" : "In Zwischenablage kopieren"}
          </button>
        </div>

        <!-- PHONE -->
        <div class="contact-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                19.79 19.79 0 0 1-8.63-3.07
                19.5 19.5 0 0 1-6-6
                19.79 19.79 0 0 1-3.07-8.67
                A2 2 0 0 1 4.11 2h3
                a2 2 0 0 1 2 1.72
                12.84 12.84 0 0 0 .7 2.81
                a2 2 0 0 1-.45 2.11
                L8.09 9.91a16 16 0 0 0 6 6
                l1.27-1.27a2 2 0 0 1 2.11-.45
                12.84 12.84 0 0 0 2.81.7
                A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h3>Telefon</h3>
          <p class="contact-value">{phone}</p>
          <button
            type="button"
            class="copy-button"
            onclick={() => copyToClipboard(phone, "phone")}
          >
            {copiedPhone ? "✓ Kopiert!" : "In Zwischenablage kopieren"}
          </button>
        </div>

        <!-- FORM -->
        <div class="contact-card">
          <div class="icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16
                a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3>Kontaktformular</h3>
          <p class="contact-value">Fülle unser Online-Formular aus</p>
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="form-button"
          >
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
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
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
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
  }

  .contact-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .contact-card {
    background: linear-gradient(to bottom, #f8f9fa, #f0f2f4);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
  }

  .icon {
    width: 60px;
    height: 60px;
    background: #5f8f8c;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
  }

  .copy-button,
  .form-button {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: #5f8f8c;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    border: none;
    text-decoration: none;
    cursor: pointer;
  }
</style>
