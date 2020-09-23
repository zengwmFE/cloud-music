import React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config' //renderRoutes 读取路由配置转化为 Route 标签
import { HashRouter } from 'react-router-dom'
import { Data } from './application/Singers/data'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes/index.js'
import store from './store/index'
import { GlobalStyle } from './style'
function App(props) {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          <Data>{renderRoutes(routes)}</Data>
        </HashRouter>
      </Provider>
    </div>
  )
}

export default App
