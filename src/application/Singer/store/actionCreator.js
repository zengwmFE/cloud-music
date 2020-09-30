import { fromJS } from 'immutable'
import { getSingerInfoRequest } from '../../../api/request'
import {
  CHANGE_ARTIST,
  CHANGE_ENTER_LOADING,
  CHANGE_SONGS_OF_ARTIST,
} from './constant'
const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data: data,
})

const changeSongOfArtist = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
})

export const getArtistInfo = (id) => {
  return (dispatch) => {
    getSingerInfoRequest(id).then((res) => {
      const { artist, hotSongs } = res
      dispatch(changeArtist(artist))
      dispatch(changeSongOfArtist(hotSongs))
      dispatch(changeEnterLoading(false))
    })
  }
}
