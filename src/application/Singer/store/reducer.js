import { fromJS } from 'immutable'
import * as actionType from './constant'
const defaultState = fromJS({
  artist: {},
  songOfArtist: [],
  enterLoading: true,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionType.CHANGE_ARTIST:
      return state.set('artist', action.data)
    case actionType.CHANGE_SONGS_OF_ARTIST:
      return state.set('songOfArtist', action.data)
    case actionType.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state
  }
}
