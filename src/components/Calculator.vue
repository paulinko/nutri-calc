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
              <div class="col-md-3">
                <h4>Negative Inhaltsstoffe</h4>
                <div v-for="(value, name) in currentTable.nutriprops.n" :key="name" class="row g-2">
                  <div class="col-auto flex-grow-1">
                    <label class="col-form-label" :for="name">{{ displayNames(name) }}</label>

                  </div>
                  <div class="col-5">
                    <div class="input-group">
                      <input class="form-control" type="text" :name="name" :id="name" v-model="nutritionalInfo[name]">
                      <span class="input-group-text col-4">{{ getUnit(name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
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
      <div class="row summary">
        <div class="col-md-3 col-xs-12">

          <nav class="nav flex-column result-nav">
            <a class="nav-link border border-primary link-primary"
               aria-current="page" href="#">Score: {{result.letterScore}} ({{ result.totalScore }}P)</a>
          </nav>

          <h5 class="mt-2">Negative Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav">
            <a v-for="(value, name) in result.negatives" :key="name" class="nav-link border border-danger link-danger"
               href="#">{{ displayNames(name) }}: {{nutritionalInfo[name]}} {{getUnit(name)}} <span class="badge bg-danger fs-6 float-end">&plus;&nbsp;{{
                value
              }}</span></a>
          </nav>
          <h5 class="mt-2">Positive Inhaltsstoffe</h5>
          <nav class="nav flex-column result-nav">
            <a v-for="(value, name) in result.positives" :key="name" class="nav-link border border-success link-success"
               aria-current="page" href="#">{{ displayNames(name) }}: {{nutritionalInfo[name]}} {{getUnit(name)}} <span class="badge bg-success fs-6 float-end">&minus;&nbsp;{{
                value
              }}</span> </a>
          </nav>
        </div>
        <div class="col-auto results-content" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0">
          <h3>Score</h3>
          <div class="text-start fs-1">
            {{ result.letterScore }}
          </div>
          <h3>Negative Inhaltsstoffe</h3>
          <Scale :data="value" :name="displayNames(name)" :scale="currentScale.n[name]"
                 v-for="(value, name) in result.negatives" :key="name" :is-positive="false"/>
          <h3>Positive Inhaltsstoffe</h3>
          <Scale :data="value" :name="displayNames(name)" :scale="currentScale.p[name]"
                 v-for="(value, name) in result.positives" :key="name" :is-positive="true"/>
        </div>
      </div>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>

import Scale from "@/components/Scale";
import {GeneralTable, FatsTable, CheeseTable, DrinksTable, getUnit} from "@/libs/tables";


const displayNames = {
  kJ: 'kJ',
  sugar: 'Zucker',
  satFats: 'gesättigte Fette',
  sodium: 'Salz',
  protein: 'Protein',
  fiber: 'Ballaststoffe',
  goodStuff: 'Vollkorn etc.',
  cheese: 'Milchprodukte',
  general: 'Allgemein',
  fats: 'Öle',
  drinks: 'Getränke'
}

export default {
  name: 'Calculator',
  components: {Scale},
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
    definedPositives() {
      console.log(this.result.positives)
      return this.result.positives.filter((e) => this.currentScale[e] !== undefined)
    }
    ,
    definedNegatives() {
      return this.result.positives.filter((e) => this.currentScale[e] !== undefined)
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
      mode: 'general',
      tableNames: ['general', 'fats', 'drinks', 'cheese']
    };
  },
  methods: {
    calculateScore() {
      console.log(this.nutritionalInfo)
      this.result = this.currentTable.calculateScore(this.nutritionalInfo)
    },

    displayNames(prop) {
      return displayNames[prop]
    },
    getUnit(nutriProp) {
      return getUnit(nutriProp)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  text-align: left;
}

.result-nav > a:first-child {
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
}

.result-nav > a:last-child {
  border-bottom-left-radius: 2%;
  border-bottom-right-radius: 2%;
}

.results-content {
  height: 100vh;
  overflow-y: scroll;
}

.result-container {
  width: 100%;
  margin: 2vh auto auto;
}
</style>
