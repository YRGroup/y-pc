let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 搜索视频
API.searchVideo = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/video/search',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 搜索视频
API.GetVideoUploadAuth = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Video/GetVideoUploadAuth',para).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取视频认证信息
API.getVideoAuth = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/video/GetVideoPlayAuth',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 修改视频信息
API.editVideoInfo = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/video/GetVideoPlayAuth',para).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取当前用户的视频列表
API.getMyVideoList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/video/getMyVideoList',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取所有视频列表
API.getVideoList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/video/search',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 删除视频
API.deleteVideo = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/video/DeleteVideo',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取视频类别列表
API.getCategeryList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Video/GetCategeryList').then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}


// 获取视频类别列表
// API.getCategeryList = () => { 
//   return new Promise((resolve, reject) => {
//     axios.get(_APIurl+'/api/Video/GetCategeryList').then((res)=>{
//         resolve(res.data.Content)
//     })
//   })
// }


export default API
