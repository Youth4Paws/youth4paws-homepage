<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { markdown } from "@codemirror/lang-markdown";
  import SvelteMarkdown, { defaultRenderers } from '@humanspeak/svelte-markdown'
    import MarkdownLink from "../../../../../components/markdown/MarkdownLink.svelte";
    import MarkdownHeading from "../../../../../components/markdown/MarkdownHeading.svelte";
    import List from "../../../../../components/text/List.svelte";
    import ListElement from "../../../../../components/text/ListElement.svelte";

  let value = $state("hello");

  const customRenderers = {
    ...defaultRenderers,
    link: MarkdownLink,
    heading: MarkdownHeading,
    listItem: ListElement,
    list: List,
}
</script>

<style lang="scss">
  @use "../../../../../styles/mixins/layout.scss";
  @use "../../../../../styles/constants/dimensions.scss";

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: dimensions.$gapTiny;
    padding: dimensions.$gapTiny;

    @include layout.set-color("primary");

    div {
      padding: dimensions.$gapTiny;
      border: solid dimensions.$borderWidth var(--color);
      border-radius: dimensions.$borderRadius;
    }
  }
</style>

<div class="wrapper">
  <div class="code">
    <CodeMirror bind:value lang={markdown()} />
  </div>
  <div class="preview">
    <SvelteMarkdown source={value} renderers={customRenderers} />
  </div>
</div>