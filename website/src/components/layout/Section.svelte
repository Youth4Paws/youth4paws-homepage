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
    display: flex;  
    flex-direction: column;
    gap: dimensions.$gapSmall;
    padding: 4rem 2rem;
    margin: 0;
    background: #FFFFFF;
    
    @include layout.section-dimensioning;
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
    section {
      padding: 3rem 1.5rem;
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
  <Title>
    {title}
  </Title>

  {@render children()}
</section>