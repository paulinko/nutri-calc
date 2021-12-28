<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {GetDisplayNames} from "@/libs/Strings";

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
    wasUsedInCalculation(prop) {
      return (prop !== 'protein' || this.resultData.applyProtein)
    },
    getDisplayNames(prop) {
      return GetDisplayNames(prop, this.wasUsedInCalculation(prop))
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
        document.getElementById('myChart'),
        config
    );
  }
}
</script>

<style scoped>

</style>