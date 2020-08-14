import React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config' //renderRoutes 读取路由配置转化为 Route 标签
import { HashRouter } from 'react-router-dom'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes/index'
import store from './store/index'
import { GlobalStyle } from './style'
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {renderRoutes(routes)}
        </HashRouter>
      </Provider>
    </div>
  )
}

export default App
