import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState()
  ],
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {
  },
  modules: {
  }
})
