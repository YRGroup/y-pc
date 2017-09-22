let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'


// 获取学科列表
API.getCourseList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/school/GetCourseList').then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 获取班级考试列表
API.getClassExamList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/class/GetExamList?classid='+classId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 获取考试详情
API.getExamInfo = (examId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/class/GetExam?examid='+examId).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

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

// 删除考试
API.deleteExam = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/class/DeleteExam',data).then((res)=>{
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
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 发布考试
API.publishExam = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/class/publishExam',data).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.GetSingleCourseScoreByExamID = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/ExamChart/GetSingleCourseScoreByExamID',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.GetSingleCourseScoreByClassID = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/ExamChart/GetSingleCourseScoreByClassID',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

API.GetSingleCourseRegionByClassID = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/ExamChart/GetSingleCourseRegionByClassID',{params:para}).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 获取年级考试成绩详情
API.getGradeExamInfo = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/ExamChart/GetGradeTotalScore', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default API
