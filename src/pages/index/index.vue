<template>
  <div id="index-page">
    <navigation-bar></navigation-bar>
    <div v-if="offsetTop > 0" class="refresh-wrap" :style="{marginTop: navigationBarHeight + 'px', height: offsetTop + 'px', lineHeight: offsetTop + 'px' }">
      <span v-show="curPoint.pageY - startPoint.pageY <= 70">下拉刷新...</span>
      <span v-show="curPoint.pageY - startPoint.pageY > 70">释放刷新...</span>
    </div>
    <scroll-view class="pageScrollView" id="pageScrollView" ref="pageScrollView" @touchstart="viewTouchStart" @longtap="viewLongTap" @touchmove="viewTouchMove" @touchend="viewTouchEnd" @touchscroll="viewTouchScroll" @touchupper="viewTouchUpper" 
    style="white-space: norwrap;overflow: hidden;" :scroll-y="scrolly" :style="{height: scrollViewHeight + 'px', marginTop: isScrollMoving && curPoint.pageY - startPoint.pageY > 0 ? '' : navigationBarHeight + 'px'}"><!-- marginTop: isScrollMove ? navigationBarHeight + offsetTop + 'px' :  navigationBarHeight + 'px' -->
      <!-- <camera devicePosition="back" flash="off" style="width:100%; height: 300px"></camera> -->
      <a href="/pages/counter/main">跳转到counter</a>
      <a href="/pages/map/main">跳转到map</a>
      <div class="view-div">
        <ul>
          <li>下拉刷新<button @click="doChooseImg()">选择图片</button></li>
          <li>下拉刷新<img v-if="imgSrc" :src="imgSrc" alt="" mode="widthFix"></li>
          <li>下拉刷新<button @click="doChooseImg22()">选择图片22222</button></li>
          <li>下拉刷新<button @click="takePhoto()">相机333</button></li>
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
          <li>下拉刷新</li>
          <li>下拉刷新</li>
          <li>下拉刷新</li>
          <li>下拉刷新</li>
          <li>下拉刷新</li>
          <li>下拉刷新</li>
        </ul>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from '@/components/card'
import navigationBar from '@/components/navigationBar'
// import Global from '@/utils/global.js'
// import {throttle} from '@/utils/util.js'

export default {
  data () {
    return {
      store: this.$store.state,
      scrollViewHeight: 0, // 滚动元素的高度
      offsetTop: 0, // 滚动元素离视图顶部的距离
      navigationBarHeight: 0, // 导航栏的高度
      startPoint: {}, // 滚动元素的开始触摸点坐标对象
      curPoint: {}, // 滚动元素的当前触摸点坐标对象
      isScrollMoving: false, // 滚动元素是否正在滚动
      scrolly: true,
      scrollMoveDistance: 80, // 可滑动距离
      _lastTime: 0,
      imgSrc: '',
      ctx: {}
    }
  },
  components: {
    card, navigationBar
  },
  created () {
    let that = this
    that.navigationBarHeight = that.store.navigationBarHeight
    that.scrollViewHeight = that.store.systemInfo.windowHeight - that.store.navigationBarHeight
  },
  computed: {
  },
  /* onPullDownRefresh () {
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
  }, */
  onLoad () {
    this.ctx = wx.createCameraContext()
  },
  methods: {
    viewTouchStart (e) {
      console.log('start', e)
      e.stopPropagation()
      e.preventDefault()
      let that = this
      // that.isScrollMoving = true
      that.startPoint.pageX = e.pageX.toFixed(3)
      that.startPoint.pageY = e.pageY.toFixed(3)
      console.log(that.startPoint)
    },
    viewTouchMove (e) {
      console.log('move', e)
      e.stopPropagation()
      e.preventDefault()
      let that = this
      that.isScrollMoving = true
      that.curPoint.pageX = e.pageX.toFixed(3)
      that.curPoint.pageY = e.pageY.toFixed(3)
      // 函数节流，10毫秒内只会触发一次
      that.throttle(function () {
        console.log(that.curPoint.pageY - that.startPoint.pageY)
        if (that.curPoint.pageY - that.startPoint.pageY < 0) {
          that.offsetTop = 0
          that.scrolly = true
        } else if (that.curPoint.pageY - that.startPoint.pageY > that.scrollMoveDistance) {
          return false
        } else {
          that.offsetTop = that.curPoint.pageY - that.startPoint.pageY
          that.scrolly = false
        }
      }, 2)
      console.log('offsetTop', that.offsetTop)
    },
    viewLongTap (e) {
      console.log('longTap', e)
    },
    viewTouchEnd (e) {
      console.log('end', e)
      let that = this
      that.isScrollMove = true
      console.log(that.scrollMoveDistance)
      // 触摸结束后距离小于一定情况下会立即反弹
      if (that.offsetTop + 10 < that.scrollMoveDistance) {
        that.offsetTop = 0
        that.scrolly = true
        that.isScrollMoving = false
      } else {
        setTimeout(() => {
          that.offsetTop = 0
          that.scrolly = true
          that.isScrollMoving = false
        }, 1500)
      }
    },
    viewTouchScroll (e) {
      console.log('scroll', e)
    },
    viewTouchUpper (e) {
      console.log('upper', e)
    },
    // 函数节流
    throttle (fn, gapTime) {
      if (gapTime === null || gapTime === undefined) {
        gapTime = 1500
      }
      let _lastTime = this._lastTime ? this._lastTime : null
      let _nowTime = +new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        this._lastTime = _nowTime
        fn()
      }
    }
    /* async doChooseImg () {
      let that = this
      let imgObj = await Global.wxChooseImage()
      that.imgSrc = imgObj.tempFilePaths[0]
    },
    async doChooseImg22 () {
      let that = this
      let imgObj = await Global.wxShowActionSheet()
      that.imgSrc = imgObj.tempFilePaths[0]
    },
    takePhoto () {
      Global.wxCreateCameraContext(this.ctx)
    } */
  }
}
</script>

<style lang="scss">
  #index-page {
    overflow: hidden;
    .pageScrollView {
      overflow: hidden;
      .view-div {
        overflow: hidden;
      }
    }
    .refresh-wrap {
      text-align: center;
      background-color: #ccc;
      color: #ffffff;
    }
  }
</style>
