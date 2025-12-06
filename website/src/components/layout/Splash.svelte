<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Title from "../text/Title.svelte";
  import Button from "../interactive/Button.svelte";

  interface Props {
    title: string;
    imgSrc: string;
    imgAlt: string;
    children: Snippet;
    buttons?: Snippet;
  }

	let {
    title,
    imgSrc,
    imgAlt,
    children,
    buttons
  }: Props = $props();

  // Potentially overcomplicated but I wanted to avoid nesting too many elements wherever possible.
  let descriptionWrapper: HTMLElement;
  let wrap = $state<boolean>(true);
  onMount(() => {
    wrap = descriptionWrapper.children.length > 1;
  });
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";

  @use "../../styles/mixins/layout.scss";

  section {
    display: grid;
    gap: dimensions.$gapSmall;

    @include layout.section-dimensioning;

    @include media.desktop-and-large {
      grid-auto-columns: 1fr;
      grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
      grid-template-areas: "title logo" "description logo" "buttons logo";
    }

    @include media.phone {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      grid-template-areas: "logo" "title" "description" "buttons";
      
      justify-items: center;
    }
  }

  :global(session > h1) {
    grid-area: title
  }

  div.description {
    grid-area: description;
  }

  div.unwrap {
    display: contents;
  }

  div.buttons {
    grid-area: buttons;
    display: flex;
    flex-direction: row;
    gap: dimensions.$gapSmall;
    justify-content: center;
    align-items: center;
  }

  img {
    grid-area: logo;
    width: 100%;
    border-radius: dimensions.$borderRadius;

    @include media.phone {
      width: 50%;
    }
  }
</style>

<section>
  <Title>
    {title}
  </Title>

  <div bind:this={descriptionWrapper} class="description" class:unwrap={!wrap}>
    {@render children()}
  </div>

  {#if buttons !== undefined}
  <div class="buttons">
    {@render buttons()}
  </div>
  {/if}

  <img
    src={imgSrc}
    alt={imgAlt}
  />
</section>