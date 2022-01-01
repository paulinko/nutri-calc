<template>
    <span :class="calculatedClasses" :style="'background-color:' + badgeData.color">{{sign}}
        {{badgeData.value}}
      <sup :title="title">{{superscript ?? ' '}}</sup></span>
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
        return null
      }
    },

    title() {
      if (this.superscript) {
        let tendency = (this.isPositive) ? 'besseren' : 'schlechteren'
        if (this.superscript === this.low) {
          tendency = (!this.isPositive) ? 'besseren' : 'schlechteren'
        }
        return `Das "${this.superscript}" bedeutet, dass der Wert dieses Inhaltstoffes eher zur ${tendency} Punktzahl tendiert.`
      }
      return null
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