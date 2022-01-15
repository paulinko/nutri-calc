<template>
  <div class="modal fade show"  tabindex="-1" role="dialog" style="display: block" aria-hidden="true" >
  <div class="modal-dialog modal-dialog-centered " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
        <button type="button" class="btn-close clickable" @click="closeModal()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-if="mode === 'goodStuff'">
          <p>
            Here, the amounts of fruits, vegetables and legumes as well as nuts and nuts are counted.
          </p>
          <h5>Limits</h5>
          <p class=" text-success">
            <inline-icon type="check"></inline-icon>
            Fruits, vegetables and legumes, as well as nuts count in the calculation, but
            ...
          </p>
          <p class=" text-danger">
            <inline-icon type="times"></inline-icon>
            <span class="fw-bolder"> starchy tubers (e.g. potatoes and sweet potatoes),, Quinoa und
              spices, flour from corn or legumes </span> do not count.
          </p>
          <hr>
          <h5>Important infos</h5>
          <p>
            <span class="fw-bolder">Pickled foods</span> The liquid can only be included in the calculation
            if it is to be consumed.
          </p>
          <p>
            <span class="fw-bolder">Cooked/Dried fruits/vegetables</span> The manufacturer can decide for himself whether
            to include the weight of the cooked or uncooked ingredient.

          </p>
          <hr>
          <h5>Processing/Preparation</h5>
          <p class=" text-success">
            <inline-icon type="check"></inline-icon>
            contained whole, cut and peeled
          </p>
          <p class=" text-success">
            <inline-icon type="check"></inline-icon>
            are frozen, dried, cooked and preserved in cans
          </p>
          <p class=" text-warning">
            <inline-icon type="check"></inline-icon>
            Juices and purees, if the fruit and vegetables have only been pressed, pureed or otherwise chopped up
          </p>
          <p class="text-danger">
            <inline-icon type="times"></inline-icon>
            not concentrated syrup or highly processed fruits and vegetables.
          </p>
        </div>
        <div v-else-if="mode === 'salt'">
          <p>
            <!--            TODO-->
            Bei der Berechnung des Nutri-Scores wird der Natriumgehalt negativ gewertet.
            Dieser kann aus dem Salzgehalt berechnet werden.
            Geben Sie in dem Eingabefeld den von Hersteller angegebenen Salzgehalt an, die Anwendung berechnet dafür den Natriumgehalt (40% des enthaltenden Salzes).
          </p>
        </div>
        <div v-else-if="mode === 'share'">
          <p>
            Mit dieser URL kannst du anderen deine Berechnung zeigen:
          </p>
          <input type="text" class="form-control" ref="shareUrl" :value="vars.shareUrl">
          <button class="btn btn-primary btn-copy btn-lg mx-auto d-block my-1" @click="copy($refs.shareUrl, $event.target)">Kopieren</button>
        </div>
        <div v-else>

        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>

import InlineIcon from "@/components/InlineIcon";
export default {
  name: "modal",
  components: {InlineIcon},
  props: {
    title: {
      type: String,
      default: 'info'
    },
    mode: {
      type: String,
      default: 'info'
    },
    vars : Object
  },
  data() {
    return {
      classes: 'fade-in'
    }
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.classes = 'fade-out'
      setTimeout(() => {
        this.$emit('close-modal')
        this.classes = 'fade-in'
      }, 450);
    },
    copy(textInput, btn){
      textInput.select();
      textInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(textInput.value);
      let initialClassList = btn.classList.toString()
      let initialText = btn.innerText

      btn.innerText = 'Kopiert'
      btn.classList = initialClassList + ' btn-success'
      setTimeout(() => {
        btn.classList = initialClassList
        btn.innerText = initialText
      }, 1000)
    }
  }
}
</script>

<style scoped>
.text-warning {
  color: #ff9e07 !important;
}
.copy .btn-copy {
      transition: 0.3s ease-in;
}
</style>