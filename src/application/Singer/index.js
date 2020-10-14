import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { HEADER_HEIGHT } from '../../api/config'
import Header from '../../baseUI/header'
import Loading from '../../baseUI/loading'
import MusicNote from '../../baseUI/music-note'
import Scroll from '../../baseUI/scroll/index'
import SongsList from '../SongsList'
import { changeEnterLoading, getArtistInfo } from './store/actionCreator'
import {
  BgLayer,
  CollectButton,
  Container,
  ImgWrapper,
  SongListWrapper,
} from './style'
const mapStateToProps = (state) => ({
  enterLoading: state.getIn(['singer', 'enterLoading']),
  artist: state.getIn(['singer', 'artist']),
  songOfArtist: state.getIn(['singer', 'songOfArtist']),
})
const mapDispatchToProps = (dispatch) => ({
  getArtistDispath(id) {
    dispatch(changeEnterLoading())
    dispatch(getArtistInfo(id))
  },
})
function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)
  const id = props.match.params.id
  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const songScroll = useRef()
  const header = useRef()
  const layer = useRef()
  const musicNoteRef = useRef()
  // 图片初始高度
  const initalHeight = useRef(0)
  const { getArtistDispath } = props
  const { enterLoading, songOfArtist: immutableSongs } = props
  const { artist: immutableArtist } = props
  const artist = immutableArtist.toJS()
  const songs = immutableSongs.toJS()
  const OFFSET = 5
  useEffect(() => {
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h - OFFSET}px`
    initalHeight.current = h
    layer.current.style.top = `${h - OFFSET}px`
    songScroll.current.refresh()
  }, [])
  useEffect(() => {
    getArtistDispath(id)
  }, [id])
  const handleScroll = useCallback((pos) => {
    let height = initalHeight.current
    const newY = pos.y
    const imageDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const headerDOM = header.current
    const layerDOM = layer.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT
    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height)
    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`
      layerDOM.style.top = `${height - OFFSET + newY}px`
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`
      layerDOM.style.zIndex = 1
      imageDOM.style.paddingTop = '75%'
      imageDOM.style.height = 0
      imageDOM.style.zIndex = -1
      // 按钮跟着移动 渐渐变透明
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`
      buttonDOM.style['opacity'] = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM.style.zIndex = 1
      // 防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100
      // 此时图片高度于header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`
      imageDOM.style.paddingTop = 0
      imageDOM.style.zIndex = 99
    }
  }, [])
  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y })
  }
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false)
  })
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header
          title={artist.name}
          ref={header}
          handleClick={setShowStatusFalse}
        ></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        {enterLoading ? <Loading /> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))
