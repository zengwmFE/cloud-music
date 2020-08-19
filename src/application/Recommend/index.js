import React, { useEffect } from 'react'
// react-redux为函数组件提供redux所需要的操作，connect
import { connect } from 'react-redux'
import Scroll from '../../baseUI/scroll'
import RecommendList from '../../components/index'
import Slider from '../../components/slider'
import * as actionType from './store/actionCreator'
import { Content } from './style'
function Recommend(props) {
  // mock数据
  const { bannerList, recommendList } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommandList={recommendListJS} />
        </div>
      </Scroll>
    </Content>
  )
}
// 将全局state映射到
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
})
// 将dispatch映射到props
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionType.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionType.getCommendList())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
