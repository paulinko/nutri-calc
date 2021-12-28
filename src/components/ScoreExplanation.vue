<template>
<p>
  Zuerst werden die Punkte für die negativen Inhaltsstoffe berechnet: <br>
  {{negativesSum}} = {{result.badScore}}P
</p>
<p>
  Dann werden Punkte für die positiven Inhaltsstoffe abgezogen.
  Bei den positiven Inhaltsstoffen wurden die Punkte für Protein <span v-if="!result.applyProtein">nicht</span> gewertet, {{proteinAppliedReason}}.
  Die Gesamtsumme der positiven Inhalte wird daher wie folgt berechnet: <br>
  <span class="fst-italic">{{positivesSum}} = {{result.totalScore - result.badScore}}P</span>
</p>
<p>
  Um das Gesamtergebnis zu erhalten, wird die Summe der guten Inhaltsstoffe {{positiveTotal}}P von der Summe der schlechten Inhaltsstoffe {{result.badScore}}P abgezogen: <br>

</p>
<p>
    Das ergibt {{result.letterScore.value}} Punkte und entspricht somit einem Nutri-Score von {{result.letterScore.points}}.
</p>
</template>

<script>

import {GetProteinAppliedReason, GetDisplayNames} from '@/libs/Strings'

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
    positiveTotal() {
      return this.result.totalScore - this.result.badScore
    },
    proteinAppliedReason() {
      return GetProteinAppliedReason(this.result.proteinAppliedReason)
    }
  },
  methods: {
    getSumStringForMap(m) {
      let positions = [];
      m.forEach((v, k) => positions.push(`${v.points}P(${GetDisplayNames(k)})`))
      return positions.join(' + ')
    }
  }
}
</script>

<style scoped>

</style>