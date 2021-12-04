<template>
    <span :class="calculatedClasses" :style="'background-color:' + badgeData.color">{{sign}}
        {{badgeData.value}}P
      <sup v-html="superscript"></sup></span>
</template>

<script>
export default {
  name: "Badge",
  props: {
    badgeData: {
      value: Number,
      color: String,
      percentage: Number,
    },
    classes: String,
    isPositive: Boolean
  },
  computed: {
    low() {
      return (this.isPositive) ? '-' : '+'
    },
    high() {
      return (!this.isPositive) ? '-' : '+'
    },
    sign(){
      return (this.isPositive) ? '-' : '+'
    },
    calculatedClasses() {
      return  'badge fs-6 text-black-50 score-badge ' + (this.classes ??'')
    },
    superscript() {
      if (this.badgeData.percentage < 25) {
        return this.low
      } else if (this.badgeData.percentage > 75) {
        return this.high
      } else {
        return '&nbsp;'
      }
    }

  }
}
</script>

<style scoped>
.score-badge {
  box-shadow: 0 0 0.2em #bbb;
  min-width: 7ch;
}


</style>