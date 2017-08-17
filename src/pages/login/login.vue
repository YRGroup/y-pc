<template>
  <div class="loginbox">
    <div class="gmbg"></div>
  
    <div class="box">
      <ul class="loginnav">
        <li class="navcurrent">登录</li>
        <li>·</li>
        <li @click="$router.push('/reg')">注册</li>
      </ul>
      <div class="item">
        <!-- <div class="title">手机号：</div> -->
        <el-input size="large" slot="append" placeholder="请输入手机号 / 账号" autofocus @change="verifyAccount" @blur="verifyAccount" v-model="phone">
          <template slot="prepend">
            <i class="iconfont">&#xe60b;</i>
          </template>
        </el-input>
      </div>
  
      <div v-show="step==1">
        <div class="item">
          <el-input size="large" class="input" type="password" placeholder="请输入密码" :minlength='6' @keyup.enter.native="login" v-model="loginData.password">
            <template slot="prepend">
              <i class="iconfont">&#xe692;</i>
            </template>
          </el-input>
        </div>
        <div class="item">
          <div @click="step=2">忘记密码？使用短信验证码登陆</div>
        </div>
        <div class="btn item">
          <el-button size="large" @click.native="login" type="success">登录</el-button>
        </div>
      </div>
  
      <div v-show="step==2">
        <div class="btn item">
          <el-button size="large" @click.native="getsms" type="success" :disabled="getsmsAvailable">
            {{getsmsAvailable?getsmsCount+'s后重发验证码':'发送验证码'}}
          </el-button>
        </div>
        <div class="item">
          <el-input size="large" class="input" placeholder="请输入验证码" :minlength='4' @keyup.enter.native="login" v-model="smsLoginData.code">
            <template slot="prepend">
              <i class="iconfont">&#xe692;</i>
            </template>
          </el-input>
        </div>
        <div class="btn item">
          <el-button size="large" @click.native="smsLogin" type="success">验证码登录</el-button>
        </div>
      </div>
  
      <div class="item" v-show="step==3">
        <el-input size="large" class="input" type="password" placeholder="请输入学生的密码" :minlength='6' @keyup.enter.native="login" v-model="studentLoginData.password">
          <template slot="prepend">
            <i class="iconfont">&#xe692;</i>
          </template>
        </el-input>
      </div>
      <div class="btn item" v-show="step==3">
        <el-button size="large" @click.native="studentLogin" type="success">学生登录</el-button>
      </div>
  
      <div class="btn item" v-show="step==0">
        <el-button size="large" @click.native="verifyAccount" type="success">下一步</el-button>
      </div>
  
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  data() {
    return {
      phone: '13130000000',
      loginData: {
        phone: '',
        password: '123456',
      },
      studentLoginData: {
        studentid: '',
        password: ''
      },
      smsLoginData: {
        phone: '',
        code: ''
      },
      getsmsCount: 0,
      step: 0
    }
  },
  computed: {
    getsmsAvailable() {
      return this.getsmsCount > 0
    }
  },
  methods: {
    login() {
      this.loginData.phone = this.phone
      this.$API.login(this.loginData).then(res => this.loginOK(res)).catch(err => this.$message.error(err.msg))
    },
    studentLogin() {
      this.studentLoginData.studentid = this.phone
      this.$API.studentLogin(this.studentLoginData).then(res => this.loginOK(res)).catch(err => this.$message.error(err.msg))
    },
    smsLogin() {
      this.smsLoginData.phone = this.phone
      this.$API.loginBySms(this.smsLogin).then(res => this.loginOK(res)).catch(err => this.$message.error(err.msg))
    },
    loginOK(val) {
      this.$store.commit('login', val)
      this.$router.push('/')
    },
    count() {
      if (this.getsmsCount > 0) {
        this.getsmsCount--
      }
    },
    startCount() {
      setInterval(
        this.count
        , 1000)
    },
    getsms() {
      // this.$message.warning('mock sms')
      // this.getsmsCount = 60
      // this.step = 2
      // this.startCount()
      this.$API.getLoginSms(this.phone).then(res => {
        this.getsmsCount = 60
        this.step = 2
        this.startCount()
      })
    },
    verifyAccount() {
      if (this.phone.slice(0, 1) == 1 && this.phone.length === 11) {
        let para = {
          phone: this.phone
        }
        this.$API.verifyAccount(para).then(res => {
          if (res.Msg == "normal") {
            this.step = 1
          } else if (res.Msg == "unActived") {
            this.step = 2
            this.startCount()
          } else {
            this.$router.push('/reg?tel=' + this.phone)
          }
        })
      } else if (this.phone.slice(0, 1) == 8 && this.phone.length === 9) {
        this.step = 3
      }
    },
    verifyPw() {
      if (this.loginData.password.length < 6) {
        this.$message.error('密码不完整')
        return false
      } else {
        return true
      }
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="less">
@import '../../style/theme.less';

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
</style>
