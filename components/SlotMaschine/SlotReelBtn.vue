<template>
  <div>
    <table>
      <thead>
        <tr>
          <td v-show="isRed[0]">
            <v-alert color="red accent-3" >{{ btnName }}</v-alert>
          </td>
          <td v-show="!isRed[0]">
            <v-alert color="black" >{{ btnName }}</v-alert>
          </td>
        </tr>
        <tr>
          <td>
            <img :src="reelImg" alt="" />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <v-btn
              @click="reelStop()"
              block
              elevation="7"
              :disabled="isDisabledStop"
              color="red accent-3"
              x-large
              >{{ btnName }}</v-btn
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        "images/slotSeven.png",
        "images/slotGreen.png",
        "images/slotRed.png",
        "images/slotBlue.png",
        "images/slotYellow.png",
        "images/slotNuxt.png",
      ],
      reelImg: "",
      clearId: "",
    };
  },
  props: {
    btnName: String,
    id: null,
    isDisabledStop: null,
    imgNum: Number,
    isRed: null,
  },
  methods: {
    // リール始動でランダムにイメージを変更していく
    reelStart() {
      this.clearId = setInterval(() => {
        let randomImg = this.imgs[Math.floor(Math.random() * this.imgs.length)];
        this.reelImg = randomImg;
        // console.log(randomImg)
      }, 100);
    },
    // リール停止・親のresetBtnメソッドにidを渡す
    reelStop() {
      clearInterval(this.clearId);
      console.log(this.id);
      this.$emit("resetBtn", this.id);
      this.reelImg = this.imgs[this.imgNum];
    },
  },
  mounted() {
    // 初期画面
    this.reelImg = this.imgs[0];
    console.log(this.btnName);
  },
};
</script>

<style scoped>
img {
  width: 64%;
}
</style>