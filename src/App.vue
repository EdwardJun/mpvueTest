<script>
import Global from './utils/global.js'
export default {
  data () {
    return {
      global: Global.data
    }
  },
  created () {
    Global.init()
    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
</style>

