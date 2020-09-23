import React from 'react'
import LazyLoad from 'react-lazyload'
import { withRouter } from 'react-router-dom'
import { getCount } from '../../api/utils'
import { List, ListItem, ListWrapper } from './style'
function RecommendList(props) {
  const enterDetail = (id) => {
    props.history.push(`/recommend/${id}`)
  }
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommandList.map((item, index) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./music.png')}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + '?param=300x300'}
                    alt="music"
                    width="100%"
                    height="100%"
                  />
                </LazyLoad>
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

export default withRouter(React.memo(RecommendList))
