import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'

import main from '@/pages/main/main'
import news from '@/pages/main/news'
import docs from '@/pages/main/docs'

import classHome from '@/pages/class/home'
import klass from '@/pages/class/main'
import post from '@/pages/class/post'
import homework from '@/pages/class/homework'
import sendmsg from '@/pages/class/sendmsg'

import contactHome from '@/pages/contact/home'
import contact from '@/pages/contact/main'
import msg from '@/pages/contact/msg'

import studentHome from '@/pages/student/home'
import student from '@/pages/student/main'
import score from '@/pages/student/score'
import editStudent from '@/pages/student/edit'

import teacherHome from '@/pages/teacher/home'
import teacher from '@/pages/teacher/main'
import editTeacher from '@/pages/teacher/edit'

import parentHome from '@/pages/parent/home'
import parent from '@/pages/parent/main'
import editparent from '@/pages/parent/edit'
import addStudent from '@/pages/parent/addStudent'

import examList from '@/pages/exam/examList'
import exam from '@/pages/exam/exam'
import examChart from '@/pages/exam/examChart'

import schoolcard from '@/pages/addon/schoolcard'

import admin from '@/pages/admin/admin'

import reg from '@/pages/login/reg'
import login from '@/pages/login/login'

import errorPage from '@/pages/sys/404'

import player from '@/pages/video/player'
import videoList from '@/pages/video/list'
import addVideo from '@/pages/video/add'

//排号组件
import paihaoControl from '@/pages/queue/set'
import paihaoShow from '@/pages/queue/main'



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: home,
      children: [{
          path: '',
          name: 'main',
          component: main,
          meta: {
            anonymous: true
          }
        },
        {
          path: '/news',
          name: 'news',
          component: news,
        },
        {
          path: '/docs',
          name: 'docs',
          component: docs,
        },
        {
          path: '/class',
          component: classHome,
          children: [{
              path: '',
              name: 'klass',
              component: klass,
            },
            {
              path: '/post/:postId',
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
          path: '/p/:postId',
          name: 'anonymousPost',
          component: post,
          meta: {
            anonymous: true
          }
        },
        {
          path: '/s',
          component: student
        },
        {
          path: '/student',
          component: studentHome,
          children: [{
              path: '',
              name: 'student',
              component: student,
            },
            {
              path: '/student/:studentId/score/:examId',
              name: 'score',
              component: score,
            },
            {
              path: 'schoolcard',
              component: schoolcard,
            },
            {
              path: 'edit',
              name: 'editStudent',
              component: editStudent,
            },
          ]
        },
        {
          path: '/t',
          component: teacher
        },
        {
          path: '/teacher',
          component: teacherHome,
          children: [{
              path: '',
              name: 'teacher',
              component: teacher,
            },
            {
              path: 'schoolcard',
              component: schoolcard,
            },
            {
              path: 'edit',
              name: 'editTeacher',
              component: editTeacher,
            },
          ]
        },
        {
          path: 'schoolcard',
          name: 'schoolcard',
          component: schoolcard,
        },
        {
          path: '/contact',
          component: contactHome,
          children: [{
              path: '',
              name: 'contact',
              component: contact,
            },
            {
              path: '/msg/:id',
              name: 'msg',
              component: msg,
            },
          ]
        },
        {
          path: '/parent',
          component: parentHome,
          children: [{
              path: '',
              name: 'parent',
              component: parent,
            },
            {
              path: 'edit',
              name: 'editparent',
              component: editparent,
            },

            {
              path: '/addStudent',
              name: 'addStudent',
              component: addStudent,
            },
          ]
        },
        {
          path: '/examList',
          name: 'examList',
          component: examList,
        },
        {
          path: '/exam/:examId',
          name: 'exam',
          component: exam,
        },
        {
          path: '/examChart/:examId',
          name: 'examChart',
          component: examChart,
        },
        {
          path: '/admin',
          name: 'admin',
          component: admin,
        },
        {
          path: '/sendmsg',
          name: 'sendmsg',
          component: sendmsg,
        },
        {
          path: '/video',
          name: 'video',
          component: videoList,
        },
        {
          path: '/player',
          component: player,
        },
        {
          path: '/video/add',
          component: addVideo,
        },
      ]
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg,
      meta: {
        anonymous: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        anonymous: true
      }
    },
    {
      path: '/queueset',
      name: 'paihaoControl',
      component: paihaoControl,
    },
    {
      path: '/queue',
      name: 'paihaoShow',
      component: paihaoShow,
    },
    {
      path: '/404',
      name: 'errorPage',
      component: errorPage,
      meta: {
        anonymous: true
      }
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    }
  ]
})
