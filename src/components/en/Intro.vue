<template>
  <div>
    <p>
      The Nutri-Score is a seal that is intended to allow a quick and simplified
      comparison of similar foods.
    </p>
    <p>
      The purpose of this calculator is to illustrate the calculation of the Nutri-Score.
    </p>
    <p>
      <span class="fw-bold">Important Notice:</span> This App is an inofficial project, all calculations and information are without warranty.
      Please refer to <a href="https://www.santepubliquefrance.fr/media/files/02-determinants-de-sante/nutrition-et-activite-physique/nutri-score/tableur-calcul-nutri-score-en">
      the official calculation table
    </a> by Santé publique France.
    </p>
    <div>
      <a href="#calculate" class="btn btn-success">Calculate now</a>
      <a href="?kJ=1590+&sugar=22.4&satFats=0.6&sodium=0&protein=8.5&fiber=8.6&oil=0&goodStuff=53.1&totalFats=100&salt=0.22&mode=general&name=Chocolate+Cereal"
         class="btn btn-primary ms-1">
        View example
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: "Intro"
}
</script>

<style scoped>

</style>