<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style lang="scss">
  @use "sass:map";

	@use "../styles/colors.scss";
	@use "../styles/dimensions.scss";
	@use "../styles/media.scss";

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
		display: grid;
		grid-template-rows: auto;
		grid-auto-rows: auto;
		@include media.phone {
			grid-template-columns: 1fr;
		}
		@include media.desktop {
			grid-template-columns: 1fr 1fr;
		}
		//@include media.large {
		//	grid-template-columns: 1fr 1fr 1fr;
		//}
  }
</style>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children?.()}
</main>

<footer>
</footer>