<script lang="ts">
  import GenericHeader from "./GenericHeader.svelte";

	let { children } = $props();
</script>

<GenericHeader level={1}>
  {@render children()}
</GenericHeader>