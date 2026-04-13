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

<Form title="Mitmachen" id="Mitmachen" bind:open>
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
    name="Beruf"
    label="Beruf"
    placeholder="Schüler/Student/..."
  />

  <TextInput
    name="Wohnsitz"
    label="Aktueller Wohnsitz (Stadt)"
    placeholder="München"
  />

  <TextInput
    name="Motivation"
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
    name="Engagement"
    label="Wo könntest du dir vorstellen mitzuhelfen?"
    long={true}
  />

  <TextInput
    name="Zeitinvestment"
    label="Wie viel Zeit pro Woche planst du für dein Engagement?"
    placeholder="3–4 Stunden"
  />

  <TextInput
    name="Referral"
    label="Wie bist du auf uns aufmerksam geworden?"
    placeholder="Internet/Freunde/..."
  />
</Form>