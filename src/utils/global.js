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
  // 选择图片
  wxChooseImage (type = ['album', 'camera']) {
    console.log('type', type)
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 2,
        sizeType: ['compressed'],
        sourceType: 'camera',
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  // 显示操作菜单,然后调用选择图片方法
  wxShowActionSheet () {
    return new Promise((resolve, reject) => {
      let that = this
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: '#CED63A',
        success: function (res) {
          let type = ''
          type = !res ? '' : res.tapIndex === 0 ? 'album' : 'camera'
          that.wxChooseImage(type).then((res) => {
            resolve(res)
          })
        }
      })
    })
  },
  // 调用摄像头
  wxCreateCameraContext (ctx) {
    return new Promise((resolve, reject) => {
      ctx.takePhoto({
        quality: 'high',
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  // 获取设备地址
  wxGetLocation () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          resolve(res)
        }
      })
    })
  },
  wxShowLoading (title, mask, successCallBack, failFunCallBack, completeCallBack) {
    wx.showLoading({
      title: title || '加载中',
      mask: mask || true,
      success: function () {
        typeof successCallBack === 'function' && successCallBack()
      },
      fail: function () {
        typeof failFunCallBack === 'function' && failFunCallBack()
      },
      complete: function () {
        typeof completeCallBack === 'function' && completeCallBack()
      }
    })
  }
}
