import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 最初にlocalStrageの値を取得する
const savedLists = localStorage.getItem('trello-lists')


const store = new Vuex.Store({
  state: {
    lists: savedLists ? JSON.parse(savedLists): [
        {
          title: 'Backlog',
          cards: [
            { body: 'English' },
            { body: 'Mathematics' }
          ]
        },
        {
          title: 'Todo',
          cards: [
            { body: 'Science' }
          ]
        },
        {
          title: 'Doing',
          cards: []
        }
    ],
  },

  mutations: {
    // stateにタイトルという値を渡す
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    // stateにタイトルという値を渡す
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
  },
  actions: {
    //commit → addListを実行する
    addlist(context, payload){
      context.commit('addlist' , payload)
    },
    //commit → removeListを実行する
    removelist(context, payload){
      context.commit('removelist', payload)
    },
  
  },

  
  modules: {
  },
  getters:{

  }
})

// 全てのmutationが完了した後に値が呼び出される
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
// ★ここまで追記