<template>
  <div>
    <div v-show="nuxtimeShow">
      ATGame:{{ stockGameCount }} 
    </div>
    <div v-show="!nuxtimeShow">
      ATGame:none 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stockGameCount: null,
    nuxtimeShow: Boolean,
  },
};
</script>

<style scoped>
div {
  color: aqua;
  /* margin: 1rem; */
}
</style>