<template>
  <v-btn
    elevation="2"
    icon
    color="green accent-3"
    class="mx-2"
    @click="$store.dispatch('in1k')"
    :disabled="$store.state.add1kDisable"
    >1K</v-btn
  >
</template>

<script>
export default {
  
}
</script>

<style>
</style>