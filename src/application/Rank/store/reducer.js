import { fromJS } from 'immutable'
import { CHANGE_LOADING, CHANGE_RANK_LIST } from './constant'
const defaultState = fromJS({
  rankList: [],
  loading: true,
})
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      console.log(action, 'reducer')
      return state.set('rankList', action.data)
    case CHANGE_LOADING:
      return state.set('loading', action.data)
    default:
      return state
  }
}
