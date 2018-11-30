import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    systemInfo: wx.getSystemInfoSync(),
    navigationBarHeight: ''
  },
  mutations: {
    setNavigationBarHeight (state, data) {
      state.navigationBarHeight = data
    }
  }
})

export default store
