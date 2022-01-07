<template>
  <div class="row g-2">
    <div class="col-auto flex-grow-1">
      <label class="col-form-label" :for="name">{{
          labelName
        }}</label>
      <span class="text-primary small clickable" v-if="hasInfoModal" @click="openModal()"> Was ist das?</span>
    </div>
    <div class="col-4">
      <div class="input-group">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputRow",
  props: {
    name: String,
    labelName: String,
    hasInfoModal: Boolean,
  },
  emits: ['open-modal'],
  methods: {
    openModal() {
      this.$emit('open-modal')
    }
  }
}
</script>

<style scoped>

</style>