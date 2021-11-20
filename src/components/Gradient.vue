<template>
  <linearGradient :id="id">
    <stop offset="5%" :stop-color="colorStart" v-if="colorStart"/>
    <stop :offset="(middlePercent ?? 30) + '%'" :stop-color="colorMiddle" v-if="colorMiddle"/>
    <stop offset="95%" :stop-color="colorEnd" v-if="colorEnd"/>
  </linearGradient>
</template>

<script>
export default {
  name: "Gradient",
  props: {
    id: null,
    colorStart: null,
    colorMiddle: null,
    colorEnd: null,
    middlePercent: {
      type: Number,
      default: 30
    }
  }
}
</script>

<style scoped>

</style>