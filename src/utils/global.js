import Store from '../store/index'

export default {
  data: {
    navigationBarHeight: ''
  },
  init () {
    let that = this
    that.navigationBarHeight = Store.state.systemInfo.statusBarHeight + 46
    Store.commit('setNavigationBarHeight', that.navigationBarHeight)
  },
  /* thottle (fn, wait = 1000) {
    console.log('1111111111')
    let _lastTime = 0
    return function () {
      let _nowTime = +new Date()
      console.log('_nowTime', _nowTime)
      console.log('_lastTime', _lastTime)
      if (_nowTime - _lastTime > wait || !_lastTime) {
        fn.apply(this, arguments)
        _lastTime = _nowTime
      }
    }
  } */
  /* throttle (action, delay) {
    var last = 0
    return function () {
      console.log('throttle----------')
      var curr = +new Date()
      if (curr - last > delay) {
        action.apply(this, arguments)
        last = curr
      }
    }
  } */
  throttle (fn, delay) {
    let timer = null
    console.log('fn---------', fn)
    return function () {
      console.log('dddddddd')
      const context = this
      let args = arguments
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(context, args)
          clearTimeout(timer)
        }, delay)
      }
    }
  }
}
