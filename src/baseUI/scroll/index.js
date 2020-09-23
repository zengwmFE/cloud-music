import BScroll from 'better-scroll'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { debounce } from '../../api/utils'
import LoadingV2 from '../loading-v2/index'
import Loading from '../loading/index'
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()
  const scrollContainerRef = useRef()
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    pullUp,
    pullDown,
    onScroll,
  } = props

  // 依赖一定不能省略，不然拿到得就是第一次缓存到得pullUp函数得引用，相应得闭包作用域变量都是第一次，产生闭包陷阱
  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 3000)
  }, [pullUp])
  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 3000)
  }, [pullDown])

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
  // 组件更新的时候需要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })
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
    const handlePullDown = (pos) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullDown)
    return () => {
      bScroll.off('scrollEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    // 判断是否滑到底部
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)

    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])
  // 这个hooks为父组件暴露可以调用的方法
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
  const PullUpdisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' }
  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading />
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  )
})
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
export default Scroll
