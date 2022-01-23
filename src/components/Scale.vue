<template>
  <div class="result">
    <div>
      <a :id="shortName + 'Result'">
        <h4>{{ name }}: {{ value }}{{ unit }}
          <Badge :badge-data="getBadgeData()" :is-positive="isPositive" v-if="!hideBadge"></Badge>
          <span @click="detailsShown = !detailsShown" class="float-end clickable">{{
              (detailsShown ? '-' : '+')
            }}</span>
        </h4>
      </a>
    </div>
    <div class="details fade-in" v-if="detailsShown">
      <h5>{{ trans('score_limits') }} <small>({{ trans('higher_is') }} <span
          class="fw-bolder">{{ trans((isPositive) ? 'better' : 'worse') }}</span>)</small></h5>
      <p>{{ trans('score_limits_info') }}</p>
      <div>
        <div class="d-flex justify-content-end">
                  <span class="toggler text-primary float-end" @click="showAllDetails()"
                        v-if="!showAll">{{ trans('show_limits') }}</span>
          <span class="toggler text-primary" @click="hideAllDetails()" v-else>{{ trans('hide_limits') }}</span>
        </div>
        <div :class="'scale ' + scaleClasses">
          <div class="scale-child" v-for="n in totalSections" :key="n"
               :style="'background-color: ' + colorCodes[n]" @click="toggleDetailsOfScore(n)">
            <div class="marker" v-if="showBar && isActualScore(n-1)" :style="'left:' + fractal*100 + '%;'"></div>
            <div class="details-container" v-if="isSelectedScore(n)">
              <div :class="'score' + (isActualScore(n-1) ? ' active' : '')">{{ scores[n - 1] }}</div>
              <div>{{
                  getRangeString(n)
                }}
              </div>
            </div>
            <span v-else :class="classes(n-1)">{{ scores[n - 1] }}</span>
          </div>
        </div>
      </div>
      <div>
        <h5>{{ trans('tendency') }}</h5>
        <p>{{ trans('tendency_info') }}</p>
        <div class="gauge-row">
          <div class="left-container">
            <div v-if="!isLowest">
              <Arrow :gradient-id="shortName + 'leftArrow'" :color-start="gaugeLower" :color-end="gaugeLower"></Arrow>
              <div class="text-center">
                <span v-if="lowerBound - value !== 0">
                  {{
                    trans('diff_from_points', {
                      diff: round(lowerBound - value).toString() + unit,
                      points: (previousScore).toString() + scoreUnit
                    })
                  }}
                </span>
                <span v-else>{{ trans('bordering_on', {points: (previousScore).toString() + scoreUnit}) }}</span>
              </div>
            </div>
          </div>
          <div class="gauge-container">
            <Gauge :positive="isPositive" :lower-color="gaugeLower" :upper-color="gaugeUpper" :gradient-id="gradientId"
                   :percent="fractal * 100"></Gauge>
          </div>
          <div class="right-container">
            <div v-if="!isHighest">
              <Arrow :gradient-id="shortName + 'rightArrow'" :color-start="gaugeUpper" :color-end="gaugeUpper"></Arrow>
              <div class="text-center">
                <span v-if="lowerBound - value !== 0">
                  {{
                    trans('diff_from_points', {
                      diff: '+' + round(upperBound - value).toString() + unit,
                      points: (nextScore).toString() + scoreUnit
                    })
                  }}
                </span>
                <span v-else>{{ trans('bordering_on', {points: (nextScore).toString() + scoreUnit}) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {GetInfoTexts, trans} from "@/libs/str_functions";

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
    scaleClasses: {
      default: '',
      type: String
    },
    hideBadge: {
      default: false,
      type: Boolean
    },
    collapse: {
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
    wasUsedInCalculation: Boolean,
    detailsShownInitial: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      detailsSelectedScoreIndex: Number,
      showAll: false,
      badgeData: Object,
      detailsShown: this.detailsShownInitial
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
      return !isFinite(this.upperBound) || !this.nextScore
    }

  },
  mounted() {
    this.detailsSelectedScoreIndex = -1
  },
  methods: {
    trans,
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
      if (lowerBound === -Infinity && upperBound === -Infinity) {
        return 'n/a'
      }

      // const greater = 'über'
      // const lower = 'unter'
      const greater = '>'
      const lower = '<'
      if (lowerBound === -Infinity) {
        return `${lower} ${upperBound}${this.unit}`
      } else if (upperBound === Infinity) {
        return `${greater} ${lowerBound}${this.unit}`
      }

      return `${greater} ${lowerBound}${this.unit}`
    },

    round(v) {
      return Math.round(v * 100) / 100
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
    },
    getInfoText(prop) {
      return GetInfoTexts(prop)
    }
  }
}
</script>

<style scoped>
.scale {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: auto;
  align-items: normal;
  overflow-y: auto;
}


.scale-child {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 6ch;
  color: #0000007F;
  max-width: 10%;
  cursor: pointer;
  font-size: 16pt;
  position: relative;
  min-width: 6ch;
}

.details-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  /*line-height: 1rem;*/
  text-align: center;
  font-size: 1rem;
  z-index: 1001;
}

.details-container > .score {
  font-size: 1.3rem;
  line-height: 1.3rem;
}

.details-container > .score.active {
  font-weight: bolder;
  font-size: 1.5rem;
}


.text-white > .scale-child {
  color: #FFF !important;
}

.scale-child > span {
  /*filter: invert(100%); */
}

.scale-child:first-child {
  border-radius: 25% 0 0 25%;
  margin-left: auto;
}

.scale-child:last-child {
  border-radius: 0 25% 25% 0;
  margin-right: auto;
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
  margin-bottom: 1em;
  background: white;
  border-bottom: 1px #ccc solid;
  box-shadow: 0 5px 5px 0 #aaa;
  padding: 1em;
}

.gauge-container {
  flex-basis: 50%;
}

.left-container, .right-container {
  flex-basis: 15%;
  max-width: 25vw;
  padding: 1rem;
}

.right-container > div > svg {
  transform: rotate(180deg);
}

.gauge-row {
  display: flex;
  justify-content: center;
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

@keyframes fade-in {
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}

@keyframes slide-out {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 800px;
  }
}

.fade-in {
  overflow-y: hidden;
  animation: 1s slide-out;
}

.fade-out {
  animation: 1s slide-out reverse;
  overflow-y: hidden;
}
</style>