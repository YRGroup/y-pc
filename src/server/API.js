import serverAPI from'./serverAPI'
import userAPI from'./userAPI'
import classAPI from'./classAPI'
import contactAPI from'./contactAPI'
import studentAPI from'./studentAPI'
import teacherAPI from'./teacherAPI'
import examAPI from'./examAPI'
import videoAPI from'./videoAPI'

let API = Object.assign(serverAPI,userAPI,classAPI,contactAPI,studentAPI,teacherAPI,examAPI,videoAPI)

export default API