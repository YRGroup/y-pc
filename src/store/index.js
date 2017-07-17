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
    currentClassId: null || 19,
    currentClassList:[],
    currentStudentId: null || 'g9mr4e5b',
    currentStudent: {},

    token: null,
    hasStudent: false,
    currentUser: null,
    hasNoStudent: false,
    hasNewPost: false,
    hasNewMsg: '0',

    ApiUrl: ''
  },
  getters: {
    isWeixin: function () {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    showTopNav:()=>{
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return false;
      } else {
        return true;
      }
    },
    _APIurl:()=>{
        let a = require('@/server/config')
        return a.default
    }
  },
  mutations: {
    login(state, val) {
      state.hasLogin = true
      state.currentUserId = val.Meid
      state.role = val.Role
      if(!val.mock){
        state.currentUser = val
        state.hasNewMsg = val.UnReadMsgCount.toString()
      }else{

      }

      if (val.Role == '家长' && !val.mock) {
        if (val.ExtendInfo.Students.length != 0) {
          state.hasNoStudent = false
          state.currentClassId = val.ExtendInfo.Students[0].ClassID
        } else {
          state.hasNoStudent = true
        }
      }

      if (val.Role == '老师' && !val.mock) {
        if (val.ExtendInfo.Classes.length != 0) {
            state.currentClassId = val.ExtendInfo.Classes[0].ClassID
            val.ExtendInfo.Classes.forEach(obj=>{
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
      state.role = 'guest'
      state.hasNoStudent = false
      state.hasNewPost = false

      localStorage.clear()
    },
    changeRole(state, val) {
      state.role = val.toString()
    },
    getClassInfo(state, val) {
      state.classInfo = val
    },
    changeTitle(state, val) {
      state.title = val.toString()
    },
    changeCurrentStudent(state, val) {
      state.currentStudent = val
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
    login({ getters,commit,state }, payload) {
      return new Promise((resolve, reject) => {
        API.login(payload).then(res => {
          localStorage.setItem('user', JSON.stringify(res))
          commit('setToken', res.Token)
          commit('login', res)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    logout({ getters,commit,state }, payload) {
      return new Promise((resolve, reject) => {
        commit('setToken', null)
        commit('logout')
        resolve('logout OK!')
      })
    },
  },
})

export default store
