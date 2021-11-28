<template>
  <div class="result">
    <h4>{{ name }}: {{ value }}{{ unit }}</h4>
    <div class="gauge-row">
      <div class="left-container" v-if="!isLowest">
        <Arrow :gradient-id="shortName + 'leftArrow'" :color-start="gaugeLower" :color-end="gaugeLower"></Arrow>
        <div class="text-center">{{lowerBound - value}}{{unit}} von {{data - 1 }} Punkte entfernt</div>
      </div>
      <div class="gauge-container">
        <Gauge :positive="isPositive" :lower-color="gaugeLower" :upper-color="gaugeUpper"
               :percent="fractal * 100"></Gauge>
      </div>
      <div class="right-container" v-if="!isHighest">
        <Arrow :gradient-id="shortName + 'rightArrow'" :color-start="gaugeUpper" :color-end="gaugeUpper"></Arrow>
        <div class="text-center">+{{upperBound - value}}{{unit}} von {{data  + 1}} Punkten entfernt</div>
      </div>
    </div>

    <span class="toggler" @click="showAllDetails()" v-if="!showAll">Grenzwerte anzeigen</span>
    <span class="toggler" @click="hideAllDetails()" v-else>Grenzwerte ausblenden</span>
    <div class="scale">
      <div class="scale-child" v-for="n in totalSections" :key="n"
           :style="'background-color: ' + colorCodes[n]" @click="toggleDetailsOfScore(n)">
        <div class="marker" v-if="value && isActualScore(n-1)" :style="'left:' + fractal*100 + '%;'"></div>
        <span class="score-details" v-if="isSelectedScore(n)">{{
            getRangeString(n)
          }}</span>
        <span v-else :class="classes(n-1)">{{ scores[n - 1] }}</span>
      </div>
    </div>
  </div>
</template>

<script>

const TotalLength = 300

import Arrow from "@/components/Arrow";
import Gauge from "@/components/Gauge";


export default {
  name: "Scale",
  components: {Arrow, Gauge},
  props: {
    data: Number,
    fractal: Number,
    value: Number,
    scale: Array,
    name: String,
    shortName: String,
    isPositive: Boolean,
    unit: String
  },
  data() {
    return {
      gaugeLower: String,
      gaugeUpper: String,
      detailsSelectedScoreIndex: Number,
      showAll: false,
      isHighest: false,
      isLowest: false,
      upperBound: Number,
      lowerBound: Number
    }
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
      for (let i = 0; i <= this.totalSections; i++) {
        let green = 0
        let red = 0
        if (i > this.totalSections / 2) {
          red = Math.ceil(i * (1 / this.totalSections) * hue * 2)
          green = hue - Math.ceil(i * (1 / this.totalSections) * hue / 2)
        } else {
          green = hue
          red = Math.ceil(i * (1 / this.totalSections) * 2.5 * hue)
        }
        let blue = 0
        colors.push(this.toHexCode(red, green, blue))
      }

      if (this.isPositive) {
        colors = colors.reverse()
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
    },

    nextColor() {
      let i = this.scores.indexOf(this.data)
      if (i >= 0 && (i++) < (this.scores.length)) {
        return this.colorCodes[i]
      } else {
        return this.colorCodes[0]
      }
    },

    previousColor() {
      let i = this.scores.indexOf(this.data)
      if (i > 0) {
        return this.colorCodes[i - 1]
      } else {
        return this.colorCodes[0]
      }
    }
  },
  mounted() {
    const green = '#67ff00'
    const yellow = '#ffd200'
    const red = '#ff7f00'
    let lower = ''
    let upper = ''
    if (this.data / this.scale.length < 0.5) {
      upper = yellow
      lower = (this.isPositive) ? red : green
    } else {
      upper = (this.isPositive) ? green : red
      lower = yellow
    }

    this.gaugeUpper = upper
    this.gaugeLower = lower

    let scoreData = this.getScoreDataFromTable(this.data)
    this.lowerBound = scoreData[0]
    this.upperBound = scoreData[1]

    if (!isFinite(this.lowerBound)) {
      this.isLowest = true;
    }
    if (!isFinite(this.upperBound)) {
      this.isHighest = true;
    }

    this.detailsSelectedScoreIndex = -1
  },
  methods: {
    toHexCode(red, green, blue) {
      red = (red > 255) ? 255 : red
      blue = (red > 255) ? 255 : blue
      green = (red > 255) ? 255 : green
      return '#' + red.toString(16).padStart(2, '0') + green.toString(16).padStart(2, '0') + blue.toString(16).padStart(2, '0')
    },

    isActualScore(i) {
      return this.data === this.scores[i]
    },

    classes(i) {
      let classList = 'scale-item-score'
      if (this.isActualScore(i)) {
        return classList + ' actual-score'
      }
      return classList
    },

    isSelectedScore(i) {
      return (this.detailsSelectedScoreIndex === i) || this.showAll
    },

    getScoreDataFromTable(score) {
      return this.scale.find((row) => row[row.length - 1] === score)
    },

    getRangeString(i) {
      let lowerBound = this.scale[i - 1][0]
      let upperBound = this.scale[i - 1][1]
      if (lowerBound === -Infinity) {
        return `< ${upperBound}${this.unit}`
      } else if (upperBound === Infinity) {
        return `> ${lowerBound}${this.unit}`
      }

      return `${lowerBound}${this.unit} - ${upperBound}${this.unit}`
    },

    toggleDetailsOfScore(i) {
      if (this.detailsSelectedScoreIndex === i) {
        this.detailsSelectedScoreIndex = -1
      } else {
        this.detailsSelectedScoreIndex = i
      }
    },

    showAllDetails() {
      this.detailsSelectedScoreIndex = -1
      this.showAll = true
    },
    hideAllDetails() {
      this.showAll = false
    }
  }
}
</script>

<style scoped>
.scale {
  display: flex;
  width: 98vw;
  max-width: 800px;
  margin: auto;
  align-items: normal;
  height: 5rem;
  justify-content: center;
}


.scale-child {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  max-height: 10vw;
  color: #0000007F;
  max-width: 10%;
  cursor: pointer;
  position: relative;
  /*color: #FFFFFF;*/
}

.scale-child > span {
  /*filter: invert(100%); */
}

.scale-child:first-child {
  border-radius: 25% 0 0 25%;
}

.scale-child:last-child {
  border-radius: 0 25% 25% 0;
}

.scale-item-score.actual-score {
  font-size: xx-large;
  font-weight: bold;
  color: #000;
}

.result {
  margin-top: 1vh;
  margin-bottom: 5vh;
}

.gauge-container {
  max-width: 50%;
}

.left-container, .right-container {
  width: 10%;
}

.right-container > svg {
  transform: rotate(180deg);
}

.gauge-row {
  display: flex;
  justify-content: center;
}

.score-details {
  text-align: center;
}

.toggler {
  cursor: pointer;
}

.marker {
  height: 100%;
  position: absolute;
  z-index: 1000;
  border-left: 3px solid #00F7;
  top: 0;
  left: 125px;
  width: 0;
}
</style>