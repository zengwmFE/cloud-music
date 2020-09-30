import { fromJS } from 'immutable'
import * as actionsType from './constant'
const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: false,
})
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionsType.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', action.data)
    case actionsType.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state
  }
}
