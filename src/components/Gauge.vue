<template>
  <svg viewBox="0 0 100 50" version="1.1"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <Gradient :id="gradientId" :color-start="lowerColor"
                :color-end="upperColor"></Gradient>
    </defs>
    <path d="M 0 50
           A 50 50, 0, 0, 1, 100 50
           Z" :fill="`url(#${gradientId})`"/>
    <path d="M 25 51
           A 25 25, 0, 0, 1, 75 51
           Z" fill="white"/>
    <path :d="tachoNeedlePath" stroke="black"/>
  </svg>
</template>

<script>

import Gradient from "@/components/Gradient";

export default {
  name: "Arrow",
  components: {Gradient},
  props: {
    positive: Boolean,
    upperColor: String,
    lowerColor: String,
    percent: Number
  },
  data() {
    return {
      bestColor: '#3aff00',
      middleColor: '#ffff00',
      worstColor: '#ff7f00'
    };
  },

  computed: {
    gradientId() {
      return this.positive ? 'positiveGaugeGradient' : 'negativeGaugeGradient'
    },
    tachoNeedlePath() {
      return `M 50 50
           L ${this.tachoX} ${this.tachoY}`
    },
    tachoX() {
      const radius = 50
      let angle = this.percent * (Math.PI / 100)
      let coordinates = this.polarToCartesian(angle, radius)
      console.log('coords', coordinates)
      console.log('angle', angle)
      return 50 - coordinates[0]
    },
    tachoY() {
      const radius = 50
      let angle = this.percent * (Math.PI / 100)
      let coordinates = this.polarToCartesian(angle, radius)
      console.log('coords', coordinates)
      console.log('angle', angle)
      return 50 - coordinates[1]
    },
  },
  methods: {
    polarToCartesian(angle, r) {
      let x = r * Math.cos(angle)
      let y = r * Math.sin(angle)

      return [x, y]
    }
  }
}
</script>

<style scoped>

</style>