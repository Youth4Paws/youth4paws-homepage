<script lang="ts">
  import SvelteMarkdown, { defaultRenderers } from '@humanspeak/svelte-markdown'
  import StylizedTextLogo from "../decoration/StylizedTextLogo.svelte";
  import MarkdownLink from "./MarkdownLink.svelte";
  import MarkdownHeading from "./MarkdownHeading.svelte";
  import List from "../text/List.svelte";
  import ListElement from "../text/ListElement.svelte";
  import type { MarkedExtension } from 'marked'
  import Bold from "../text/Bold.svelte";

  interface Props {
    value: string;
  }

  let { value } = $props();

  const customRenderers = {
    ...defaultRenderers,
    link: MarkdownLink,
    heading: MarkdownHeading,
    listItem: ListElement,
    list: List,
    strong: Bold,
  }

  const y4pextension: MarkedExtension = ({
    extensions: [
      {
        name: "y4p",
        level: "inline",
        start(src) {
          return src.match(/y(outh)?(4|for)p(aws)?/i)?.index
        },
        tokenizer(src) {
          const match = /^y(outh)?(4|for)p(aws)?/i.exec(src)
          if (!match) return

          return {
            type: "y4p",
            raw: match[0],
            text: match[0],
          }
        }
      }
    ]
  })
</script>

<SvelteMarkdown source={value} renderers={customRenderers} extensions={[y4pextension]}>
  {#snippet y4p()}
    <StylizedTextLogo/>
  {/snippet}
</SvelteMarkdown>