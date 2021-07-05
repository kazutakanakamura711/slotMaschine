<template>
  <div v-show="show">
    BonusGame!!:
    {{ currentGame }}-{{ playG }}
  
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    currentGame: null,
    playG: null,
    isBonus: Boolean,
  }

}
</script>

<style scoped>
div {
  color: aqua;
  margin: 1rem;
  }
</style>