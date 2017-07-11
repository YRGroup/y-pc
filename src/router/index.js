import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'
import main from '@/pages/main'
import klass from '@/pages/class'
import score from '@/pages/score'
import work from '@/pages/work'
import user from '@/pages/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path: '/main',
          name: 'main',
          component: main,
        },
        {
          path: '/class',
          name: 'klass',
          component: klass,
        },
        {
          path: '/score',
          name: 'score',
          component: score,
        },
        {
          path: '/work',
          name: 'work',
          component: work,
        },
        {
          path: '/user',
          name: 'user',
          component: user,
        },
      ]
    },
  ]
})
