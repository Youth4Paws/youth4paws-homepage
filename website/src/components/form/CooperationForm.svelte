<script lang="ts">
  import type { Snippet } from "svelte";
  import TextInput from "../interactive/TextInput.svelte";
  import Title from "../text/Title.svelte";
  import Form from "./Form.svelte";

  interface Props {
    open: () => void;
  }

  let {
    open = $bindable(),
  }: Props = $props();
</script>

<Form title="Kooperation" id="Kooperation" bind:open>
  <TextInput
    name="Vorname"
    label="Vorname"
    placeholder="Max"
  />

  <TextInput
    name="Nachname"
    label="Nachname"
    placeholder="Mustermann"
  />

  <TextInput
    name="E-Mail"
    label="E-Mail Adresse"
    placeholder="max.mustermann@beispiel.de"
    type="email"
  />

  <TextInput
    name="Telefonnummer"
    label="Telefonnummer"
    placeholder="89 99998 123"
  />

  <TextInput
    name="Anliegen"
    label="Wie können wir dir helfen?"
    long={true}
  />
</Form>