import { fromJS } from 'immutable'
import * as actionTypes from './constant'

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
      break
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state
      break
  }
}
