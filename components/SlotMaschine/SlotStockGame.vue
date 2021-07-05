<template>
  <div>
    StockGame:
    {{ stockGameCount }}
  
  </div>
</template>

<script>
export default {
  props: {
    stockGameCount: null,
  }

}
</script>

<style scoped>
div {
  color: aqua;
  margin: 1rem;
  }
</style>