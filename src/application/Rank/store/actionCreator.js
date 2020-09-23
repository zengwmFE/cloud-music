import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api/request'
import { CHANGE_LOADING, CHANGE_RANK_LIST } from './constant'
const changeRankList = (val) => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(val),
})
const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data,
})
export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then((data) => {
      let list = data && data.list
      console.log(list, 'list----')
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}
