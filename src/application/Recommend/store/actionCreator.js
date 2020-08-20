import { fromJS } from 'immutable'
import {
  getBannerListRequest,
  getRecommandListRequest,
} from '../../../api/request'
import * as actionType from './constant'
export const changeBannerList = (data) => ({
  type: actionType.CHANGE_BANNER,
  data: fromJS(data),
})

export const changeRecommendList = (data) => ({
  type: actionType.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
})
export const changeEnterLoading = (data) => ({
  type: actionType.CHANGE_ENTER_LOADING,
  data: fromJS(data),
})
export const getBannerList = () => {
  return (dispatch) => {
    getBannerListRequest()
      .then((data) => {
        dispatch(changeBannerList(data.banners))
      })
      .catch(() => {
        console.log('获取轮播数据失败')
      })
  }
}

export const getCommendList = (data) => {
  return (dispatch) => {
    getRecommandListRequest()
      .then((data) => {
        dispatch(changeRecommendList(data.result))
        dispatch(changeEnterLoading(false))
      })
      .catch(() => {
        console.log('获取推荐列表失败')
      })
  }
}
