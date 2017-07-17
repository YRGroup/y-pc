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

import userHome from '@/pages/user/home'
import user from '@/pages/user/main'
import schoolcard from '@/pages/user/schoolcard'
import edit from '@/pages/user/edit'

import reg from '@/pages/login/reg'
import login from '@/pages/login/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children:[
        {
          path: '',
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
          component: userHome,
          children:[
            {
              path: '',
              name: 'user',
              component: user,
            },
            {
              path: '/schoolcard',
              name: 'schoolcard',
              component: schoolcard,
            },
            {
              path: '/edit',
              name: 'edit',
              component: edit,
            },
          ]
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
