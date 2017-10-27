let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 设置排序队列
API.UpdateQueueConfig = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/UQueue/UpdateQueueConfig', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 下一号
API.QueueAdd = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/UQueue/QueueAdd', {
      params: para
    }).then((res) => {
      resolve(res.data.Content)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 获取当前号码
API.QueueGet = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/UQueue/QueueGet', {
      params: para
    }).then((res) => {
      resolve(res.data.Msg)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 重置
API.QueueSetNowNo = (para) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl + '/api/UQueue/QueueSetNowNo', {
      params: para
    }).then((res) => {
      resolve(res.data.Msg)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default API
