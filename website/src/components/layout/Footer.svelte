<script>
	import Bold from "../text/Bold.svelte";
	import Link from "../interactive/Link.svelte";
	import Paragraph from "./Paragraph.svelte";
</script>

<style lang="scss">
  @use "sass:map";

  @use "../../styles/constants/colors.scss";
  @use "../../styles/constants/dimensions.scss";
  @use "../../styles/constants/media.scss";
  @use "../../styles/mixins/layout.scss";

  footer {
    width: 100%;
    background-color: map.get(colors.$mainColors, "tertiary", "background");
    color: map.get(colors.$mainColors, "tertiary", "foreground");

    display: grid;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    grid-template-areas: "name name" "links contact" "copyright copyright";

    @include media.phone {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(4, auto);
			grid-template-areas: "name" "links" "contact" "copyright";
    }

    @include media.large {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(2, auto);
			grid-template-areas: "name links contact" "copyright copyright copyright";
    }

		gap: dimensions.$gap;

    @include layout.section-dimensioning;
		padding-top: dimensions.$gap;
		padding-bottom: dimensions.$gap;
		text-align: left;
  }

  div {
    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSizeSmall;
    line-height: dimensions.$fontLineHeight;
		width: fit-content;
  }

	div.name {
		grid-area: name;
		justify-self: center;
	}

	div.links, div.contact {
		height: 100%;
	}

  div.copyright {
    font-weight: dimensions.$fontWeight;
		font-size: dimensions.$fontSizeSmaller;
    line-height: dimensions.$fontLineHeight;

    grid-area: copyright;
		justify-self: center;
  }
</style>

<footer>
  <div class="name">
    <Bold>Youth4Paws</Bold>
  </div>
  <div class="links">
    <Paragraph small={true}>
			<Bold>Quick Links</Bold><br/>
			<Link href="/">Home</Link><br/>
			<Link href="/impressum">Impressum</Link>
    </Paragraph>
  </div>
  <div class="contact">
    <Paragraph small={true}>
			<Bold>Kontakt</Bold><br/>
      Telefon: +49 176 46294142
      E-Mail: team.youth4paws@gmail.com
    </Paragraph>
  </div>
	<div class="copyright">
		&copy; 2026 Youth4Paws. Alle Rechte vorbehalten.
	</div>
</footer>