import React, { Component } from 'react'
import { ListWrapper, ListItem, List } from './style'
import { getCount } from '../api/utils'
function RecommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommandList.map((item, index) => {
          return (
            <ListItem key={index.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img
                  src={item.picUrl + '?param=300x300'}
                  alt="music"
                  width="100%"
                  height="100%"
                />
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)
