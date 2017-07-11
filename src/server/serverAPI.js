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

    // let allres=[]
    // for(let i=0;i<files.length;i++){
    //   let params = new FormData()
    //   params.append('file',files[i])
    //   let config={
    //     headers:{'Content-Type':'multipart/form-data'}
    //   }
    //   axios.post(_APIurl+'/api/Upload/ImageUpload',params,config).then((res)=>{
    //     if(res.data.Status==1){
    //       allres.push(res.data.Content.imgUrl)
    //       if(allres.length===files.length){
    //         console.log('所有图片上传成功')
    //         console.log(allres)
    //         resolve(allres)    
    //       }
    //     }else{
    //       // console.log(res.data.Msg)
    //       allres.push(res.data.Msg)
    //       console.log('出现错误')
    //       console.log(allres)
    //       reject(allres) 
    //       // if(allres.length===files.length){
    //       //   console.log('出现错误')
    //       //   console.log(allres)
    //       //   reject(allres)    
    //       // }
    //     }
    //   }).catch((err)=>{
    //     console.log(err)
    //   })
    // }

  })
}
// testing

// 空API模板
API.default = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Class/GetDynamic?cid='+id).then((res)=>{
      console.log('测试：')
      console.log(this)
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 空API模板
API.test = () => {
  return new Promise((resolve, reject) => {
    console.log('测试：')
    console.log(this)
  })
}
// testing

export default API
