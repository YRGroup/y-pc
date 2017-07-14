<template>
  <div>
  
    <div class="left">

      <router-view></router-view>
  
    </div>
    
    <div class="right">
      <div class="card" v-if="$store.state.hasLogin && $store.state.role=='老师'">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p>账号：{{$store.state.currentUser.Mobilephone}}</p>
          <p>姓名：{{$store.state.currentUser.TrueName}}</p>
          <p>身份：{{$store.state.currentUser.Role}}</p>
          <p>科目：{{$store.state.currentUser.ExtendInfo.Course}}</p>
          <div class="btn">
            <el-button type="warning" @click.native="login">登出</el-button>
          </div>
        </div>
      </div>

      <template v-if="$store.state.hasLogin && $store.state.role=='老师'">
      <div class="card" v-for="(i,index) in $store.state.currentUser.ExtendInfo.Classes" :key="index">
        <div class="header">
          {{i.ClassName}}
        </div>
        <div class="login">
          <p>ID：{{i.ClassID}}</p>
          <p>执教科目：{{i.CourseName}}</p>
          <div class="btn">
            <el-button type="warning" @click.native="changeClass(i.ClassID)">设置为当前班级</el-button>
          </div>
        </div>
      </div>
      </template>

      <div class="card" v-if="!$store.state.hasLogin">
        <div class="header">
          登陆
        </div>
        <div class="login">
          <el-input class="input" v-model="loginData.phone" autofocus placeholder="请输入手机号"></el-input>
          <el-input class="input" type="password" v-model="loginData.password" :minlength='6' @keyup.enter="login" placeholder="请输入密码"></el-input>
          <div class="btn">
            <el-button type="success" @click.native="login">登陆</el-button>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      poster: require('@/assets/img/post.jpg'),
      loginData:{
        phone:'13130000034',
        password:'123456',
      },
    }
  },
  methods: {
    login(){
      if(this.loginData.phone && this.loginData.password){
        this.$store.dispatch('login',this.loginData).then(res=>{
          this.$message('登录成功')
          this.$router.push('/user')
        })
      }else{
          this.$message.error('登录信息不完整')
      }
    },
    changeClass(val){
      this.$store.commit('changeCurrentClass',val)
    }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.left {
  width: calc(~"100% - 300px");
  float: left;
  padding: 10px;
}

.right {
  float: right;
  width: 260px;
  padding: 20px 10px;
  .card {
    border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    .header {
      height: 75px;
      position: relative;
      background: @main;
      line-height: 75px;
      color:#fff;
      font-size: 25px;
      img {
        width: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
      }
    }
    .content {
      margin-top: 40px;
      line-height: 2em;
      padding-bottom: 20px;
      padding:20px;
      text-align: left;
      .btn{
        text-align: center;
        margin:10px 0;
      }
    }
    .login {
      line-height: 2em;
      padding-bottom: 20px;
      padding:20px;
      .input{
        margin:10px 0;
      }
      .btn{
        text-align: center;
        margin:10px 0;
      }
    }
  }
}
</style>
