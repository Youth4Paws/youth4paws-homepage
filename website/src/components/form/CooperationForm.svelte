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

<Form title="Kooperation" id="cooperation" bind:open>
  <TextInput
    name="surname"
    label="Vorname"
    placeholder="Max"
  />

  <TextInput
    name="lastname"
    label="Name"
    placeholder="Mustermann"
  />

  <TextInput
    name="email"
    label="E-Mail Adresse"
    placeholder="max.mustermann@beispiel.de"
  />

  <TextInput
    name="phone"
    label="Telefonnummer"
    placeholder="89 99998 123"
  />

  <TextInput
    name="desc"
    label="Wie können wir dir helfen?"
    long={true}
  />
</Form>