import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
`
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: false,
  pullDown: false,
  bounceTop: true,
  bounceBottom: true,
}
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
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
    })
  }, [])
})

export default React.memo(Scroll)
