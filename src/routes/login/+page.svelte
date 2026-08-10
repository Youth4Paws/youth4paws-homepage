<script>
  import { onMount } from "svelte";
  import Section from "../../components/layout/Section.svelte";
  import { signIn } from "@auth/sveltekit/client";
  import Button from "../../components/interactive/Button.svelte";

  let loading = $state(false);
  
  async function login() {
    if (loading) return;
    loading = true
    await signIn("authentik");
    loading = false;
  }

  onMount(() => {
    loading = false;
    login();
  })
</script>

<Section title="Einloggen">
  <Button onclick={login} accent={true} loading>
    Mit Youth4Paws SSO einloggen
  </Button>
</Section>