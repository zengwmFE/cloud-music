import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { prefixStyle } from '../../api/utils'
import style from '../../assets/global-style'

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -10px;
      top: -13px;
      width: 20px;
      height: 20px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`

function ProgressCircle(props) {
  const progressBar = useRef()
  const progress = useRef()
  const progressBtn = useRef()
  const { percent } = props
  const [touch, setTouch] = useState({})
  const progressBtnWidth = 8
  const transform = prefixStyle('transform')

  const { percentChange } = props
  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const currentPercent = progress.current.clientWidth / barWidth // 进度计算
    percentChange(currentPercent)
  }

  const _offset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`
  }
  const progressTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true // initiated 为true表示滑动动作开始了
    startTouch.startX = e.touches[0].pageX
    startTouch.left = progress.current.clientWidth
    setTouch(startTouch)
  }
  const progressTouchMove = (e) => {
    if (!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth)
    _offset(offsetWidth)
  }

  const progressTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }
  const progressClick = (e) => {
    const rect = progressBar.current.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    _offset(offsetWidth)
    _changePercent()
  }
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth
      const offsetWidth = percent * barWidth
      progress.current.style.width = `${offsetWidth}px`
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  }, [percent])
  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default ProgressCircle
