export const state = (() => {
  return {
    datasCounter: [
      {
        title: 'BIG', count: 0,
      },
      {
        title: 'AT', count: 0,
      },
      {
        title: 'CREDIT', count: 0,
      },
      {
        title: 'GAME', count: 0,
      },
      {
        title: 'TGAME', count: 0,
      },
      {
        title: 'IN(K)', count: 0,
      },
    ],
    pay: 0,
    add1kDisable: false,
    history: [],
    slumpGraf: [],
    coin: {
      in: null,
      out: null,
    }
  }
})

export const mutations = {
  //1k入金用カウント上げる
  up1k(state) {
    state.datasCounter[5]['count']++
  },
  //1k入金後クレジット追加・1kボタンをdisableにする
  addCredit(state) {
    state.datasCounter[2]['count'] += 10
    state.add1kDisable = true
  },
  //bet3枚賭けクレジット下げる
  decreaseCredit(state) {
    state.pay = 0
    state.datasCounter[2]['count'] -= 3
  },
  //in枚数カウント
  in(state) {
    state.coin.in += 3
  },
  //ゲーム数上げる
  gameCountUp(state) {
    state.datasCounter[3]['count']++
  },
  //ゲーム数を0にリセット
  gameReset(state) {
    state.datasCounter[3]['count'] = 0
  },
  //当たり履歴を追加
  addHistory(state,type) {
    let d = {
      game: state.datasCounter[3]['count'],
      type: type,
    }
    state.history.unshift(d)
  },
  //スランプグラフ用データを配列に追加
  addSlumpGraf(state) {
    let d = state.coin.out - state.coin.in
    state.slumpGraf.push(d)
  },
  //総ゲーム数上げる
  totalGameCountUp(state) {
    state.datasCounter[4]['count']++
  },
  //現在のクレジット枚数に小役払い出し分を追加,
  //out枚数も一緒にカウント,
  payOut(state, n) {
    state.datasCounter[2]['count'] += n
    state.pay = n
    state.coin.out += n
  },
  //ボーナスカウント上げる
  bigCountUp(state) {
    state.datasCounter[0]['count'] += 1
  },
  //ATカウント上げる
  atCountUp(state) {
    state.datasCounter[1]['count'] += 1
  },
  //1kボタンのdisable解除
  add1kBtnRelease(state) {
    state.add1kDisable = false
  },
}

export const actions = {
  //1k入金用
  in1k: (context) => {
    context.commit('up1k')
    context.commit('addCredit')
  },
}