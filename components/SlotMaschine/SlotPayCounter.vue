<template>
  <div>
    <v-alert
      color="green accent-3"
      dark
      dense
      outlined
    >{{ $store.state.pay }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    pay: null
  }
}
</script>

<style scoped>
  div {
    width: 25%;
    text-align: center;
    margin: 0;
  }
</style>