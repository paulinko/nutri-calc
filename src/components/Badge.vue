<template>
    <span :title="title" :class="calculatedClasses" :style="'background-color:' + badgeData.color">{{sign}}{{value}}<sup>{{superscript ?? ' '}}</sup></span>
</template>

<script>

import {trans} from "@/libs/str_functions";

export default {
  name: "Badge",
  props: {
    badgeData: {
      value: Number,
      color: String,
      percentage: Number,
      showSuperscript: Boolean
    },
    classes: String,
    isPositive: Boolean
  },
  computed: {
    low() {
      return '▼'
    },
    high() {
      return '▲'
    },
    sign(){
      return (this.isPositive) ? '-' : '+'
    },
    value(){
      return (this.badgeData.value > 9 ) ? this.badgeData.value : (' ' + this.badgeData.value)
    },
    calculatedClasses() {
      return  'badge fs-6 text-black-50 score-badge ' + (this.classes ??'')
    },
    superscript() {
      if (!this.badgeData.showSuperscript) {
        return null
      }
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
        let tendency = (this.isPositive) ? trans('better_dat') : trans('worse_dat')
        let direction = trans('higher_dat')
        if (this.superscript === this.low) {
          tendency = (!this.isPositive) ? trans('better_dat') : trans('worse_dat')
          direction = trans('lower_dat')
        }

        return trans('badge_explanation', {superscript: this.superscript, direction, tendency})
      }
      return null
    }

  }
}
</script>

<style scoped>
.score-badge {
  box-shadow: 0 0 0.2em #bbb;
  min-width: 8ch;
}


/* bootstrap.css | http://localhost:8082/bootstrap.css */

sup {
  min-width: 1ch;
  display: inline-block;
}

.badge {
  /* padding: 0.35em 0.65em; */
  padding: 0.35em 0.45em;
}

/* Inline #2 | http://localhost:8082/#proteinResult */

.score-badge {
  text-align: center;
  min-width: 4.5em;
}


</style>