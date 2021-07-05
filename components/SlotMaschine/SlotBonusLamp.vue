<template>
  <div>
    <img
      v-show="isBonus"
      src="~/static/images/nuxtBonus.png"
      class="bonusLamp"
    />
    <img
      v-show="!isBonus"
      src="~/static/images/nuxtBonusFrame.png"
      class="bonusLamp"
    />
  </div>
</template>

<script>
export default {
  props: {
    isBonus: Boolean,
  }
};
</script>

<style scoped>
  .bonusLamp {
    width: 100%;
  }
</style>