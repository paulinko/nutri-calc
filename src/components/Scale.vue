<template>
  <div class="result">
    <div>{{ name }}</div>
    <div class="scale">
      <div class="scale-child" v-for="n in totalSections" :key="n" :style="'background-color: ' + colorCodes[n]">
            <span :class="classes(n-1)">
              {{ scores[n - 1] }}

            </span>
      </div>
    </div>
  </div>
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
    },
    classes(i) {
      let classList = 'scale-item-score'
      if (this.data === this.scores[i]) {
        return classList + ' actual-score'
      }
      return classList
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
}
</style>