<template>
  <v-btn
    @click="start"
    elevation="7"
    color="red accent-3"
    class="mx-2"
    fab
    :disabled="isDisabledStart"
    >囘</v-btn
  >
</template>

<script>
export default {
  props: {
    isDisabledStart: Boolean,
  },
  methods: {
    start() {
      this.$emit('start')
    }
  }
}
</script>

<style>
</style>