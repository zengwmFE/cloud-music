import React from 'react'
import { Redirect } from 'react-router-dom'
import Album from '../application/Album/index'
import Home from '../application/Home/index'
import Rank from '../application/Rank/index'
import Recommend from '../application/Recommend/index'
import Search from '../application/search/index'
import Singer from '../application/Singer'
import Singers from '../application/Singers/index'
export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={'/recommend'} />,
      },
      {
        path: '/search',
        exact: true,
        key: 'search',
        component: Search,
      },
      {
        path: '/recommend',
        component: Recommend,
        routes: [
          {
            path: '/recommend/:id',
            component: Album,
          },
        ],
      },
      {
        path: '/singers',
        component: Singers,
        key: 'singers',
        routes: [
          {
            path: '/singers/:id',
            component: Singer,
          },
        ],
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: '/rank/:id',
            component: Album,
          },
        ],
      },
    ],
  },
]
