let API = {}

import axios from 'axios'

// API根目录
import _APIurl from './config'

// 查询用户站内消息列表
API.getMsgList = (day,count) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Chat/GetRecentChatList',{
      params:{
        day:day||0,
        count:count||0
      }
    }).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 查询用户消息对话列表
API.getMsgInfo = (userId) => {
  return new Promise((resolve, reject) => {
    axios.get(_APIurl+'/api/Chat/GetChatList',{
      params:{
        sendto:userId,
        minid:0,
        count:0
      }
    }).then((res)=>{
      let resData={}
      let replyData=[]
      let orginres=res.data.Content
      resData.sendto_Headimgurl=orginres.sendto_Headimgurl
      resData.sendto_TrueName=orginres.sendto_TrueName
      resData.sendto_meid=orginres.sendto_meid
      orginres.CL.forEach(function(el) {
        let thisreply={}
        thisreply.Content=el.Content
        thisreply.IsRead=el.IsRead
        thisreply.SendTo=el.SendTo
        let a = new Date(el.CreateTime)
        let today = new Date()
        if(a.Format("yyyy-MM-dd")===today.Format("yyyy-MM-dd")){
          thisreply.CreateTime=a.Format("hh:mm:ss")
        }else{
          thisreply.CreateTime=a.Format("yyyy-MM-dd")
        }
        replyData.push(thisreply)
      }, this);
      resData.CL=replyData
      resolve(resData)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

// 回复消息
API.replyMsg = (msgdata) => {
  return new Promise((resolve, reject) => {
    axios.post(_APIurl+'/api/Chat/AddChat',msgdata).then((res)=>{
      resolve(res.data.Content)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// testing

export default API
