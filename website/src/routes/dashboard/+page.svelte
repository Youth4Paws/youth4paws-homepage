<script lang="ts">
  import { Users } from "lucide-svelte";
  import Section from "../../components/layout/Section.svelte";
  import { Handshake } from "@lucide/svelte";

  const categories: { name: string, page: string, icon: any }[] = [
    { name: "Benutzer", page: "/dashboard/users", icon: Users },
    { name: "Partnerschaften", page: "/dashboard/partnerships", icon: Handshake },
    { name: "Projektberichte", page: "/dashboard/reports", icon: Users },
  ]
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/animations.scss";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  a {
    text-decoration: none;

    display: flex;
    flex-direction: column;
    gap: dimensions.$gapSmaller;
    align-items: center;

    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSize;
    line-height: dimensions.$fontLineHeight;

    width: 12rem;
    padding: dimensions.$gapSmall;

    hyphens: auto;
    white-space: pre-line;

    border-radius: dimensions.$borderRadius;

    color: map.get(colors.$mainColors, "secondary", "foreground");
    background-size: calc(200% + 2 * dimensions.$borderWidth) 100%;
    background-image: linear-gradient(to right, map.get(colors.$mainColors, "secondary", "background") 50%, map.get(colors.$mainColors, "accent", "background")50%);

    transition: background-position ease-out animations.$animationSpeed, color ease-in animations.$animationSpeedFast;

    &:hover, &:focus {
      background-position: calc(-100% - 2 * dimensions.$borderWidth) 0;
      color: var(--btnHoverColor);
    }
  }

  a:hover {
    color: map.get(colors.$mainColors, "accent", "foreground");
  }

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: dimensions.$gapSmall;
    margin-top: dimensions.$gapSmall;
  }
</style>

<Section title="Dashboard">
  <div lang="de">
    {#each categories as category}
      {@const Icon = category.icon}
      <a href={category.page}>
        <Icon size={40}/>
        {category.name}
      </a>
    {/each}
  </div>
</Section>