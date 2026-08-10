<script lang="ts">
  import GenericHeader from "./GenericHeader.svelte";

	let { children } = $props();
</script>

<GenericHeader level={2}>
  {@render children()}
</GenericHeader>
