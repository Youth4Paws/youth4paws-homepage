<script lang="ts">
    import type { SvelteMarkdownOptions } from '@humanspeak/svelte-markdown';
    import type { Snippet } from 'svelte'
    import GenericHeader from '../text/GenericHeader.svelte';

    interface Props {
        depth: number
        raw: string
        text: string
        id?: string
        options: SvelteMarkdownOptions
        slug: (_val: string) => string
        children?: Snippet
    }

    const {
        depth,
        raw,
        text,
        id: precomputedId = undefined,
        options,
        slug,
        children
    }: Props = $props()

    const id = $derived(
        options.headerIds ? (precomputedId ?? `${options.headerPrefix}${slug(text)}`) : undefined
    )
</script>

<GenericHeader level={depth} id={id}>
  {@render children?.()}
</GenericHeader>