<template>
  <div class="result">
    <h4>{{ name }}: {{ value }}{{ unit }}
      <Badge :badge-data="getBadgeData()" :is-positive="isPositive" v-if="!hideBadge"></Badge>
    </h4>
    <div class="gauge-row">
      <div class="left-container" v-if="!isLowest">
        <Arrow :gradient-id="shortName + 'leftArrow'" :color-start="gaugeLower" :color-end="gaugeLower"></Arrow>
        <div class="text-center">{{ lowerBound - value }}{{ unit }} von {{ previousScore }}{{ scoreUnit }} entfernt
        </div>
      </div>
      <div class="gauge-container">
        <Gauge :positive="isPositive" :lower-color="gaugeLower" :upper-color="gaugeUpper" :gradient-id="gradientId"
               :percent="fractal * 100"></Gauge>
      </div>
      <div class="right-container" v-if="!isHighest">
        <Arrow :gradient-id="shortName + 'rightArrow'" :color-start="gaugeUpper" :color-end="gaugeUpper"></Arrow>
        <div class="text-center">+{{ upperBound - value }}{{ unit }} von {{ nextScore }}{{ scoreUnit }} entfernt</div>
      </div>
    </div>

    <span class="toggler" @click="showAllDetails()" v-if="!showAll">Grenzwerte anzeigen</span>
    <span class="toggler" @click="hideAllDetails()" v-else>Grenzwerte ausblenden</span>
    <div :class="'scale ' + scaleClasses">
      <div class="scale-child" v-for="n in totalSections" :key="n"
           :style="'background-color: ' + colorCodes[n]" @click="toggleDetailsOfScore(n)">
        <div class="marker" v-if="showBar && isActualScore(n-1)" :style="'left:' + fractal*100 + '%;'"></div>
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
import Badge from "@/components/Badge";

const green = '#67ff00'
const yellow = '#ffd200'
const red = '#ff7f00'

export default {
  name: "Scale",
  components: {Badge, Arrow, Gauge},
  props: {
    data: Number,
    fractal: Number,
    value: Number,
    scale: Array,
    name: String,
    shortName: String,
    isPositive: Boolean,
    unit: String,
    scoreUnit: String,
    scaleClasses: String,
    hideBadge: {
      default: false,
      type: Boolean
    },
    green: {
      default: green,
      type: String
    },
    yellow: {
      default: yellow,
      type: String
    },
    red: {
      default: red,
      type: String
    },
    scoreColorsOverride: Array,
    wasUsedInCalculation: Boolean
  },
  data() {
    return {
      detailsSelectedScoreIndex: Number,
      showAll: false,
      badgeData: Object
    }
  },
  emits: ['colors-calculated'],
  computed: {
    sectionLength() {
      return TotalLength / this.totalSections;
    },
    totalSections() {
      return this.scale.length
    },

    colorCodes() {
      if (this.scoreColorsOverride) {
        return ['', ...this.scoreColorsOverride]
      }
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

      return colors
    },
    lowerLimits() {
      return this.scale.map((elem) => elem[0])
    },
    scores() {
      console.log(this.scale.map((elem) => elem[elem.length - 1]))
      return this.scale.map((elem) => elem[elem.length - 1])
    },

    previousScore() {
      return this.scores[this.currentScoreIndex - 1]
    },

    nextScore() {
      return this.scores[this.currentScoreIndex + 1]
    },

    currentScoreIndex() {
      return this.scores.indexOf(this.data)
    },

    showBar() {
      return !((this.value === 0) || (this.isHighest && this.fractal === 1))
    },

    gradientId() {
      return this.shortName + 'GaugeGradient'
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
    },
    inFirstHalf() {
      console.log(this.name, 'idxOf', this.scores.indexOf(this.data))
      console.log((this.scores.indexOf(this.data) < (this.scores.length * 0.5)))
      return (this.scores.indexOf(this.data) < (this.scores.length * 0.5))
    },
    gaugeLower() {
      console.log('ifh', this.inFirstHalf)

      return this.inFirstHalf ? ((this.isPositive) ? this.red : this.green) : this.yellow
    },
    gaugeUpper() {
      return this.inFirstHalf ? this.yellow : ((this.isPositive) ? this.green : this.red)
    },
    tableDataScore() {
      return this.getScoreDataFromTable(this.data)
    },
    lowerBound() {
      return this.tableDataScore[0]
    },
    upperBound() {
      return this.tableDataScore[1]
    },
    isLowest() {
      return !isFinite(this.lowerBound)
    },
    isHighest() {
      return !isFinite(this.upperBound)
    }

  },
  mounted() {
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
    },
    getBadgeData() {
      let badgeData = {
        value: this.data + this.scoreUnit,
        percentage: this.fractal * 100,
        color: this.colorCodes[this.currentScoreIndex] + ((this.wasUsedInCalculation) ? 'FF' : '77')
      }
      console.log(badgeData)
      this.$emit('colors-calculated', badgeData)

      return badgeData
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
  font-size: 16pt;
  position: relative;
  /*color: #FFFFFF;*/
}

.text-white > .scale-child {
  color: #FFF !important;
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

.text-white > .scale-child > .scale-item-score.actual-score {
  color: #fff;
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
  font-size: 11pt;
  z-index: 1001;
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