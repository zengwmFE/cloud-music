import { fromJS } from 'immutable'
import * as actionTypes from './constant'

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
      break
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
      break
    default:
      return state
      break
  }
}
