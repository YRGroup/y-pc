let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取班级考试列表
API.getClassExamList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/class/GetExam?classid='+classId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 发送考试成绩通知
API.sendExamSms = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/class/SendExamScoreMsg',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 添加考试
API.addExam = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/class/AddExam',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 添加考试成绩
API.addExamScore = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/class/AddExamScore',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default API
