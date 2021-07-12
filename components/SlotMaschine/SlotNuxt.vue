<template>
  <div>
    <div v-show="!addGame">
      <img src="~/static/images/nuxtColor.png" alt="" />
    </div>
    <transition name="transit">
      <div v-show="addGame">
        <v-alert color="yellow">+{{ addGame }}G</v-alert>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    addGame: null,
  },
};
</script>

<style scoped>
img {
  width: 32%;
}
.transit-enter-active {
  transition: 1s;
}
.transit-leave-active {
  transition: 0s;
  opacity: 0.5;
}
.transit-enter,
.transit-leave-to {
  transform: scale(5);
  opacity: 0.1;
}
</style>