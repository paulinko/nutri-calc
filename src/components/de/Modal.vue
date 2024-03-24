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
            <p v-if="algorithm === 'original_algorithm'">
              Bei der Berechnung des Nutri-Scores wird der Natriumgehalt negativ gewertet.
              Dieser kann aus dem Salzgehalt berechnet werden.
              Geben Sie in dem Eingabefeld den von Hersteller angegebenen Salzgehalt an, die Anwendung berechnet dafür
              den Natriumgehalt (40% des enthaltenden Salzes).
            </p>
            <p v-else-if="algorithm === 'updated2023'">
              Bei der Berechnung des Nutri-Scores wird der Salzgehalt negativ gewertet.
            </p>
            <ImageComponent name="Salz" prop="salt"></ImageComponent>
          </div>
          <div v-else-if="mode === 'kJ'">
            <p>
              KiloJoule (kJ) geben den Energiegehalt eines Lebensmittels an.
              Er ist auf der Verpackung des Lebensmittels in der Nährwerttabelle zu finden.
            </p>
            <ImageComponent name="KiloJoule" prop="kJ"></ImageComponent>
          </div>
          <div v-else-if="mode === 'satFats'">
            <p>
              Gesättigte Fette werden beim Nutri-Score negativ bewertet.
              Der Anteil gesättigter Fette ist auf der Verpackung des Lebensmittels in der Nährwerttabelle zu finden.
            </p>
            <ImageComponent name="gesättigte Fette" prop="satFats"></ImageComponent>
          </div>
          <div v-else-if="mode === 'sugar'">
            <p>
              Zucker wird beim Nutri-Score negativ bewertet.
              Zu Zucker zählen alle Arten von Zucker, also auch Fruchtzucker und Milchzucker, aber keine Süßstoffe.
              Der Zuckergehalt ist auf der Verpackung des Lebensmittels in der Nähwerttabelle zu finden.
              <ImageComponent name="Zucker" prop="sugar"></ImageComponent>
            </p>
          </div>
          <div v-else-if="mode === 'fiber'">
            <p>
              Bei der Berechnung des Nutri-Scores wird der Ballaststoffgehalt positiv gewertet.
              <span class="fw-bold">Leider ist die Angabe des Ballaststoffgehalt auf der Verpackung in Deutschland freiwillig.</span>
            </p>
            <p>
              Wenn der Ballaststoffgehalt nicht angegeben wurde, kann er möglicherweise beim Hersteller erfragt werden.
            </p>
            <ImageComponent name="Ballaststoff" prop="fiber"></ImageComponent>
          </div>
          <div v-else-if="mode === 'protein'">
            <p>
              Bei der Berechnung des Nutri-Scores wird Eiweiß (oder auch Protein genannt) positiv gewertet.
            </p>
            <ImageComponent name="Eiweiß" prop="protein"></ImageComponent>
          </div>
          <div v-else-if="mode === 'share'">
            <p>
              Mit dieser URL kannst du anderen deine Berechnung zeigen:
            </p>
            <input type="text" class="form-control" ref="shareUrl" :value="vars.shareUrl">
            <button class="btn btn-primary btn-copy btn-lg mx-auto d-block my-1 mb-2"
                    @click="copy($refs.shareUrl, $event.target)">Kopieren
            </button>
          </div>
          <div v-else-if="mode === 'imprint'">
            <span class="fw-bold">Kontakt</span>
            <p>
              E-Mail: info(at)nutrirechner.xyz <br>
              <a href="https://github.com/paulinko/nutri-calc" target="_blank">Quellcode auf Github</a>
            </p>
          </div>
          <div v-else-if="mode === 'privacy'">
            <span class="fw-bold">Server/Log Files</span>
            <p>
              Der Anbieter (beziehungsweise sein Webspace-Provider) erhebt Daten über jeden Zugriff auf das Angebot (so
              genannte Serverlogfiles). Zu den Zugriffsdaten gehören:
              Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, Meldung über
              erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor
              besuchte Seite), IP-Adresse und der anfragende Provider.
            </p>
            <p>
              Der Anbieter verwendet die Protokolldaten nur für statistische Auswertungen zum Zweck des Betriebs, der
              Sicherheit und der Optimierung des Angebotes. Der Anbieterbehält sich jedoch vor, die Protokolldaten
              nachträglich zu überprüfen, wenn aufgrund konkreter Anhaltspunkte der berechtigte Verdacht einer
              rechtswidrigen Nutzung besteht.
            </p>
            <span class="fw-bold">Kontakt</span>
            <p>
              Bei der Kontaktaufnahme mit dem Anbieter (zum Beispiel per E-Mail) werden die Angaben des Nutzers zwecks
              Bearbeitung der Anfrage sowie für den Fall, dass Anschlussfragen entstehen, gespeichert.
            </p>
          </div>
          <div v-else>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InlineIcon from "@/components/InlineIcon.vue";
import {h} from "vue";

const ImageComponent = (props, context) => {
  return h(
      'div', {}, [
        h('h6', {class: 'fw-bold'}, `Nährwerttabelle mit ${props.name} hervorgehoben:`),
        h('img', {
          class: 'nutri-table',
          src: `./img/table_de/table_de_${props.prop}.webp`,
          alt: `Nährwerttabelle mit ${props.name} markiert`
        })
      ])
}

import './TableImage.css';

export default {
  name: "modal",
  components: {InlineIcon, ImageComponent},
  props: {
    title: {
      type: String,
      default: 'info'
    },
    mode: {
      type: String,
      default: 'info'
    },
    algorithm: {
      type: String,
      default: 'updated2023'
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
      this.$emit('close-modal')
      this.classes = 'fade-in'
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