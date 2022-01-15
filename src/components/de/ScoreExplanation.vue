<template>
  <div>
    <p>
      Zuerst werden die Punkte für die negativen Inhaltsstoffe berechnet: <br>
      <span class="fst-italic">{{ negativesSum }} = {{ result.badScore }}P</span>
    </p>
    <p>
      Dann werden Punkte für die positiven Inhaltsstoffe abgezogen.
      Bei den positiven Inhaltsstoffen wurden die Punkte für Protein <span v-if="!result.applyProtein">nicht</span>
      gewertet, {{ proteinAppliedReason }}.
      Die Gesamtsumme der positiven Inhalte wird daher wie folgt berechnet: <br>
      <span class="fst-italic">{{ positivesSum }} = {{ goodScore }}P</span>
    </p>
    <p>
      Um das Gesamtergebnis zu erhalten, wird die Summe der guten Inhaltsstoffe {{ goodScore }}P von der Summe der
      schlechten Inhaltsstoffe {{ result.badScore }}P abgezogen: <br>
      <span class="fst-italic">{{ result.badScore }}P - {{ goodScore }}P = {{ result.totalScore }}P</span>
    </p>
    <p>
      Das ergibt {{ result.letterScore.value }} Punkte und entspricht somit einem Nutri-Score von
      {{ result.letterScore.points }}.
    </p>
  </div>
</template>

<script>

import {GetProteinAppliedReason, GetDisplayNames} from '@/libs/str_functions';
import {WasPropUsedInCalculation} from "@/libs/tables";

export default {
  name: "ScoreExplanation",
  props: {
    result: Object
  },
  computed: {
    negativesSum() {
      return this.getSumStringForMap(this.result.negatives)
    },
    positivesSum() {
      return this.getSumStringForMap(this.result.positives)
    },
    goodScore() {
      return Math.abs(this.result.totalScore - this.result.badScore)
    },
    proteinAppliedReason() {
      return GetProteinAppliedReason(this.result.proteinAppliedReason)
    }
  },
  methods: {
    getSumStringForMap(m) {
      let positions = [];
      m.forEach((v, k) => (WasPropUsedInCalculation(k, this.result)) ? positions.push(`${v.points}P(${GetDisplayNames(k)})`) : true)
      return positions.join(' + ')
    }
  }
}
</script>

<style scoped>

</style>