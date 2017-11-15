import "babel-polyfill"

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import API from './server/API'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条 样式

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (!to.meta.anonymous) {
    API.refreshLiveness()
  }
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// 日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.prototype.$API = API

import md5 from 'js-md5'

import axios from 'axios'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  let now = new Date().getTime()
  let token = localStorage.token
  let sigh = md5(token + now)
  config.headers.time = now
  config.headers.sign = sigh
  return config
}, err => {
  return Promise.reject(err)
});
axios.interceptors.response.use(
  response => {
    if(process.env.NODE_ENV !== 'production'){
    }
    if (response.data.Status == 0) {
      let err = {}
      err.code = response.data.Status
      err.msg = response.data.Msg
      return Promise.reject(err)
    } else {
      return response
    }
  },
  error => {
    let err = {}
    if (error.response) {
      err.code = error.response.data.Status
      err.msg = error.response.data.Msg
    }
    if (error.response.status == 401 || error.response.data.Msg === "操作令牌错误！" || error.response.data.Msg === "校验签名失败！") {
      this.$message.warning("请重新登录~！")
      router.push('/login')
    }
    if (error.response.status == 500) {
      err.msg = '内部服务器错误，请联系网络管理员'
    }
    return Promise.reject(err)
  }
)
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
