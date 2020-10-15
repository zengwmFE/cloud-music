import React, { useCallback, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { playMode } from '../../../api/config'
import { getName, prefixStyle } from '../../../api/utils'
import Scroll from '../../../baseUI/scroll'
import {
  changeCurrentIndex,
  changePlayList,
  changePlayMode,
  changeShowPlayList,
  deleteSong,
} from '../store/actionCreator'
import {
  ListContent,
  ListHeader,
  PlayListWrapper,
  ScrollWrapper,
} from './style'
function PlayList(props) {
  const {
    showPlayList,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
  } = props
  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
  } = props
  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  const playListRef = useRef()
  const listWrapperRef = useRef()
  const [isShow, setIsShow] = useState(false)
  const transform = prefixStyle('transform')
  const onEnterCB = useCallback(() => {
    setIsShow(true)
    // 最开始隐藏在下面
    listWrapperRef.current.style[transform] = 'translate3d(0,100%,0)'
  }, [transform])
  const onEnteringCB = useCallback(() => {
    // 让列表展现
    listWrapperRef.current.style['transition'] = 'all .3s'
    listWrapperRef.current.style[transform] = 'translate3d(0,0,0)'
  }, [transform])
  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all .3s'
    listWrapperRef.current.style[transform] = 'translate3d(0px,100%,0px)'
  }, [transform])
  const onExitedCB = useCallback(() => {
    setIsShow(false)
    listWrapperRef.current.style[transform] = `translate3d(0px,100%,0px)`
  }, [transform])
  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id
    const className = current ? 'icon-pay' : ''
    const content = current ? '&#xe6e3;' : ''
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    )
  }
  const changeMode = (e) => {
    let newMode = (mode + 1) % 3
    // 具体逻辑比较复杂 后面来实现
  }
  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = '&#xe625'
      text = '顺序播放'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
      text = '单曲循环'
    } else {
      content = '&#xe61b;'
      text = '随机播放'
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={(e) => {
            changeMode(e)
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span
          className="text"
          onClick={(e) => {
            changeMode(e)
          }}
        >
          {text}
        </span>
      </div>
    )
  }

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return
    changeCurrentIndexDispatch(index)
  }
  const handleDeleteSong = (e, song) => {
    console.log('删除')
    e.stopPropagation()
    deleteSongDispatch(song)
  }
  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: 'block' } : { display: 'none' }}
        onClick={() => togglePlayListDispatch(false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear">&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => {
                        handleChangeCurrentIndex(index)
                      }}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name}-{getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span
                        className="delete"
                        onClick={(e) => {
                          handleDeleteSong(e, item)
                        }}
                      >
                        <i className="icontfont">&#xe63d;</i>
                      </span>
                    </li>
                  )
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}
const mapStateToProps = (state) => ({
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  mode: state.getIn(['player', 'mode']),
})

const mapDispatchToProps = (dispatch) => ({
  togglePlayListDispatch(data) {
    dispatch(changeShowPlayList(data))
  },
  changeCurrentIndexDispatch(data) {
    dispatch(changeCurrentIndex(data))
  },
  changeModeDispatch(data) {
    dispatch(changePlayMode(data))
  },
  changePlayListDispatch(data) {
    dispatch(changePlayList(data))
  },
  deleteSongDispatch(data) {
    dispatch(deleteSong(data))
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList))
