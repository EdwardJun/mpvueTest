<template>
  <div id="index-page">
    <navigation-bar></navigation-bar>
    <div v-show="offsetTop > 0" class="refresh-wrap" :style="{height: navigationBarHeight + offsetTop + 'px'}">
      <span>下拉刷新...</span>
    </div>
    <scroll-view class="pageScrollView" id="pageScrollView" ref="pageScrollView" @touchstart="viewTouchStart" @longtap="viewLongTap" @touchmove="viewTouchMove" @touchend="viewTouchEnd" @touchscroll="viewTouchScroll" @touchupper="viewTouchUpper" 
    style="white-space: norwrap;overflow: hidden;" :scroll-y="scrolly" :style="{height: scrollViewHeight + 'px', marginTop: isScrollMoving ? '' : navigationBarHeight + 'px'}"><!-- marginTop: isScrollMove ? navigationBarHeight + offsetTop + 'px' :  navigationBarHeight + 'px' -->
      <div class="view-div">
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
      _lastTime: 0
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
      /* that.$nextTick(() => {
        console.log('refs', that.$refs.pageScrollView)
        console.log(document.querySelector('.pageScrollView'))
      }) */
      /* wx.createSelectorQuery().select('#pageScrollView').fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['margin', 'backgroundColor']
      }, function (res) {
        console.log('res', res)
      }).exec() */
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
        if (that.curPoint.pageY - that.startPoint.pageY < 0) {
          that.offsetTop = 0
          that.scrolly = true
        } else if (that.curPoint.pageY - that.startPoint.pageY > that.scrollMoveDistance) {
          return false
        } else {
          that.offsetTop = that.curPoint.pageY - that.startPoint.pageY
          that.scrolly = false
        }
      }, 5)
      // that.offsetTop = (that.curPoint.pageY - that.startPoint.pageY) < 0 ? 0 : that.curPoint.pageY - that.startPoint.pageY
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
    throttle (fn, gapTime) {
      if (gapTime === null || gapTime === undefined) {
        gapTime = 1500
      }
      console.log('gapTime---', gapTime)
      let _lastTime = this._lastTime ? this._lastTime : null
      let _nowTime = +new Date()
      console.log('_lastTime', _lastTime)
      console.log('_nowTime', _nowTime)
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        console.log('_nowTime大于500', _nowTime)
        this._lastTime = _nowTime
        fn()
      }
    }
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
      background-color: #ccc;
    }
  }
</style>
