<script lang="ts">
  import type { PageProps } from "./$types";
  import Section from "../../../../../components/layout/Section.svelte";
  import Rows from "../../../../../components/layout/Rows.svelte";
  import type { User } from "$lib/types/users";

  let { data }: PageProps = $props();
</script>

<style lang="scss">
  .username {
    min-width: fit-content;
    width: 15%;
    flex: 0 1 auto;
    text-align: start;
  }
  .buttons {
    flex-grow: 3;
  }
</style>

<Section title="Benutzerverwaltung">
  {#await (await data.usersPromise).json()}
    Die Daten werden geladen...
  {:then users: { users: User[] }} 
    <Rows items={users.users} template={userRow} id={user => user.id}/>
  {:catch}
    Beim Laden der Daten ist ein Fehler aufgetreten.
  {/await}
</Section>

{#snippet userRow(user: User)}
  <span class="username">{user.name}</span>
  <span class="email">{user.email}</span>
  <span class="buttons">buttons here</span>
{/snippet}