<script>
  import { onMount } from "svelte";
  import Section from "../../../components/layout/Section.svelte";
  import { signOut } from "@auth/sveltekit/client";
  import Button from "../../../components/interactive/Button.svelte";
  
  function logout() {
    signOut({
      callbackUrl: "/"
    });
  }

  onMount(() => {
    logout();
  })
</script>

<Section title="Ausloggen">
  <Button onclick={logout} accent={true}>
    Von Youth4Paws ausloggen
  </Button>
</Section>