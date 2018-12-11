<template>
  <div class="counter-warp">
    <camera class="camera" v-if="isUseCamera" devicePosition="back" flash="off" style="width:100%; height: 300px">
      <!-- <button>拍照</button> -->
      <cover-view class="take-photo-view" @click="doTakePhoto()">拍照</cover-view>
    </camera>
    <img v-if="imgSrc" :src="imgSrc" alt="" mode="widthFix">
    <button @click="doChooseImg()">选择图片</button>
    <button @click="doChooseImg22()">选择图片22222</button>
    <button @click="doShowCamera()">相机333</button>
    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
import Global from '@/utils/global.js'
// import store from './store'

export default {
  data () {
    return {
      imgSrc: '',
      ctx: {},
      isUseCamera: false
    }
  },
  methods: {
    async doChooseImg () {
      let that = this
      let imgObj = await Global.wxChooseImage()
      that.imgSrc = imgObj.tempFilePaths[0]
    },
    async doChooseImg22 () {
      let that = this
      let imgObj = await Global.wxShowActionSheet()
      that.imgSrc = imgObj.tempFilePaths[0]
    },
    doShowCamera () {
      this.ctx = wx.createCameraContext()
      this.isUseCamera = true
      // Global.wxCreateCameraContext(this.ctx)
    },
    async doTakePhoto () {
      let that = this
      let imgObj = await Global.wxCreateCameraContext(this.ctx)
      console.log('imgObj', imgObj)
      that.imgSrc = imgObj.tempImagePath
    }
  }
}
</script>

<style lang="scss">
.counter-warp {
  position: relative;
  text-align: center;
  margin-top: 100px;
  .camera {
    .take-photo-view {
      position: absolute;
      bottom: 10px;
      left: 50%;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #000;
      text-align: center;
      border-radius: 50%;
      margin-left: -25px;
    }
  }
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
