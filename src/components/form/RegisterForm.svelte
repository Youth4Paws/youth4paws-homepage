<script lang="ts">
  import Checkbox from "../interactive/Checkbox.svelte";
  import Link from "../interactive/Link.svelte";
  import TextInput from "../interactive/TextInput.svelte";
  import Paragraph from "../layout/Paragraph.svelte";
  import Form from "./Form.svelte";
  import { page } from "$app/state"

  const redirect = $derived(page.url.searchParams.get('redirect') || "/");
</script>

<Form title="Einloggen" id="login" embedded={true}>
  <TextInput
    name="username"
    label="Benutzername"
    placeholder="MaxMusti"
  />

  <TextInput
    name="email"
    label="E-Mail Adresse"
    placeholder="max.mustermann@beispiel.de"
  />

  <TextInput
    name="password"
    label="Kennwort"
    placeholder="Sicheres Kennwort"
    type="password"
  />

  <TextInput
    name="password-repeat"
    label="Kennwort Wiederholen"
    placeholder="Sicheres Kennwort"
    type="password"
  />

  <Checkbox name="remember">Angemeldet bleiben</Checkbox>

  <Paragraph align="end">
    Mit einem bestehenden Konto <Link href="/login?redirect={encodeURIComponent(redirect)}">einloggen</Link>
  </Paragraph>
</Form>