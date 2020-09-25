export const getCount = (count) => {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}
export const debounce = (func, delay, immdiate) => {
  var timer, result
  var debounce = function () {
    var context = this
    var args = arguments
    if (timer) clearTimeout(timer)
    if (immdiate) {
      var callNow = !timer
      // 防止多次点击
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) result = func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
    return result
  }
  return debounce
}
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1
    }
  }
}

// 处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name
    return item
  })
  return str
}
