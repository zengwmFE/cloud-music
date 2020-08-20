import React, { useEffect, useRef } from 'react'
import { forceCheck } from 'react-lazyload'
// react-redux为函数组件提供redux所需要的操作，connect
import { connect } from 'react-redux'
import Loading from '../../baseUI/loading'
import Scroll from '../../baseUI/scroll'
import RecommendList from '../../components/list'
import Slider from '../../components/slider'
import * as actionType from './store/actionCreator'
import { Content } from './style'
function Recommend(props) {
  // mock数据
  const { bannerList, recommendList, enterLoading } = props
  const scrollRef = useRef()
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
  }, [])
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content>
      <Scroll className="list" ref={scrollRef} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommandList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : ''}
    </Content>
  )
}
// 将全局state映射到props
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
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
