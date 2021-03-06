import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { playMode } from '../../api/config'
import Lyric from '../../api/lyric-parser'
import { getLyricRequest } from '../../api/request'
import { findIndex, getSongUrl, isEmptyObj, shuffle } from '../../api/utils'
import Toast from './../../baseUI/Toast/index'
import MiniPlayer from './miniPlayer/index'
import NormalPlayer from './normalPlayer/index'
import PlayList from './playList/index'
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayState,
  changeShowPlayList,
} from './store/actionCreator'
function Player(props) {
  const {
    fullScreen,
    playing,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    sequencePlayList: immutableSequencePlayList,
    mode,
    currentIndex,
    showPlayList,
  } = props
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [preSong, setPreSong] = useState({})
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequencePlayList = immutableSequencePlayList.toJS()
  const audioRef = useRef()
  const [modeText, setModeText] = useState('')
  const toastRef = useRef()
  const songReady = useRef(true)
  const {
    togglePlayingDispatch,
    toggleFullScreenDispatch,
    togglePlayListDispatch,
    toggleCurrentIndexDipatch,
    changeCurrentDispatch,
    changeModeDispatch,
    changePlayListDispatch,
  } = props
  // 歌词
  const [currentPlayingLyric, setPlayingLyric] = useState('')
  const currentLineNum = useRef(0)
  const currentLyric = useRef()

  const changeMode = (index) => {
    let newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      toggleCurrentIndexDipatch(index)
      setModeText('顺序循环')
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
      setModeText('单曲循环')
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      console.log(newList, 'newList')
      let index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      toggleCurrentIndexDipatch(index)
      setModeText('随机播放')
    }
    toastRef.current.show()
    changeModeDispatch(newMode)
  }
  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000)
    }
  }
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime)
  }
  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if (!playing) {
      togglePlayingDispatch(true)
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000)
    }
  }

  const handleLoop = () => {
    audioRef.current.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current.play()
  }
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    toggleCurrentIndexDipatch(index)
  }

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true)
    toggleCurrentIndexDipatch(index)
  }
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }
  const handleError = () => {
    songReady.current = true
    alert('播放出错')
  }
  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return
    currentLineNum.current = lineNum
    setPlayingLyric(txt)
  }
  const getLyric = (id) => {
    let lyric = ''
    if (currentLyric.current) {
      currentLyric.current.stop()
    }
    getLyricRequest(id)
      .then((data) => {
        lyric = data.lrc.lyric
        console.log(lyric, 'lyric')
        if (!lyric) {
          currentLyric.current = null
          return
        }
        currentLyric.current = new Lyric(lyric, handleLyric)
        console.log(currentLyric, 'currentLyric')
        currentLyric.current.play()
        currentLineNum.current = 0
        currentLyric.current.seek(0)
      })
      .catch(() => {
        songReady.current = true
        audioRef.current.play()
      })
  }
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
      return
    let current = playList[currentIndex]

    changeCurrentDispatch(current)
    setPreSong(current)
    songReady.current = false // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play()
      songReady.current = true
    })
    togglePlayingDispatch(true)
    console.log(current, 'current')
    getLyric(current.id)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
  }, [playList, currentIndex])

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])
  return (
    <div>
      {!isEmptyObj(currentSong) ? (
        <MiniPlayer
          song={currentSong}
          playing={playing}
          clickPlaying={clickPlaying}
          fullScreen={fullScreen}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
        />
      ) : null}
      {!isEmptyObj(currentSong) ? (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          clickPlaying={clickPlaying}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
          mode={mode}
          changeMode={changeMode}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}
        />
      ) : null}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef} />
      <PlayList></PlayList>
    </div>
  )
}
const mapStateToProps = (state) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  playList: state.getIn(['player', 'playList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentSong: state.getIn(['player', 'currentSong']),
})
const mapDispatchToProps = (dispatch) => ({
  togglePlayingDispatch(data) {
    dispatch(changePlayState(data))
  },
  toggleFullScreenDispatch(data) {
    dispatch(changeFullScreen(data))
  },
  togglePlayListDispatch(data) {
    console.log(data, 'data')
    dispatch(changeShowPlayList(data))
  },
  toggleCurrentIndexDipatch(data) {
    dispatch(changeCurrentIndex(data))
  },
  changeCurrentDispatch(data) {
    dispatch(changeCurrentSong(data))
  },
  changeModeDispatch(data) {
    dispatch(changePlayMode(data))
  },
  changePlayListDispatch(data) {
    dispatch(changePlayList(data))
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
