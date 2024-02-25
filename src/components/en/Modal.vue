<template>
  <div class="modal fade show" tabindex="-1" role="dialog" style="display: block" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close clickable" @click="closeModal()" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="mode === 'goodStuff'">
            <p>
              The percentage of fruits, vegetables and legumes as well as nuts is scored as follows:
            </p>
            <h5>Limits</h5>
            <p class=" text-success">
              <inline-icon type="check"></inline-icon>
              Fruits, vegetables and legumes as well as nuts count in the calculation, but
              ...
            </p>
            <p class=" text-danger">
              <inline-icon type="times"></inline-icon>
              Exclude starchy tubers (e.g., potatoes and sweet potatoes), quinoa, spices, and flour made from corn or legumes from the calculation.
            </p>
            <hr>
            <h5>Important infos</h5>
            <p>
              <span class="fw-bolder">For pickled foods</span>, only include the liquid if it is intended to be consumed.
            </p>
            <p>
              <span class="fw-bolder">For cooked or dried fruits/vegetables</span>, the manufacturer can decide whether to include the weight of the cooked or uncooked ingredient.

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
              Do not include concentrated syrup or highly processed fruits and vegetables in the calculation.
            </p>
          </div>
          <div v-else-if="mode === 'salt'">
            <p>
              When calculating the Nutri-Score, the sodium content is rated negative.
              The sodium content can be calculated from the amount of salt .
              Simply input the salt content provided by the manufacturer into the designated field,
              and the application will calculate the corresponding sodium content (which is 40% of the amount of salt listed).
            </p>
          </div>
          <div v-else-if="mode === 'share'">
            <p>
              Show others your calculation with this link
            </p>
            <input type="text" class="form-control" ref="shareUrl" :value="vars.shareUrl">
            <button class="btn btn-primary btn-copy btn-lg mx-auto d-block my-1 mb-2"
                    @click="copy($refs.shareUrl, $event.target)">Copy
            </button>
          </div>
          <div v-else-if="mode === 'fiber'">
            <p>
             When calculating the Nutri-Score, the dietary fiber content is rated positively.
              Unfortunately, the declaration of the dietary fiber content on the packaging is voluntary in Germany.
            </p>
            <p>
            If the dietary fiber content has not been indicated, it may be possible to ask the manufacturer.
            </p>
          </div>
          <div v-else-if="mode === 'imprint'">
            <span class="fw-bold">Contact</span>
            <p>
              E-Mail: info(at)nutrirechner.xyz <br>
              <a href="https://github.com/paulinko/nutri-calc" target="_blank">Source Code on Github</a>
            </p>
          </div>
          <div v-else-if="mode === 'privacy'">
            <span class="fw-bold">Server/Log Files</span>
            <p>
              The provider (or its web space provider) collects data about each access to the offer (so-called
              so-called server log files). The access data includes:
              Name of the accessed website, file, date and time of access, amount of data transferred, message about
              successful retrieval, browser type and version, the operating system of the user, referrer URL (the
              previously visited
              visited page), IP address and the requesting provider.
            </p>
            <p>
              The provider uses the log data only for statistical analysis for the purpose of the operation, security
              and
              security and optimization of the offer. The provider reserves the right, however, to review the log data
              to check the log data retrospectively if there is a justified suspicion of unlawful use due to specific
              illegal use exists.
            </p>
            <span class="fw-bold">Contact</span>
            <p>
              When contacting the provider (for example, by e-mail), the user's information is stored for the purpose of
              processing the request and in the event that follow-up questions arise.
            </p>
          </div>
          <div v-else>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InlineIcon from "@/components/InlineIcon.vue";

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
    vars: Object
  },
  data() {
    return {
      classes: 'fade-in'
    }
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
        this.$emit('close-modal')
        this.classes = 'fade-in'
    },
    copy(textInput, btn) {
      textInput.select();
      textInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(textInput.value);
      let initialClassList = btn.classList.toString()
      let initialText = btn.innerText

      btn.innerText = 'Copied'
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