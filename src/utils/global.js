import Store from '../store/index'

export default {
  data: {
    navigationBarHeight: ''
  },
  init () {
    let that = this
    that.navigationBarHeight = Store.state.systemInfo.statusBarHeight + 46
    Store.commit('setNavigationBarHeight', that.navigationBarHeight)
  }
}
