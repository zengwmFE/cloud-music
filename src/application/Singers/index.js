import React, { useState } from 'react'
import { connect } from 'react-redux'
import { alphaTypes, categoryTypes } from '../../api/config'
import Horizen from '../../baseUI/horizen-item'
import Scroll from '../../baseUI/scroll'
import { List, ListContainer, ListItem, NavContainer } from './style'
const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
})
const mapDispatchToProps = (dispatch) => ({})
function Singers() {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
    return {
      picUrl:
        'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
      name: '隔壁老樊',
      accountId: 277313426,
    }
  })
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div class="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })}
      </List>
    )
  }
  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }
  let handleUpdateCategory = (val) => {
    setCategory(val)
  }

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类（默认热门）：'}
          handleClick={handleUpdateCategory}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={'首字母：'}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
