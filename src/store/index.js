import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import API from '@/server/API'

const store = new Vuex.Store({
  state: {
    title: '育人教育',

    currentUser: null,

    currentClassId: null,
    currentClassInfo: {},
    currentClassList: [],
    currentStudentId: null,
    currentExamList: [],
    currentVideoInfo:{},

    nationList: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "僳僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
    politicalList: ['普通居民', '无党派人士', '中共党员', '中共预备党员', '共青团员', '民革党员', '民盟盟员', '民建会员', '民进会员', '农工党党员', '致公党党员', '九三学社社员', '台盟盟员'],
  },
  getters: {
    _APIurl: () => {
      let a = require('@/server/config.js')
      return a.default
    },
    currentUserId: state => {
      if (state.currentUser) {
        return state.currentUser.Meid
      }
    },
    role: state => {
      if (state.currentUser) {
        return state.currentUser.Role
      }
    },
    hasNoSchoolCard: state => {
      if (state.currentUser && state.currentUser.Role !== '家长') {
        if (!state.currentUser.ExtendInfo.CampusCard) {
          return true
        } else {
          return false
        }
      }
      if (state.currentUser && state.currentUser.Role == '家长') {
        let a = state.currentUser.ExtendInfo.Students.find(o => {
          return o.Meid == state.currentStudentId
        })
        if (!a.CampusCard) {
          return true
        } else {
          return false
        }
      }
    },
    hasNoStudent: state => {
      if (state.currentUser && state.currentUser.Role === '家长') {
        if (!state.currentUser.ExtendInfo.Students.length) {
          return true
        } else {
          return false
        }
      }
    },
    hasNewPost: state => {
      if (state.currentUser && state.currentUser.UnReadMsgCount > 0) {
        return true
      } else {
        return false
      }
    },
    token: state => {
      if (state.currentUser) {
        return state.currentUser.Token
      }
    },
    hasLogin: state => {
      if (state.currentUser) {
        return true
      } else {
        return false
      }
    },
    hasFullInfo: state => {
      if (state.currentUser.Role === '老师' && state.currentUser.ExtendInfo.Status == 0) {
        return 'teacher'
      } else if (state.currentUser.Role === '家长' && state.currentUser.ExtendInfo.Students.length !== 0 && state.currentUser.ExtendInfo.Students[0].Status == 0) {
        return 'parent'
      } else {
        return 'ok'
      }
    }
  },
  mutations: {
    login(state, val) {
      state.currentUser = val
      localStorage.setItem('hasLogin', true)
      localStorage.setItem('token', val.Token)
      localStorage.setItem('user', JSON.stringify(val))

      if (val.Role == '家长') {
        if (val.ExtendInfo.Students.length != 0) {
          state.currentClassId = val.ExtendInfo.Students[0].ClassID
          state.currentStudentId = val.ExtendInfo.Students[0].Meid
        } else {
          state.hasNoStudent = true
        }
      }

      if (val.Role == '学生') {
        state.currentClassId = val.ExtendInfo.ClassID
        state.currentStudentId = val.Meid
      }

      if (val.Role == '老师') {
        if (val.ExtendInfo.Classes.length != 0) {
          state.currentClassId = val.ExtendInfo.Classes[0].ClassID
          if (!state.currentClassList.length) {
            val.ExtendInfo.Classes.forEach(obj => {
              let a = {}
              a.name = obj.ClassName
              a.id = obj.ClassID
              state.currentClassList.push(a)
            })
          }
        }
      }
    },
    logout(state) {
      state.hasLogin = false
      state.currentUser = null
      state.currentClassId = null
      state.currentClassInfo = {}
      state.currentClassList = []

      localStorage.clear()
      sessionStorage.clear()
      document.cookie = "meid=aa;path=/;domain=" + document.domain.match(/[^\.]+\.[^\.]+$/)[0] + ";expires=" + new Date(2011, 1, 1).toGMTString()
      document.cookie = "meid=aa;path=/;domain=" + document.domain + ";expires=" + new Date(2011, 1, 1).toGMTString()
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
    setExamList(state, val) {
      state.currentExamList = val
    },
    setToken(state, val) {
      state.token = val
      if (!localStorage.token) {
        localStorage.token = val
      }
    },
    setApiUrl(state, val) {
      state.ApiUrl = val
    },
    unbind(state) {
      state.hasNoStudent = true
    },
    setCurrentVideoInfo(state,val){
      state.currentVideoInfo = val
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
      return new Promise((resolve, reject) => {
        API.getCurrentUser().then(res => {
          if (localStorage.token) {
            commit('setToken', localStorage.token)
          }
          commit('login', res)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCurrentClassInfo({
      getters,
      commit,
      state
    }, payload) {
      API.getClassInfo(state.currentClassId).then(res => {
        commit('setCurrentClassInfo', res)
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
          commit('login', res)
          commit('setToken', res.Token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    studentLogin({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.studentLogin(payload).then(res => {
          localStorage.setItem('user', JSON.stringify(res))
          commit('login', res)
          commit('setToken', res.Token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    smsLogin({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.loginBySms(payload).then(res => {
          localStorage.setItem('user', JSON.stringify(res))
          commit('login', res)
          commit('setToken', res.Token)
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
        API.logout().then(() => {
          commit('setToken', null)
          commit('logout')
          resolve()
        })
      })
    },
    getExamList({
      getters,
      commit,
      state
    }, payload) {
      return new Promise((resolve, reject) => {
        API.getClassExamList(state.currentClassId).then(res => {
          commit('setExamList', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
})

export default store
