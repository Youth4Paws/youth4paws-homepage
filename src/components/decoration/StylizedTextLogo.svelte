<style lang="scss">
  @use "sass:map";
  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";

  span {
    font-weight: dimensions.$fontWeightBold;
  }

  .four {
    color: map.get(colors.$mainColors, "accent", "background");
  }
</style>

<span>Youth<span class="four">4</span>Paws</span>