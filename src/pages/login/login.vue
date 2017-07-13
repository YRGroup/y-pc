<template>
  <div class="body">
    <div class="login">
      <el-input class="input" v-model="loginData.phone" autofocus @blur="verifyTel" placeholder="请输入账号"></el-input>
      <el-input class="input" type="password" v-model="loginData.password" :minlength='6' @keyup.enter="login" placeholder="请输入密码"></el-input>
      <div class="btn">
        <el-button @click.native="$router.push('/reg')">注册</el-button>
        <el-button @click.native="login" :disabled="isVerified">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components:{},
  data (){
    return{
      loginData:{
        phone:'',
        password:'',
      },
      isVerified:Boolean(true)
    }
  },
  methods:{
    login(){
      if(this.verifyTel() && this.verifyPw()){
        this.$store.dispatch('login',loginData)
      }else{
        console.error('xxx')
      }
    },
    verifyTel(){
      if(this.loginData.phone.length!=11){
        this.$message.error('手机号格式错误')
        return false
      }else{
        this.isVerified=Boolean(false)
        return true
      }
    },
    verifyPw(){
      if(this.loginData.password.length < 6){
        this.$message.error('密码不完整')
        return false
      }else{
        return true
      }
    }
  },
  created(){

  },
  mounted(){

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.body{
  height:100vh;
  width:100vw;
  background: url('../../assets/img/bg.jpg');
  .login{
    width:400px;
    height:150px;
    background: @main;
    border-radius: 20px;
    padding:50px;
    position: absolute;
    top:calc(~"50vh - 150px");
    left:calc(~"50vw - 250px");
    .input{
      margin:10px 0;
    }
    .btn{
      text-align: center;
      margin:10px 0;
    }
  }
}

</style>
