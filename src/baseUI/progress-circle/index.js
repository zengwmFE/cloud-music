import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'


const CircleWrapper = styled.div`
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: ${style["theme-color-shadow"]};
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${style["theme-color"]};
    }
  }
`
function ProgressCircle(props){
    const {radius,percent} = props
    const dashArray = Math.PI* 100
    const dashOffSet = (1-percent)*dashArray
    return (
        <CircleWrapper>
            <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xxmlns="http://www.w3.org/2000/svg">
                <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle> 
                <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent"
                    strokeDasharray={dashArray}
                    startOffset={dashOffSet}
                ></circle>
            </svg>
            {props.children}
        </CircleWrapper>
    )
}

export default React.memo(ProgressCircle)