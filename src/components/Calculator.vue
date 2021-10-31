<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <select v.model="mode">
        <option value="general">Allgemein</option>
        <option value="cheese">Käse</option>
        <option value="fats">Fette und Öle</option>
        <option value="general">Allgemein</option>
      </select>
      <form>
        <div v-for="(value, name) in currentTable.nutriprops" :key="name">
          <label :for="name">{{ displayNames(name) }}</label>
          <input type="text" :name="name" :id="name" v-model="nutritionalInfo[name]">
        </div>
      </form>
      <button @click="calculateScore()">Score berechnen</button>
    </div>
    <div class="result-container" v-if="result">
          <Scale :data="value" :name="displayNames(name)" :scale="currentScale[name]" v-for="(value, name) in result.negatives" :key="name"/>
<!--      <svg viewBox="0 0 100 100" v-for="(value, name) in result.negatives" :key="name">-->
<!--        <rect x="10" y="50" width="20" height="50" fill="gold"/>-->
<!--        <rect x="70" y="50" width="20" height="50" fill="gold"/>-->
<!--        <circle cx="35" cy="45" r="5"/>-->
<!--        <circle cx="65" cy="45" r="5"/>-->
<!--      </svg>-->



      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>

import Scale from "@/components/Scale";

function getPoints(table, value) {
  value = parseInt(value)
  for (const row of table) {
    if (row.length === 3) {
      if (value > row[0] && value <= row[1]) {
        return row[2]
      }
    }
    if (row.length === 2) {
      if (value < row[0]) {
        return row[1]
      }
    }
  }
  return null;
}

const displayNames = {
  kJ: 'kJ',
  sugar: 'Zucker',
  satFats: 'gesättigte Fette',
  sodium: 'Salz',
  protein: 'Protein',
  fiber: 'Ballaststoffe',
  goodStuff: 'Vollkorn etc.',
}

// from, To, Points
// To, Points
const generalTable = {
  nutriprops: {
    kJ: [ //E2
      [-Infinity, 335, 0],
      [335, 670, 1],
      [670, 1005, 2],
      [1005, 1340, 3],
      [1340, 1675, 4],
      [1675, 2010, 5],
      [2010, 2345, 6],
      [2345, 2680, 7],
      [2680, 3015, 8],
      [3015, 3350, 9],
      [3350, Infinity, 10],
    ],
    sugar: [ //H2
      [-Infinity, 4.5, 0],
      [4.5, 9, 1],
      [9, 13.5, 2],
      [13.5, 18, 3],
      [18, 22.5, 4],
      [22.5, 27, 5],
      [27, 31, 6],
      [31, 36, 7],
      [36, 40, 8],
      [40, 45, 9],
      [Infinity, 10]

    ],
    satFats: [ //G2
      [-Infinity, 1, 0],
      [1, 2, 1],
      [2, 3, 2],
      [3, 4, 3],
      [4, 5, 4],
      [5, 6, 5],
      [6, 7, 6],
      [7, 8, 7],
      [8, 9, 8],
      [9, 10, 9],
      [10, Infinity, 10],
    ],
    sodium: [
      [-Infinity, 90, 0],
      [90, 180, 1],
      [180, 270, 2],
      [270, 360, 3],
      [360, 450, 4],
      [450, 540, 5],
      [540, 630, 6],
      [630, 720, 7],
      [720, 810, 8],
      [810, 900, 9],
      [Infinity, 10]
    ],
    protein: [
      [-Infinity, 1.6, 0],
      [1.6, 3.2, 1],
      [3.2, 4.8, 2],
      [4.8, 6.4, 3],
      [6.4, 8, 4],
      [8, Infinity, 5],
    ],
    fiber: [
      [Infinity, 0.9, 0],
      [0.9, 1.9, 1],
      [1.9, 2.8, 2],
      [2.8, 3.7, 3],
      [3.7, 4.7, 4],
      [4.7, Infinity, 5],
    ],
    goodStuff: [
      [-Infinity, 40, 0],
      [40, 60, 1],
      [60, 80, 2],
      [80, Infinity, 5],
    ],
  },

  pointsToScore: [
    [-Infinity, -1, 'A'],
    [-1, 2, 'B'],
    [2, 10, 'C'],
    [10, 18, 'D'],
    [18, Infinity, 'E']
  ],

  calculateScore: function (nutirInfo) {

    const kjValue = getPoints(this.nutriprops.kJ, nutirInfo.kJ);
    const sugarValue = getPoints(this.nutriprops.sugar, nutirInfo.sugar);
    const satFatsValue = getPoints(this.nutriprops.satFats, nutirInfo.satFats);
    const sodiumValue = getPoints(this.nutriprops.sodium, nutirInfo.sodium);

    const protValue = getPoints(this.nutriprops.protein, nutirInfo.protein);
    const fiberValue = getPoints(this.nutriprops.fiber, nutirInfo.fiber);
    const oilValue = getPoints(this.nutriprops.goodStuff, nutirInfo.oil);

    const badScore = kjValue + sugarValue + satFatsValue + sodiumValue;
    const applyProtein = (badScore < 11 || (badScore >= 11 && oilValue === 5));

    let totalScore = badScore - oilValue - fiberValue;

    if (applyProtein) {
      totalScore -= protValue
    }

    return {
      negatives: {
        kJ: kjValue,
        sugar: sugarValue,
        satFats: satFatsValue,
        sodium: sodiumValue
      },
      positives: {
        protein: protValue,
        oil: oilValue,
        fiber: fiberValue,
      },
      badScore,
      applyProtein,
      totalScore,
      letterScore: getPoints(this.pointsToScore, totalScore)
    }
  }
}

// const cheeseTable = {
//   kJ: [
//     [-Infinity, 335, 0],
//     [335, 670, 1],
//     [670, 1005, 2],
//     [1005, 1340, 3],
//     [1340, 1675, 4],
//     [1675, 2010, 5],
//     [2010, 2345, 6],
//     [2345, 2680, 7],
//     [2680, 3015, 8],
//     [3015, 3350, 9],
//     [3350, Infinity, 10],
//   ],
//   sugar: [
//     [-Infinity, 4.5, 0],
//     [4.5, 9, 1],
//     [9, 13.5, 2],
//     [13.5, 18, 3],
//     [18, 22.5, 4],
//     [22.5, 27, 5],
//     [27, 31, 6],
//     [31, 36, 7],
//     [36, 40, 8],
//     [40, 45, 9],
//     [45, Infinity, 10]
//
//   ],
//   satFats: [
//     [1, 0],
//     [2, 1],
//     [3, 2],
//     [4, 3],
//     [5, 4],
//     [6, 5],
//     [7, 6],
//     [8, 7],
//     [9, 8],
//     [10, 9],
//     [Infinity, 10],
//   ],
//   sodium: [
//     [90, 0],
//     [180, 1],
//     [270, 2],
//     [360, 3],
//     [450, 4],
//     [540, 5],
//     [630, 6],
//     [720, 7],
//     [810, 8],
//     [900, 9],
//     [Infinity, 10]
//   ],
//   protein: [
//     [1.6, 0],
//     [3.2, 1],
//     [4.8, 2],
//     [6.4, 3],
//     [8, 4],
//     [Infinity, 5],
//   ],
//   fiber: [
//     [0.9, 0],
//     [1.9, 1],
//     [2.8, 2],
//     [3.7, 3],
//     [4.7, 4],
//     [Infinity, 5],
//   ],
//   goodStuff: [
//     [40, 0],
//     [60, 1],
//     [80, 2],
//     [Infinity, 5],
//   ],
//
//   pointsToScore: [
//     [0, 'A'],
//     [2, 'B'],
//     [10, 'C'],
//     [18, 'D'],
//     [Infinity, 'E']
//   ],
//
//   calculateScore: function (value) {
//     const kjValue = getPoints(this.kJ, value);
//     const sugarValue = getPoints(this.sugar, value);
//     const satFatsValue = getPoints(this.satFats, value);
//     const sodiumValue = getPoints(this.sodium, value);
//
//     const protValue = getPoints(this.protein, value);
//     const fiberValue = getPoints(this.fiber, value);
//     const oilValue = getPoints(this.goodStuff, value);
//
//
//     const badScore = kjValue + sugarValue + satFatsValue + sodiumValue;
//
//     let totalScore = badScore - protValue - oilValue - fiberValue;
//
//     return totalScore
//   }
// }

const fatsTable = {
  kJ: [
    [-Infinity, 335, 0],
    [335, 670, 1],
    [670, 1005, 2],
    [1005, 1340, 3],
    [1340, 1675, 4],
    [1675, 2010, 5],
    [2010, 2345, 6],
    [2345, 2680, 7],
    [2680, 3015, 8],
    [3015, 3350, 9],
    [3350, Infinity, 10],
  ],
  sugar: [
    [-Infinity, 4.5, 0],
    [4.5, 9, 1],
    [9, 13.5, 2],
    [18, 3],
    [22.5, 4],
    [27, 5],
    [31, 6],
    [36, 7],
    [40, 8],
    [45, 9],
    [Infinity, 10]

  ],
  satFats: [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4],
    [6, 5],
    [7, 6],
    [8, 7],
    [9, 8],
    [10, 9],
    [Infinity, 10],
  ],
  ratioSatFats: [
    [10, 0],
    [16, 1],
    [22, 2],
    [28, 3],
    [34, 4],
    [40, 5],
    [46, 6],
    [52, 7],
    [58, 8],
    [64, 9],
    [Infinity, 10]
  ],
  sodium: [
    [90, 0],
    [180, 1],
    [270, 2],
    [360, 3],
    [450, 4],
    [540, 5],
    [630, 6],
    [720, 7],
    [810, 8],
    [900, 9],
    [Infinity, 10]
  ],
  protein: [
    [1.6, 0],
    [3.2, 1],
    [4.8, 2],
    [6.4, 3],
    [8, 4],
    [Infinity, 5],
  ],
  fiber: [
    [0.9, 0],
    [1.9, 1],
    [2.8, 2],
    [3.7, 3],
    [4.7, 4],
    [Infinity, 5],
  ],
  goodStuff: [
    [40, 0],
    [60, 1],
    [80, 2],
    [Infinity, 5],
  ],

  pointsToScore: [
    [0, 'A'],
    [2, 'B'],
    [10, 'C'],
    [18, 'D'],
    [Infinity, 'E']
  ],

  calculateScore: function (data) {
    const kjValue = getPoints(this.kJ, data.kJ);
    const sugarValue = getPoints(this.sugar, data.sugar);
    const sodiumValue = getPoints(this.sodium, data.sodium);

    const ratio = data.satFats / data.totalFats * 100
    const ratioValue = getPoints(this.ratioSatFats, ratio);

    const protValue = getPoints(this.protein, data.protein);
    const fiberValue = getPoints(this.fiber, data.fiber);
    const oilValue = getPoints(this.goodStuff, data.goodStuff);


    const badScore = kjValue + sugarValue + ratioValue + sodiumValue;

    let totalScore = 0;

    if (badScore < 11 || (badScore >= 11 && oilValue === 5)) {
      totalScore = badScore - protValue - oilValue - fiberValue;
    } else {
      totalScore = badScore - oilValue - fiberValue;
    }

    return totalScore
  }
}

// const drinksTable = {
//   kJ: [
//     [-Infinity, 0, 0],
//     [0, 30, 1],
//     [30, 60, 2],
//     [60, 90, 3],
//     [90, 120, 4],
//     [120, 150, 5],
//     [150, 180, 6],
//     [180, 210, 7],
//     [210, 240, 8],
//     [240, 270, 9],
//     [270, Infinity, 10],
//   ],
//   sugar: [
//     [-Infinity, 0, 0],
//     [0, 1.5, 1],
//     [1.5, 3, 2],
//     [3, 4.5],
//     [4.5, 6],
//     [6, 7.5],
//     [7.5, 9],
//     [9, 10.5],
//     [10.5, 12],
//     [12, 13.5],
//     [13.5, Infinity]
//
//   ],
//   satFats: [
//     [1, 0],
//     [2, 1],
//     [3, 2],
//     [4, 3],
//     [5, 4],
//     [6, 5],
//     [7, 6],
//     [8, 7],
//     [9, 8],
//     [10, 9],
//     [Infinity, 10],
//   ],
//   sodium: [
//     [90, 0],
//     [180, 1],
//     [270, 2],
//     [360, 3],
//     [450, 4],
//     [540, 5],
//     [630, 6],
//     [720, 7],
//     [810, 8],
//     [900, 9],
//     [Infinity, 10]
//   ],
//   protein: [
//     [1.6, 0],
//     [3.2, 1],
//     [4.8, 2],
//     [6.4, 3],
//     [8, 4],
//     [Infinity, 5],
//   ],
//   fiber: [
//     [0.9, 0],
//     [1.9, 1],
//     [2.8, 2],
//     [3.7, 3],
//     [4.7, 4],
//     [Infinity, 5],
//   ],
//   goodStuff: [
//     [40, 0],
//     [60, 2],
//     [80, 4],
//     [Infinity, 10],
//   ],
//
//   pointsToScore: [
//     [-Infinity, 2, 'B'],
//     [3, 5, 'C'],
//     [5, 9, 'D'],
//     [9, Infinity, 'E']
//   ],
//
//   calculateScore: function (data) {
//     const kjValue = getPoints(this.kJ, data.kJ);
//     const sugarValue = getPoints(this.sugar, data.sugar);
//     const sodiumValue = getPoints(this.sodium, data.sodium);
//     const satFatsValue = getPoints(this.satFats, data.satFats);
//
//     const protValue = getPoints(this.protein, data.protein);
//     const fiberValue = getPoints(this.fiber, data.fiber);
//     const oilValue = getPoints(this.goodStuff, data.oil);
//
//
//     const badScore = kjValue + sugarValue + satFatsValue + sodiumValue;
//
//     let totalScore = 0;
//
//     if (badScore < 11 || (badScore >= 11 && oilValue === 5)) {
//       totalScore = badScore - protValue - oilValue - fiberValue;
//     } else {
//       totalScore = badScore - oilValue - fiberValue;
//     }
//
//     return totalScore
//   }
// }


export default {
  name: 'Calculator',
  components: {Scale},
  props: {
    msg: String
  },
  computed: {
    currentTable() {
      switch (this.mode) {
        case 'general':
          return generalTable
        case 'fats':
          return fatsTable
        default:
          return generalTable
      }
    },
    currentScale(){
      return this.currentTable.nutriprops;
    }
  },
  data() {
    return {
      nutritionalInfo: {
        kJ: 0,
        sugar: 0,
        satFats: 0,
        sodium: 0,
        protein: 0,
        fiber: 0,
        oil: 0,
        goodStuff: 0,
      },
      result: null,
      mode: 'general'
    };
  },
  methods: {
    calculateScore() {
      console.log(this.nutritionalInfo)
      this.result = this.currentTable.calculateScore(this.nutritionalInfo)
    },

    displayNames(prop) {
      return displayNames[prop]
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.result-container {
  width: 100%;
  margin: auto;
}
</style>
