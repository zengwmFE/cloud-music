import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getSongUrl, isEmptyObj } from '../../api/utils'
import MiniPlayer from './miniPlayer/index'
import NormalPlayer from './normalPlayer/index'
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
    sequencePlayList,
    mode,
    currentIndex,
    showPlayList,
  } = props
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [preSong, setPreSong] = useState({})
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration
  const currentSong = immutableCurrentSong.toJS()
  const audioRef = useRef()
  const {
    togglePlayingDispatch,
    toggleFullScreenDispatch,
    togglePlayListDispatch,
    toggleCurrentIndexDipatch,
    changeCurrentDispatch,
    changeModeDispatch,
    changePlayListDispatch,
  } = props
  const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: ['手游《梦幻花园》苏州园林版推广曲'],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl:
          'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050,
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ]
  const clickPlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)
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

  useEffect(() => {
    if (!currentSong) return
    toggleCurrentIndexDipatch(0)
    let current = playList[0]
    changeCurrentDispatch(current)
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play()
    })
    togglePlayingDispatch(true)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
  }, [])
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
        />
      ) : null}
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
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
