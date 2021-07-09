<template>
  <v-alert outlined color="purple">
    <div class="text-h6">Do you want to clear the game history?</div>
    <div>If you clear it, you can play from the beginning.</div>
    <v-btn 
    elevation="1" 
    color="deep-purple lighten-2"
    @click="gameClear"
    >OK</v-btn>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    gameClear() {
      localStorage.clear()
      location.reload()
    },
  }
}
</script>

<style>
</style>