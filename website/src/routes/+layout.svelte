<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	import { PUBLIC_WEBSITE_DOMAIN, PUBLIC_PLAUSIBLE_DOMAIN } from "$env/static/public";

	let { children } = $props();
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
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

  main {
    width: 100%;
		gap: 0;

		background-color: map.get(colors.$mainColors, "primary", "background");

		// Approach 1
		//columns: 2;
		//@include media.phone {
		//	columns: 1;
		//}
		//@include media.large {
		//	columns: 3;
		//}

		// Approach 2
		//display: grid;
		//grid-template-rows: auto;
		//grid-auto-rows: auto;
		//@include media.phone {
		//	grid-template-columns: 1fr;
		//}
		//@include media.desktop {
		//	grid-template-columns: 1fr 1fr;
		//}
		//@include media.large {
		//	grid-template-columns: 1fr 1fr 1fr;
		//}
  }
</style>


<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer data-domain={PUBLIC_WEBSITE_DOMAIN} src={`https://${PUBLIC_PLAUSIBLE_DOMAIN}/js/script.js`}></script> 
</svelte:head>

<main>
	{@render children?.()}
</main>

<footer>
</footer>