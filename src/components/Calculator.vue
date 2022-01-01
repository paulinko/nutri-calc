<template>
  <div class="container text-start">
    <div class="row">
      <div class="col-md-9">
        <h1>Nutricalc: Der Nutri-Score-Berechner</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>

        <div>
          <a href="#calculate" class="btn btn-success">Jetzt berechnen</a>
        </div>
        <p>
          <span class="fw-bold">Letzte Aktualisierung</span>: {{ (new Date('2021-01-02')).toLocaleDateString()}}
        </p>
        <p>
          <span class="fw-bold">Verwendete Quellen</span> <br>
          <a :href="source.link" target="_blank" v-for="source in sources" :key="source.name">{{source.name}} ({{source.language}}) <br></a>

        </p>
      </div>
    </div>
    <hr>
    <div>
      <h2 id="calculate">Berechnen</h2>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-for="tableName in tableNames" :key="tableName">
          <button :class="'nav-link ' + ((mode === tableName) ? 'active' : '')" id="general-tab"
                  @click="mode = tableName; name = getPlaceholderText(mode)" type="button"
                  role="tab" aria-controls="" aria-selected="true">{{ inputDisplayNames(tableName) }}
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active py-3">
          <h4>Berechnung für &nbsp;<input class="form-control  w-50 d-inline"
                                          title="Gib einen Namen für das Lebensmittel an" type="text" name="name"
                                          id="productName"
                                          v-model="name"></h4>
          <p>
            {{ modeInfoText }}
          </p>
          <form>
            <div class="row nutriprops-row">
              <div class="col-lg-3 col-md-6">
                <h4>Negative Inhaltsstoffe</h4>
                <div v-for="(value, name) in currentTable.nutriprops.n" :key="name" class="row g-2">
                  <div class="col-7 flex-grow-1">
                    <label class="col-form-label" :for="name" :title="getInputInfoText(name)">{{
                        inputDisplayNames(name)
                      }}</label>
                  </div>
                  <div class="col-5">
                    <div class="input-group">
                      <input class="form-control" type="text" :name="name" :id="name"
                             v-model.number="nutritionalInfo[name]">
                      <span class="input-group-text col-4">{{ getUnit(name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <h4>Positive Inhaltsstoffe</h4>
                <div v-for="(value, name) in currentTable.nutriprops.p" :key="name" class="row g-2">
                  <div class="col-auto flex-grow-1">
                    <label class="col-form-label" :for="name" :title="getInputInfoText(name)">{{
                        inputDisplayNames(name)
                      }}</label>
                  </div>
                  <div class="col-4">
                    <div class="input-group">
                      <input class="form-control" type="text" :name="name" :id="name" v-model="nutritionalInfo[name]">
                      <span class="input-group-text">{{ getUnit(name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 d-md-block d-xs-none ms-5">
                <img :src="currentImage" alt="">
              </div>
            </div>
          </form>
          <div :class="'row mt-3 ' + classesCalcElem ">
            <div class="col-md-6">
              <button class="btn btn-success btn-lg" @click="calculateScore()">Score berechnen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result-container" ref="resultContainer" v-if="result">
      <hr>
      <h2>Ergebnisse für <span class="fst-italic">{{ result.name }}</span></h2>
      <h3>Kategorie: <img class="h-1"
                          :src="getImageForMode(result.mode)" alt=""> {{ displayNames(result.mode) }}</h3>
      <div class="row score-row">
        <div class="col-md-2">
          <h3>Score</h3>
          <div class="text-start score-result">
            <div>
              <span :class="'score ' + result.letterScore.points ">
              {{ result.letterScore.points }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <h3>Punkteverteilung</h3>
          <ResultChart v-if="resultColors" :colors="resultColors" :result-data="result">
          </ResultChart>
          <h3>Erklärung</h3>
          <score-explanation :v-bind="result" :result="result"></score-explanation>
        </div>
      </div>
      <h2>Details</h2>
      <div class="row summary">
        <div class="col-md-3 col-xs-12">
          <h5 class="mt-2">Negative Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav negative">
            <a v-for="name in result.negatives.keys()" :key="name" class="nav-link link-danger"
               href="#">{{ displayNames(name) }}: {{ result.negatives.get(name).value.toLocaleString() }}
              {{ getUnit(name) }}
              <Badge v-if="getColorForProp(name)" classes="float-end" :badge-data="getColorForProp(name)"
                     :is-positive="false"></Badge>
            </a>
          </nav>
          <h5 class="mt-2">Positive Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav positive">
            <a v-for="name in result.positives.keys()" :key="name" class="nav-link link-success"
               aria-current="page" href="#">{{ displayNames(name) }}:
              {{ result.positives.get(name).value.toLocaleString() }} {{ getUnit(name) }}
              <Badge v-if="getColorForProp(name)" :classes="'float-end'" :badge-data="getColorForProp(name)"
                     :is-positive="true"></Badge>
            </a>
          </nav>
        </div>
        <div class="col-md-9 results-content" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0">
          <Scale :data="result.letterScore.points" :fractal="result.letterScore.fractal"
                 :value="result.letterScore.value" :name="displayNames('letterScore')"
                 :scale="currentPointScale"
                 :was-used-in-calculation="true"
                 score-unit=""
                 scale-classes=" text-white"
                 red="#d9411a"
                 green="#008043"
                 yellow="#f2c011"
                 short-name="letterScore"
                 :score-colors-override="originalScoreColors"
                 :hide-badge="true"
                 :unit="' '+getUnit('letterScore')"/>
          <!--          <div v-for="([n,v], i) in result.negatives" :key="n"> {{v}} : {{n}}: {{i}}</div>-->
          <h3>Negative Inhaltsstoffe</h3>
          <Scale @colors-calculated="appendPropColor($event, name)"
                 :data="v.points" :fractal="v.fractal" :value="v.value" :name="displayNames(name)"
                 :scale="currentScale.n[name]"
                 v-for="([name,v], ) in result.negatives" :key="name" :is-positive="false" :short-name="name"
                 :was-used-in-calculation="wasUsedInCalculation(name)"
                 :unit="getUnit(name)"
                 score-unit="P"
          />
          <h3>Positive Inhaltsstoffe</h3>
          <Scale @colors-calculated="appendPropColor($event, name)"
                 :data="value.points" :fractal="value.fractal" :value="value.value" :name="displayNames(name)"
                 :scale="currentScale.p[name]"
                 v-for="([name,value], )  in result.positives" :key="name" :is-positive="true" :short-name="name"
                 :was-used-in-calculation="wasUsedInCalculation(name)"
                 :unit="getUnit(name)"
                 score-unit="P"
          />
        </div>
      </div>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>

import Scale from "@/components/Scale";
import Badge from "@/components/Badge";
import ResultChart from "@/components/ResultChart";
import ScoreExplanation from "@/components/ScoreExplanation";

import {
  GetDisplayNames,
  GetInputDisplayNames,
  GetInputInfoTexts,
  GetInfoTexts,
  GetPlaceholderText
} from "@/libs/Strings";

import {
  Sources,
  FurtherReadings
} from '@/libs/literature_references'

import {GeneralTable, FatsTable, CheeseTable, DrinksTable, getUnit, WasPropUsedInCalculation} from "@/libs/tables";

export default {
  name: 'Calculator',
  components: {Scale, Badge, ResultChart, ScoreExplanation},
  computed: {
    currentTable() {
      switch (this.mode) {
        case 'general':
          return GeneralTable
        case 'fats':
          return FatsTable
        case 'cheese':
          return CheeseTable
        case 'drinks':
          return DrinksTable
        default:
          return GeneralTable
      }
    },
    currentImage() {
      return this.getImageForMode(this.mode)
    },
    classesCalcElem() {
      return (this.result) ? '' : ' result-hidden'
    },
    currentScale() {
      return this.currentTable.nutriprops;
    },
    currentPointScale() {
      return this.currentTable.pointsToScore;
    },
    resultColors() {
      const allColorsPresent = (this.result.negatives.size + this.result.positives.size) ===
          Object.keys(this.colors).length
      if (allColorsPresent) {
        return this.colors
      }
      return null;
    },
    modeInfoText() {
      return GetInfoTexts(this.mode)
    },
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
        ratioSatFats: 0,
      },
      name: GetPlaceholderText('general'),
      originalScoreColors: ['#008043', '#85b931', '#f2c011', '#e37c13', '#d9411a'],
      colors: {},
      result: null,
      mode: 'general',
      tableNames: ['general', 'fats', 'drinks', 'cheese'],
      sources: Sources,
      furtherReadings: FurtherReadings
    };
  },
  methods: {
    calculateScore() {
      this.result = null
      this.colors = {}
      this.result = this.currentTable.calculateScore(this.nutritionalInfo)
      console.log('result', this.result)
      this.result.mode = this.mode
      this.result.name = this.name || this.getDisplayNames(this.mode)
      this.$nextTick(() => {
        setTimeout(() => {
          scrollTo({
            top: window.scrollY + this.$refs.resultContainer.getBoundingClientRect().top,
            behavior: 'smooth'
          })
        }, 25)
      })
    },
    inputDisplayNames(prop) {
      return GetInputDisplayNames(prop)
    },
    displayNames(prop) {
      return GetDisplayNames(prop, WasPropUsedInCalculation(prop, this.result))
    },
    getUnit(nutriProp) {
      return getUnit(nutriProp)
    },
    getInputInfoText(prop) {
      return GetInputInfoTexts(prop)
    },
    getPlaceholderText(prop) {
      return GetPlaceholderText(prop)
    },
    appendPropColor(color, prop) {
      this.colors[prop] = color
    },
    getColorForProp(prop) {
      return this.colors[prop] ?? null
    },
    wasUsedInCalculation(prop) {
      return (prop !== 'protein' || this.result.applyProtein)
    },
    getImageForMode(mode) {
      const PATH = '/img/';
      switch (mode) {
        case 'general':
          return `${PATH}sandwich.svg`
        case 'fats':
          return `${PATH}butter.svg`
        case 'cheese':
          return `${PATH}cheese-wedge.svg`
        case 'drinks':
          return `${PATH}cup.svg`
        default:
          return `${PATH}sandwich.svg`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  text-align: left;
}


.result-nav > a {
  border-bottom: 2px solid #dee2e605;
}

.result-nav > a:last-child {
  border-bottom: none;
  border-bottom-left-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
}

.result-nav.negative > a {
  border-color: #FF000042;

}

.result-nav.positive > a {
  border-color: #43BD3F45;
}

.results-content {
  height: 100vh;
  overflow-y: scroll;
  /*background-color: white;*/
}

.result-container {
  width: 100%;
  margin: 2vh auto auto;
  /*background-color: white;*/
}

.score {
  padding: 1.2rem;
  border-radius: 0.5rem;
  color: white;
  background-color: gray;
  font-size: 8rem;
  padding-bottom: 0rem;

}

.score.A {
  background-color: #008043;
}

.score.B {
  background-color: #85b931;
}

.score.C {
  background-color: #f2c011;
}

.score.D {
  background-color: #e37c13;
}

.score.E {
  background-color: #d9411a;
}

.score-row {
  margin-bottom: 4em;
}

.nutriprops-row {
  min-height: 16em;
}

.result-hidden {
  margin-bottom: 30vh;
}

.calc {
  margin-bottom: 30vh;
}

.h-1 {
  height: 1em;
}
</style>
