<template>
  <div class="map-warp">
    <navigation-bar></navigation-bar>
    <div class="con" :style="{marginTop: navigationBarHeight + 'px' }">
      <div class="search-wrap">
        <input type="text" v-model="searchText" placeholder="请输入需要搜索的场所">
        <button @click="getSearch()">搜索附近</button>
      </div>
      <map id="myMap" v-if="longitude && latitude" style="width: 100%; height: 300px;" :longitude="longitude" :latitude="latitude" scale="16" :markers="markers"></map><!-- subkey="ZVRBZ-2PIAU-PXGVX-4IEJ2-MN2I5-BKBKL" -->
      <div class="search-result">
        <div class="result-wrap" v-for="(item, itemIndex) in searchData" :key="itemIndex">
          <h1>{{item.title}}</h1>
          <div class="bottom">
            <div class="adress">{{item.address}}</div>
            <div class="distance">{{item._distance}}m</div>
          </div>
        </div>
        <div v-if="searchData.length > 0" @click="getSearch()">查看更多</div>
        <!-- <div class="result-wrap">
          <h1>王牌龙虾面</h1>
          <div class="bottom">
            <div class="adress">广东省深圳市福田区上沙股份有限公司对面</div>
            <div class="distance">993m</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from '@/components/navigationBar'
import Global from '@/utils/global.js'
import QQMapWX from '@/utils/qqmap-wx-jssdk.js'
// var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')

export default {
  data () {
    return {
      navigationBarHeight: this.$store.state.navigationBarHeight,
      mapCtx: {},
      latitude: '',
      longitude: '',
      qqmapsdk: '',
      searchText: '',
      searchData: [],
      markers: [], // 地点标志
      markersDefultIconPath: '/static/img/marker-small.png',
      pageIndex: 0, // 当前页为1
      callout: {
        content: 'callout',
        color: '#ccc',
        fontSize: 14,
        borderRadius: 5,
        borderColor: '#ccc',
        bgColor: '#fff',
        padding: 3,
        display: 'BYCLICK',
        // display: 'ALWAYS',
        textAlign: 'center'
      },
      label: {
        content: 'label',
        color: '#ccc',
        fontSize: 14,
        borderRadius: 5,
        borderColor: '#ccc',
        bgColor: '#fff',
        padding: 3,
        textAlign: 'center',
        anchorX: '',
        anchorY: ''
      }
      /* markers: [
        {
          iconPath: '/static/img/marker-small.png',
          id: 0,
          latitude: 22.52291,
          longitude: 114.05454,
          width: 50,
          height: 50
        },
        {
          iconPath: '/static/img/marker-small.png',
          id: 2,
          latitude: 22.52291,
          longitude: 114.05454,
          width: 100,
          height: 100
        }
      ] */
    }
  },
  onLoad () {
    // this.mapCtx = wx.createMapContext('myMap')
    this.getLocation()
    this.qqmapsdk = new QQMapWX({
      key: 'ZVRBZ-2PIAU-PXGVX-4IEJ2-MN2I5-BKBKL'
    })
    // this.getSearch(1)
  },
  components: {
    navigationBar
  },
  methods: {
    async getLocation () {
      let that = this
      Global.wxShowLoading()
      let locObj = await Global.wxGetLocation()
      that.latitude = locObj.latitude
      that.longitude = locObj.longitude
      wx.hideLoading()
    },
    getSearch (page) {
      let that = this
      if (!that.searchText) {
        that.searchData = []
        that.markers = []
        return false
      }

      Global.wxShowLoading()
      page = page || that.pageIndex + 1
      that.qqmapsdk.search({
        keyword: that.searchText || '',
        page_index: page,
        success: function (res) {
          that.pageIndex = page
          if (res.data.length > 0) {
            res.data.map((item, index) => {
              that.searchData.push(item)
            })
          } else {
            that.searchData = []
          }
          that.setMarkersData()
          wx.hideLoading()
        }
      })
    },
    setMarkersData () {
      let that = this
      that.markers = []
      let newCallout = that.callout
      console.log(that.searchData)
      that.searchData.map((item, index) => {
        let obj = {}
        console.log('callout', newCallout)
        let callout = JSON.parse(JSON.stringify(newCallout))
        obj.id = index
        obj.iconPath = that.markersDefultIconPath
        obj.width = 30
        obj.height = 30
        obj.latitude = item.location.lat
        obj.longitude = item.location.lng
        callout.content = item.title
        obj.callout = callout
        obj.zIndex = index + 1
        that.markers.push(obj)
      })
      console.log('markers', that.markers)
    }
  }
}
</script>

<style lang="scss">
.map-warp {
  position: relative;
  text-align: center;
  .con {
    .search-wrap {
      display: flex;
      align-items: center;
      width: 100%;
      >input {
        padding-left: 10px;
        width: 240px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        text-align: left;
      }
    }
    .search-result {
      .result-wrap {
        margin-bottom: 3px;
        text-align: left;
        border-bottom: 1px solid #ccc;
        h1 {
          font-weight: bold;
        }
        .bottom {
          display: flex;
          font-size: 14px;
          .adress {
            width: 300px;
            flex: 0 0 300px;
          }
          .distance {
            flex: 1;
            text-align: right;
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>
