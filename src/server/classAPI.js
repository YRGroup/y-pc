let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 获取班级信息
API.getClassInfo = (classId) => {
  return axios.get(_APIurl + '/api/Class/GetInfo?cid=' + classId).then(res => res.data.Content)
}

// 获取班级动态列表
API.getAllClassDynamic = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetDynamicList', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 获取班级作业列表
API.getHomeworkList = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetHomeworkList', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 获取单条班级作业
API.getHomework = (hid) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetHomework', {
      params: {
        hid: hid,
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 发布新班级作业
API.addHomework = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddHomework', data).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing


// 获取单条班级动态
API.getClassDynamic = (classId, msgId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetDynamic', {
      params: {
        cid: classId,
        did: msgId
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 匿名获取单条班级动态
API.getPostAnonymouse = (postId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Share/GetDynamic', {
      params: {
        en_id: postId
      }
    }).then((res) => {
      resolve(res.data.Content)
    })
  })
}


// 添加班级动态
API.postNewClassDynamic = (classDynamicData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddDynamic', classDynamicData).then((res) => {
      resolve(res)
    })
  })
}
// testing


// 添加班级动态评论
API.postNewComment = (replyData) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/AddComment', replyData).then((res) => {
      // if (res.data.Status === 1) {
      //   resolve(res)
      // } else {
      //   let error = {}
      //   error.status = res.data.Status
      //   error.msg = res.data.Msg
      //   reject(error)
      // }
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 删除动态
API.deletePost = (params) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/DeleteDynamic', params).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 点赞班级动态
API.doLikeThisPost = (classDynamicId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/Zan?did=' + classDynamicId).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}
// testing

// 获取班级点赞列表
API.postLikedList = (classDynamicId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetZan?did=' + classDynamicId).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing


// 获取班级的教师列表
API.getTeacherList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetTeacherList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}
// testing

// 获取班级的学生列表
API.getStudentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetStudentList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// testing

// 获取班级的家长列表
API.getParentList = (classId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetParentList?cid=' + classId).then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 删除学生
API.deleteStudent = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Class/DeleteStudent', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    })
  })
}

// 获取班级列表
API.getClassList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/Class/GetClassList').then((res) => {
      resolve(res.data.Content)
    })
  })
}


// 获取年级列表
API.getGradeList = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/school/GetGrade').then((res) => {
      resolve(res.data.Content)
    })
  })
}

//获取短信模板
API.getMsgTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/SMS/GetTemplateList').then((res) => {
      resolve(res.data.Content)
    })
  })
}

//获取短信列表
API.getMsglog = () => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/SMS/GetSMSLog').then((res) => {
      resolve(res.data.Content)
    })
  })
}

// 发短信
API.sendMsg = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/SMS/SendSMS', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    })
  })
}


// 获取视频上传认证信息
API.getVideoUploadAuth = (para) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/video/GetVideoUploadAuth',para).then((res)=>{
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

//邀请家长
API.inviteParent = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Parent/AddParent', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    })
  })
}

//删除家长
API.deleteParent = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl + '/api/Parent/DeleteParent', data).then((res) => {
      if (res.data.Status === 1) {
        resolve(res.data.Content)
      } else {
        reject(res.data.Msg)
      }
    })
  })
}

export default API
