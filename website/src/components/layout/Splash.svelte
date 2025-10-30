<script lang="ts">
    import type { Snippet } from "svelte";
  import Title from "../text/Title.svelte";

  interface Props {
    title: string;
    imgSrc: string;
    imgAlt: string;
    children: Snippet;
  }

	let {
    title,
    imgSrc,
    imgAlt,
    children
  } = $props();
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

  div.description {
    grid-area: description;
  }

  div.buttons {
    grid-area: buttons;
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

  <div class="description">
    {@render children()}
  </div>

  <div class="buttons">
    Buttons go here
  </div>

  <img
    src={imgSrc}
    alt={imgAlt}
  />
</section>