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
          <button type="button" class="btn btn-success">Jetzt berechnen</button>
          <a class="btn btn-info">Mehr erfahren</a>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>
    <hr>
    <div>
      <h2>Berechnen</h2>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-for="tableName in tableNames" :key="tableName">
          <button :class="'nav-link ' + ((mode === tableName) ? 'active' : '')" id="general-tab"
                  @click="mode = tableName" type="button"
                  role="tab" aria-controls="" aria-selected="true">{{ displayNames(tableName) }}
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane fade show active">
          <form>
            <div class="row mt-3">
              <div class="col-lg-3 col-md-6">
                <h4>Negative Inhaltsstoffe</h4>
                <div v-for="(value, name) in currentTable.nutriprops.n" :key="name" class="row g-2">
                  <div class="col-auto flex-grow-1">
                    <label class="col-form-label" :for="name">{{ displayNames(name) }}</label>

                  </div>
                  <div class="col-5">
                    <div class="input-group">
                      <input class="form-control" type="text" :name="name" :id="name" v-model.number="nutritionalInfo[name]">
                      <span class="input-group-text col-4">{{ getUnit(name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <h4>Positive Inhaltsstoffe</h4>
                <div v-for="(value, name) in currentTable.nutriprops.p" :key="name" class="row g-2">
                  <div class="col-auto flex-grow-1">
                    <label class="col-form-label" :for="name">{{ displayNames(name) }}</label>
                  </div>
                  <div class="col-4">
                    <div class="input-group">
                      <input class="form-control" type="text" :name="name" :id="name" v-model="nutritionalInfo[name]">
                      <span class="input-group-text">{{ getUnit(name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="row mt-3">
            <div class="col-md-6">
              <button class="btn btn-success btn-lg" @click="calculateScore()">Score berechnen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result-container" v-if="result">
      <hr>
      <h2>Ergebnisse</h2>
      <div class="row score-row">
        <div class="col-md-2">
          <h3>Score</h3>
          <div class="text-start score-result">
            <div >
              <span :class="'score ' + result.letterScore.points ">
              {{ result.letterScore.points }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <ResultChart v-if="resultColors" :colors="resultColors" :result-data="result">
          </ResultChart>
        </div>
      </div>
      <h2>Details</h2>
      <div class="row summary">
        <div class="col-md-3 col-xs-12">
          <h5 class="mt-2">Negative Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav negative">
            <a v-for="(value, name) in result.negatives" :key="name" class="nav-link link-danger"
               href="#">{{ displayNames(name) }}: {{ nutritionalInfo[name].toLocaleString() }} {{ getUnit(name) }}
              <Badge v-if="getColorForProp(name)" classes="float-end" :badge-data="getColorForProp(name)"
                     :is-positive="false"></Badge>
            </a>
          </nav>
          <h5 class="mt-2">Positive Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav positive">
            <a v-for="(value, name) in result.positives" :key="name" class="nav-link link-success"
               aria-current="page" href="#">{{ displayNames(name) }}: {{ nutritionalInfo[name] }} {{ getUnit(name) }}
              <Badge v-if="getColorForProp(name)" :classes="'float-end'" :badge-data="getColorForProp(name)"
                     :is-positive="true"></Badge>
            </a>
          </nav>
        </div>
        <div class="col-md-9 results-content" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0">
          <h3>Negative Inhaltsstoffe</h3>
          <Scale @colors-calculated="appendPropColor($event, name)"
                 :data="v.points" :fractal="v.fractal" :value="v.value" :name="displayNames(name)"
                 :scale="currentScale.n[name]"
                 v-for="(v, name) in result.negatives" :key="name" :is-positive="false" :short-name="name"
                 :unit="getUnit(name)"/>
          <h3>Positive Inhaltsstoffe</h3>
          <Scale @colors-calculated="appendPropColor($event, name)"
                 :data="value.points" :fractal="value.fractal" :value="value.value" :name="displayNames(name)"
                 :scale="currentScale.p[name]"
                 v-for="(value, name) in result.positives" :key="name" :is-positive="true" :short-name="name"
                 :unit="getUnit(name)"/>
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

import {GetDisplayNames, GetInputDisplayNames} from "@/libs/Strings";
import {GeneralTable, FatsTable, CheeseTable, DrinksTable, getUnit} from "@/libs/tables";

export default {
  name: 'Calculator',
  components: {Scale, Badge, ResultChart},
  computed: {
    currentTable() {
      console.log(GeneralTable)
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
    currentScale() {
      return this.currentTable.nutriprops;
    },
    resultColors() {
      const allColorsPresent = (Object.keys(this.result.negatives).length + Object.keys(this.result.positives).length) ===
          Object.keys(this.colors).length
      if (allColorsPresent) {
        return this.colors
      }
      return null;
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
      colors: {},
      result: null,
      mode: 'general',
      tableNames: ['general', 'fats', 'drinks', 'cheese']
    };
  },
  methods: {
    calculateScore() {
      this.result = null
      this.colors = {}
      this.result = this.currentTable.calculateScore(this.nutritionalInfo)
    },
    inputDisplayNames(prop) {
      return GetInputDisplayNames(prop)
    },
    displayNames(prop) {
      return GetDisplayNames(prop)
    },
    getUnit(nutriProp) {
      return getUnit(nutriProp)
    },
    appendPropColor(color, prop) {
      this.colors[prop] = color
    },
    getColorForProp(prop) {
      return this.colors[prop] ?? null
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
  /*border-left: 1px solid #dee2e6;*/
  border-bottom: 2px solid #dee2e605;
  /*border-right: 1px solid #dee2e6;*/
}

/*.result-nav > a:first-child {*/
/*  border-top: 1px solid #dee2e6;*/
/*  border-top-left-radius: 0.25em;*/
/*  border-top-right-radius: 0.25em;*/
/*}*/

.result-nav > a:last-child {
  /*border-bottom: 1px solid #dee2e6;*/
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
}

.result-container {
  width: 100%;
  margin: 2vh auto auto;
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

</style>
