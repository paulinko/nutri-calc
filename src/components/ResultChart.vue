<template>
  <div>
    <canvas id="resultChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {GetDisplayNames} from "@/libs/str_functions";
import {WasPropUsedInCalculation} from "@/libs/tables";

const verySmallValue = 0.25
export default {
  name: "ResultChart",
  props: {
    resultData: Object,
    colors: Object
  },
  methods: {
    getColor(prop) {
      return this.colors[prop].color
    },
    getPoints(prop) {
      let points = (this.resultData.negatives.get(prop) ?? this.resultData.positives.get(prop)).points
      if (points === 0) {
        points = verySmallValue
      }
      let sign = (this.resultData.negatives.get(prop)) ? 1 : -1
      return sign * points
    },
    getDisplayNames(prop) {
      return GetDisplayNames(prop, WasPropUsedInCalculation(prop, this.resultData))
    }
  },
  mounted() {
    let d = [...this.resultData.negatives.keys(), ...this.resultData.positives.keys()]
    let labels = d.map(this.getDisplayNames);
    let dataset = {
      data: d.map(this.getPoints),
      backgroundColor: d.map(this.getColor),
    };

    const config = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          dataset
        ],
      },
      options: {
        title: 'Punkteverteilung',
        responsive: true,
        scales: {
          y: {
            min: -5,
            max: 10,
            label: 'Punkte'
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  let val = (Math.abs(context.parsed.y) === verySmallValue) ? 0 : context.parsed.y
                  label = `${label}${val} Punkte`;
                }
                return label;
              }
            }
          },
          legend: {
            display: false
          }
        },

      },
    };
    new Chart(
        document.getElementById('resultChart'),
        config
    );
  }
}
</script>

<style scoped>
#resultChart {
  max-height: 40vh;
}
</style>