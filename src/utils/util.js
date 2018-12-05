// utils.js
// 防止多次重复点击  （函数节流）
export function throttle (fn, gapTime) {
  if (gapTime === null || gapTime === undefined) {
    gapTime = 1500
  }
  console.log('gapTime---', gapTime)
  let _lastTime = _lastTime ? _lastTime : null
  let _nowTime = +new Date()
  console.log('_lastTime', _lastTime)
  console.log('_nowTime', _nowTime)
  if (_nowTime - _lastTime > gapTime || !_lastTime) {
    console.log('_nowTime大于500', _nowTime)
    _lastTime = _nowTime
    fn()
  }
}
