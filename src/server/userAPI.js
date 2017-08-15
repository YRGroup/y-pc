let API = {}

import axios from 'axios'


import _APIurl from './config'
// import store from '@/store'

// 登陆
API.login = (logData) => {
  document.cookie = "meid=aa;path=/;domain="+document.domain.match(/[^\.]+\.[^\.]+$/)[0]+";expires=" +new Date(2011,1,1).toGMTString()
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/LoginByPhone', logData).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 使用学号登陆
API.studentLogin = (logData) => {
  document.cookie = "meid=aa;path=/;domain="+document.domain.match(/[^\.]+\.[^\.]+$/)[0]+";expires=" +new Date(2011,1,1).toGMTString()
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/LoginByStudentID', logData).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 使用短信验证码登陆
API.loginBySms = (data) => {
  document.cookie = "meid=aa;path=/;domain="+document.domain.match(/[^\.]+\.[^\.]+$/)[0]+";expires=" +new Date(2011,1,1).toGMTString()
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/user/LoginByPhoneCode',data).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      console.log('获取信息失败：')
      console.log(err)
      reject(err)
    })
  })
}

// 验证账号
API.verifyAccount = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/User/CheckPhoneStatus', {params:para}).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 用户注册
API.userReg = (regdata) => {
  document.cookie=""
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/RegisterByPhone', regdata).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 修改密码
API.changePassword = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/User/ModifyPassword', data).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 家长添加学生
API.addStudent = (addStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Parent/BindStudent', addStudentData).then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 家长解绑学生
API.UnBindStudent = (UnBindStudentData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Parent/UnBindStudent', UnBindStudentData).then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改家长资料
API.editParentInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Parent/ModifyInfo', editData).then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}
// testing

// 修改教师资料
API.editTeacherInfo = (editData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Teacher/ModifyInfo', editData).then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 获取当前用户信息
API.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/User/GetInfo').then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        let error = {}
        error.status = res.data.Status
        error.msg = res.data.Msg
        reject(error)
      }
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 获取一卡通消费记录
API.getCardList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/User/GetFinanceLog', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 绑定一卡通
API.addSchoolcard = (cardNum) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/user/BindYKT',cardNum).then((res)=>{
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default API
