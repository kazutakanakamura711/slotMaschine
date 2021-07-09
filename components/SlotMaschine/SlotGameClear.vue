<template>
  <div>
    <v-alert outlined color="purple">
      <div class="text-h6">ClearData</div>
      <div>
        Do you want to delete the game history?<br />
        If you delete it, you can play from the beginning.
        <v-btn @click="gameClear">OK</v-btn>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  methods: {
    gameClear() {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style>
</style>