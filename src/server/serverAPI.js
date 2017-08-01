let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'


// 获取班级所有信息
API.getAllClassInfo = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class?cid='+id).then((res)=>{
      resolve(res)
    })
  })
}
// not OK

// 获取Api地址
API.getApiUrl = (para) => {
  return new Promise((resolve, reject) => {
    axios.get('http://testapi.zzflgs.cn/api/config/GetApiUrl',{params:para}).then((res)=>{
      resolve(res.data.Content.ApiUrl)
    })
  })
}
// not OK

// 上传图片
API.uploadImg = (files) => {
  return new Promise((resolve, reject) => {
    let params = new FormData()
    for(let i=0;i<files.length;i++){
      params.append('file',files[i])      
    }
    let config={
      headers:{'Content-Type':'multipart/form-data'}
    }
    axios.post(_APIurl+'/api/Upload/ImageUpload',params,config).then((res)=>{
      resolve(res.data.Content)    
    })
  })
}

// 注册时获取短信验证码
API.getRegSms = (tel) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/user/SendRegSMS?phone='+tel).then((res)=>{
      if(res.data.Status==1){
        resolve(res.data.Content)
      }else{
        reject(res.data.Msg)
      }
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 修改密码时获取短信验证码
API.getSms = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/user/SendModifyPasswordSMS').then((res)=>{
      if(res.data.Status==1){
        resolve(res.data.Content)
      }else{
        reject(res.data.Msg)
      }
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 根据短信验证码修改密码
API.editPWBySms = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/user/ModifyPassword',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 班主任删除动态
API.deletePost = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Class/DeleteDynamic',params).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 获取校园新闻
API.getNewsList = params => { 
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+`/api/School/GetArticleList`,{params: params }).then(res => {
     resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 获取单条新闻
API.getNewsInfo = params => { 
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+`/api/School/GetArticle`,{params: params }).then(res => {
     resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 添加新闻评论
API.addNewsComment = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/School/AddArticleComment',params).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 空API模板
API.test = () => {
  return new Promise((resolve, reject) => {
    console.log('测试：')
    console.log(this)
  })
}
// testing

export default API
