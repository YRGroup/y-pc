<template>
  <div class="panel">
    <ul class="classinfo classbox">
      <li class="list name">{{classInfo.name}}</li>
      <li class="list">
        <span>
          <i class="iconfont">&#xe607;</i>学生人数：</span> {{studentList.length}}</li>
      <li class="list">
        <span>
          <i class="iconfont">&#xe605;</i>教师人数：</span> {{teacherList.length}}</li>
      <li class="list">
        <el-button type="success" @click="showAddTeacher=true">
          <i class="iconfont">&#xe623;</i>添加老师</el-button>
        <el-button type="info" @click="showAddStudent=true">
          <i class="iconfont">&#xe623;</i>添加学生</el-button>
      </li>
    </ul>
    <el-dialog title="添加学生" :visible.sync="showAddStudent" size="small">
      <el-form label-width="80px">
        <div>
          <el-form-item label="">
            <el-radio-group v-model="type">
              <el-radio :label="1">
                <span>单个添加</span>
              </el-radio>
              <el-radio :label="2">
                <span>批量导入</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div v-show="type==1">
        <el-form label-width="80px" :inline="true" v-for="(i,index) in studentData" :key="index" class="teacherlist">
          <el-form-item label="学生姓名" style="margin-right:30px" :rules="[{ required: true}]">
            <el-input v-model="i.TrueName" palceholder="请输入姓名" style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="60px" style="margin-right:30px" :rules="[{ required: true}]">
            <template>
              <el-radio class="radio" v-model="i.Sex" label="1">男</el-radio>
              <el-radio class="radio" v-model="i.Sex" label="2">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="家长手机" style="margin-right:30px" :rules="[{ required: true}]">
            <el-input v-model="i.ParentPhone" palceholder="请输入姓名" style="width:180px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" :plain="true" @click.native="studentData.splice(index,1)">
              <i class="iconfont">&#xe630;</i>
            </el-button>
          </el-form-item>
        </el-form>
        <el-form label-width="80px">
          <div>
            <el-form-item>
              <el-button @click.native="studentData.push({ClassID: '',TrueName: '', Sex:'',ParentPhone:''})" type="text">
                <i class="iconfont">&#xe623;</i> 添加一行</el-button>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button @click.native="submitAddStudent" type="success">提 交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <div>
          <el-form-item label="">
            <el-upload :action="$store.getters._APIurl+'/import/ImportStudent.aspx'" :on-success="handleSuccess">
              <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
              <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/student_template.xls'">下载模板</a>
              <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button @click.native="submitStudentFile" type="success">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="添加老师" :visible.sync="showAddTeacher" size="small">
      <el-form label-width="80px">
        <div>
          <el-form-item label="">
            <el-radio-group v-model="type">
              <el-radio :label="1">
                <span>单个添加</span>
              </el-radio>
              <el-radio :label="2">
                <span>批量导入</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div v-show="type==1">
        <el-form label-width="70px" :inline="true" v-for="(i,index) in teacherData" :key="index" class="teacherlist">
          <el-form-item label="姓名" :rules="[{ required: true}]">
            <el-input v-model="i.TrueName" palceholder="请输入姓名" style="width:180px"></el-input>
          </el-form-item>

          <el-form-item label="学科" :rules="[{ required: true}]">
            <el-select v-model="i.courseID" placeholder="请选择" style="width:120px">
              <el-option v-for="item in courseList" :key="item.CourseId" :label="item.name" :value="item.CourseId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" :rules="[{ required: true}]">
            <el-input v-model="i.MobilePhone" palceholder="请输入手机号" style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="性别" style="margin-right:30px" :rules="[{ required: true}]">
            <template>
              <el-radio class="radio" v-model="i.Sex" label="1">男</el-radio>
              <el-radio class="radio" v-model="i.Sex" label="2">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="text" :plain="true" @click.native="teacherData.splice(index,1)">
              <i class="iconfont">&#xe630;</i>
            </el-button>
          </el-form-item>
        </el-form>
        <el-form label-width="80px">
          <div>
            <el-form-item>
              <el-button @click.native="teacherData.push({ClassID: '',TrueName: '',MobilePhone: '',courseID:''})" type="text">
                <i class="iconfont">&#xe623;</i> 添加一行</el-button>
              </el-button>
            </el-form-item>
          </div>
          <div>
            <el-form-item>
              <el-button @click.native="submitAddTeacher" type="success">提 交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <div>
          <el-form-item>
            <el-upload :action="$store.getters._APIurl+'/import/ImportTeacher.aspx'" :on-success="handleSuccess">
              <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
              <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/teacher_template.xls'">下载模板</a>
              <!-- <el-button slot="trigger" size="small">下载模板</el-button> -->
              <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button @click.native="submitTeacherFile" type="success">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <div class="content">
      <div class="card">
        <el-row>
          <el-col>
            <div class="tableHeader">班级教师（ {{teacherList.length}} 人）</div>
            <el-table :data="teacherList" stripe border>
              <el-table-column type="index" label="序号" align="center" width="80">
              </el-table-column>

              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>
              <el-table-column label=" 头像" align="center">
                <template scope="scope">
                  <img :src="scope.row.Headimgurl">
                </template>
              </el-table-column>
              <el-table-column prop="Mobilephone" label="手机号" align="center">
              </el-table-column>

              <el-table-column prop="Sex" label="性别" align="center">
              </el-table-column>
              <el-table-column label="职称" align="center">
                <template scope="scope">
                  <div>
                    <span>{{scope.row.Title || '/'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="学科" align="center">
                <template scope="scope">
                  <div>
                    <span>{{scope.row.Course || '/'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template scope="scope">
                  <el-button type="text" size="small" @click="startEditTeacher(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col>
            <div class="tableHeader">班级学生（ {{studentList.length}} 人）</div>
            <el-table :data="studentList" stripe border>
              <el-table-column type="index" label="序号" align="center" width="80">
              </el-table-column>

              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>

              <el-table-column label=" 头像" align="center">
                <template scope="scope">
                  <img :src="scope.row.Headimgurl">
                </template>
              </el-table-column>
              <el-table-column prop="StudentID" label="学号" align="center">
              </el-table-column>
              <el-table-column prop="Sex" label="性别" align="center">
              </el-table-column>
              <el-table-column prop="ParentName" label="家长" align="center">
                <template scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>手机号: {{ scope.row.ParentPhone }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.ParentName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="Status" label="资料" align="center">
                <template scope="scope">
                  <div>
                    <span v-show="scope.row.Status==0" style="color:red">未修改</span>
                    <span v-show="scope.row.Status==1" style="color:grey">已修改</span>
                    <span v-show="scope.row.Status==2" style="color:#888">等待审核</span>
                    <span v-show="scope.row.Status==3" style="color:red">审核失败</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template scope="scope">
                  <el-button type="text" size="small" @click="startEditStudent(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="编辑教师资料" :visible.sync="showEditTeacher" size="tiny">
      <el-form :model="editTeacherData" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="editTeacherData.Meid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editTeacherData.Mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editTeacherData.TrueName"></el-input>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="editTeacherData.Course" placeholder="请选择">
            <el-option v-for="item in courseList" :key="item.CourseId" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="editTeacherData.Title"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="editTeacherData.IDCard"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio class="radio" v-model="editTeacherData.Sex" label="男">男</el-radio>
            <el-radio class="radio" v-model="editTeacherData.Sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="submitEditTeacher">确 定</el-button>
          <el-button type="success" :plain="true" @click="showEditTeacher = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑学生资料" :visible.sync="showEditStudent" size="tiny">
      <el-form :model="editStudentData" label-width="88px">
        <!-- <el-form-item label="ID">
            <el-input v-model="editStudentData.Meid" :disabled="true"></el-input>
          </el-form-item> -->
        <!-- <el-form-item label="学号">
            <el-input v-model="editStudentData.StudentID" :disabled="true"></el-input>
          </el-form-item> -->
        <el-form-item label="姓名">
          <el-input v-model="editStudentData.TrueName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio class="radio" v-model="editStudentData.Sex" label="男">男</el-radio>
            <el-radio class="radio" v-model="editStudentData.Sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="学籍号">
          <el-input v-model="editStudentData.nationid"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号">
          <el-input v-model="editStudentData.ParentPhone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="submitEditStudent">确 定</el-button>
          <el-button type="success" :plain="true" @click="showEditStudent = false">取 消</el-button>
          <el-button type="info" @click="$router.push('/s?id='+editStudentData.Meid+'&tab=edit')">编辑详细资料</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addTeacher',
  data() {
    return {
      classList: [],
      type: 1,
      fileList: [],
      ClassID: '',
      teacherData: [{
        TrueName: '',
        MobilePhone: '',
        courseID: '',
        Sex: '',
      }],
      classInfo: {
        name: '',
        teacher: '',
        student_count: '',
      },
      studentData: [{
        TrueName: '',
        Sex: '',
        ParentPhone: ''
      }],
      teacherList: [],
      studentList: [],
      activeTab: 'addTeacher',
      showEditTeacher: false,
      editTeacherData: {

      },
      showEditStudent: false,
      editStudentData: {

      },
      showAddStudent: false,
      showAddTeacher: false,
      // courseList: [
      //   {
      //     CourseId: 1,
      //     name: '语文'
      //   },
      //   {
      //     CourseId: 2,
      //     name: '数学'
      //   },
      //   {
      //     CourseId: 3,
      //     name: '英语'
      //   },
      //   {
      //     CourseId: 4,
      //     name: '物理'
      //   },
      //   {
      //     CourseId: 5,
      //     name: '化学'
      //   },
      //   {
      //     CourseId: 6,
      //     name: '生物'
      //   },
      //   {
      //     CourseId: 7,
      //     name: '历史'
      //   },
      //   {
      //     CourseId: 8,
      //     name: '地理'
      //   },
      //   {
      //     CourseId: 9,
      //     name: '政治'
      //   },
      //   {
      //     CourseId: 0,
      //     name: '未指定'
      //   }
      // ]
    }
  },
  computed: {
    classId() {
      return this.$store.state.currentClassId
    },
    courseList() {
      if (this.$store.getters.courseList) {
        this.$store.getters.courseList.shift()
        return this.$store.getters.courseList.map(o => {
          return {
            CourseId: o.ID,
            name: o.CourseName
          }
        })
      }
    }
  },
  methods: {
    getData() {
      this.ClassID = this.$store.state.currentClassId
      this.$API.getClassInfo(this.classId).then(res => {
        this.classInfo = res
      })
      this.$API.getClassList(this.ClassID).then(res => {
        this.classList = res
      })
      this.$API.getTeacherList(this.ClassID).then(res => {
        this.teacherList = res
      })
      this.$API.getStudentList(this.ClassID).then(res => {
        this.studentList = res
        this.studentList.forEach(o => {
          if (o.Parents.length > 0) {
            o.ParentName = o.Parents[0].TrueName
            o.ParentPhone = o.Parents[0].Mobilephone
            o.ParentMeid = o.Parents[0].Meid
          }
        })
      })
    },
    submitAddTeacher() {
      let e = true
      this.teacherData.forEach(o => {
        o.ClassID = this.ClassID
        if (o.TrueName == '') {
          this.$message.error('姓名不能为空')
          e = false
        } else if (o.MobilePhone == '') {
          this.$message.error('手机号不能为空')
          e = false
        }
        else if (o.courseID == '') {
          this.$message.error('学科不能为空')
          e = false
        }
      })
      if (e) {
        this.$API.addTeacher(this.teacherData).then(res => {
          this.$message.success('添加老师成功')
          this.showAddTeacher = false
          this.teacherData = []
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    submitAddStudent() {
      let e = true
      this.studentData.forEach(o => {
        o.ClassID = this.ClassID
        if (o.TrueName == '') {
          this.$message.error('请输入学生姓名')
          e = false
        } else if (o.Sex == '') {
          this.$message.error('请输入学生性别')
          e = false
        } else if (o.ParentPhone == '') {
          this.$message.error('请输入家长手机号')
          e = false
        }
      })
      if (e) {
        this.$API.addStudentAccount(this.studentData).then(res => {
          this.$message.success('添加学生成功')
          this.showAddStudent = false
          this.studentData = [{
            TrueName: '',
            Sex: '',
            ParentPhone: ''
          }],
            this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }

    },
    handleSuccess() {
      this.$message.success('上传文件成功')
    },
    submitTeacherFile() {
      // this.$API.addTeacherXml(this.data).then(res => {
      this.showAddTeacher = false
      this.getData()
      this.$message.success('批量添加老师成功')
      // })
    },
    submitStudentFile() {
      // this.$API.getClassList(this.data).then(res => {
      this.showAddStudent = false
      this.getData()
      this.$message.success('批量添加学生成功')
      // })
    },
    startEditTeacher(val) {
      this.editTeacherData = val
      this.showEditTeacher = true
    },
    submitEditTeacher() {
      this.$API.editTeacherInfo(this.editTeacherData).then(() => {
        this.$message.success('修改教师信息成功')
        this.showEditTeacher = false
        this.editTeacherData = {}
      }).catch(err => {
        this.showEditTeacher = false
        this.$message.error(err.msg)
      })
    },
    startEditStudent(val) {
      this.editStudentData = val
      this.showEditStudent = true
    },
    submitEditStudent() {
      this.$API.editStudentInfo(this.editStudentData).then(() => {
        this.$message.success('修改学生信息成功')
        this.showEditStudent = false
        this.editStudentData = {}
      })
    }
  },
  created() {
    this.getData()
    this.$store.dispatch('getCourseList')
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
.panel {
  padding: 20px;
}

.classbox {
  border: 1px solid @border;
  background: #fff;
  padding: 20px 60px;
  font-size: 16px;
  .name {
    font-weight: 16px;
    font-weight: 600;
    color: #333;
  }
  .list {
    display: inline-block;
    border-right: 1px dashed @border;
    margin-right: 30px;
    padding-right: 30px;
    line-height: 60px;
    &:last-child {
      border-right: none;
      float: right;
    }
    span {
      color: @grey;
    }
    .iconfont {
      margin-right: 5px;
    }
  }
}

.typeRadio {
  line-height: 5em;
  .title {
    padding: 0 2em;
    display: inline-block;
  }
}

.content {
  padding: 1em;
  background: #fff;
  .el-row {
    margin-bottom: 20px;
  }
}

.footer {
  padding-left: 3em;
}

.card {
  padding: 1em;
  background: #fff;
}

.tableHeader {
  line-height: 50px;
  font-size: 16px;
  font-weight: 600;
}

.teacherlist {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.cell {
  img {
    background: transparent;
    padding: 10px 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}

.xlsDown {
  font-size: 12px;
  margin-left: 20px;
  color: @main;
  text-decoration: underline;
}
</style>
