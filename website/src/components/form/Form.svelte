<script lang="ts">
    import type { Snippet } from "svelte";
    import Button from "../interactive/Button.svelte";
    import { enhance } from "$app/forms";
    import Title from "../text/Title.svelte";
    import Paragraph from "../layout/Paragraph.svelte";
    import { TriangleAlert } from "lucide-svelte";
    import Checkbox from "../interactive/Checkbox.svelte";

  interface Props {
    open: () => void;
    title: string;
    id:  string;
    children: Snippet;
  }

  let {
    open = $bindable(),
    title,
    id,
    children
  }: Props = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  open = () => {
    if (dialog) dialog.showModal();
  };

  let loading = $state(false);
  let error = $state("");
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";

  dialog {
    background: transparent;
    border: 0;
    padding: 0;
    overscroll-behavior: contain;
    overflow: hidden;
  }

  dialog::backdrop {
    backdrop-filter: blur(dimensions.$blur);
  }

  dialog[open] {
		animation: zoom animations.$animationSpeed animations.$cubic forwards;
	}

  dialog:focus {
    outline: none;
  }

  form {
    border-radius: dimensions.$borderRadius;
    display: flex;
    flex-direction: column;
    gap: dimensions.$gapSmall;

    @include layout.set-color("primary");

    padding: dimensions.$gapMidLarge dimensions.$gap;
    break-inside: avoid;
    overflow-x: hidden;
    
    max-width: max-content;
    min-width: 40vw;
    max-width: 60em;
    
    max-height: 90vh;

    align-items: start;
  }

  div.buttons {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: dimensions.$gapSmall;
  }

  div.error {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: dimensions.$gapTiny;
    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;
  }
</style>

<dialog
  bind:this={dialog}
  closedby="any"
  onclose={() => { error = ""; }}
>
  <form
    method="POST"
    use:enhance={() => {
      loading = true;
      return async ({ update, result }) => {
        const success = result.type === "success";
        await update({ reset: success }) 
        loading = false;
        console.log(result);
        if (success) dialog?.close();
        // @ts-ignore
        else error = result.data ?? "Es ist ein Fehler aufgetreten.";
      };
    }}
  >
    <Title>{title}</Title>

    {@render children()}

    <input type="hidden" name="form" value={id}/>

    <Checkbox name="consent">Ich bin mit dem verarbeiten meiner Daten zwecks meines Anliegens einverstanden.</Checkbox>

    <div class="buttons">
      {#if error}
        <div class="error">
          <TriangleAlert/>
          {error}
        </div>
      {/if}
      <Button submit={true} loading={loading} accent={true}>
        Abschicken
      </Button>
    </div>
  </form>
</dialog>