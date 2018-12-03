<template>
  <div id="index-page">
    <navigation-bar></navigation-bar>
    <scroll-view class="pageScrollView" id="pageScrollView" ref="pageScrollView" @touchstart="viewTouchStart" @longtap="viewLongTap" @touchmove="viewTouchMove" @touchend="viewTouchEnd" @touchscroll="viewTouchScroll" @touchupper="viewTouchUpper" 
    style="white-space: norwrap;overflow: hidden;" :scroll-y="false" :style="{height: scrollViewHeight + 'px', marginTop: isScrollMove ? navigationBarHeight + offsetTop + 'px' :  navigationBarHeight + 'px'}">
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

export default {
  data () {
    return {
      store: this.$store.state,
      scrollViewHeight: 0, // 滚动元素的高度
      offsetTop: 0, // 滚动元素离视图顶部的距离
      navigationBarHeight: 0, // 导航栏的高度
      startPoint: {}, // 滚动元素的开始触摸点坐标对象
      curPoint: {}, // 滚动元素的当前触摸点坐标对象
      isScrollMove: false, // 滚动元素是否可以滚动
      scrolly: true,
      scrollMoveDistance: 80 // 可滑动距离
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
      that.isScrollMove = true
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
      that.curPoint.pageX = e.pageX.toFixed(3)
      that.curPoint.pageY = e.pageY.toFixed(3)
      // that.offsetTop = (that.curPoint.pageY - that.startPoint.pageY) < 0 ? 0 : that.curPoint.pageY - that.startPoint.pageY
      if (that.curPoint.pageY - that.startPoint.pageY < 0) {
        that.offsetTop = 0
        that.scrolly = true
      } else if (that.curPoint.pageY - that.startPoint.pageY > that.scrollMoveDistance) {
        return false
      } else {
        that.offsetTop = that.curPoint.pageY - that.startPoint.pageY
        that.scrolly = false
      }
      console.log('offsetTop', that.offsetTop)
    },
    viewLongTap (e) {
      console.log('longTap', e)
      // let that = this
      // that.isScrollMove = false
    },
    viewTouchEnd (e) {
      console.log('end', e)
    },
    viewTouchScroll (e) {
      console.log('scroll', e)
    },
    viewTouchUpper (e) {
      console.log('upper', e)
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
  }
</style>
