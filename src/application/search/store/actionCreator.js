import { fromJS } from 'immutable'
import {
  getHotKeyWordsRequest,
  getResultSongsListRequest,
  getSuggestListRequest,
} from './../../../api/request'
import {
  SET_ENTER_LOADING,
  SET_HOT_KEYWRODS,
  SET_RESULT_SONGS_LIST,
  SET_SUGGEST_LIST,
} from './constants'
export const changeHotkeyWords = (data) => ({
  type: SET_HOT_KEYWRODS,
  data: fromJS(data),
})

export const changeSuggestList = (data) => ({
  type: SET_SUGGEST_LIST,
  data: fromJS(data),
})

export const changeResultSongs = (data) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS(data),
})

export const changeEnterLoading = (data) => ({
  type: SET_ENTER_LOADING,
  data: data,
})

export const getHotKeyWords = () => {
  return (dispatch) => {
    getHotKeyWordsRequest().then((data) => {
      let list = data.result.hots
      dispatch(changeHotkeyWords(data))
    })
  }
}

export const getSuggestList = (query) => {
  return (dispatch) => {
    getSuggestListRequest(query).then((data) => {
      if (!data) return
      let res = data.result || []
      dispatch(changeSuggestList(res))
    })
    getResultSongsListRequest(query).then((data) => {
      if (!data) return
      let res = data.result.songs || []
      dispatch(changeResultSongs(res))
      dispatch(changeEnterLoading(false)) // 关闭 loading
    })
  }
}
