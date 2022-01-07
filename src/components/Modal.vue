<template>
  <div :class="'overlay ' + classes" @click="closeModal()">
    <div :class="'nutri-modal ' + classes">
      <h4>{{ title }} <span class="float-end clickable" @click="closeModal()">&times;</span></h4>
      <div class="content-container">
        <div v-if="mode === 'goodStuff'">
          <h5>Arten</h5>
          <p class=" text-success">
            <span>✔</span> Obst, Gemüse und Hülsenfrüchte sowie Nüsse und Schalenfrüchte zählen in die Berechnung, aber ...
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
          <p>
            Obst, Gemüse, Hülsenfrüchte und Nüsse werden dann in den Nutri-Score einberechnet, wenn sie
            <span class="fw-bolder text-success">im Ganzen im Lebensmittel enthalten oder geschnitten, geschält, gefroren, getrocknet, gegart
            oder in Dosen konserviert sind</span>. <span class="fw-bolder text-success">Sie dürfen gesüßt, gesalzen und mariniert sein.</span>
            <span class="text-warning">
              Auch <span class="fw-bolder">Säfte und Pürees</span> zählen dazu, wenn das Obst und Gemüse nur gepresst, püriert oder anders zerkleinert
          und nicht weiterverarbeitet wurde.
          </span>
            Säfte werden gezählt, nicht jedoch konzentrierter Sirup oder
            hoch verarbeitetes Obst und Gemüse.
          </p>
          <hr>
          <h5>Beispiele</h5>
          <span class="fw-bold">Okay sind:</span>
          <ul>
            <li>Obst
              <ul>
                <li>Geschnittene Früchte</li>
              </ul>
            </li>
          </ul>

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
      }, 500);
      // this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
.text-warning {
  color: #ff9e07 !important;
}
</style>