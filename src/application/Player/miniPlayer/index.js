import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { getName } from '../../../api/utils'
import ProgressCircle from '../../../baseUI/progress-circle/index'
import { MiniPlayerContainer } from './style'
function MiniPlayer(props) {
  const { song, fullScreen, playing, percent } = props
  const {
    clickPlaying,
    setFullScreen,
    toggleFullScreen,
    togglePlayList,
  } = props
  const miniPlayerRef = useRef()
  const handleTogglePlayList = (e) => {
    togglePlayList()
    e.stopPropagation()
  }
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        console.log(miniPlayerRef)
        miniPlayerRef.current.style.display = 'flex'
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none'
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="imageWrapper">
            <img
              src={song.al.picUrl}
              width="40"
              height="40"
              className={`play ${playing ? '' : 'pause'}`}
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="icon-mini iconfont icon-pause"
                onClick={(e) => clickPlaying(e, false)}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="icon-mini iconfont icon-play"
                onClick={(e) => clickPlaying(e, true)}
              >
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
