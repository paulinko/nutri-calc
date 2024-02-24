<template>
  <svg viewBox="0 0 125 100"
       xmlns="http://www.w3.org/2000/svg">
    <defs>
      <Gradient :id="gradientId"  :colorStart="colorStart" :colorEnd="colorEnd" :colorMiddle="colorMiddle"></Gradient>
    </defs>
    <path d="M 0 50
           L 50 100
           L 50 75
           L 125 75
           L 125 25
           L 50 25
           L 50 0
           Z" :fill="`url(#${gradientId})`"/>
  </svg>
</template>

<script>

import Gradient from "@/components/Gradient.vue";
export default {
  name: "Arrow",
  components: {Gradient},
  props: {
    gradientId: null,
    colorStart: null,
    colorMiddle: null,
    colorEnd: null
  }
}
</script>

<style scoped>

</style>