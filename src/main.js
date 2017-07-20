import "babel-polyfill"

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false

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

import API from './server/API'
Vue.prototype.$API = API

import md5 from 'js-md5'

import axios from 'axios'
axios.defaults.withCredentials=true
axios.interceptors.request.use( config => {    
    let now = new Date().getTime()
    let token = store.state.token
    let sigh = md5(token+now)
    config.headers.time = now
    config.headers.sign = sigh
    return config
}, err => {
    console.log('error')
    console.log(err)
    return Promise.reject(err)
});
axios.interceptors.response.use(
  response => {
    console.log('axios to:'+response.config.url)
    console.log(response)
    if(response.data.Status==0){
        let err = {}
        err.code=response.data.Status
        err.msg=response.data.Msg
        return Promise.reject(err)
    }else{
        return response
    }
  },
  error => {
    console.log('发生错误：')
    console.log(error)
    let err ={}
    if(error.response){
        err.code=error.response.data.Status
        err.msg=error.response.data.Msg
    }
    if(error.response.status==401){
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
Vue.prototype.$http = axios

import VueHtml5Editor from 'vue-html5-editor'
let options = {
    name: "vue-html5-editor",
    showModuleName: false,
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    image: {
        sizeLimit: 512 * 1024,
        upload: {
            url: null,
            headers: {},
            params:{},
            fieldName: {}
        },
        compress: {
            width: 350,
            height: 350,
            quality: 80
        },
        uploadHandler(responseText){
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    language: "zh-cn",
    i18n: {
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },

    hiddenModules: [],
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        // "unlink",
        // "tabulation",
        // "image",
        "hr",
        // "eraser",
        // "undo"
    ],
}
Vue.use(VueHtml5Editor,options)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
