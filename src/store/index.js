import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 最初にlocalStrageの値を取得する
const savedLists = localStorage.getItem("trello-lists");

const store = new Vuex.Store({
  state: {
    lists: savedLists
      ? JSON.parse(savedLists)
      : [
          {
            title: "Backlog",
            cards: [{ body: "English" }, { body: "Mathematics" }],
          },
          {
            title: "Todo",
            cards: [{ body: "Science" }],
          },
          {
            title: "Doing",
            cards: [],
          },
        ],
  },

  mutations: {
    updateList(state, payload){
      state.lists = payload.lists
    },

    
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    // payloadに値が入っている、stateはなんだ？？？
    addlist(state, payload) {
      state.lists.push({
        title: payload.title,
        cards: [],
      });
    },

    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1);
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body });
    },
  },

  actions: {
    updateList(context,payload){
      context.commit('updateList', payload)
    },
    // ★ここに追加
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },

    //commit → addListを実行する
    //payloadにactionから渡ってきた値が入っている
    addlist(context, payload) {
      context.commit("addlist", payload);
    },
    //commit → removeListを実行する
    removelist(context, payload) {
      context.commit("removelist", payload);
    },
    
    addCardToList(context, payload) {
      context.commit("addCardToList", payload);
    },
  },

  modules: {},

  getters: {
    totalCardCount(state) {
      let count = 0
      //listsの中の値が入っている。それらを1つ1つ足し算
      state.lists.map(content => count += content.cards.length)
      return count
    },
  },
});

// 全てのmutationが完了した後に値が呼び出される
// localStorageに入れていく
store.subscribe((mutation, state) => {
  localStorage.setItem("trello-lists", JSON.stringify(state.lists));
});

export default store;

