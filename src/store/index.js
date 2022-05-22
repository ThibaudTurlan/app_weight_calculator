import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState()
  ],
  state: {
    count: 0,
    times: []
  },
  getters: {
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    add(state, value) {
      state.times.push({ id: state.times.length, time: value });
    },
    reset(state) {
      state.times = [];
    },
  },
  actions: {
  },
  modules: {
  }
})
