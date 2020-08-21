// 创建一个action，可以直接调用使用
import { fromJS } from 'immutable'
// import {getHotSingerListRequest,getSingerListRequest} from '../../../api/request'
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
