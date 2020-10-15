import { fromJS } from 'immutable'
import {
  DELETE_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_SEQUENCE_PLAYLIST,
  SET_SHOW_PLAYLIST,
} from './constant'

export const changeCurrentSong = (data) => ({
  type: SET_CURRENT_SONG,
  data: fromJS(data),
})

export const changeFullScreen = (data) => ({
  type: SET_FULL_SCREEN,
  data: data,
})
export const changePlayState = (data) => ({
  type: SET_PLAYING_STATE,
  data: data,
})

export const changeSequecePlayList = (data) => ({
  type: SET_SEQUENCE_PLAYLIST,
  data: fromJS(data),
})
export const changePlayList = (data) => ({
  type: SET_PLAYLIST,
  data: fromJS(data),
})

export const changePlayMode = (data) => ({
  type: SET_PLAY_MODE,
  data: data,
})
export const changeCurrentIndex = (data) => ({
  type: SET_CURRENT_INDEX,
  data: data,
})
export const changeShowPlayList = (data) => ({
  type: SET_SHOW_PLAYLIST,
  data: fromJS(data),
})

export const deleteSong = (data) => {
  console.log(data)
  return {
    type: DELETE_SONG,
    data: fromJS(data),
  }
}
