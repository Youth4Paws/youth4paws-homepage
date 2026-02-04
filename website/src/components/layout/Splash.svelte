<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Title from "../text/Title.svelte";

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
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";

  @use "../../styles/mixins/layout.scss";

  section {
    display: grid;
    gap: dimensions.$gap;

    background-color: map.get(colors.$mainColors, "primary", "background");
    color: map.get(colors.$mainColors, "primary", "foreground");

    @include layout.section-dimensioning-larger;

    @include media.desktop-and-large {
      grid-template-columns: 1.25fr 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "text logo";
    }

    @include media.phone {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      grid-template-areas: "logo" "text";
      
      justify-items: center;
    }
  }

  div.wrapper {
    display: flex;
    flex-direction: column;
    gap: dimensions.$gapSmall;
  }

  div.buttons {
    display: flex;
    flex-direction: row;
    gap: dimensions.$gapSmall;
    justify-content: start;
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
  <div class="wrapper">
    <Title>
      {title}
    </Title>

    {@render children()}

    {#if buttons !== undefined}
      <div class="buttons">
        {@render buttons()}
      </div>
    {/if}
  </div>

  <img
    src={imgSrc}
    alt={imgAlt}
  />
</section>