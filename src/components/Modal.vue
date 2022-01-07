<template>
  <div :class="'overlay ' + classes" @click="closeModal()">
    <div :class="'nutri-modal ' + classes">
      <h4>{{ title }} <span class="float-end clickable" @click="closeModal()">&times;</span></h4>
      <div class="content-container">
        <div v-if="mode === 'goodStuff'">
          <p>
            Hier werden die Anteile von Obst, Gemüse und Hülsenfrüchten sowie Nüsse und Schalenfrüchte bewertet.
          </p>
          <h5>Einschränkungen</h5>
          <p class=" text-success">
            <span>✔</span> Obst, Gemüse und Hülsenfrüchte sowie Nüsse und Schalenfrüchte zählen in die Berechnung, aber
            ...
          </p>
          <p class=" text-danger">
            &times; <span class="fw-bolder"> stärkereiche Knollen (z.B Kartoffeln und Süßkartoffeln), Quinoa und
            Gewürze</span>, Mehl aus Mais oder Hülsenfrüchten zählen nicht.
          </p>
          <hr>
          <h5>Wichtige Berechnunginfos</h5>
          <p>
            <span class="fw-bolder">Eingelegte Lebensmittel</span> Die Flüssigkeit kann nur in die Berechnung einbezogen
            werden, wenn sie verzehrt werden soll.
          </p>
          <p>
            <span class="fw-bolder">Gekochte/Getrocknetes Lebensmittel</span> Der Hersteller kann selbst entscheiden, ob
            er das Gewicht der gekochten oder ungekochten Zutat einberechnet.

          </p>
          <hr>
          <h5>Verarbeitung</h5>
          <p class=" text-success">
            <span>✔</span> im Ganzen enthalten, geschnitten und geschält
          </p>
          <p class=" text-success">
            <span>✔</span>  gefroren, getrocknet, gegart und in Dosen konserviert sind
          </p>
          <p class=" text-warning">
            <span>✔</span>  Säfte und Pürees, falls das Obst und Gemüse nur gepresst, püriert oder anders zerkleinert wurde
          </p>
          <p class="text-danger">
            <span class="fw-bolder">&times;</span>  kein konzentrierter Sirup oder hoch verarbeitetes Obst und Gemüse.
          </p>
        </div>
        <div v-else-if="mode === 'salt'">
          <p>
            <!--            TODO-->
            Der Salzgehalt eines Nahrungsmittels ist auf der Rückseite der Verpackung in der Nährwert-
            tabelle zu finden. Ungefähr 40 Prozent der Masse von Salz, die in einem Produkt enthalten ist,
            besteht aus Natrium. Um den Natriumgehalt zu berechnen, der in die Wertung des Nutri-Score
            eingeht, wird daher der vom Hersteller angegebene Salzgehalt durch 2,5 geteilt.
          </p>
        </div>
        <div v-else>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    title: {
      type: String,
      default: 'info'
    },
    mode: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      classes: 'fade-in'
    }
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.classes = 'fade-out'
      setTimeout(() => {
        this.$emit('close-modal')
        this.classes = 'fade-in'
      }, 450);
    }
  }
}
</script>

<style scoped>
.text-warning {
  color: #ff9e07 !important;
}
</style>