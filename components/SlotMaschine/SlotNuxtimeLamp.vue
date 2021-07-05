<template>
  <div>
    <img
      v-show="isNuxtime"
      src="~/static/images/nuxtime.png"
      class="nuxtimeLamp"
    />
    <img
      v-show="!isNuxtime"
      src="~/static/images/nuxtimeFrame.png"
      class="nuxtimeLamp"
    />
  </div>
</template>

<script>
export default {
  props: {
    isNuxtime: Boolean,
  }
}
</script>

<style scoped>
.nuxtimeLamp {
    width: 100%;
  }
</style>