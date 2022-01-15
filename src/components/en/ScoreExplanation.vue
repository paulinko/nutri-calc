<template>
  <div>
    <p>
      First the points for the negative ingredients are calculated: <br>
      <span class="fst-italic">{{ negativesSum }} = {{ result.badScore }}P</span>
    </p>
    <p>
      Then points are deducted for the positive ingredients.
      In the case of the positive ingredients, the points for protein were <span v-if="!result.applyProtein">not</span>
      deducted, {{ proteinAppliedReason }}.
      The total score for the positive ingredients is therefore calculated as follows:<br>
      <span class="fst-italic">{{ positivesSum }} = {{ goodScore }}P</span>
    </p>
    <p>
      To obtain the overall result, the sum of the good ingredients {{ goodScore }}P is deducted from the sum of
      negative ingredients ({{ result.badScore }}P): <br>
      <span class="fst-italic">{{ result.badScore }}P - {{ goodScore }}P = {{ result.totalScore }}P</span>
    </p>
    <p>
      This results in {{ result.letterScore.value }}  and thus corresponds to a Nutri-Score of
      {{ result.letterScore.points }}.
    </p>
  </div>
</template>

<script>

import {GetProteinAppliedReason, GetDisplayNames} from '@/libs/str_functions'
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