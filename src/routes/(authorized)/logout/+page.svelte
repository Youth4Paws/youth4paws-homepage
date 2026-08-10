<script>
  import { onMount } from "svelte";
  import Section from "../../../components/layout/Section.svelte";
  import { signOut } from "@auth/sveltekit/client";
  import Button from "../../../components/interactive/Button.svelte";

  let loading = $state(false);
  
  async function logout() {
    if (loading) return;
    loading = true;
    await signOut({ callbackUrl: "/" });
    loading = false;
  }

  onMount(() => {
    loading = false;
    logout();
  })
</script>

<Section title="Ausloggen">
  <Button onclick={logout} accent={true} loading>
    Von Youth4Paws ausloggen
  </Button>
</Section>