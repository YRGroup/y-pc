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
          <p><span><i class="iconfont">&#xe690;</i>{{data.ExtendInfo.Course}}</span><span><i class="iconfont">&#xe618;</i>{{data.Mobilephone}}</span></p>
          <!-- <div class="btn">
                <el-button type="primary" @click.native="$router.push('/teacher/edit')">修改资料</el-button>
              </div> -->
          <div class="btn" v-if="!$route.query.id">
            <el-button :plain="true" type="text" @click.native="logout">退出</el-button>
          </div>
          <div class="btn" v-else>
            <el-button type="info" @click.native="$router.push('/msg/'+data.Meid)">发消息</el-button>
          </div>
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
            <el-button type="warning" @click.native="changeClass(i.ClassID)">设为当前班级</el-button>
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
        ExtendInfo:{}
      }
    }
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.$API.getTeacherInfo(this.$route.query.id).then(res => {
          this.data = res
        })
      } else {
        this.data = this.$store.state.currentUser
      }
    },
    changeClass(val) {
      this.$store.commit('changeCurrentClass', val)
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
      background: @main;
      line-height: 75px;
      color: #fff;
      font-size: 25px;
      img {
        margin-top: 20px;
        width: 100px;
        border-radius: 50%;
      }
    }
    .content {
      margin-top: 40px;
      line-height: 2em;
      padding: 20px;
      text-align: center;
      .title{
        font-size: 20px;
      }
      span{
        margin:0 10px;
        color: @grey;
        .iconfont{
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
