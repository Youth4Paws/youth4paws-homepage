<script>
  import Link from "../../../components/interactive/Link.svelte";
  import Paragraph from "../../../components/layout/Paragraph.svelte";
  import Section from "../../../components/layout/Section.svelte";
  import List from "../../../components/text/List.svelte";
  import ListElement from "../../../components/text/ListElement.svelte";
</script>

<Section title="Impressum">
  <Paragraph subtitle="Anschrift">
    Youth4Paws
    Kenan Hacisalihoglu (Vorstandsvorsitzender)
    Landsbergerstraße 62
    82256 Fürstenfeldbruck 
  </Paragraph>

  <Paragraph subtitle="Kontakt">
    Telefon: +49 176 46294142
    E-Mail: kenan.hacisalihoglu.stud@gmail.com
  </Paragraph>

  <Paragraph subtitle="Redaktionell verantwortlich">
    Hacisalihoglu Kenan
  </Paragraph>

  <Paragraph subtitle="Haftung">
    Wir übernehmen für die Inhalte unserer Internetseiten Verantwortung im Rahmen der jeweils geltenden allgemeinen gesetzlichen Bestimmungen. Sämtliche Inhalte werden mit der erforderlichen Sorgfalt und nach bestem Wissen erstellt. Sie dienen ausschließlich Informationszwecken. Sofern wir auf unseren Internetseiten durch Hyperlinks auf Webseiten Dritter verweisen, können wir keine Gewähr für die dauerhafte Aktualität, Richtigkeit oder Vollständigkeit der dort bereitgestellten Inhalte übernehmen. Diese Inhalte liegen außerhalb unseres Verantwortungsbereichs, und auf deren künftige Ausgestaltung haben wir keinen Einfluss. Wenn Sie der Ansicht sind, dass verlinkte oder eigene Inhalte gegen geltendes Recht verstoßen oder unangemessen sind, bitten wir um einen entsprechenden Hinweis. Die rechtlichen Hinweise auf dieser Seite sowie sämtliche Fragen und Streitigkeiten, die im Zusammenhang mit der Gestaltung dieser Internetseite entstehen, unterliegen dem Recht der Bundesrepublik Deutschland.
  </Paragraph>

  <Paragraph subtitle="Urheberrecht">
    Die auf unserer Internetseite bereitgestellten Texte, Bilder, Fotos, Videos und Grafiken sind in der Regel urheberrechtlich geschützt. Eine Nutzung ohne vorherige Berechtigung — insbesondere in Form von Vervielfältigung, Bearbeitung oder Verbreitung — ist daher untersagt. Wenn Sie beabsichtigen, Inhalte dieser Website oder Teile davon zu verwenden, bitten wir Sie, uns vorab über die oben angegebenen Kontaktdaten zu kontaktieren. Sofern wir selbst nicht über die erforderlichen urheberrechtlichen Nutzungsrechte verfügen, sind wir bemüht, den Kontakt zum jeweils berechtigten Rechteinhaber herzustellen.
  </Paragraph>

  <Paragraph subtitle="Social Media-Profile">
    Dieses Impressum gilt auch für folgende Social-Media-Profile:
  </Paragraph>

  <List>
    <ListElement>
      <Link href="https://www.instagram.com/youth4.paws">
        Instagram
      </Link>
    </ListElement>
    <ListElement>
      <Link href="https://www.linkedin.com/company/youth-4-paws">
        Linked-In
      </Link>
    </ListElement>
    <ListElement>
      <Link href="https://github.com/Youth4Paws">
        GitHub
      </Link>
    </ListElement>
  </List>
</Section>