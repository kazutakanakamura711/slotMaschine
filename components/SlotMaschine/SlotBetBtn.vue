<template>
  <v-btn
    @click="bet"
    large
    elevation="7"
    color="red accent-3"
    class="mx-2"
    :disabled="isDisabledBet"
    >BET</v-btn
  >
</template>

<script>
export default {
  props: {
    isDisabledBet: Boolean,
  },
  methods: {
    bet() {
      this.$emit('bet')
    }
  }
}
</script>

<style>
</style>