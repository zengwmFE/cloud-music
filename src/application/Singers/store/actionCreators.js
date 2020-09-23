// 创建一个action，可以直接调用使用
import { fromJS } from 'immutable'
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request'
import {
  CHANGE_ENTER_LOADING,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_PULLUP_LOADING,
  CHANGE_SINGER_LIST,
} from './constant'

// action

export const changeSingerList = (val) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(val),
})
export const changePageCount = (val) => ({
  type: CHANGE_PAGE_COUNT,
  data: val,
})
export const changeEnterLoading = (val) => ({
  type: CHANGE_ENTER_LOADING,
  data: val,
})

export const changePullUpLoading = (val) => ({
  type: CHANGE_PULLUP_LOADING,
  data: val,
})
export const changePullDownLoading = (val) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data: val,
})

export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0)
      .then((res) => {
        let data = res.artists
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))
        dispatch(changePullDownLoading(false))
      })
      .catch(() => {
        console.log('热门歌手数据获取失败')
      })
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount)
      .then((res) => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
      })
      .catch(() => {
        console.log('获取歌手数据获取失败')
      })
  }
}
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then((res) => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    })
  }
}

export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getSingerListRequest(category, alpha, pageCount)
      .then((res) => {
        const data = [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changePullUpLoading(false))
      })
      .catch(() => {
        console.log('歌手数据获取失败')
      })
  }
}
