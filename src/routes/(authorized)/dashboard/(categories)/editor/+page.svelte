<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { markdown } from "@codemirror/lang-markdown";
  import MarkdownRenderer from "../../../../../components/markdown/MarkdownRenderer.svelte";

  let value = $state("hello");
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
    <MarkdownRenderer {value}/>
  </div>
</div>