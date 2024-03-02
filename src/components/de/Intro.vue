<template>
  <div>
    <div class="alert alert-danger">
      Achtung: Die auf dieser Seite bereitgestellte Berechnungsmethode gilt nur für Produkte, die vor dem 1.1.2024 auf den Markt gekommen sind.
      Die neue Berechnungsmethode für Produkte, die ab dem 1.1.2024 gilt, wird demnächst zu dieser Seite hinzugefügt.
      Die Details zur aktualisierten Berechnungsmethode können in diese Dokument eingesehen werden: <a href="https://www.santepubliquefrance.fr/media/files/02-determinants-de-sante/nutrition-et-activite-physique/nutri-score/q-a-en"> Updated Nutri-Score Technical and Scientific FAQ </a>
    </div>

    <p>
      Der Nutri-Score ist ein freiwilliges Siegel, das einen schnellen und vereinfachten
      Vergleich von gleichartigen Lebensmitteln ermöglichen soll.
    </p>
    <p>
      Ziel dieses Rechners ist es, die Berechnung des Nutri-Scores zu veranschaulichen.
    </p>
    <p>
      <span class="fw-bold">Wichtiger Hinweis:</span> Diese App ist ein inoffizielles Projekt, alle Berechnungen und Angaben sind ohne Gewähr.
      Die offiziellen Berechnungsmaterialien des BMEL, auf denen dieses Projekt basiert, finden Sie <a href="https://www.bmel.de/SharedDocs/Downloads/DE/_Ernaehrung/Lebensmittel-Kennzeichnung/nutri-score-dt-excel-berechnungstabelle.html">hier</a>.
    </p>
    <div>
      <a href="#calculate" class="btn btn-success ">Jetzt berechnen</a>
      <a href="?kJ=1590+&sugar=22%2C4&satFats=0%2C6&sodium=0&protein=8%2C5&fiber=8%2C6&oil=0&goodStuff=0&totalFats=100&salt=0%2C22&mode=general&name=Schoko+Cerealien" class="btn btn-primary ms-1">
        Beispiel ansehen
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro"
}
</script>

<style scoped>

</style>