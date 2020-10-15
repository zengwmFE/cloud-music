import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { filterIndex } from '../../api/utils'
import Scroll from '../../baseUI/scroll/index'
import Player from '../Player'
import { getRankList } from './store/actionCreator'
import { Container, List, ListItem, SongList } from './style'
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size,
})
const mapDispatchToProps = (dispatch) => ({
  getRankListDispatch() {
    dispatch(getRankList())
  },
})
function Rank(props) {
  const { rankList: list, songsCount } = props
  const { loading } = props
  const { getRankListDispatch } = props
  let rankList = list ? list.toJS() : []
  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)
  useEffect(() => {
    getRankListDispatch()
  }, [])
  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            //
            <ListItem
              key={item.coverImageId}
              tracks={item.tracks}
              onClick={() => {
                enterDetail(item)
              }}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          )
        })}
      </List>
    )
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          )
        })}
      </SongList>
    ) : null
  }
  let displayStyle = loading ? { display: 'none' } : { display: '' }
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      <Player />
      {renderRoutes(props.route.routes)}
    </Container>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))
