<template>
  <div>
  
    <div class="left">
  
      <router-view></router-view>
  
    </div>
  
    <div class="right">
  
      <div class="card">
        <div class="header">
          <img :src="data.Headimgurl">
        </div>
        <div class="content">
          <p class="title">{{data.TrueName}}</p>
          <p>
            <span>
              <i class="iconfont">&#xe690;</i>{{data.ExtendInfo.Course}}</span>
            <span>
              <i class="iconfont">&#xe618;</i>{{data.Mobilephone}}</span>
          </p>
          <!-- <div class="btn">
                      <el-button type="primary" @click.native="$router.push('/teacher/edit')">修改资料</el-button>
                    </div> -->
          <div class="btn" v-if="!$route.query.id">
            <el-button :plain="true" type="text" @click.native="startEditPw" size="small">修改密码</el-button>
            <el-button :plain="true" type="text" @click.native="logout" size="small">退出</el-button>
          </div>
          <div class="btn" v-else>
            <el-button type="info" @click.native="$router.push('/msg/'+data.Meid)">发消息</el-button>
          </div>

          <el-dialog title="修改密码" :visible.sync="showEditPw" size="tiny" style="text-align:left">
            <div>
              <el-form :inline="true" label-width="120px">
                <div>
                  <el-form-item label="手机号">
                    <el-input v-model="editPwData.phone" :disabled="true" style="width:308px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="验证码">
                    <el-input v-model="editPwData.code">
                    </el-input>
                  </el-form-item>
                  <el-button type="success" @click="getCheckNum">获取验证码</el-button>
                </div>
                <div>
                  <el-form-item label="新密码">
                    <el-input type="password" v-model="editPwData.newpwd"  style="width:308px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="重复新密码">
                    <el-input type="password" v-model="editPwData.newpwd2"  style="width:308px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label=" ">
                      <el-button type="success" @click="editPw">确 定</el-button>
                      <el-button type="success" :plain="true" @click="showEditPw = false">取 消</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-dialog>

        </div>
      </div>

      <div class="card" v-for="(i,index) in data.Classes" :key="index">
        <div class="header">
          {{i.ClassName}}
        </div>
        <div class="content noHeadImg">
          <p>执教科目：{{i.CourseName}}</p>
          <div class="btn">
            <el-button type="info" @click.native="changeClass(i.ClassID),$router.push('/class')">班级主页</el-button>
          </div>
          <div class="btn" v-show="data.Classes.length>1">
            <el-button type="warning" v-if="classId!=i.ClassID" @click.native="changeClass(i.ClassID)">设为当前班级</el-button>
            <p v-else >当前班级</p>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: {
        ExtendInfo: {},
      },
      showEditPw: false,
      editPwData: {
        phone: '',
        code: '',
        newpwd: '',
        newpwd2: ''
      },
    }
  },
  computed:{
    classId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.$API.getTeacherInfo(this.$route.query.id).then(res => {
          this.data = res
          this.data.Classes = res.ExtendInfo.Classes
        })
      } else {
        this.data = this.$store.state.currentUser
        this.data.Classes = this.$store.state.currentUser.ExtendInfo.Classes
      }
    },
    changeClass(val) {
      this.$store.commit('changeCurrentClass', val)
    },
    startEditPw() {
      this.showEditPw = true
      this.editPwData.phone = this.data.Mobilephone
    },
    getCheckNum() {
      this.$API.getSms().then(res => {
        this.$message.success('获取验证码成功，请查收短信')
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    editPw() {
      if (this.editPwData.code == '') {
        this.$message.error('短信验证码不能为空')
      }
      else if (this.editPwData.newpwd !== this.editPwData.newpwd2) {
        this.$message.error('两次输入的密码不一致，请检查!')
      } else if (this.editPwData.newpwd.length < 6) {
        this.$message.error('密码不能小于6位数')
      }
      else {
        this.$API.editPWBySms(this.editPwData).then(res => {
          this.$message.success('修改密码成功')
          this.showEditPw = false
        }).catch(err => {
          this.$message.error(err.msg)
          this.editPwData.code = ''
          this.editPwData.newpwd = ''
          this.editPwData.newpwd2 = ''
        })
      }
    },
    logout() {
      this.$store.dispatch('logout').then(res => {
        this.$message('退出成功')
        this.$router.push('/login')
      })
    },
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

.left {
  width: calc(~"100% - 280px");
  float: left; // padding: 10px;
}

.right {
  float: right;
  width: 260px; // padding: 20px 10px;
  .card {
    border: 1px solid @main;
    text-align: center;
    background: #edfff7;
    margin-bottom: 20px;
    &:hover {
      // border: 1px solid @main;
    }
    .header {
      height: 75px;
      background: url(../../assets/header.jpg) no-repeat;
      background-size: cover;
      line-height: 75px;
      color: #fff;
      font-size: 25px;
      img {
        margin-top: 30px;
        width: 80px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.5)
      }
    }
    .content {
      margin-top: 26px;
      line-height: 2em;
      padding: 20px;
      text-align: center;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
      }
      span {
        margin: 0 10px;
        .iconfont {
          margin-right: 5px;
        }
      }
      .btn {
        text-align: center;
      }
    }
    .noHeadImg {
      margin-top: 10px;
    }
  }
}
</style>
