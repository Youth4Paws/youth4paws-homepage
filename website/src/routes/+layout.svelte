<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style lang="scss">
	@use "../styles/dimensions.scss";

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