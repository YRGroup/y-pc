import serverAPI from'./serverAPI'
import userAPI from'./userAPI'
import classAPI from'./classAPI'
import contactAPI from'./contactAPI'
import studentAPI from'./studentAPI'
import teacherAPI from'./teacherAPI'
import examAPI from'./examAPI'

let API = Object.assign(serverAPI,userAPI,classAPI,contactAPI,studentAPI,teacherAPI,examAPI)

export default API