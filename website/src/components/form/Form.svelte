<script lang="ts">
    import type { Snippet } from "svelte";
    import Button from "../interactive/Button.svelte";
    import { enhance } from "$app/forms";
    import Title from "../text/Title.svelte";

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

    align-items: start;

    position: relative;

    overscroll-behavior: contain;
    overflow: hidden;
  }

  div.buttons {
    width: 100%;
    display: flex;
    justify-content: end;
  }
</style>

<dialog
  bind:this={dialog}
  closedby="any"
>
<form
  id={id}
  method="POST"
  use:enhance={() => { return async ({ update }) => { update({ reset: false }) } }}
>
  <Title>{title}</Title>

  {@render children()}

  <div class="buttons">
    <Button submit={true}>
      Abschicken
    </Button>
  </div>
</form>
</dialog>