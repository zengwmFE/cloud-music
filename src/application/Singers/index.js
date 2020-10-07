import React, { useContext, useEffect } from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { alphaTypes, categoryTypes } from '../../api/config'
import Horizen from '../../baseUI/horizen-item'
import Scroll from '../../baseUI/scroll'
import Player from '../Player/index'
import {
  CategoryDataContext,
  CHANGE_ALPHA,
  CHANGE_CATEGORY,
  Data,
} from './data'
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './store/actionCreators'
import { List, ListContainer, ListItem, NavContainer } from './style'
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)) // 改变了分类，要清空pageCount
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}
function Singers(props) {
  const { data, dispatch } = useContext(CategoryDataContext)
  const { alpha, category } = data.toJS()
  const {
    singerList,
    pageCount,
    pullUpLoading,
    pullDownLoading,
    enterLoading,
  } = props
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props
  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
  }, [])
  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`)
  }
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => {
          return (
            <ListItem
              key={item.accountId + '' + index}
              onClick={() => {
                enterDetail(item.id)
              }}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  let handleUpdateAlpha = (val) => {
    // setAlpha(val)
    dispatch({ type: CHANGE_ALPHA, data: val })

    updateDispatch(category, val)
  }
  let handleUpdateCategory = (val) => {
    // setCategory(val)
    dispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }
  let handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount)
  }
  let handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }
  return (
    <div>
      <Data>
        <NavContainer>
          <Horizen
            list={categoryTypes}
            title={'分类（默认热门）：'}
            handleClick={handleUpdateCategory}
            oldVal={category}
          ></Horizen>
          <Horizen
            list={alphaTypes}
            title={'首字母：'}
            handleClick={(val) => handleUpdateAlpha(val)}
            oldVal={alpha}
          ></Horizen>
        </NavContainer>
        <ListContainer>
          <Scroll
            pullUp={handlePullUp}
            pullDown={handlePullDown}
            pullUpLoading={pullUpLoading}
            pullDownLoading={pullDownLoading}
            onScroll={forceCheck}
          >
            {renderSingerList()}
          </Scroll>
        </ListContainer>
        <Player />
      </Data>
      {renderRoutes(props.route.routes)}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
