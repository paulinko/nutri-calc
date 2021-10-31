<template>
  <svg viewBox="0 0 350 200">
    <g v-for="n in totalSections" :key="n">
      <rect :x="n * sectionLength" y="0" :width="sectionLength" height="40"
            :fill="colorCodes[n]" stroke="#FFF"/>
      <text :x="n * sectionLength + 0.25*sectionLength" y="25" lengthAdjust="spacing" :width="sectionLength" :textLength="sectionLength + 0.25*sectionLength"
            fill="#FFF" stroke="#FFF">{{ scores[n] }}
      </text>
    </g>
    <!--    <rect v-for="n in totalSections" :key="n" :x="n * sectionLength" y="0" :width="sectionLength" height="40"-->
    <!--          :fill="colorCodes[n]" stroke="#FFF"/>-->
    <!--    <text v-for="n in totalSections" :key="n" :x="n * sectionLength" y="40" lengthAdjust="spacing" :width="sectionLength" :textLength="sectionLength"-->
    <!--          fill="#FFF" stroke="#FFF">{{scores[n]}}</text>-->
  </svg>

  <pre>{{ data }}</pre>
  <pre>{{ scale }}</pre>
</template>

<script>

const TotalLength = 300

export default {
  name: "Scale",
  props: {
    data: Number,
    scale: Array,
    name: String,
    isPositive: Boolean,
  },
  computed: {
    sectionLength() {
      return TotalLength / this.totalSections;
    },
    totalSections() {
      return this.scale.length
    },
    colorCodes() {
      let colors = []
      const hue = 255
      if (this.isPositive) {
        for (let i = 0; i <= this.totalSections; i++) {
          let red = 255 - Math.ceil(i * 255 / this.totalSections)
          let green = Math.ceil(i * 255 / this.totalSections)
          let blue = 0
          colors.push(this.toHexCode(red, green, blue))
        }
      } else {
        for (let i = 0; i <= this.totalSections; i++) {
          let green = 0
          let red = 0
          if (i > this.totalSections / 2) {
            red = Math.ceil(i * (1 / this.totalSections) * hue * 2)
            green = hue - Math.ceil(i * (1 / this.totalSections) * hue / 2)
          } else {
            green = hue
            red = Math.ceil(i * (1 / this.totalSections) * 2 * hue)
          }
          let blue = 0
          colors.push(this.toHexCode(red, green, blue))
        }

      }
      console.log(colors, this.totalSections)
      return colors
    },
    lowerLimits() {
      return this.scale.map((elem) => elem[0])
    },
    scores() {
      console.log(this.scale.map((elem) => elem[elem.length - 1]))
      return this.scale.map((elem) => elem[elem.length - 1])
    }
  },
  mounted() {

  },
  methods: {
    toHexCode(red, green, blue) {
      red = (red > 255) ? 255 : red
      blue = (red > 255) ? 255 : blue
      green = (red > 255) ? 255 : green
      return '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0')
    }
  }
}
</script>

<style scoped>

</style>