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
    <el-dialog title="添加学生" :visible.sync="showAddStudent" size="tiny">
      <el-form label-width="80px">
        <el-form-item>
          <el-radio-group v-model="type">
            <el-radio :label="1">
              <span>单个添加</span>
            </el-radio>
            <el-radio :label="2">
              <span>批量导入</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div v-show="type==1">
        <el-form label-width="80px" :inline="true" v-for="(i,index) in studentData" :key="index" class="teacherlist">
          <el-form-item label="姓名">
            <el-input v-model="i.TrueName" palceholder="请输入姓名" style="width:280px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <el-radio class="radio" v-model="i.Sex" label="男">男</el-radio>
              <el-radio class="radio" v-model="i.Sex" label="女">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="text" :plain="true" @click.native="studentData.splice(index,1)">
              <i class="iconfont">&#xe630;</i>
            </el-button>
          </el-form-item>
        </el-form>
        <el-form label-width="80px">
          <el-form-item>
            <el-button @click.native="studentData.push({ClassID: '',TrueName: ''})" type="text">
              <i class="iconfont">&#xe623;</i> 添加学生</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click.native="submitAddStudent" type="success">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <el-form-item label="">
          <el-upload :action="$store.getters._APIurl+'/import/ImportStudent.aspx'" :on-success="handleSuccess">
            <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
            <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/student_template.xlsx'">下载模板</a>
            <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="submitStudentFile" type="success">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="添加老师" :visible.sync="showAddTeacher" size="tiny">
      <el-form label-width="80px">
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
        <!-- <el-form-item label="所属班级">
                      <el-select v-model="ClassID" placeholder="请选择">
                        <el-option v-for="item in classList" :key="item.cid" :label="item.Name" :value="item.cid">
                        </el-option>
                      </el-select>
                    </el-form-item> -->
      </el-form>
      <div v-show="type==1">
        <el-form label-width="80px" :inline="true" v-for="(i,index) in teacherData" :key="index" class="teacherlist">
          <el-form-item label="姓名">
            <el-input v-model="i.TrueName" palceholder="请输入姓名" style="width:280px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="i.MobilePhone" palceholder="请输入手机号" style="width:280px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" :plain="true" @click.native="teacherData.splice(index,1)">
              <i class="iconfont">&#xe630;</i>
            </el-button>
          </el-form-item>
        </el-form>
        <el-form label-width="80px">
          <el-form-item>
            <el-button @click.native="teacherData.push({ClassID: '',TrueName: '',MobilePhone: ''})" type="text">
              <i class="iconfont">&#xe623;</i> 添加老师</el-button>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click.native="submitAddTeacher" type="success">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <el-form-item>
          <el-upload :action="$store.getters._APIurl+'/import/ImportTeacher.aspx'" :on-success="handleSuccess">
            <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
            <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/teacher_template.xlsx'">下载模板</a>
            <!-- <el-button slot="trigger" size="small">下载模板</el-button> -->
            <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="submitTeacherFile" type="success">提 交</el-button>
        </el-form-item>
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
              <el-table-column prop="Title" label="职称" align="center">
              </el-table-column>
              <el-table-column prop="Course" label="学科" align="center">
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
              <el-table-column prop="StudentID" label="学号" align="center">
              </el-table-column>
              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>
              <el-table-column label=" 头像" align="center">
                <template scope="scope">
                  <img :src="scope.row.Headimgurl">
                </template>
              </el-table-column>
              <el-table-column prop="Sex" label="性别" align="center">
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
          <el-input v-model="editTeacherData.Course"></el-input>
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
      <el-form :model="editStudentData" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="editStudentData.Meid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editStudentData.StudentID"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editStudentData.TrueName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio class="radio" v-model="editStudentData.Sex" label="男">男</el-radio>
            <el-radio class="radio" v-model="editStudentData.Sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="">
          <el-button type="success" @click="submitEditStudent">确 定</el-button>
          <el-button type="success" :plain="true" @click="showEditStudent = false">取 消</el-button>
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
        MobilePhone: ''
      }],
      classInfo: {
        name: '',
        teacher: '',
        student_count: '',
      },
      studentData: [{
        TrueName: '',
        Sex: ''
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
      showAddTeacher: false
    }
  },
  computed: {
    classId() {
      return this.$store.state.currentClassId
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
      })
    },
    submitAddTeacher() {
      this.teacherData.forEach(o => {
        o.ClassID = this.ClassID
      })
      this.$API.addTeacher(this.teacherData).then(res => {
        this.$message.success('添加老师成功')
        this.showAddTeacher = fasle
        this.teacherData = []
        this.getData()
      })
    },
    submitAddStudent() {
      this.studentData.forEach(o => {
        o.ClassID = this.ClassID
      })
      this.$API.addStudentAccount(this.studentData).then(res => {
        this.$message.success('添加学生成功')
        this.showAddStudent = false
        this.studentData = []
        this.getData()
      })
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
.xlsDown{
  font-size: 12px;
  margin-left: 20px;
  color: @main;
  text-decoration: underline;
}
</style>
