let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 设置排序队列
API.UpdateQueueConfig = (data) => {
  return axios.get(_APIurl + '/api/UQueue/UpdateQueueConfig',{
    params:data
  }).then(res => res.data.Content)
}
API.QueueAdd = (data) => {
  return axios.get(_APIurl + '/api/UQueue/QueueAdd',{
    params:data
  }).then(res => res.data.Msg)
}
API.QueueGet = (data) => {
  return axios.get(_APIurl + '/api/UQueue/QueueGet',{
    params:data
  }).then(res => res.data.Msg)
}
API.QueueSetNowNo = (data) => {
  return axios.get(_APIurl + '/api/UQueue/QueueSetNowNo',{
    params:data
  }).then(res => res.data.Msg)
}
export default API
