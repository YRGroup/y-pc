import serverAPI from'./serverAPI'
import userAPI from'./userAPI'
import classAPI from'./classAPI'
import contactAPI from'./contactAPI'
import studentAPI from'./studentAPI'
import teacherAPI from'./teacherAPI'
import examAPI from'./examAPI'
import videoAPI from'./videoAPI'
import paiahoAPI from'./paiahoAPI.js'

let API = Object.assign(serverAPI,userAPI,classAPI,contactAPI,studentAPI,teacherAPI,examAPI,videoAPI,paiahoAPI)

export default API
