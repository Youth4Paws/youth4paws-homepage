<script lang="ts">
  import Checkbox from "../interactive/Checkbox.svelte";
  import Link from "../interactive/Link.svelte";
  import TextInput from "../interactive/TextInput.svelte";
  import Paragraph from "../layout/Paragraph.svelte";
  import Form from "./Form.svelte";
  import { page } from "$app/state";

  const redirect = $derived(page.url.searchParams.get('redirect') || "/");
</script>

<Form title="Einloggen" id="login" embedded={true}>
  <TextInput
    name="username"
    label="Benutzername"
    placeholder="MaxMusti"
  />

  <TextInput
    name="password"
    label="Kennwort"
    placeholder="Sicheres Kennwort"
    type="password"
  />

  <Checkbox name="remember">Angemeldet bleiben</Checkbox>

  <Paragraph align="end">
    Ein neues Konto <Link href="/register?redirect={encodeURIComponent(redirect)}">erstellen</Link>
  </Paragraph>
</Form>