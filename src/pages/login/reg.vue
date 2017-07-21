<template>
  <div class="body">
  
    <div class="box">
      <div class="input">
        <div class="title">手机号：</div>
        <el-input placeholder="请输入手机号" autofocus @blur="verifyTel" v-model="regData.phone">
        </el-input>
      </div>
  
      <div class="input">
        <div class="title">密码：</div>
        <el-input class="input" placeholder="请输入密码" :minlength='6' @keyup.enter.native="reg" v-model="regData.password">
        </el-input>
      </div>
  
      <div class="btn">
        <el-button type="info" @click.native="showReg=true" @click="reg">注册</el-button>
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
      regData: {},
    }
  },
  methods: {
    verifyTel() {
      if (this.regData.phone.length != 11) {
        this.$message.error('手机号格式错误')
        return false
      } else {
        this.isVerified = Boolean(false)
        return true
      }
    },
    verifyPw() {
      if (this.regData.password.length < 6) {
        this.$message.error('密码不能少于6位数')
        return false
      } else {
        return true
      }
    },
    reg(){
      if( this.verifyTel() && this.verifyPw() ){
        this.regData.role = 2
        this.$API.userReg(this.regData).then(res=>{
          this.$message.success('注册成功，正在自动登陆')
          this.$store.dispatch('login', this.regData).then(res => {
            this.$message('登录成功')
            this.$router.push('/')
          })
        })
      }else{
        this.$message.error('数据不完整')
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
