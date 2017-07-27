import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import API from '@/server/API'

const store = new Vuex.Store({
  state: {
    showBottomNav: true,

    title: '育人教育',

    hasLogin: false,
    role: null || 'guest',

    currentUserId: null,
    currentClassId: null,
    currentClassInfo: {},
    currentClassList: [],
    currentStudentId: null,

    token: null,
    currentUser: null,
    hasNoStudent: false,
    hasNewPost: false,
    hasNewMsg: '0',
  },
  getters: {
    _APIurl: () => {
      let a = require('@/server/config.js')
      return a.default
    }
  },
  mutations: {
    login(state, val) {
      state.hasLogin = true
      state.currentUser = val
      state.currentUserId = val.Meid
      state.role = val.Role

      if (val.Role == '家长') {
        if (val.ExtendInfo.Students.length != 0) {
          state.hasNoStudent = false
          state.currentClassId = val.ExtendInfo.Students[0].ClassID
          state.currentStudentId = val.ExtendInfo.Students[0].Meid
        } else {
          state.hasNoStudent = true
        }
      }

      if (val.Role == '老师') {
        if (val.ExtendInfo.Classes.length != 0) {
          state.currentClassId = val.ExtendInfo.Classes[0].ClassID
          val.ExtendInfo.Classes.forEach(obj => {
            let a = {}
            a.name = obj.ClassName
            a.id = obj.ClassID
            state.currentClassList.push(a)
          })
        }
      }

      if (val.HasNewUnReadDynamic == 1) {
        state.hasNewPost = true
      }

      localStorage.setItem('hasLogin', true)
      localStorage.setItem('id', val.Meid)
      localStorage.setItem('role', val.Role)
      localStorage.setItem('currentClassId', state.currentClassId)
    },
    logout(state) {
      state.hasLogin = false
      state.currentUserId = null
      state.currentUser = null
      state.role = 'guest'
      state.hasNoStudent = false
      state.hasNewPost = false

      localStorage.clear()
    },
    changeRole(state, val) {
      state.role = val.toString()
    },
    setCurrentClassInfo(state, val) {
      state.currentClassInfo = val
    },
    changeTitle(state, val) {
      state.title = val.toString()
    },
    changeCurrentStudent(state, val) {
      state.currentStudent = val
    },
    changeCurrentStudentId(state, val) {
      state.currentStudentId = val
    },
    changeCurrentClass(state, val) {
      state.currentClassId = val
    },
    setToken(state, val) {
      state.token = val
    },
    setApiUrl(state, val) {
      state.ApiUrl = val
    }
  },
  actions: {
    setApiUrl({
      commit,
      state
    }, payload) {
      if (sessionStorage.ApiUrl) {
        commit('setApiUrl', sessionStorage.ApiUrl)
      } else {
        API.getApiUrl(payload).then(res => {
          sessionStorage.ApiUrl = res
          commit('setApiUrl', sessionStorage.ApiUrl)
        })
      }
    },
    getCurrentUser({
      getters,
      commit,
      state
    }, payload) {
      API.getCurrentUser().then(res => {
        commit('login', res)
      })
    },
    getCurrentClassInfo({
      getters,
      commit,
      state
    }, payload){
      API.getClassInfo(state.currentClassId).then(res => {
        commit('setCurrentClassInfo',res)
      })
    },
    login({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.login(payload).then(res => {
          localStorage.setItem('user', JSON.stringify(res))
          commit('setToken', res.Token)
          commit('login', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('setToken', null)
        commit('logout')
        resolve('logout OK!')
      })
    },
  },
})

export default store
