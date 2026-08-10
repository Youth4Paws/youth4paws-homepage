<script>
  import { onMount } from "svelte";
  import Section from "../../components/layout/Section.svelte";
  import { signIn } from "@auth/sveltekit/client";
  import Button from "../../components/interactive/Button.svelte";
  
  function login() {
    signIn("authentik");
  }

  onMount(() => {
    login();
  })
</script>

<Section title="Einloggen">
  <Button onclick={login} accent={true}>
    Mit Youth4Paws SSO einloggen
  </Button>
</Section>