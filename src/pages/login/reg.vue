<template>
  <div class="loginbox">
    <div class="gmbg"></div>
    <div class="box" v-show="regStep==1">
      <ul class="loginnav">
        <li @click="$router.push('/login')">登录</li>
        <li>·</li>
        <li class="navcurrent">注册</li>
      </ul>
  
      <div class="item">
        <!-- <div class="title">手机号：</div> -->
        <el-input size="large" placeholder="请输入手机号" autofocus @blur="verifyTel" v-model="regData.phone">
          <template slot="prepend">
            <i class="iconfont">&#xe60b;</i>
          </template>
        </el-input>
      </div>
  
      <div class="item sms">
        <!-- <div class="title">验证码：</div> -->
        <el-input size="large" placeholder="请输入短信验证码" autofocus v-model="regData.code">
  
        </el-input>
        <el-button size="large" type="success" @click="getSms">获取验证码</el-button>
      </div>
  
      <div class="item">
        <!-- <div class="title">密码：</div> -->
        <el-input size="large" type="password" placeholder="请输入密码" :minlength='6' @keyup.enter.native="reg" v-model="regData.password">
          <template slot="prepend">
            <i class="iconfont">&#xe692;</i>
          </template>
        </el-input>
      </div>
  
      <div class="btn item">
        <!-- <el-button type="info" @click="$router.push('/login')">返回登陆</el-button> -->
        <el-button type="success" @click="reg">注册</el-button>
      </div>
  
    </div>
  
    <div class="box afterReg" v-show="regStep==2">
      <div class="loginnav">
        您的登录帐号
      </div>
      <div class="info">
        <div class="phone">13900000006</div>
      </div>
  
      <div class="item">
        <el-button size="large" type="warning" @click="regStep=3">完善资料</el-button>
        <el-button size="large" type="success" @click="$router.push('/')">进入主页</el-button>
      </div>
    </div>
  
    <div class="box afterReg" v-show="regStep==3">
      <div class="loginnav">
        绑定孩子
      </div>
      <div class="item">
        <!-- <div class="title">姓名：</div> -->
        <el-input size="large" placeholder="请输入您的姓名" autofocus @blur="verifyTel" v-model="editUserData.TrueName">
          <template slot="prepend">
            <i class="iconfont">&#xe678;</i>
          </template>
        </el-input>
      </div>
  
      <div class="item">
        <!-- <div class="title">姓名：</div> -->
        <el-input size="large" placeholder="请输入孩子的姓名" @blur="verifyTel" v-model="addStudentData.truename">
          <template slot="prepend">
            <i class="iconfont">&#xe719;</i>
          </template>
        </el-input>
      </div>
  
      <div class="item">
        <!-- <div class="title">学生ID：</div> -->
        <el-input size="large" placeholder="请输入孩子学号" @blur="verifyTel" v-model="addStudentData.student_id">
          <template slot="prepend">
            <i class="iconfont">&#xe692;</i>
          </template>
        </el-input>
      </div>
  
      <div class="btn">
        <el-button size="large" type="success" @click="addMoreInfo">完善资料</el-button>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'reg',
  components: {},
  data() {
    return {
      isVerified: Boolean(true),
      regData: {
        phone: '',
        code: '',
        password: ''
      },
      editUserData: {
        TrueName: ''
      },
      addStudentData: {
        'student_id': '',
        truename: '',
        type: 100
      },
      regStep: 1
    }
  },
  methods: {
    verifyTel() {
      if (this.regData.phone.length != 11) {
        this.$message.warning('请输入正确的手机号')
        return false
      } else {
        this.isVerified = Boolean(false)
        return true
      }
    },
    verifyPw() {
      if (this.regData.password.length < 6) {
        this.$message.warning('密码不能少于6位数')
        return false
      } else {
        return true
      }
    },
    getSms() {
      if (this.regData.phone == '') {
        this.$message.warning('手机号不能为空')
      } else {
        this.$API.getRegSms(this.regData.phone).then(res => {
          this.$message.success('获取验证码成功，请查收短信')
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    reg() {
      this.regData.role = 2
      if (this.regData.code == '') {
        this.$message.warning('短信验证码不能为空')
      } else if (this.regData.password.length < 6) {
        this.$message.warning('密码不能小于6位数')
      } else {
        this.$API.userReg(this.regData).then(res => {
          this.$message.success('注册成功')
          let loginData = {}
          loginData.phone = this.regData.phone
          loginData.password = this.regData.password
          this.$API.login(this.loginData).then(res => {
            this.$store.commit('login', val)
            // this.$router.push('/')
            this.step = 2
          }).catch(err => this.$message.error(err.msg))
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    addMoreInfo() {
      if (this.editUserData.TrueName && this.addStudentData.student_id && this.addStudentData.truename) {
        this.$API.editParentInfo(this.editUserData).then(res => {
          this.$API.addStudent(this.addStudentData).then(res => {
            this.$message('添加学生成功！')
            this.$router.push('/')
          }).catch(err => {
            this.$message.error(err.msg)
          })
        }).catch(err => {
          this.$message.error(err.msg)
        })
      } else {
        this.$message.error('资料不完整')
      }

    }
  },
  created() {
    if(this.$route.query.tel){
      this.regData.phone = this.$route.query.tel
    }
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.body {
  overflow: hidden;
}

.loginbox {
  overflow: hidden; // position: relative;
  // 
  // width: 100%;
  // height: 100%;
  .gmbg {
    position: absolute;
    z-index: -999;
    width: 100%;
    height: 100%;
    background: url(../../assets/loginBg.jpg) no-repeat center center;
    background-attachment: fixed;
    background-size: cover;
  }
  .box {
    width: 500px; // height: 280px;
    z-index: 10;
    background: #fff;
    padding: 30px 80px 50px;
    position: absolute;
    border-radius: 6px;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .3);
    overflow: hidden;
    box-sizing: border-box;
    .loginnav {
      border-bottom: 1px solid @border;
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      padding-bottom: 10px;
      li {
        display: inline-block;
        padding: 0 10px;
        color: #888;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .navcurrent {
        color: @main;
        border-bottom: 2px solid @main;
      }
    }
    .item {
      margin: 20px 0;
      text-align: center;
      .title {
        width: 70px;
        text-align: right;
        display: inline-block;
      }
      .el-input {
        width: 300px;
      }
    }
    .btn {
      text-align: center;
      margin: 10px 0;
      .el-button {
        width: 300px;
      }
    }
    .sms {
      .el-input {
        width: 176px;
      }
      .el-button {
        width: 120px;
      }
    }
  }
}
.afterReg {
  text-align: center;
  .info {
    text-align: center;
    line-height: 42px;
    margin-bottom: 50px;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .phone {
      background: #f5f5f5;
      margin: 0 20px;
      font-size: 16px;
      border-radius: 4px;
    }
  }
  .el-button {
    margin: 0 20px;
  }
}
</style>
