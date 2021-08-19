import { createStore } from 'vuex'
import actions from '~/actions'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state, playload) {
      state.userInfo = playload
    }
  },
  actions: {
    async actionGetUserInfo({ commit }) {
      const { data } = await actions.getUserInfo()
      data && commit('setUserInfo', data)
    }
  }
})
