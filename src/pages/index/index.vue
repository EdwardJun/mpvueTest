<template>
  <div id="index-page">
    <!-- <navigation-bar></navigation-bar> -->
    <div>
      <ul>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
        <li>下拉刷新</li>
      </ul>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import navigationBar from '@/components/navigationBar'
// import store from '@/sotre/index'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
      // info: store.state
    }
  },
  components: {
    card, navigationBar
  },
  created () {
    // let that = this
    // console.log(that.$store.state.systemInfo)
    // let viewHeight = wx.getSystemInfoSync().windowHeight
    // console.log(viewHeight)
    // wx.startPullDownRefresh()
  },
  onPullDownRefresh () {
    console.log('执行了吗')
    wx.showNavigationBarLoading()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#d23c3a',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    wx.setNavigationBarTitle({
      title: '下拉刷新'
    })
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 2000)
  },
  methods: {
    /* bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    } */
    /* onPullDownRefresh () {
      wx.stopPullDownRefresh()
    } */
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
