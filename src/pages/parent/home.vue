<template>
  <div>
    <div class="left">
      <router-view></router-view>
    </div>

    <div class="right">

      <div class="card">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p class="name">{{$store.state.currentUser.TrueName}}</p>
          <span><i class="iconfont">&#xe60b;</i> {{$store.state.currentUser.Mobilephone}}</span>
          <span><i class="iconfont">&#xe66c;</i> {{$store.getters.role}}</span>
          <div class="btn">
            <!-- <el-button type="primary" @click.native="$router.push('/parent/edit')">修改资料</el-button> -->
            <el-button type="text" @click.native="logout">退出</el-button>
          </div>
        </div>
      </div>

      <div class="card" v-if="!$store.state.currentUser.ExtendInfo.Students.length">
        <div class="header">
          暂无学生
        </div>
        <div class="btn">
          <el-button type="warning" @click="$router.push('/addStudent')">添加学生</el-button>
        </div>
      </div>

      <div class="card" v-else>
        <div class="header">
          <img :src="currentStudent.Headimgurl">
        </div>
        <div class="content">
          <p>姓名：{{currentStudent.TrueName}}</p>
          <p>学号：{{currentStudent.StudentID}}</p>
          <p>班级：{{currentStudent.ClassName}}</p>
          <div class="btn">
            <!-- <el-button type="primary" @click.native="$router.push('/student/edit')">修改学生资料</el-button> -->
          </div>
          <el-select v-model="currenrStudentId" @change="changeCurrentStudent" placeholder="切换学生">
            <el-option v-for="i in studentList" :key="i.id" :label="i.name" :value="i.id">
            </el-option>
          </el-select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currenrStudentId: ''
    }
  },
  computed: {
    studentList() {
      if (this.$store.getters.role === '家长' && this.$store.state.currentUser.ExtendInfo.Students.length) {
        let v = []
        this.$store.state.currentUser.ExtendInfo.Students.forEach(o => {
          let a = {
            name: o.TrueName,
            id: o.Meid
          }
          v.push(a)
        })
        return v
      }
    },
    currentStudent() {
      return this.$store.state.currentUser.ExtendInfo.Students.find(o => {
        return o.Meid == this.$store.state.currentStudentId
      })
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(res => {
        this.$router.push('/login')
        this.$message('登出成功')
      }).catch(err=>{
        this.$message('登出00')
      })
    },
    changeCurrentStudent(val) {
      this.$store.commit('changeCurrentStudentId', val)
      let para={
        Student_Meid:val
      }
      this.$API.changeCurrentStudent(para).then(res=>{
        this.$message.success('成功切换当前学生')
        this.$store.commit('changeCurrentClass',this.currentStudent.ClassID)
      })
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
  width: calc(~"100% - 280px");
  float: left;
}

.right {
  float: right;
  width: 260px;
  .card {
    // border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    &:hover {
      // border: 1px solid @main;
    }
    .header {
      height: 75px;
      position: relative;
      background: @main;
      line-height: 75px;
      color: #fff;
      font-size: 25px;
      img {
        border:3px solid rgba(255,255,255,0.5) ;
        width: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
        background: transparent;
      }
    }
    .content {
      margin-top: 40px;
      line-height: 2em;
      padding-bottom: 20px;
      padding: 20px;
      text-align: center;
      .name{
        font-size: 20px;
      }
      span{
        margin:0 10px;
      }
      .iconfont{
        font-size: 16px;
      }
    }
  }
}
</style>
