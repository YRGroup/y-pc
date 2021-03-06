let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取教师信息
API.getTeacherInfo = (teacherId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Teacher/GetInfo?meid='+teacherId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}



// 获取教师发表的作业列表
API.getAllTeacherHomework = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Teacher/GetHomeworkList',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 教师切换当前班级
API.changeCurrentClass = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/User/ChangeCurrentClass',para).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}


export default API
