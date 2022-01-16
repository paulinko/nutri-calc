<template>
  <div>
    <div class="container text-start">
      <nav class="navbar navbar-expand-sm navbar-light ">
        <div class=" flex-row ms-auto">
          <div class="" id="navbarNav">
            <ul class="navbar-nav flex-row  ms-sm-auto">
              <li class="nav-item">
                <a class="nav-link" :href="otherLangLink">{{ otherLang }}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://github.com/paulinko/nutri-calc" target="_blank">
                  <InlineIcon type="github"></InlineIcon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <modal v-if="showModalInfoFor" :title="displayNames(showModalInfoFor)" :mode="showModalInfoFor"
             :params="modalParams" :vars="modalParams"
             @close-modal="resetModal()">
      </modal>
      <div class="row">
        <div class="col-md-9">
          <h1>{{ displayNames('heading') }}</h1>
          <intro></intro>
          <hr>
          <div>
            <p>
              <span class="fw-bold">{{ displayNames('last_updated') }}</span>: {{ updateTime }}
            </p>
            <p>
              <span class="fw-bold">{{ displayNames('sources_used') }}</span> <br>
              <a :href="source.link" class="text-decoration-none" target="_blank" v-for="source in sources"
                 :key="source.name">{{ source.name }}
                <span class="fw-bold">({{ trans(source.language) }})</span> <br></a>
            </p>
          </div>
        </div>
      </div>
      <hr>
      <div>
        <h2 id="calculate">{{ trans('calculate') }}</h2>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation" v-for="tableName in tableNames" :key="tableName">
            <button :class="'nav-link px-2 ' + ((mode === tableName) ? 'active' : '')" id="general-tab"
                    @click="mode = tableName; name = getPlaceholderText(mode)" type="button"
                    role="tab" aria-controls="" aria-selected="true">{{ displayNames(tableName) }}
            </button>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active py-3">
            <h4>{{ displayNames('calculate_for') }} &nbsp;<input class="form-control  w-50 d-inline"
                                                                 title="Gib einen Namen für das Lebensmittel an"
                                                                 type="text" name="name"
                                                                 id="productName"
                                                                 v-model="name"
                                                                 @focus="$event.target.setSelectionRange(0, $event.target.value.length)">
            </h4>
            <p>
              {{ modeInfoText }}
            </p>
            <form>
              <div class="row nutriprops-row">
                <div class="col-lg-4 col-md-6">
                  <h4>{{ displayNames('negative_inputs') }}</h4>
                  <InputRow v-for="[name, ] in currentTable.negativeInputs()" :key="name" class="row g-2"
                            :name="name" :has-info-modal="hasInfoModal(name)" :label-name="inputDisplayNames(name)"
                            @open-modal="showModalInfoFor = name">
                    <input :class="'form-control ' + (isValid(name) ? '' : 'is-invalid')" required type="text"
                           :name="name" :id="name"
                           v-model="nutritionalInfo[name]"
                           @focus="$event.target.setSelectionRange(0, $event.target.value.length)"
                    >
                    <span class="input-group-text col-4">{{ getUnit(name) }}</span>
                  </InputRow>
                </div>
                <div class="col-lg-4 col-md-6">
                  <h4>{{ displayNames('positive_inputs') }}</h4>
                  <InputRow v-for="[name, ] in currentTable.positiveInputs()" :key="name" class="row g-2"
                            :name="name" :has-info-modal="hasInfoModal(name)" :label-name="inputDisplayNames(name)"
                            @open-modal="showModalInfoFor = name">
                    <input :class="'form-control ' + (isValid(name) ? '' : 'is-invalid')" type="text" :name="name"
                           required :id="name" v-model="nutritionalInfo[name]"
                           @focus="$event.target.setSelectionRange(0, $event.target.value.length)"
                    >
                    <span class="input-group-text">{{ getUnit(name) }}</span>
                  </InputRow>
                </div>
                <div class="col-md-2 d-none d-md-block ms-5">
                  <img :src="currentImage" alt="">
                </div>
              </div>
            </form>
            <div :class="'row mt-3 ' + classesCalcElem ">
              <div class="col-md-6">
                <button class="btn btn-success btn-lg" @click="calculateScore()" :disabled="!allFieldsValid()">
                  {{ trans('calculate_score') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="result-container" ref="resultContainer" v-if="result">
        <hr>
        <h2>{{ trans('result_for') }} <span class="fst-italic">{{ result.name }}</span></h2>
        <h3>{{ trans('category') }}: <img class="h-1"
                                          :src="getImageForMode(result.mode)" alt=""> {{
            trans(result.mode)
          }}</h3>
        <div class="row score-row">
          <div class="col-md-2">
            <h3>{{ trans('score') }}</h3>
            <div class="text-start score-result">
              <div>
              <span :class="'score ' + result.letterScore.points ">
              {{ result.letterScore.points }}
              </span>
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <h3>{{ trans('distribution_points') }}</h3>
            <ResultChart v-if="resultColors" :colors="resultColors" :result-data="result">
            </ResultChart>
            <h3>{{ trans('explanation') }}</h3>
            <score-explanation :v-bind="result" :result="result"></score-explanation>
          </div>
        </div>
        <h2>Details</h2>
        <div class="row summary">
          <div ref="resultNav" class="col-md-3 col-xs-12 d-sm-block d-none points-list">
            <h5 class="mt-2">{{ trans('negative_inputs') }}</h5>
            <nav class="nav flex-column result-nav negative">
              <a v-for="name in result.negatives.keys()" :key="name" class="nav-link link-danger"
                 :href="'#' + name + 'Result'">
              <span class="result-nav-text">
                {{ displayNames(name) }}:
              {{ result.negatives.get(name).value.toLocaleString() }}{{ getUnit(name) }}
              </span>
                <Badge v-if="getColorForProp(name)" classes="float-end" :badge-data="getColorForProp(name)"
                       :is-positive="false"></Badge>
              </a>
            </nav>
            <h5 class="mt-2">{{ trans('positive_inputs') }}</h5>
            <nav class="nav flex-column result-nav positive">
              <a v-for="name in result.positives.keys()" :key="name" class="nav-link link-success"
                 aria-current="page" :href="'#' + name + 'Result'">
              <span class="result-nav-text">{{ trans(name) }}:
              {{ result.positives.get(name).value.toLocaleString() }}{{ getUnit(name) }}
              </span>
                <Badge v-if="getColorForProp(name)" :classes="'float-end'" :badge-data="getColorForProp(name)"
                       :is-positive="true"></Badge>
              </a>
            </nav>
            <h5 class="mt-2">{{ trans('actions') }}</h5>
            <a class="nav-link link-dark clickable" @click="initModal('share', {shareUrl})">
              <inline-icon type="share"></inline-icon>
              {{ trans('share_result') }}
            </a>
            <a class="nav-link link-success clickable" href="#calculate">
              <inline-icon type="redo"></inline-icon>
              {{ trans('calculate_new') }}
            </a>
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
                   :details-shown-initial="resultNavVisible"
                   :score-colors-override="originalScoreColors"
                   :hide-badge="true"
                   :unit="getUnit('letterScore')"/>
            <h3>{{ trans('negative_inputs') }}</h3>
            <Scale @colors-calculated="appendPropColor($event, name)"
                   :data="v.points" :fractal="v.fractal" :value="v.value" :name="displayNames(name)"
                   :scale="resultScale.n[name].scale"
                   v-for="([name,v], ) in result.negatives" :key="name" :is-positive="false" :short-name="name"
                   :was-used-in-calculation="wasUsedInCalculation(name)"
                   :details-shown-initial="resultNavVisible"
                   :unit="getUnit(name)"
                   score-unit="P"
            />
            <h3>{{ trans('positive_inputs') }}</h3>
            <Scale @colors-calculated="appendPropColor($event, name)"
                   :data="value.points" :fractal="value.fractal" :value="value.value" :name="displayNames(name)"
                   :scale="resultScale.p[name].scale"
                   v-for="([name,value], )  in result.positives" :key="name" :is-positive="true" :short-name="name"
                   :was-used-in-calculation="wasUsedInCalculation(name)"
                   :unit="getUnit(name)"
                   :details-shown-initial="resultNavVisible"
                   score-unit="P"
            />
            <a class="btn btn-lg btn-success mb-5 mx-auto d-flex justify-content-center" href="#calculate">
              {{ trans('calculate_new') }}
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Scale from "@/components/Scale";
import Badge from "@/components/Badge";
import ResultChart from "@/components/ResultChart";
import ScoreExplanation from "@/components/localized/ScoreExplanation";
import Modal from "@/components/localized/Modal";
import Intro from "@/components/localized/Intro";
import InputRow from "@/components/InputRow";
import InlineIcon from "@/components/InlineIcon";

import {
  GetDisplayNames,
  GetInputInfoTexts,
  GetInfoTexts,
  GetPlaceholderText,
  trans,
  CurrentLocale,
} from "@/libs/str_functions";

import {
  Sources,
  FurtherReadings
} from '@/libs/literature_references'

import {GeneralTable, FatsTable, CheeseTable, DrinksTable, getUnit, WasPropUsedInCalculation} from "@/libs/tables";

export default {
  name: 'Calculator',
  components: {Scale, Badge, ResultChart, ScoreExplanation, Modal, InputRow, InlineIcon, Intro},
  computed: {
    resultNavVisible() {
      return document.getElementsByTagName('body')[0].getBoundingClientRect().width >= 576;
    },
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
    otherLang() {
      return (CurrentLocale === 'de') ? 'Englisch' : 'German'
    },
    otherLangLink() {
      return (CurrentLocale === 'de') ? '../en/' : '../de/'
    },
    currentImage() {
      return this.getImageForMode(this.mode)
    },
    classesCalcElem() {
      return (this.result) ? '' : ' result-hidden'
    },
    resultScale() {
      return this.resultTable.nutriprops;
    },
    currentPointScale() {
      return this.resultTable.pointsToScore;
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
        totalFats: 100,
        salt: 0
      },
      modalParams: {},
      name: GetPlaceholderText('general'),
      originalScoreColors: ['#008043', '#85b931', '#f2c011', '#e37c13', '#d9411a'],
      colors: {},
      result: null,
      mode: 'general',
      tableNames: ['general', 'fats', 'drinks', 'cheese'],
      sources: Sources,
      furtherReadings: FurtherReadings,
      resultTable: Object,
      showModalInfoFor: null,
      shareUrl: null,
      updateTime: (new Date('2021-01-02')).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    };
  },
  mounted() {
    const url = new URL(window.location.href);
    const mode = url.searchParams.get("mode");
    if (mode) {
      this.mode = mode;
      this.name = url.searchParams.get("name");
      for (const [prop,] of Object.entries(this.nutritionalInfo)) {
        let v = url.searchParams.get(prop)
        if (v) {
          this.nutritionalInfo[prop] = v
        }
      }
      this.calculateScore()
    }
  },
  methods: {
    trans,
    calculateScore() {
      this.result = null
      this.colors = {}
      let normalizedNutriInfo = {}
      for (const [prop, val] of Object.entries(this.nutritionalInfo)) {
        normalizedNutriInfo[prop] = this.normalizeFloat(val)
      }
      this.result = this.currentTable.calculateScore(normalizedNutriInfo)
      console.log('result', this.result)
      this.result.mode = this.mode
      this.result.name = this.name || this.getDisplayNames(this.mode)
      this.resultTable = this.currentTable
      this.$nextTick(() => {
        setTimeout(() => {
          scrollTo({
            top: window.scrollY + this.$refs.resultContainer.getBoundingClientRect().top,
            behavior: 'smooth'
          })
        }, 25)
      })
      this.shareUrl = this.buildUrl(this.nutritionalInfo, this.mode, this.name)
    },
    resetModal() {
      this.showModalInfoFor = null;
      this.modalParams = {}
    },
    initModal(name, modalParams) {
      this.showModalInfoFor = name;
      this.modalParams = modalParams
    },
    buildUrl(nutriInfo, mode, name) {
      let params = new URLSearchParams({
        ...nutriInfo,
        mode,
        name
      })
      return (window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + params.toString())
    },
    normalizeFloat(val) {
      if (CurrentLocale === 'de') {
        return parseFloat((val).toString().replace(',', '.'))
      } else {
        return parseFloat((val).toString())
      }
    },
    inputDisplayNames(prop) {
      return GetDisplayNames(prop, true)
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
    hasInfoModal(prop) {
      switch (prop) {
        case 'goodStuff':
        case 'salt':
          return true
        default:
          return false;
      }
    },
    wasUsedInCalculation(prop) {
      return (prop !== 'protein' || this.result.applyProtein)
    },
    getImageForMode(mode) {
      const PATH = './img/';
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
    },
    isValid(prop) {
      let value = this.nutritionalInfo[prop];
      if (value === '') {
        return false
      }
      value = this.normalizeFloat(value)
      const defaultvalidator = (v) => (v >= 0 && v <= 100);
      const validators = {
        kJ: (v) => (v >= 0 && v <= 10_000),
      };

      return (validators[prop] || defaultvalidator)(value)
    },


    allFieldsValid() {
      let isValid = true;
      for (let [name,] of this.currentTable.negativeInputs()) {
        isValid &= this.isValid(name)
      }
      for (let [name,] of this.currentTable.positiveInputs()) {
        isValid &= this.isValid(name)
      }
      return isValid
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
  /*height: 100vh;*/
  /*overflow-y: scroll;*/
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

.points-list {
  position: sticky;
  display: block;
  top: 0.5em;
  background: white;
  border-bottom: 1px #ccc solid;
  box-shadow: 0 5px 5px 0 #aaa;
  padding: 1em;
  align-self: flex-start;
}

.result-nav-text {
  max-width: 21ch;
  display: inline-block;
}
</style>
