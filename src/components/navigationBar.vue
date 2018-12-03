<template>
  <div class="navigationBar-wrap" :style="{height: navigationBarHeight + 'px'}">
    <div class="rollback"><img src="/static/img/ic_right.png" alt=""></div>
    <div class="page-title">首页</div>
    <!-- <open-data type="userNickName"></open-data> -->
    <!-- <div><open-data type="userAvatarUrl"></open-data></div> -->
  </div>
</template>

<script>
export default {
  name: 'navigationBar',
  data () {
    return {
      navigationBarHeight: this.$store.state.navigationBarHeight
    }
  },
  created () {
    /* let that = this
    console.log('sys', that.$store.state.systemInfo.statusBarHeight)
    that.navigationBarHeight = that.$store.state.systemInfo.statusBarHeight + 46
    that.$store.commit('setNavigationBarHeight', that.navigationBarHeight) */
  }
}
</script>

<style lang="scss">
  .navigationBar-wrap {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    width: 100%;
    background-color: #d23c3a;
    box-sizing: border-box;
    color: #ffffff;
    .rollback {
      position: absolute;
      >img {
        padding-right: 5px;
        width: 20px;
        height: 20px;
        transform: rotateZ(180deg);
        vertical-align: text-bottom;
      }
    }
    .page-title {
      flex: 1;
      text-align: center;
    }
  }
</style>
