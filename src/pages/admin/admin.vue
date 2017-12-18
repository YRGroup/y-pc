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
        <el-button type="primary" plain @click="showAddTeacher=true">
          <i class="iconfont">&#xe623;</i>添加老师</el-button>
        <el-button type="warning" plain @click="showAddStudent=true">
          <i class="iconfont">&#xe623;</i>添加学生</el-button>
      </li>
    </ul>
    <el-dialog title="添加学生" :visible.sync="showAddStudent" width="46%">
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
              <el-button @click.native="submitAddStudent" type="primary">提 交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <div>
          <el-form-item label="">
            <el-upload :action="$store.getters._APIurl+'/import/ImportStudent.aspx'" :on-success="handleSuccess">
              <el-button slot="trigger" size="mini" plain type="primary">上传文件</el-button>
              <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/student_template.xls'">下载模板</a>
              <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button @click.native="submitStudentFile" type="primary">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="添加老师" :visible.sync="showAddTeacher" width="40%">
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
              <el-button @click.native="submitAddTeacher" type="primary">提 交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-form label-width="80px" v-show="type==2">
        <div>
          <el-form-item>
            <el-upload :action="$store.getters._APIurl+'/import/ImportTeacher.aspx'" :on-success="handleSuccess">
              <el-button slot="trigger" size="mini" plain type="primary">上传文件</el-button>
              <a style="text-decoration:underline" class="xlsDown" :href="$store.getters._APIurl+'/import/teacher_template.xls'">下载模板</a>
              <!-- <el-button slot="trigger" size="small">下载模板</el-button> -->
              <div slot="tip" class="el-upload__tip">请先下载模板，按照格式编辑后在此上传，只能上传xls/xlsx文件</div>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button @click.native="submitTeacherFile" type="primary">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <div class="content">
      <div class="card">
          <div class="tableHeader">班级教师（ {{teacherList.length}} 人）</div>
            <el-table :data="teacherList" stripe border height="400">
              <el-table-column type="index" label="序号" align="center" width="60">
              </el-table-column>

              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>
              <el-table-column label=" 头像" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.Headimgurl">
                </template>
              </el-table-column>
              <el-table-column prop="Mobilephone" label="手机号" align="center">
              </el-table-column>

              <el-table-column prop="Sex" label="性别" align="center">
              </el-table-column>
              <el-table-column label="职称" align="center">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.Title || '/'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="学科" align="center">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.Course || '/'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" plain icon="el-icon-edit" @click="startEditTeacher(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="tableHeader">班级学生（ {{studentList.length}} 人）</div>
            <el-table :data="studentList" stripe border height="680">
              <el-table-column type="index" label="序号" align="center" width="60">
              </el-table-column>

              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>

              <!-- <el-table-column label=" 头像" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.Headimgurl">
                </template>
              </el-table-column> -->
              <el-table-column prop="StudentID" label="学号" align="center">
              </el-table-column>
              <el-table-column prop="Sex" label="性别" align="center" width="60">
              </el-table-column>
              <el-table-column label="家长" align="center">
                <el-table-column label="家长" align="center" width="150">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row.Parents" class="parentList">
                      <el-popover trigger="hover" placement="top">
                        <p>手机号: {{ item.Mobilephone }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-button type="primary" plain size="mini" @click="openEditparent(scope.row,item)">{{ item.TrueName }}</el-button>
                        </div>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="激活" align="center">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row.Parents" class="parentList">
                      <span v-show="item.IsActive==true" style="color:grey">是</span>
                      <span v-show="item.IsActive==false" style="color:red">否</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="关注" align="center">
                  <template slot-scope="scope">
                    <div v-for="item in scope.row.Parents" class="parentList">
                      <span v-show="item.IsSubscribe==true" style="color:grey">是</span>
                      <span v-show="item.IsSubscribe==false" style="color:red">否</span>
                    </div>
                  </template>
                </el-table-column>
                
              </el-table-column>
              <!-- <el-table-column prop="IsActive" label="激活" align="center" width="80">
                <template slot-scope="scope">
                  <div>
                    <span v-show="scope.row.IsActive==true" style="color:grey">是</span>
                    <span v-show="scope.row.IsActive==false" style="color:red">否</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="IsSubscribe" label="关注" align="center" width="80">
                <template slot-scope="scope">
                  <div>
                    <span v-show="scope.row.IsSubscribe==true" style="color:grey">是</span>
                    <span v-show="scope.row.IsSubscribe==false" style="color:red">否</span>
                  </div>
                </template>
              </el-table-column> -->
              <!-- <el-table-column prop="Status" label="资料" align="center">
                <template slot-scope="scope">
                  <div>
                    <span v-show="scope.row.Status==0" style="color:red">未修改</span>
                    <span v-show="scope.row.Status==1" style="color:grey">已修改</span>
                    <span v-show="scope.row.Status==2" style="color:#888">等待审核</span>
                    <span v-show="scope.row.Status==3" style="color:red">审核失败</span>
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="deleteStudent(scope.row)"></el-button>
                  <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="startEditStudent(scope.row)"></el-button>
                  <el-button type="warning" size="mini" icon="el-icon-plus" plain @click="inviteParent(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
      </div>
    </div>
    <el-dialog title="编辑家长信息" :visible.sync="showEditparent" width="30%">
      <el-form :model="editParentData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editParentData.TrueName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editParentData.Mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitEditParent">确 定</el-button>
          <el-button type="text" :plain="true" @click="deleteParent" class="deleteBtn">删除家长</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑教师资料" :visible.sync="showEditTeacher" width="40%">
      <el-form :model="editTeacherData" label-width="80px">
        <!-- <el-form-item label="ID">
          <el-input v-model="editTeacherData.Meid" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="手机号">
          <el-input v-model="editTeacherData.Mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editTeacherData.TrueName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio class="radio" v-model="editTeacherData.Sex" label="男">男</el-radio>
            <el-radio class="radio" v-model="editTeacherData.Sex" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="editTeacherData.Course" placeholder="请选择">
            <el-option v-for="item in courseList" :key="item.CourseId" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="职称">
          <el-input v-model="editTeacherData.Title"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="editTeacherData.IDCard"></el-input>
        </el-form-item> -->
        <el-form-item label="">
          <el-button type="primary" @click="submitEditTeacher">确 定</el-button>
          <el-button type="primary" :plain="true" @click="showEditTeacher = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="邀请家长" :visible.sync="showinviteParent" width="30%">
      <el-form :model="inviteParentData" label-width="90px">
        <el-form-item label="家长手机号">
          <el-input v-model="inviteParentData.Mobilephone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitInviteParent">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑学生资料" :visible.sync="showEditStudent" width="36%">
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
        <!-- <el-form-item label="学籍号">
          <el-input v-model="editStudentData.nationid"></el-input>
        </el-form-item> -->
        <el-form-item label="">
          <el-button type="primary" @click="submitEditStudent">确 定</el-button>
          <!-- <el-button type="primary" :plain="true" @click="showEditStudent = false">取 消</el-button> -->
          <el-button type="text" @click="$router.push('/s?id='+editStudentData.Meid+'&tab=edit')">编辑详细资料</el-button>
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
      editTeacherData: {},
      editParentData: {},
      showEditStudent: false,
      editStudentData: {

      },
      showAddStudent: false,
      showAddTeacher: false,
      showEditparent: false,
      showinviteParent: false,
      inviteParentData: {}
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
      // 获取教师列表
      this.$API.getTeacherList(this.ClassID).then(res => {
        this.teacherList = res
      })
      //获取学生列表
      this.$API.getStudentList(this.ClassID).then(res => {
        this.studentList = res
        this.studentList.forEach(o => {
          if (o.Parents.length > 0) {
            o.ParentName = o.Parents[0].TrueName
            o.ParentPhone = o.Parents[0].Mobilephone
            o.ParentMeid = o.Parents[0].Meid
            o.IsActive = o.Parents[0].IsActive
            o.IsSubscribe = o.Parents[0].IsSubscribe
          }
        })
      })
    },

    // 添加老师
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
    // 打开编辑家长弹窗
    openEditparent(list,item) {
      this.editParentData = item
      this.editParentData.StudentMeid = list.Meid
      this.showEditparent = true
    },
    // 编辑家长信息
    submitEditParent() {
      this.$API.editParentInfo(this.editParentData).then(res => {
          this.$message.success('修改成功！~')
          this.getData()
          this.showEditparent = false
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
        // 邀请家长
    inviteParent(val) {
      console.log(val)
      this.showinviteParent = true
      this.inviteParentData.StudentMeid = val.Meid
    },
    // 提交邀请家长
    submitInviteParent() {
      this.$API.inviteParent(this.inviteParentData).then(res => {
          this.$message.success('邀请家长成功！~')
          this.getData()
          this.showinviteParent = false
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    // 删除家长
    deleteParent() {
      let params = {}
      params.StudentMeid = this.editParentData.StudentMeid
      params.ParentMeid = this.editParentData.Meid
      this.$confirm("确定要删除该家长吗?", "提示", {
        type: "warning"
      }).then(() => {
          this.showEditparent = false
          this.$API.deleteParent(params).then(res => {
              this.$message.success('删除家长成功！~')
              this.getData()
          }).catch(err => {
            this.$message.error(err.msg)
          })
      }).catch(_ => {});
    },
    // 添加学生
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
    // 删除学生
    deleteStudent(data) {
      let params = {}
      params.meid = data.Meid
      this.$confirm("确定要删除该学生吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.$API.deleteStudent(params).then(res => {
          this.$message.success('删除成功！~')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }).catch(_ => {});
    },
    handleSuccess() {
      this.$message.success('上传文件成功')
    },
    submitTeacherFile() {
      this.showAddTeacher = false
      this.type = 1
      this.$message.success('批量添加老师成功')
      this.getData()
    },
    submitStudentFile() {
      this.showAddStudent = false
      this.type = 1
      this.$message.success('批量添加学生成功')
      this.getData()
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
.parentList{
  margin-bottom: 10px;
  &:last-child{
    margin:0
  }
  span{
    height: 28px;
    line-height: 1;
    display: inline-block;
  }
}
.deleteBtn{
  font-size: 12px;
  color: #666;
  text-decoration: underline;
  margin-left: 160px;
}
</style>
