<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_WEBSITE_DOMAIN, PUBLIC_PLAUSIBLE_DOMAIN } from "$env/static/public";
	import { beforeNavigate, afterNavigate } from "$app/navigation";
	import { tick } from "svelte";
	import { browser } from "$app/environment";
	import Navigation from "../components/layout/Navigation.svelte";

	let { children } = $props();

	beforeNavigate(async () => {
		if (!browser) return;
		document.getElementsByTagName("html")[0].classList.add("pageSwitch");
	})
	
	afterNavigate(async () => {
		if (!browser) return;
		await tick();
		document.getElementsByTagName("html")[0].classList.remove("pageSwitch");
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer data-domain={PUBLIC_WEBSITE_DOMAIN} src={`https://${PUBLIC_PLAUSIBLE_DOMAIN}/js/script.js`}></script> 
</svelte:head>

<Navigation />

<main>
	{@render children?.()}
</main>

<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>Youth4Paws</h3>
			<p>Studentische Initiative für Tierschutz in München</p>
		</div>
		<div class="footer-section">
			<h4>Quick Links</h4>
			<a href="/">Home</a>
			<a href="/aboutUs">Über uns</a>
			<a href="/impressum">Impressum</a>
		</div>
		<div class="footer-section">
			<h4>Kontakt</h4>
			<p>Email: info@youth4paws.de</p>
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
		min-height: calc(100vh - 200px);
		background: transparent;
	}

	footer {
		background: #5F8F8C;
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
		color: #E8A87C;
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
</style>