import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()
  const {
    direction,
    click,
    refresh,
    pullUploading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    pullUp,
    pullDown,
    onScroll,
  } = props
  // 每次重新渲染都要刷新实例
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      // return值，相当于在页面卸载的时候，运行里面的代码
      setBScroll(null)
    }
  }, [])
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  }, [])
  useEffect(() => {
    // 给实例绑定scroll事件
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })

    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('scrollEnd', (pos) => {
      if (pos.y > 50) {
        pullDown()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullDown, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    // 判断是否滑到底部
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })

    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrllTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))
  return (
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
  )
})
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUpLoading: PropTypes.bool, // 是否显示上拉的动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉的动画
  pullUp: PropTypes.func, // 上拉的处理逻辑
  pullDown: PropTypes.func, // 下拉的处理逻辑
  bounceTop: PropTypes.bool, // 是否支持吸顶
  bounceBottom: PropTypes.bool, // 是否支持乡下吸顶
}
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}
export default Scroll
