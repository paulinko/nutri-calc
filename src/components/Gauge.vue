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
    <path fill="#333" :d="tachoNeedleSemiCirclePath"></path>
    <path :d="tachoNeedlePath" stroke="#333" fill="#333"/>
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
    percent: Number,
    gradientId: String
  },
  data() {
    return {
      bestColor: '#3aff00',
      middleColor: '#ffff00',
      worstColor: '#ff7f00',
      innerCircleRadius: 6,
      middleX: 50,
      middleY: 50,
      shiftDown: 1,
      gaugeThickness: 6,
    };
  },

  computed: {
    tachoNeedlePath() {
            return `M ${this.tachoXStart} ${this.tachoYStart}
           L ${this.tachoX} ${this.tachoY} L ${this.tachoXEndt } ${this.tachoYEnd} Z`
    },
    tachoNeedleSemiCirclePath(){
      return `M ${ this.middleX - this.innerCircleRadius} ${this.middleY + this.shiftDown}
           A  5, 5, 0, 0, 1, ${this.middleX + this.innerCircleRadius } ${this.middleY + this.shiftDown}
           Z`
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
    tachoXStart() {
      const radius = this.innerCircleRadius-1
      let angle = (this.percent -this.gaugeThickness) * (Math.PI/ 100)
      let coordinates = this.polarToCartesian(angle, radius)
      console.log('coords', coordinates)
      console.log('angle', angle)
      return 50 - coordinates[0]
    },
    tachoYStart() {
      const radius = this.innerCircleRadius -1
      let angle = (this.percent-this.gaugeThickness) * (Math.PI/ 100)
      let coordinates = this.polarToCartesian(angle, radius)
      console.log('coords', coordinates)
      console.log('angle', angle)
      return 50 - coordinates[1]
    },
    tachoXEndt() {
      const radius = this.innerCircleRadius - 1
      let angle = (this.percent + this.gaugeThickness)  * (Math.PI/ 100)
      let coordinates = this.polarToCartesian(angle, radius)
      console.log('coords', coordinates)
      console.log('angle', angle)
      return 50 - coordinates[0]
    },
    tachoYEnd() {
      const radius = this.innerCircleRadius - 1
      let angle = (this.percent + this.gaugeThickness) * (Math.PI / 100)
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