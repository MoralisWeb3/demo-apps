import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      user: {}
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  }
})

export default store