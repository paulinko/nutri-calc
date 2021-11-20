<template>
  <svg viewBox="0 0 100 50" version="1.1"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <Gradient :id="gradientId" :color-start="lowerColor"
                :color-end="upperColor"></Gradient>

      <!--      <Gradient v-if="positive" :id="gradientId" :color-start="worstColor" :color-middle="middleColor"-->
      <!--                :color-end="bestColor"></Gradient>-->

      <!--      <Gradient v-else :id="gradientId" :color-start="bestColor" :color-middle="middleColor"-->
      <!--                :color-end="worstColor"></Gradient>-->
    </defs>
    <path d="M 0 50
           A 50 50, 0, 0, 1, 100 50
           Z" :fill="`url(#${gradientId})`"/>
    <path d="M 25 51
           A 25 25, 0, 0, 1, 75 51
           Z" fill="white"/>
    <path :d="tachoNeedlePath" stroke="black"/>
<!--    <path d="M 50 50-->
<!--           L 50 0 " stroke="black"/>-->
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
      worstColor: '#ff7f00',
      tachoX: 0,
      tachoY: 0,
    };
  },

  mounted() {
    const radius = 50
    let angle = this.percent * (Math.PI / 100)
    let coordinates = this.polarToCartesian(angle, radius)
    console.log( 'coords',coordinates)
    console.log( 'angle',angle)
    this.tachoX = 50 - coordinates[0]
    this.tachoY = 50 - coordinates[1]
  },
  computed: {
    gradientId() {
      return this.positive ? 'positiveGaugeGradient' : 'negativeGaugeGradient'
    },
    tachoNeedlePath(){
      return `M 50 50
           L ${this.tachoX} ${this.tachoY}`
    }
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