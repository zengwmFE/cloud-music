import React ,{useEffect,useRef,useState} from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import {prefixStyle} from '../../api/utils'

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`

function ProgressCircle(props){
    const progressBar = useRef()
    const progress = useRef()
    const progressBtn = useRef()
    const [touch,setTouch] = useState({})
    const progressWidth = 16
    const _offset = (offsetWidth)=>{
        progress.current.style.width = `${offsetWidth}px`
        progressBtn.current.transform = `translate3d(${offsetWidth}px,0,0)`
    }
    const progressTouchStart = (e)=>{
        const startTouch = {}
        startTouch.initiated = true // initiated 为true表示滑动动作开始了
    }
    return (
        <ProgressBarWrapper>
            <div className="bar-inner">
                <div className="progress"></div>
                <div className="progress-btn-wrapper" ref={progressBtn}
                onTouchStart={progressTouch}
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