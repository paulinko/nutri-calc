<template>
<p>
  Zuerst werden die Punkte für die negativen Inhaltsstoffe berechnet: {{negativesSum}} = {{result.badScore}}.
</p>
<p>
  Dann werden Punkte für die positiven Inhaltsstoffe abgezogen.
  Bei den positiven Inhaltsstoffen wurden die Punkte für Protein <span v-if="!result.applyProtein">nicht</span> gewertet, {{proteinAppliedReason}}.
  Die Gesamtsumme der positiven Inhalte wird daher wie folgt berechnet: {{positivesSum}} = {{result.totalScore - result.badScore}}
</p>
<p>
    Das ergibt {{result.letterScore.value}} Punkte und entspicht somit einem Nutri-Score von {{result.letterScore.points}}.
</p>
</template>

<script>

import {ProteinAppliedDisplayNames, GetDisplayNames} from '@/libs/Strings'

export default {
  name: "ScoreExplanation",
  props: {
    result: Object
  },
  computed: {
    negativesSum() {
      return ''
    },
    positivesSum() {
      return ''
    },
    proteinAppliedReason() {
      return ProteinAppliedDisplayNames.get(this.result.proteinAppliedReason) ?? 'unbekannt'
    }
  }
}
</script>

<style scoped>

</style>