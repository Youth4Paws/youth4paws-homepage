<script lang="ts">
  import { page } from "$app/state";
  import Button from "../components/interactive/Button.svelte";
  import Paragraph from "../components/layout/Paragraph.svelte";

  import Section from "../components/layout/Section.svelte";
</script>

<Section title={`Fehler ${page.status}`}>
  <Paragraph>
    {#if page.status === 404}
      Der gesuchte Inhalt konnte nicht gefunden werden.
    {:else}
      Es ist ein Fehler aufgetreten.
    {/if}
  </Paragraph>
  <!-- TODO: buttons -->
</Section>