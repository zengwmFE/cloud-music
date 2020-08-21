import { fromJS } from 'immutable'
import * as actionTypes from './constant'
const defaultState = {
  singerList: [],
  enterLoading: true, // 控制进场动画
  pullUpLoading: false, // 控制上拉加载动画
  pullDownLoading: false,
  pageCount: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', fromJS(action.data))
      break
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data)
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
      break
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
      break
  }
}
