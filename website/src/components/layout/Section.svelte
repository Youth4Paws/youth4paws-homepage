<script lang="ts">
  import type { Snippet } from "svelte";
  import Title from "../text/Title.svelte";

  interface Props {
    title: string;
    tag?: string;
    color?: "primary" | "secondary" | "tertiary" | "inherit";
    children: Snippet;
  }

  let {
    title,
    tag,
    color = "primary",
    children
  }: Props = $props();
</script>

<style lang="scss">
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";
  
  section {
    margin: 0;
    background: #FFFFFF;

    /* background full-width */
    @include layout.section-dimensioning;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: dimensions.$gapSmall;

    /* content spacing */
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 1.25rem;
  }

  @media (min-width: 768px) {
    .container {
      padding: 4rem 2rem;
    }
  }


  // Explizite Farben für spezifische Sections
  section.primary {
    background: #FFFFFF;
  }
  
  section.secondary {
    background: linear-gradient(135deg, #759889 0%, #9AB8A9 100%);
    color: white;
  }


  
  section.secondary :global(p),
  section.secondary :global(h1),
  section.secondary :global(h2),
  section.secondary :global(h3),
  section.secondary :global(li) {
    color: white !important;
  }
  
  section.tertiary {
    background: linear-gradient(to bottom, #F8F9FA 0%, #F0F2F4 100%);
  }

  @media (max-width: 768px) {
    .container {
      padding: 3rem 1.25rem;
    }
  }
</style>

<section
  class:primary={color === "primary"} 
  class:secondary={color === "secondary"} 
  class:tertiary={color === "tertiary"} 
  class:inherit={color === "inherit"} 
  id={tag}
>
  <div class="container">
    <Title>{title}</Title>
    {@render children()}
  </div>
</section>
