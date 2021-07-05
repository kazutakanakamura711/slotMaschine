<template>
  <div class="container">
    <div class="top">
      <SlotDatas />
      <SlotHistory :slumpGraf="slumpGraf" />
    </div>
    <SlotNuxt class="nuxtLogo" />
    <div class="main">
      <SlotReelBtn
        @resetBtn="resetBtn"
        ref="reelBtnL"
        btnName="L"
        id="0"
        :isDisabledStop="isDisabledStopL"
        :imgNum="imgNums[0]"
        :isRed="assistLamp.isRedL"
      />
      <SlotReelBtn
        @resetBtn="resetBtn"
        ref="reelBtnC"
        btnName="C"
        id="1"
        :isDisabledStop="isDisabledStopC"
        :imgNum="imgNums[1]"
        :isRed="assistLamp.isRedC"
      />
      <SlotReelBtn
        @resetBtn="resetBtn"
        ref="reelBtnR"
        btnName="R"
        id="2"
        :isDisabledStop="isDisabledStopR"
        :imgNum="imgNums[2]"
        :isRed="assistLamp.isRedR"
      />
    </div>
    <div class="sub">
      <Slot1kBtn />

      <SlotStartBtn @start="start" :isDisabledStart="isDisabledStart" />

      <SlotBetBtn @bet="bet" :isDisabledBet="isDisabledBet" />
    <div class="counter" >
      <SlotStockGame
        :stockGameCount="nuxtime.stockGameCount"
      />
      <SlotBonusCounter
        :isBonus="bonus.isBonus"
        :currentGame="bonusMode.count" 
        :playG="bonus.playG"
        :show="bonus.show"   
      />
    </div>
    </div>
    <div>
      <div>
        <SlotPayCounter class="pay" />
      </div>
      <div class="lamp">
        <SlotNuxtimeLamp class="nuxtime" :isNuxtime="nuxtime.isNuxtime" />
        <SlotBonusLamp class="bonus" :isBonus="bonus.isBonus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //リールや停止ボタン関連
      imgNums: [0, 0, 0],
      isDisabledStart: true,
      isDisabledBet: false,
      reelStart: false,
      stopFlags: [],
      isDisabledStopL: true,
      isDisabledStopC: true,
      isDisabledStopR: true,
      outCoins: 0,
      //抽選確率関連
      setting:
      {
        one:{bb: 3,suika: 11,cherry: 19,replay: 27,bell: 127,pb: 7,},
        two:{bb: 4,suika: 12,cherry: 20,replay: 28,bell: 127,pb: 8,},
        three:{bb: 5,suika: 13,cherry: 21,replay: 29,bell: 127,pb: 9,},
        four:{bb: 6,suika: 14,cherry: 22,replay: 30,bell: 127,pb: 10,},
        five:{bb: 7,suika: 15,cherry: 23,replay: 31,bell: 127,pb: 11,},
        six:{bb: 8,suika: 16,cherry: 24,replay: 32,bell: 127,pb: 12,},
        ex:{bb: 30,suika: 40,cherry: 48,replay: 56,bell: 127,pb: 16,},
      },
      // AT関連データ
      nuxtime: {
        // nuxt揃い当選時にtrue,nuxt揃い時にmigrationNuxtMode移行
        //nuxtのcountFlag,assistLamp,isNuxtime,musicFlag,をtrueにしstockGameCountをプラス
        //その後nuxt.flagをfalseにする。
        flag: false,
        isNuxtime: false,
        assistLamp: false,
        stockGameCount: 0,
        countFlag: false,
        musicFlag: false,
        musicObj: "",
      },
      //ボーナス関連
      bonus: {
        flag: false,
        isBonus: false,
        toggleId: "",
        // musicFlag: false,
        musicObj: "",
        playG: 4,
        nuxtimeAddGame: 1,
        nuxtSE: null,
        currentGame: 0,
        show: false,
      },
      //押し順
      pushOrders: {
        order: [],
      },
      bonusMode: {
        isBonusMode: false,
        count: 0,
      },
      //AT中のナビランプ
      assistLamp: {
        isRedL: [],
        isRedC: [],
        isRedR: [],
      },
      //スランプグラフ用配列
      slumpGraf: [],
      //AT引き戻し関連
      pullBack: {
        isPullBack: false,
        count: 5,
      }
    };
  },
  methods: {
    //フラグ抽選開始
    flagLottery() {
      let random = Math.floor(Math.random() * 128);
      if (random <= this.setting.ex.bb) {
        this.imgNums = [0, 0, 0];
        this.bonusConfirm();
        this.outCoins = 15;
        return this.imgNums;
      }
      if (random < this.setting.ex.suika) {
        this.imgNums = [1, 1, 1];
        this.outCoins = 9;
        return this.imgNums;
      }
      if (random < this.setting.ex.cherry) {
        this.imgNums = [2, 2, 2];
        this.outCoins = 2;
        return this.imgNums;
      }
      if (random < this.setting.ex.replay) {
        this.imgNums = [3, 3, 3];
        this.outCoins = 3;
        return this.imgNums;
      }
      if (random < this.setting.ex.bell) {
        this.imgNums = [4, 4, 4];
        this.outCoins = 8;
        this.bellPushOrdersLottery();
        return this.imgNums;
      }
      if (random < 128) {
        for (let i = 0; i < 3; i++) {
          this.imgNums[i] = Math.floor(Math.random() * 5);
        }
        for (let i = 0; i < 5; i++) {
          if (
            this.imgNums[0] == i &&
            this.imgNums[1] == i &&
            this.imgNums[2] == i
          ) {
            this.imgNums = [0, 1, 5];
          }
        }
        this.outCoins = 0;
        return this.imgNums;
      }
    },
    //ベル成立時の押し順の抽選
    bellPushOrdersLottery() {
      let bell = Math.floor(Math.random() * 24);
      console.log("ベル" + bell);
      if (bell == 0) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [true, false, false];
          this.assistLamp.isRedC = [false, true, false];
          this.assistLamp.isRedR = [false, false, true];
        }
        return (this.pushOrders.order = [0, 1, 2]);
      }
      if (bell == 1) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [true, false, false];
          this.assistLamp.isRedC = [false, false, true];
          this.assistLamp.isRedR = [false, true, false];
        }
        return (this.pushOrders.order = [0, 2, 1]);
      }
      if (bell < 7) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [false, true, false];
          this.assistLamp.isRedC = [true, false, false];
          this.assistLamp.isRedR = [false, false, true];
        }
        return (this.pushOrders.order = [1, 0, 2]);
      }
      if (bell < 12) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [false, false, true];
          this.assistLamp.isRedC = [true, false, false];
          this.assistLamp.isRedR = [false, true, false];
        }
        return (this.pushOrders.order = [1, 2, 0]);
      }
      if (bell < 18) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [false, true, false];
          this.assistLamp.isRedC = [false, false, true];
          this.assistLamp.isRedR = [true, false, false];
        }
        return (this.pushOrders.order = [2, 0, 1]);
      }
      if (bell < 24) {
        if (this.nuxtime.assistLamp == true) {
          this.assistLamp.isRedL = [false, false, true];
          this.assistLamp.isRedC = [false, true, false];
          this.assistLamp.isRedR = [true, false, false];
        }
        return (this.pushOrders.order = [2, 1, 0]);
      }
    },
    //bonus中フラグ抽選開始
    flagLotteryB() {
      let random = Math.floor(Math.random() * 4);
      console.log(random);
      if (random == 0) {
        this.imgNums = [5, 5, 5];
        this.outCoins = 10;
        this.nuxtime.flag = true;
        return this.imgNums;
      }
      if (random == 1) {
        this.imgNums = [5, 5, 0];
        this.outCoins = 10;
        return this.imgNums;
      }
      if (random >= 2) {
        this.imgNums = [5, 0, 0];
        this.outCoins = 10;
        return this.imgNums;
      }
    },
    //レバーオン効果音
    leverSE() {
      const leverSE = new Audio();
      leverSE.preload = "auto";
      leverSE.src = "music/leverOn.mp3";
      leverSE.load();
      leverSE.volume = 0.1;
      leverSE.play();
    },
    //引き戻し抽選
    pullBackLottery() {
      let random = Math.floor(Math.random() * 24)
      if (random < this.setting.ex.pb) {
        this.pullBack.isPullBack = true
        this.migrationNuxtimeMode()
        this.nuxtime.stockGameCount = this.pullBack.count  
      }
    },
    // リール始動で停止ボタンのdisabledを解除
    //bonus中はnuxt揃い入れる
    start() {
      //in枚数カウント
      this.$store.commit("in");
      //レバーオン時のSE
      this.leverSE();
      //AT残りゲーム数無しならアシストランプ・nuxtimeランプ消灯消灯・引き戻し抽選
      if (this.nuxtime.stockGameCount == 0 && this.nuxtime.isNuxtime) {
        this.nuxtime.assistLamp = false;
        this.nuxtime.isNuxtime = false;
        this.pullBackLottery()
      }
      //非ボーナス時かつAT残り有りならAT音楽スタート,ATカウント上げる,ATゲーム数減らす
      if (this.nuxtime.stockGameCount > 0 && !this.bonusMode.isBonusMode) {
        this.nuxtimeMusic();
        this.nuxtime.stockGameCount--;
        if (this.nuxtime.countFlag) {
          let type = "AT";
          this.$store.commit("addHistory", type);
          this.$store.commit("atCountUp");
          this.nuxtime.countFlag = false;
        }
      }
      //ボーナス中はnuxt揃い高確率に移行の為、抽選が異なるflagLotteryBで抽選
      if (this.bonusMode.isBonusMode && this.bonusMode.count == 0) {
        this.bonusMusic();
        this.showBonusCounter()
      }
      if (this.bonusMode.isBonusMode) {
        if (this.bonusMode.count < this.bonus.playG) {
          this.bonusMode.count++;
          this.reelStart = true;
          this.$refs.reelBtnL.reelStart();
          this.$refs.reelBtnC.reelStart();
          this.$refs.reelBtnR.reelStart();
          this.isDisabledStopL = false;
          this.isDisabledStopC = false;
          this.isDisabledStopR = false;
          this.isDisabledStart = true;
          this.flagLotteryB();
          return;
        }
      }
      //非ボーナス時の抽選
      if (!this.bonusMode.isBonusMode) {
        this.$store.commit("gameCountUp");
        this.$store.commit("totalGameCountUp");
        this.reelStart = true;
        this.$refs.reelBtnL.reelStart();
        this.$refs.reelBtnC.reelStart();
        this.$refs.reelBtnR.reelStart();
        this.isDisabledStopL = false;
        this.isDisabledStopC = false;
        this.isDisabledStopR = false;
        this.isDisabledStart = true;
        this.flagLottery();
        return;
      }
    },
    //AT音楽
    nuxtimeMusic() {
      if (this.nuxtime.musicFlag) {
        let nuxtimeMusic = new Audio();
        this.nuxtime.musicObj = nuxtimeMusic;
        this.nuxtime.musicObj.loop = true;
        this.nuxtime.musicObj.preload = "auto";
        this.nuxtime.musicObj.src = "music/second.mp3";
        this.nuxtime.musicObj.load();
        this.nuxtime.musicObj.volume = 0.1;
        this.nuxtime.musicObj.play();
        this.nuxtime.musicFlag = false;
        console.log("nuxtimeのmusicObj" + this.nuxtime.musicObj);
      }
    },
    //ボーナスゲームカウンター表示
    showBonusCounter() {
      this.bonus.show = !this.bonus.show
    },
    //ボーナス音楽
    bonusMusic() {
      let bonusMusic = new Audio();
      this.bonus.musicObj = bonusMusic;
      this.bonus.musicObj.loop = true;
      this.bonus.musicObj.preload = "auto";
      this.bonus.musicObj.src = "music/first.mp3";
      this.bonus.musicObj.load();
      this.bonus.musicObj.volume = 0.1;
      this.bonus.musicObj.play();
      // this.bonus.musicFlag = false;
    },
    // AT音楽停止
    stopNuxtMusic() {
      this.nuxtime.musicObj.loop = false;
      this.nuxtime.musicObj.pause();
      this.nuxtime.musicObj.currentTime = 0;
    },
    //ストップボタン効果音
    stopSE() {
      const stopSE = new Audio();
      stopSE.preload = "auto";
      stopSE.src = "music/stop.mp3";
      stopSE.load();
      stopSE.volume = 0.1;
      stopSE.play();
    },
    //停止ボタン確認・小役払い出し
    resetBtn(id) {
      this.stopSE();
      if (this.reelStart) {
        this.stopFlags.push(id);
        console.log(this.stopFlags);
        this.changeAssistLamp();
      }
      //ベル成立の確認
      if (
        this.imgNums[0] == 4 &&
        this.imgNums[1] == 4 &&
        this.imgNums[2] == 4
      ) {
        this.pushOrdersJudgment(id);
      }
      //停止ボタンの2度押しを防止
      if (id == 0) {
        this.isDisabledStopL = true;
      }
      if (id == 1) {
        this.isDisabledStopC = true;
      }
      if (id == 2) {
        this.isDisabledStopR = true;
      }
      //停止ボタンを全て押したらbetできるようにする
      //押し順判定もリセット
      if (
        this.stopFlags.includes("0") &&
        this.stopFlags.includes("1") &&
        this.stopFlags.includes("2")
      ) {
        this.$store.commit("payOut", this.outCoins);
        this.creditStockCheck();
        this.isDisabledBet = !this.isDisabledBet;
        this.stopFlags = [];
        //払い出し有りなら効果音付ける
        if (this.outCoins > 0) {
          this.payOutSE()
        }
        this.outCoins = 0;
        this.pushOrders.order = [0, 1, 2];
        this.pushOrders.check = [];
        //ボーナス確定時用
        if (this.bonus.flag) {
          let type = "BB";
          this.removeBonus();
          this.migrationBonusMode();
          this.sevenSE();
          this.$store.commit("addHistory", type);
          this.$store.commit("gameReset");
        }
        //ボーナス最終ゲーム用
        if (this.bonusMode.count == this.bonus.playG) {
          this.bonus.isBonus = false;
          this.bonusMode.isBonusMode = false;
          this.bonusMode.count = 0;
          this.bonus.musicObj.loop = false;
          this.bonus.musicObj.pause();
          this.bonus.musicObj.currentTime = 0;
          this.showBonusCounter()
          //AT中のボーナスでnuxt揃いなかった場合はnuxtime.musicFlagにtrueを
          //入れて音楽を流すようにする(nuxt揃い時はnuxtime.musicFlagにtrueが入る)
          if (this.nuxtime.stockGameCount > 0) {
            this.nuxtime.musicFlag = true;
          }
        }
        //ATゲーム数0ならnuxtime音楽止める
        if (this.nuxtime.stockGameCount == 0 && this.nuxtime.isNuxtime) {
          this.stopNuxtMusic();
        }
        //ボーナス成立時はnuxtime音楽止める
        if (
          this.bonusMode.isBonusMode == true &&
          this.nuxtime.stockGameCount > 0 &&
          //nuxtime.musicObjが作られていないのにstopNuxtMusic()をすると
          //エラーになるので、そうならないように止める処理
          this.nuxtime.musicObj !== ""
        ) {
          this.stopNuxtMusic();
        }
        //AT突入時用
        if (this.nuxtime.flag == true) {
          this.migrationNuxtimeMode();
        }
        //グラフ作成
        this.$store.commit("addSlumpGraf");
        this.slumpGraf = this.$store.state.slumpGraf;
        console.log("bonusのmusicObj" + this.bonus.musicObj);
      }
    },
    //払い出し効果音
    payOutSE(){
      var payOutSE = new Audio()
      payOutSE.preload = "auto"
      payOutSE.src = "music/payout.mp3"
      payOutSE.load()
      payOutSE.volume = 0.007
      payOutSE.play()
    },
    //7揃い効果音
    sevenSE() {
      var sevenSE = new Audio();
      sevenSE.preload = "auto";
      sevenSE.src = "music/seven.mp3";
      sevenSE.load();
      sevenSE.volume = 0.05;
      sevenSE.play();
    },
    //nuxt揃い効果音
    nuxtSE() {
      var nuxtSE = new Audio();
      nuxtSE.preload = "auto";
      nuxtSE.src = "music/nuxt.mp3";
      nuxtSE.load();
      nuxtSE.volume = 0.05;
      nuxtSE.play();
      console.log(nuxtSE);
    },
    //nuxt揃い時
    migrationNuxtimeMode() {
      this.nuxtSE();
      this.nuxtime.countFlag = true;
      this.nuxtime.assistLamp = true;
      this.nuxtime.isNuxtime = true;
      this.nuxtime.stockGameCount += this.bonus.nuxtimeAddGame;
      this.nuxtime.flag = false;
      this.nuxtime.musicFlag = true;
    },
    //リール止めたらassistLamp次を点灯させる
    changeAssistLamp() {
      this.assistLamp.isRedL.splice(0, 1);
      this.assistLamp.isRedC.splice(0, 1);
      this.assistLamp.isRedR.splice(0, 1);
    },
    // ベル成立時の押し順判定・失敗時はelse
    pushOrdersJudgment(id) {
      if (id == this.pushOrders.order[0]) {
        // this.pushOrders.check.push(true);
        this.pushOrders.order.splice(0, 1);
        console.log(`arr:${this.pushOrders.check}`);
      } else {
        this.imgNums = [0, 2, 5];
        this.outCoins = 0;
      }
    },
    //ボーナスランプ点滅を点灯に・bonusカウント上げる
    removeBonus() {
      clearInterval(this.bonus.toggleId);
      this.bonus.flag = false;
      this.bonus.isBonus = true;
      this.$store.commit("bigCountUp");
    },
    //bonusモード移行
    migrationBonusMode() {
      this.bonusMode.isBonusMode = true;
      // this.bonus.musicFlag = true;
    },
    // リール始動ボタンのdisabledを解除
    bet() {
      if (this.$store.state.datasCounter[2]["count"] < 3) {
        return;
      }
      this.$store.commit("decreaseCredit");
      this.isDisabledStart = false;
      this.isDisabledBet = true;
    },
    //ボーナス確定でロゴ点滅
    bonusConfirm() {
      this.bonus.flag = true;
      this.bonus.toggleId = setInterval(() => {
        this.bonus.isBonus = !this.bonus.isBonus;
      }, 256);
    },
    //払い出し終了時にクレジット2枚以下なら1kのdisable解除
    creditStockCheck() {
      if (this.$store.state.datasCounter[2]["count"] < 3) {
        this.$store.commit("add1kBtnRelease");
      }
    },
    //assistLampオン
    onAssistLamp() {
      this.nuxtime.assistLamp = true;
    },
  },
};
</script>

<style scoped>
.container {
  background: black;
}

.reels {
  display: flex;
}
.btns {
  background: rgb(233, 228, 228);
  display: flex;
}
.stop {
  margin-left: auto;
  margin-right: auto;
}
.main {
  display: flex;
  text-align: center;
  border: solid rgb(243, 243, 242);
  border-radius: 10px;
}
.data {
  margin: 0 0 0 auto;
}
.pay {
  margin: 0 50% 0;
}
.payLine {
  display: flex;
}
.nuxtLogo {
  text-align: center;
}
.top {
  display: flex;
}

.nuxtime {
  /* width: 52%; */
  margin: 0 10% 0 10%;
}

.bonus {
  /* width: 100%; */
  margin: 0 10% 0 10%;
}

.lamp {
  display: flex;
}
.sub {
  display: flex;
}

.counter {
  display: flex;
  margin-left: 30%;
}
</style>
