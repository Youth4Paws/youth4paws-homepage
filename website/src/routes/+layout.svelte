<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	import { PUBLIC_WEBSITE_DOMAIN, PUBLIC_PLAUSIBLE_DOMAIN } from "$env/static/public";
	import { beforeNavigate, afterNavigate } from "$app/navigation";
	import { tick } from "svelte";
  import { browser } from "$app/environment";
  import Navigation from '../components/layout/Navigation.svelte';
  import Footer from '../components/layout/Footer.svelte';

	let { children } = $props();

  // Fix SvelteKit scrolling issue
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

<style lang="scss">
  @use "sass:map";

	@use "../styles/constants/colors.scss";
	@use "../styles/constants/dimensions.scss";
	@use "../styles/constants/media.scss";

	:global(*) {
		font-family: "Atkinson Hyperlegible Next", sans-serif;
		font-optical-sizing: auto;
		font-style: normal;
		box-sizing: border-box !important;
	}

	:global(body) {
		margin: 0;
    background: map.get(colors.$mainColors, "tertiary", "background");

    display: flex;
    flex-direction: column;
    min-height: 100vh;

    width: 100vw;
    overflow-x: hidden;

    overscroll-behavior: contain;
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
    background: map.get(colors.$mainColors, "primary", "background");
    width: 100%;
    flex-grow: 1;
    padding-top: 80em;
    margin-top: -80em;
  }
</style>


<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer data-domain={PUBLIC_WEBSITE_DOMAIN} src={`https://${PUBLIC_PLAUSIBLE_DOMAIN}/js/script.js`}></script> 
</svelte:head>

<Navigation/>

<main>
	{@render children?.()}
</main>

<Footer/>
