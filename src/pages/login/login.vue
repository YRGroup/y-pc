<template>
  <div class="body">
  
    <div class="box">

      <div class="input">
        <div class="title">手机号：</div>
        <el-input placeholder="请输入手机号" autofocus @blur="verifyTel" v-model="loginData.phone">
        </el-input>
      </div>
  
      <div class="input">
        <div class="title">密码：</div>
        <el-input class="input" placeholder="请输入密码" :minlength='6' @keyup.enter.native="login" v-model="loginData.password">
        </el-input>
      </div>

      <div class="btn">
        <el-button @click.native="$router.push('/reg')">注册</el-button>
        <el-button @click.native="login" :disabled="isVerified" type="info">登陆</el-button>
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

<style lang="less" scoped>
@import '../../style/theme.less';

.body {
  overflow: hidden;
  .box {
    width: 400px;
    height: 150px;
    background: @main;
    border-radius: 20px;
    padding: 50px;
    position: absolute;
    top: calc(~"50vh - 150px");
    left: calc(~"50vw - 250px");
    .input {
      margin: 10px 0;
      .title{
        color:#fff;
        width:70px;
        text-align: right;
        display: inline-block;
      }
      .el-input{
        width:300px;
      }
    }
    .btn {
      text-align: center;
      margin: 10px 0;
    }
  }
}
</style>
