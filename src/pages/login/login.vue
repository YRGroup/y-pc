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
        <el-input size="large" slot="append" placeholder="请输入手机号" autofocus @blur="verifyTel" v-model="loginData.phone">
          <template slot="prepend">
            <i class="iconfont">&#xe60b;</i>
          </template>
        </el-input>
      </div>
  
      <div class="item">
        <!-- <div class="title">密码：</div> -->
        <el-input size="large" class="input" type="password" placeholder="请输入密码" :minlength='6' @keyup.enter.native="login" v-model="loginData.password">
          <template slot="prepend">
            <i class="iconfont">&#xe692;</i>
          </template>
        </el-input>
      </div>
  
      <div class="btn item">
        <!-- <el-button @click.native="$router.push('/reg')" type="info">注册</el-button> -->
        <el-button size="large" @click.native="login" type="success">登录</el-button>
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
      loginData: {
        phone: '13130000034',
        password: '123456',
      },
      isVerified: Boolean(true),
    }
  },
  methods: {
    login() {
      if (this.verifyTel() && this.verifyPw()) {
        this.$store.dispatch('login', this.loginData).then(res => {
          this.$message('登录成功')
          this.$router.push('/')
        }).catch(err => {
          this.$message.error(err.msg)
        })
      } else {
        console.error('xxx')
      }
    },
    verifyTel() {
      if (this.loginData.phone.length != 11) {
        this.$message.error('手机号格式错误')
        return false
      } else {
        this.isVerified = Boolean(false)
        return true
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
