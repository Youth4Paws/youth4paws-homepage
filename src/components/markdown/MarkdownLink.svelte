<script lang="ts">
  import type { Snippet } from 'svelte'
  import Link from '../interactive/Link.svelte';

  interface Props {
      children?: Snippet
      href?: string
      title?: string
  }

  const { href = "", title = '', children }: Props = $props()
</script>

<Link href={href}>
  {@render children?.()}
</Link>