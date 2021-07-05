<template>
<div>
  <v-sparkline
    :value="slumpGraf"
    :gradient="gradient"
    :smooth="radius || false"
    :padding="padding"
    :line-width="width"
    :stroke-linecap="lineCap"
    :gradient-direction="gradientDirection"
    :fill="fill"
    :type="type"
    :auto-line-width="autoLineWidth"
    auto-draw
  ></v-sparkline>
  <p class="text-h4">Difference:{{$store.state.coin.out - $store.state.coin.in}}</p>
  </div>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      width: 2,
      radius: 1,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
    props:{
      slumpGraf: Array
    },
    
  }
</script>

<style>

</style>