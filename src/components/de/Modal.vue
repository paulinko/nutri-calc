<template>
  <div class="modal fade show" tabindex="-1" role="dialog" style="display: block" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close clickable" @click="closeModal()" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="mode === 'goodStuff'">
            <p>
              Hier werden die Anteile von Obst, Gemüse und Hülsenfrüchten sowie Nüsse und Schalenfrüchte bewertet.
            </p>
            <h5>Einschränkungen</h5>
            <p class=" text-success">
              <inline-icon type="check"></inline-icon>
              Obst, Gemüse und Hülsenfrüchte sowie Nüsse und Schalenfrüchte zählen in die Berechnung, aber
              ...
            </p>
            <p class=" text-danger">
              <inline-icon type="times"></inline-icon>
              <span class="fw-bolder"> stärkereiche Knollen (z.B Kartoffeln und Süßkartoffeln), Quinoa und
            Gewürze</span>, Mehl aus Mais oder Hülsenfrüchten zählen nicht.
            </p>
            <hr>
            <h5>Wichtige Berechnunginfos</h5>
            <p>
              <span class="fw-bolder">Eingelegte Lebensmittel</span> Die Flüssigkeit kann nur in die Berechnung
              einbezogen
              werden, wenn sie verzehrt werden soll.
            </p>
            <p>
              <span class="fw-bolder">Gekochte/Getrocknetes Lebensmittel</span> Der Hersteller kann selbst entscheiden,
              ob
              er das Gewicht der gekochten oder ungekochten Zutat einberechnet.

            </p>
            <hr>
            <h5>Verarbeitung</h5>
            <p class=" text-success">
              <inline-icon type="check"></inline-icon>
              im Ganzen enthalten, geschnitten und geschält
            </p>
            <p class=" text-success">
              <inline-icon type="check"></inline-icon>
              gefroren, getrocknet, gegart und in Dosen konserviert sind
            </p>
            <p class=" text-warning">
              <inline-icon type="check"></inline-icon>
              Säfte und Pürees, falls das Obst und Gemüse nur gepresst, püriert oder anders zerkleinert wurde
            </p>
            <p class="text-danger">
              <inline-icon type="times"></inline-icon>
              kein konzentrierter Sirup oder hoch verarbeitetes Obst und Gemüse.
            </p>
          </div>
          <div v-else-if="mode === 'salt'">
            <p>
              When calculating the Nutri-Score, the sodium content is rated negative.
              The sodium content can be calculated from the amount of salt .
              Enter the salt content specified by the manufacturer in the input field, and the application calculates
              the sodium content (40% of the salt contained).
            </p>
          </div>
          <div v-else-if="mode === 'share'">
            <p>
              With this URL you can show others your calculation:
            </p>
            <input type="text" class="form-control" ref="shareUrl" :value="vars.shareUrl">
            <button class="btn btn-primary btn-copy btn-lg mx-auto d-block my-1"
                    @click="copy($refs.shareUrl, $event.target)">Copy
            </button>
          </div>
          <div v-else>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InlineIcon from "@/components/InlineIcon";

export default {
  name: "modal",
  components: {InlineIcon},
  props: {
    title: {
      type: String,
      default: 'info'
    },
    mode: {
      type: String,
      default: 'info'
    },
    vars: Object
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
    },
    copy(textInput, btn) {
      textInput.select();
      textInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(textInput.value);
      let initialClassList = btn.classList.toString()
      let initialText = btn.innerText

      btn.innerText = 'Copied'
      btn.classList = initialClassList + ' btn-success'
      setTimeout(() => {
        btn.classList = initialClassList
        btn.innerText = initialText
      }, 1000)
    }
  }
}
</script>

<style scoped>
.text-warning {
  color: #ff9e07 !important;
}

.copy .btn-copy {
  transition: 0.3s ease-in;
}
</style>