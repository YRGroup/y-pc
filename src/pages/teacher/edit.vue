<template>
  <div class="card">
    <div class="maintitle">
      个人主页
      <span class="goreturn">
        <el-button size="small" @click="$router.go(-1)" type="success" :plain="true">返回</el-button>
      </span>
    </div>
    <div class="content">

      <el-form label-width="100px" :model="data" :rules="rules" ref="ruleForm">
        <div class="itemList">
          <div class="header">
            <i class="iconfont">&#xe668;</i>个人资料
          </div>
          <div class="item-content" style="padding:0 150px 0 50px">
             <el-form-item label="手机号">
                  <el-input v-model="data.Mobilephone" :disabled="true" style="width:200px"></el-input>
                </el-form-item> 
            <el-form-item label="姓名" prop="TrueName">
              <el-input v-model="data.TrueName" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="Sex">
              <template>
                <el-radio class="radio" v-model="data.Sex" label="男">男</el-radio>
                <el-radio class="radio" v-model="data.Sex" label="女">女</el-radio>
              </template>
            </el-form-item>
            <el-form-item label="身份证号" prop="IDCard">
              <el-input v-model="data.IDCard"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="Resume">
              <!-- <el-input v-model="data.Resume"></el-input> -->
              <el-date-picker type="date" placeholder="选择日期" v-model="data.Resume" ></el-date-picker>
            </el-form-item>
            <el-form-item label="民族" prop="Volk">
              <el-select v-model="data.Volk" placeholder="请选择民族" style="width:200px">
                <el-option v-for="i in $store.state.nationList" :key="i" :label="i" :value="i">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" prop="PoliticalStatus">
              <el-select v-model="data.PoliticalStatus" placeholder="请选择政治面貌" style="width:200px">
                <el-option v-for="i in $store.state.politicalList" :key="i" :label="i" :value="i">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教龄" :rules="[{required: true}]">
              <el-input-number v-model="data.SchoolAge" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="职称" prop="Title">
              <el-input v-model="data.Title" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="修改头像" prop="Headimgurl">
              <div class="headImg">
                <div class="right">
                  <el-upload list-type="picture-card" class="avatar-uploader" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="data.Headimgurl" :src="data.Headimgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <div class="tips">请上传真实头像，以方便班级正常管理和班级内互动</div>
            </el-form-item>
          </div>
        </div>
        <div class="itemList">
          <div class="header">
            <i class="iconfont">&#xe63d;</i>个人荣誉
            <div class="addBtn">
              <el-button type="text" @click.native="showAddPersonalHonor=true" size="small">
                <i class="iconfont">&#xe623;</i>新增荣誉</el-button>
            </div>
            <el-dialog title="个人荣誉" :visible.sync="showAddPersonalHonor" size="tiny">

              <el-form-item label="上传图片">
                <el-upload list-type="picture-card" class="avatar-uploader" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :show-file-list="false" :on-success="handleHonorSuccess">
                  <img v-if="addPersonalHonorData.ImgPath" :src="addPersonalHonorData.ImgPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="addPersonalHonorData.Description">
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="权限">
                <el-radio class="radio" v-model="addPersonalHonorData.IsVisible" label="true">公开</el-radio>
                <el-radio class="radio" v-model="addPersonalHonorData.IsVisible" label="false">不公开</el-radio>
              </el-form-item> -->
              <el-form-item>
                <el-button type="success" @click="addPersonalHonor">确 定</el-button>
                <el-button :plain="true" type="success" @click="showAddPersonalHonor = false">取 消</el-button>
              </el-form-item>
              <span slot="footer" class="dialog-footer">
              </span>
            </el-dialog>
          </div>
          <div class="item-content">
            <div class="honorItem" v-for="(i,index) in data.PersonalHonor" :key="index">
              <img :src="i.ImgPath">
              <div class="delHonorBtn" @click="delHonor(index)">
                <i class="iconfont">&#xe630;</i>
              </div>
              <div class="name">{{i.Description}}</div>
            </div>
          </div>
        </div>
        <div class="itemList">
          <div class="header">
            <i class="iconfont">&#xe69b;</i>教学经历
            <div class="addBtn">
              <el-button size="small" type="text" @click.native="data.TeachExperience.unshift({SchoolName:'',StartTime:'',EndTime:'',IsVisible:'true'})">
                <i class="iconfont">&#xe623;</i>新增教学经历</el-button>
            </div>
          </div>
          <div class="item-content" style="padding-right:100px">
            <li v-for="(i,index) in data.TeachExperience" :key="index" class="oldwork">
              <el-form-item label="任职学校">
                <el-input v-model="i.SchoolName">
                  <template slot="append">
                    <span class="delBtn" @click="data.TeachExperience.splice(index,1)">
                      <i class="iconfont">&#xe630;</i>
                    </span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="执教时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="i.StartTime" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col style="text-align:center" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择结束日期" v-model="i.EndTime" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="权限">
                <el-radio class="radio" v-model="i.IsVisible" label="true">公开</el-radio>
                <el-radio class="radio" v-model="i.IsVisible" label="false">不公开</el-radio>
              </el-form-item> -->
            </li>

          </div>
        </div>

        <div class="footer">
          <div class="btn center">
            <el-button type="success" @click.native="submitChange(data)">提交修改</el-button>
          </div>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      data: {
        PersonalHonor: [],
        // PersonalHonor: [],
      },
      showEditHeadImg: false,
      showAddPersonalHonor: false,
      addPersonalHonorData: {
        Description: '',
        ImgPath: '',
        IsVisible: 'false'
      },
      ruleForm: {
        TrueName: '',
        Sex: '',
        IDCard: '',
        Volk: '',
        PoliticalStatus: '',
        Title: '',
        Headimgurl: ''
      },
      rules: {
        TrueName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        Sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        IDCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        Resume: [
          { required: true, message: '请选择年龄' }
        ],
        Volk: [
          { required: true, message: '请选择民族' ,trigger: 'change' }
        ],
        PoliticalStatus: [
          { required: true, message: '请选择政治面貌' ,trigger: 'change'  }
        ],
        Title: [
          { required: true, message: '请填写职称', trigger: 'blur' }
        ],
        Headimgurl: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],

      }
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData() {
      this.$API.getTeacherInfo(this.$store.getters.currentUserId).then(res => {
        this.data = res
        if (this.data.PersonalHonor.length) {
          this.data.PersonalHonor.forEach(o => {
            o.IsVisible = 'true'
          })
        }
        if (this.data.TeachExperience.length) {
          this.data.TeachExperience.forEach(o => {
            o.IsVisible = 'true'
          })
        }
      })
    },
    submitChange(data) {
      this.data.role = 3
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.verifyIDcard().then(res => {
            this.$API.editTeacherInfo(this.data).then(res => {
              this.$API.getCurrentUser().then(user => {
                this.$store.commit('login', user)
              })
              this.$router.push('/teacher')
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }).catch(err => {
            this.$message.error('请输入正确的身份证号')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

      // this.data.role = 3
      // this.verifyIDcard().then(res => {
      //     this.$API.editTeacherInfo(this.data).then(res => {
      //       this.$API.getCurrentUser().then(user => {
      //         this.$store.commit('login', user)
      //       })
      //       this.$router.push('/teacher')
      //     }).catch(err => {
      //       this.$message.error(err.msg)
      //     })
      // }).catch(err => {
      //   this.$message.error('请输入正确的身份证号')
      // })
    },
    handleAvatarSuccess(res, file) {
      this.data.Headimgurl = res.Content[0] + '?x-oss-process=style/f300'
    },
    handleHonorSuccess(res, file) {
      console.log(res)
      this.addPersonalHonorData.ImgPath = res.Content[0] + '?x-oss-process=style/f300'
    },
    addPersonalHonor() {
      this.data.role = 3
      if(this.addPersonalHonorData.Description && this.addPersonalHonorData.ImgPath){
          this.data.PersonalHonor.push(this.addPersonalHonorData)
          this.addPersonalHonorData = { Description: '', ImgPath: '', IsVisible: 'true' }
          this.showAddPersonalHonor = false
      }else{
        this.$message.error('请完善图片和描述！')
      }
    },
    delHonor(index) {
      this.data.PersonalHonor.splice(index, 1)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    verifyIDcard() {
      return new Promise((resolve, reject) => {
        if (this.data.IDCard.length !== 18) {
          reject()
        } else {
          resolve()
        }
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

.headImg {
  // text-align: center;
  .left,
  .right {
    display: inline-block
  }
}

.card {
  // margin: 15px 0;
  // border: 1px solid @border;
  // padding: 0 20px 20px;
  position: relative;
  background: #fff;
  .img {
    display: inline-block;
    padding: 20px;
    img {
      width: 50px;
    }
  }
  .content {
    line-height: 1.5rem;
    padding: 0 20px 20px;
    .itemList {
      padding: 30px 20px;
      border-bottom: 1px solid @border;
      position: relative;
      &:last-child {
        border: none;
      }
      .header {
        line-height: 28px;
        font-size: 16px;
        margin-bottom: 30px;
        color: @main;
        position: relative;
        .iconfont {
          margin-right: 8px;
        }
        .addBtn {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .item-content {
        .el-form-item {
          // margin-bottom: 15px;
        } // padding-top:30px;
        // text-align: center;
        margin-left: 40px;
        overflow: hidden;
        .oldwork {
          border-bottom: 1px dashed @border;
          margin-bottom: 15px;
        }
      }
    }
  }
  .footer {
    padding: 30px 0;
    .btn {
      padding: 0 15px;
    }
  }
}

.addBtn {
  text-align: center;
}

.honorItem {
  max-width: 120px; // display: inline-block;
  overflow: hidden;
  padding: 10px;
  float: left;
  text-align: center;
  position: relative;
  img {
    width: 100%;
  }
  &:hover .delHonorBtn {
    display: block;
  }
  .delHonorBtn {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 170px;
    font-size: 30px;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    cursor: pointer;
  }
  .name {
    color: @grey;
    height: 28px;
    line-height: 20px;
  }
}

.delBtn {
  cursor: pointer;
}

.center {
  text-align: center;
}

.tips {
  color: @grey;
}
</style>
