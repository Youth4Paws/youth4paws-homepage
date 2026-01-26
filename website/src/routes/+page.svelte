<script>
  import Bold from "../components/text/Bold.svelte";
  import List from "../components/text/List.svelte";
  import ListElement from "../components/text/ListElement.svelte";
  import Paragraph from "../components/layout/Paragraph.svelte";
  import Section from "../components/layout/Section.svelte";
  import Subtitle from "../components/text/Subtitle.svelte";
  import Splash from "../components/layout/Splash.svelte";
  import Button from "../components/interactive/Button.svelte";
  import Card from "../components/layout/Card.svelte";
  import CardContainer from "../components/layout/CardContainer.svelte";
  import ContactModal from "../components/layout/ContactModal.svelte";
  
  let showContactModal = $state(false);
  
  const volunteerFormUrl = "https://forms.google.com/YOUR_VOLUNTEER_FORM_ID";
  
  function openContactModal() {
    console.log("Opening modal...");
    showContactModal = true;
  }
</script>

<Splash title="Youth4Paws" imgSrc="/img/logo.svg" imgAlt="Youth4Paws Logo">
  <Paragraph>
    Youth4Paws ist eine Initiative von Studierenden, die sich mit Leidenschaft dem Tierschutz in und um München verschrieben hat. Vollkommen ehrenamtlich setzen wir uns dafür ein, Tierheime und Tierschutzorganisationen in vielfältiger Weise zu unterstützen. Ob beim Aufbau moderner Websites, bei rechtlichen Fragestellungen oder ganz praktisch vor Ort beim Säubern der Einrichtungen.
  </Paragraph>
  {#snippet buttons()}
    <a href={volunteerFormUrl} class="custom-btn secondary">Mitmachen</a>
    <button class="custom-btn secondary" onclick={openContactModal} type="button">
      Unterstützung anfragen
    </button>
  {/snippet}
</Splash>

<style>
  .custom-btn {
    display: inline-block;
    padding: 0.9rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 2px solid transparent;
    text-align: center;
    font-family: inherit;
    background: none;
  }
  
  .custom-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .custom-btn.primary {
    background: linear-gradient(135deg, #5F8F8C 0%, #4A7A77 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(95, 143, 140, 0.3);
  }
  
  .custom-btn.primary:hover {
    background: linear-gradient(135deg, #6FA09D 0%, #5F8F8C 100%);
    box-shadow: 0 8px 25px rgba(95, 143, 140, 0.4);
  }
  
  .custom-btn.secondary {
    background: white;
    color: #5F8F8C;
    border: 2px solid #5F8F8C;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .custom-btn.secondary:hover {
    background: #5F8F8C;
    color: white;
  }
</style>

<ContactModal bind:isOpen={showContactModal} />

<Section title="Wer sind wir?" tag="introduction">
  <Paragraph>
    <Bold>Youth4Paws</Bold> ist eine in München beheimatete, überwiegend studentisch geführte Initiative, die sich mit Leidenschaft und Tatkraft dem lokalen Tierschutz verschrieben hat. Unser Leitsatz lautet: <Bold>Weniger reden — mehr handeln</Bold>.
  </Paragraph>
  <Paragraph>
    Wir verstehen uns als helfende Hände für Tierschutzorganisationen, die in ihrem Alltag oder bei besonderen Projekten Unterstützung benötigen. Dabei helfen wir dort, wo gerade Bedarf besteht: <Bold>Praktisch, unkompliziert und mit Herz.</Bold>
  </Paragraph>
  <Paragraph>
    Ob beim Aufbau und der Pflege von <Bold>Websites</Bold> und <Bold>Social-Media-Auftritten</Bold>, bei <Bold>organisatorischen oder rechtlichen Fragen</Bold>, <Bold>Renovierungsarbeiten</Bold> oder <Bold>Aufräumaktionen</Bold>, wir packen genau da an, wo wir gebraucht werden.
  </Paragraph>
  <Paragraph>
    Unsere Stärke liegt dabei vor allem in der <Bold>Vielfalt und dem Engagement unserer Mitglieder</Bold>. Dank ihrer unterschiedlichen fachlichen Hintergründe und Erfahrungen können wir flexibel, kompetent und lösungsorientiert wirken und so gemeinsam einen nachhaltigen Beitrag zum Tierschutz leisten.
  </Paragraph>
</Section>

<Section title="Was bieten wir genau an?" tag="offer" color="secondary">
  <Paragraph>
    Dank der <Bold>Vielfalt</Bold> und <Bold>unterschiedlichen Fachrichtungen</Bold> unserer Mitglieder können wir Tierschutzorganisationen in zahlreichen Bereichen unterstützen.
  </Paragraph>

  <Paragraph>
    Einige Beispiele unserer Leistungen:
  </Paragraph>
  <List>
    <ListElement>
      <Bold>Praktische Hilfe</Bold> vor Ort, z.B. bei <Bold>Renovierungen</Bold>, <Bold>Aufräumaktionen</Bold> oder anderen Projekten
    </ListElement>
    <ListElement>
      Organisation von <Bold>Volunteer Days</Bold>
    </ListElement>
    <ListElement>
      Aufbau und Pflege von <Bold>Websites</Bold> sowie <Bold>Social-Media-Präsenzen</Bold>
    </ListElement>
    <ListElement>
      <Bold>Gewinnung von Ehrenamtlichen</Bold> und Freiwilligen
    </ListElement>
    <ListElement>
      Unterstützung bei <Bold>Förderanträgen</Bold> und Finanzierungsmöglichkeiten
    </ListElement>
    <ListElement>
      <Bold>Beratung</Bold> bei <Bold>rechthlichen</Bold> und <Bold>vertraglichen</Bold> Fragestellungen
    </ListElement>
    <ListElement>
      <Bold>Technische</Bold> und <Bold>IT-bezogene</Bold> Unterstützung
    </ListElement>
    <ListElement>
      <Bold>Öffentlichkeitsarbeit</Bold> durch das Teilen von Geschichten und Projekten lokaler Tierschutzorganisationen auf unseren Social-Media-Kanälen
    </ListElement>
  </List>
</Section>

<Section title="Wie sieht eine Kooperation mit uns aus?" tag="cooperation">
  <Paragraph>
    Wir bieten Tierschutzorganisationen verschiedene Formen der Zusammenarbeit an, je nach Bedarf und verfügbaren Kapazitäten.
  </Paragraph>

  <CardContainer>
    <Card>
      <Subtitle>1. Dauersupport</Subtitle>
      <Paragraph>
        Im Rahmen des Dauersupports stehen wir Organisationen <Bold>regelmäßig und flexibel</Bold> bei verschiedensten Fragestellungen zur Seite — sei es bei IT- und Kommunikationsthemen, organisatorischen Herausforderungen oder rechtlichen Fragen.
      </Paragraph>
      <Paragraph>
        Man kann sich diese Form der Kooperation vorstellen, als wären wir <Bold>eine zusätzliche helfende Hand</Bold> oder <Bold>weitere ehrenamtliche Mitarbeitende</Bold> innerhalb Ihrer Organisation.
      </Paragraph>
      <Paragraph>
        Da unsere Ressourcen begrenzt sind, können wir diesen Support nur in <Bold>besonders dringenden oder herausfordernden Fällen</Bold> anbieten — also dort, wo Hilfe akut benötigt wird.
      </Paragraph>
    </Card>

    <Card>
      <Subtitle>2. Projektbasierte Zusammenarbeit</Subtitle>
      <Paragraph>
        Bei dieser Form der Kooperation unterstützen wir <Bold>gezielt in einzelnen Projekten</Bold> — zum Beispiel beim Aufbau einer Website, bei Renovierungsarbeiten oder bei Recherche- und Organisationsaufgaben.
      </Paragraph>
      <Paragraph>
        Die Zusammenarbeit endet nach erfolgreichem Projektabschluss, kann aber jederzeit für neue Projekte fortgesetzt werden.
      </Paragraph>
    </Card>

    <Card>
      <Subtitle>3. Volunteer Days</Subtitle>
      <Paragraph>
        Wir organisieren <Bold>freiwillige Einsatztage</Bold>, bei denen unsere Mitglieder vor Ort mit anpacken — etwa bei Aufräumaktionen, Instandhaltungsarbeiten oder anderen praktischen Projekten.
      </Paragraph>
      <Paragraph>
        Diese Tage bieten nicht nur konkrete Hilfe, sondern auch die Möglichkeit, <Bold>unsere Mitglieder</Bold> direkt mit <Bold>Ihrer Arbeit und Ihrem Engagement</Bold> für Tiere zu <Bold>verbinden</Bold>.
      </Paragraph>
    </Card>

    <Card>
      <Subtitle>4. Awareness-Partnerschaft</Subtitle>
      <Paragraph>
        Im Rahmen einer Awareness-Partnerschaft helfen wir dabei, <Bold>Ihre Organisation sichtbarer zu machen</Bold>.
      </Paragraph>
      <Paragraph>
        Wir erzählen auf unserer Website und in unseren Social-Media-Kanälen <Bold>Geschichten aus Ihrem Alltag</Bold>, stellen Ihre Mission vor und machen auf Ihre Arbeit aufmerksam.
      </Paragraph>
      <Paragraph>
        Darüber hinaus freuen wir uns, wenn Sie sich im Gegenzug beispielsweise durch <Bold>Gastvorträge</Bold> oder <Bold>Einblicke in Ihre Arbeit</Bold> an unserem Netzwerk beteiligen.
      </Paragraph>
    </Card>
  </CardContainer>
</Section>

<Section title="Wie kannst du als Mitglied bei uns helfen?" tag="volunteer" color="secondary">
  <Paragraph>
    Die Mitgliedschaft bei <Bold>Youth4Paws</Bold> ist vollständig <Bold>ehrenamtlich und unentgeltlich</Bold>.
  </Paragraph>
  <Paragraph>
    Grundsätzlich unterscheiden wir zwei Formen der Mitarbeit. Du kannst dich entweder <Bold>direkt in Tierschutzprojekten engagieren</Bold> oder <Bold>intern in unserer Initiative mitwirken</Bold> (oder Beides!).
  </Paragraph>

  <CardContainer>
    <Card>
      <Subtitle>1. Unterstützung in Tierschutzprojekten</Subtitle>
      <Paragraph>
        In dieser Rolle arbeitest du <Bold>direkt mit unseren Partnerorganisationen</Bold> zusammen — also mit Tierheimen, Tierrettungen oder anderen Tierschutzvereinen.
      </Paragraph>
      <Paragraph>
        Dein Engagement kann dabei ganz unterschiedlich aussehen:
      </Paragraph>
      <List>
        <ListElement>
          Unterstützung bei <Bold>Aufräum- oder Renovierungsaktionen</Bold>
        </ListElement>
        <ListElement>
          Aufbau oder Pflege von <Bold>Websites und Social Media</Bold>
        </ListElement>
        <ListElement>
          Hilfe bei <Bold>organisatorischen oder administrativen Aufgaben</Bold>
        </ListElement>
      </List>
    </Card>

    <Card>
      <Subtitle>2. Interne Mitarbeit</Subtitle>
      <Paragraph>
        Hier unterstützt du die <Bold>Organisation und Weiterentwicklung unserer Initiative</Bold> selbst.
      </Paragraph>
      <Paragraph>
        Das bedeutet, du arbeitest an Themen wie
      </Paragraph>
      <List>
        <ListElement>
          Aufbau und Pflege unserere <Bold>Website</Bold>
        </ListElement>
        <ListElement>
          <Bold>Optimierung</Bold> interner <Bold>Prozesse</Bold>
        </ListElement>
        <ListElement>
          <Bold>Organisation</Bold> von <Bold>Projekten</Bold> und <Bold>Kooperationen</Bold>
        </ListElement>
        <ListElement>
          Unterstützung beim Aufbau unserer <Bold>Social Media Kanäle</Bold>
        </ListElement>
        <ListElement>
          <Bold>Kommunikation</Bold> innerhalb des <Bold>Teams</Bold>
        </ListElement>
      </List>
      <Paragraph>
        Diese Rolle ist ideal für alle, die <Bold>strategisch und strukturell</Bold> mitgestalten möchten. Wir erwarten hierbei ein regelmäßiges Engagement von etwa <Bold>2–3 Stunden pro Woche</Bold>. Da wir uns aufeinander verlassen müssen, legen wir großen Wert auf <Bold>Verbindlichkeit und Zuverlässigkeit</Bold>. Nur so können wir gemeinsam wirkungsvoll arbeiten.
      </Paragraph>
    </Card>
  </CardContainer>
</Section>