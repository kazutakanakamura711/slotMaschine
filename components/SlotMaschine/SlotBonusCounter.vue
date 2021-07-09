<template>
<div>
  <div v-show="show">
    BBGame:
    {{ currentGame }}-{{ playG }}
  </div>
  <div v-show="!show">
    BBGame:none
  </div>
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
  /* margin: 1rem; */
  }
</style>