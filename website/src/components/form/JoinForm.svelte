<script lang="ts">
  import TextInput from "../interactive/TextInput.svelte";
  import Paragraph from "../layout/Paragraph.svelte";
  import Bold from "../text/Bold.svelte";
  import Form from "./Form.svelte";

  interface Props {
    open: () => void;
  }

  let {
    open = $bindable(),
  }: Props = $props();
</script>

<Form title="Mitmachen" id="join" bind:open>
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
    name="occupation"
    label="Beruf"
    placeholder="Schüler/Student/..."
  />

  <TextInput
    name="location"
    label="Aktueller Wohnsitz (Stadt)"
    placeholder="München"
  />

  <TextInput
    name="interest"
    label="Was treibt dich zu Youth4Paws?"
    long={true}
  />

  <Paragraph>
    Wir unterscheiden zwischen folgenden Mitgliedsarten, wobei man sich nicht direkt für eines entscheiden muss und theoretisch auch beide Rollen haben kann: 
  </Paragraph>

  <Paragraph>
    <Bold>Reine Projektmitglieder</Bold>: Du hilfst vor allem direkt nur bei Projekten mit Tierschutzorganisationen mit, das heißt du machst mit bei Volunteer Days wo wir uns vor Ort bei Tierschutzorganisationen treffen und helfen. Du hilfst bspw. bei Renovierungsprojekten als helfende Hand bei Tierschutzorganisationen oder ganz pragmatisch hilfst du Futterspenden von A nach B zu bringen.
  </Paragraph>

  <Paragraph>
    <Bold>Interne Mitglieder</Bold>: Du hilfst, dass unser Verein wächst, du bist verantwortlich für einen spezifischen Bereich oder arbeitest zusammen mit anderen Teammitgliedern an dem jeweiligen Bereich in unterschiedlichsten spannenden Projekten.
  </Paragraph>

  <TextInput
    name="area"
    label="Wo könntest du dir vorstellen mitzuhelfen?"
    long={true}
  />

  <TextInput
    name="workload"
    label="Wie viel Zeit pro Woche planst du für dein Engagement?"
    placeholder="3–4 Stunden"
  />

  <TextInput
    name="referral"
    label="Wie bist du auf uns aufmerksam geworden?"
    placeholder="Internet/Freunde/..."
  />
</Form>