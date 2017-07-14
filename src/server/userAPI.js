let API = {}

import axios from 'axios'


import _APIurl from './config'
// import store from '@/store'

// 登陆
API.login = (logData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/LoginByPhone',logData).then((res)=>{
      // let token = res.data.Content.Token
      // store.commit('setToken', token)
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 用户注册
API.userReg = (regdata) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/RegisterByPhone',regdata).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 修改密码
API.changePassword = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/ModifyPassword',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 家长添加学生
API.addStudent = (addStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/BindStudent',addStudentData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改家长资料
API.editParentInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/ModifyInfo',editData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改教师资料
API.editTeacherInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Teacher/ModifyInfo',editData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 获取当前用户信息
API.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/User/GetInfo').then((res)=>{
      if(res.data.Status===1){
        resolve(res.data.Content)
      }else{
        let error ={}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err)=>{
      console.log(err)      
      reject(err)
    })
  })
}
// testing

// 家长添加学生
API.addStudent = (addStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Parent/BindStudent',addStudentData).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 获取一卡通消费记录
API.getCardList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/User/GetFinanceLog',{
      params:para
    }).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default API
