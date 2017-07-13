import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'

import main from '@/pages/main/main'
import news from '@/pages/main/news'

import classHome from '@/pages/class/home'
import klass from '@/pages/class/main'
import post from '@/pages/class/post'
import homework from '@/pages/class/homework'

import studentHome from '@/pages/student/home'
import studentProfile from '@/pages/student/profile'
import score from '@/pages/student/score'

import teacherHome from '@/pages/student/home'
import teacherProfile from '@/pages/student/profile'

import contactHome from '@/pages/contact/main'
import contact from '@/pages/contact/main'
import msg from '@/pages/contact/main'

import user from '@/pages/user/main'

import reg from '@/pages/login/reg'
import login from '@/pages/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path: '/',
          name: 'main',
          component: main,
        },
        {
          path: '/news',
          name: 'news',
          component: news,
        },
        {
          path: '/class',
          name: 'classHome',
          component: classHome,
          children:[
            {
              path: '',
              name: 'klass',
              component: klass,
            },
            {
              path: '/post',
              name: 'post',
              component: post,
            },
            {
              path: '/homework',
              name: 'homework',
              component: homework,
            },
          ]
        },
        {
          path: '/student',
          name: 'studentHome',
          component: studentHome,
          children:[
            {
              path: '',
              name: 'studentProfile',
              component: studentProfile,
            },
            {
              path: '/score',
              name: 'score',
              component: score,
            },
          ]
        },
        {
          path: '/teacher',
          name: 'teacherHome',
          component: teacherHome,
          children:[
            {
              path: '',
              name: 'teacherProfile',
              component: teacherProfile,
            },
          ]
        },
        {
          path: '/contact',
          name: 'contactHome',
          component: contactHome,
          children:[
            {
              path: '',
              name: 'contact',
              component: contact,
            },
            {
              path: '/msg',
              name: 'msg',
              component: msg,
            },
          ]
        },
        {
          path: '/user',
          name: 'user',
          component: user,
        },
      ]
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
})
