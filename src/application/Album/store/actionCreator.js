import { fromJS } from 'immutable'
import { getAlbumDetailRequest } from '../../../api/request'
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constant'
/**dispatch分层 */

export const changeCurrentAlbum = (data) => {
  return {
    type: CHANGE_CURRENT_ALBUM,
    data: fromJS(data),
  }
}

export const changeEnterLoading = (data) => {
  return {
    type: CHANGE_ENTER_LOADING,
    data: fromJS(data),
  }
}

export const getAlbumList = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id)
      .then((data) => {
        dispatch(changeCurrentAlbum(data.playlist))
        dispatch(changeEnterLoading(false))
      })
      .catch((error) => {
        console.log('获取album失败')
      })
  }
}
