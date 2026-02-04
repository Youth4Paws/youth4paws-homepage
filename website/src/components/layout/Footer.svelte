<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>Youth4Paws</h3>
		</div>
		<div class="footer-section">
			<h4>Quick Links</h4>
			<a href="/">Home</a>
			<a href="/impressum">Impressum</a>
		</div>
		<div class="footer-section">
			<h4>Kontakt</h4>
			<p>Email: team.youth4paws@gmail.com</p>
			<p>Tel: +49 176 46294142</p>
		</div>
	</div>
	<div class="footer-bottom">
		<p>&copy; 2026 Youth4Paws. Alle Rechte vorbehalten.</p>
	</div>
</footer>

<style lang="scss">
	:global(*) {
		font-family: "Atkinson Hyperlegible Next", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		font-optical-sizing: auto;
		font-style: normal;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		margin: 0;
		background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
		min-height: 100vh;
	}

	:global(html) {
		height: 100%;
		margin: 0;
		padding: 0;
		scroll-behavior: smooth;
	}

	:global(html.pageSwitch) {
		scroll-behavior: auto;
	}

	main {
		width: 100%;
		background: transparent;
		display: block;
		margin: 0;

		/* nur vertikal, kein links/rechts -> sonst gibt’s "Ränder" */
		padding: 1.25rem 0;
		padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
	}

	@media (min-width: 768px) {
		main {
			padding: 2rem 0;
			}
	}


	footer {
		background: #364850;
		color: white;
		margin-top: 4rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.footer-section h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: white;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.footer-section h4 {
		font-size: 1.1rem;
		margin-bottom: 0.75rem;
		color: #ecf0f1;
	}

	.footer-section p {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
	}

	.footer-section a {
		display: block;
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		margin: 0.5rem 0;
		transition: all 0.3s ease;
		padding-left: 0;
	}

	.footer-section a:hover {
		color: white;
		padding-left: 0.5rem;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 1.5rem 2rem;
		text-align: center;
	}

	.footer-bottom p {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
			padding: 2rem 1.5rem 1.5rem;
		}
	}
	:global(p) {
	margin: 0 0 1rem 0;
	}

	:global(h1),
	:global(h2),
	:global(h3) {
		margin: 1.5rem 0 0.75rem;
	}

	:global(ul),
	:global(ol) {
		margin: 1rem 0;
		padding-left: 1.25rem;
	}

	:global(.container) {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 1.25rem;
	}

	@media (min-width: 768px) {
		:global(.container) {
			padding: 0 2.5rem;
		}
	}
	:global(html),
	:global(body) {
	background: #ffffff !important;
	}

	main {
	background: #ffffff !important;
	}
	main {
	width: 100%;
	display: block;
	margin: 0;
	padding: 0;
	}
	:global(body) {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	}

	main {
	flex: 1;
	}
</style>