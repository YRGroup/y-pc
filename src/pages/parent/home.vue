<template>
  <div>
  
    <div class="left">
      <has-no-student v-if="$store.getters.hasNoStudent"></has-no-student>
      <div v-else>
        <router-view></router-view>
      </div>
  
    </div>
  
    <div class="right">
  
      <div class="card">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p>账号：{{$store.state.currentUser.Mobilephone}}</p>
          <p>姓名：{{$store.state.currentUser.TrueName}}</p>
          <p>身份：{{$store.getters.role}}</p>
          <div class="btn">
            <el-button type="primary" @click.native="$router.push('/parent/edit')">修改资料</el-button>
            <el-button type="warning" @click.native="logout">登出</el-button>
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
            <el-button type="primary" @click.native="$router.push('/student/edit')">修改学生资料</el-button>
          </div>
          <el-select v-model="currenrStudentId" @change="changeCurrentStudent" placeholder="切换当前学生">
            <el-option v-for="i in studentList" :key="i.id" :label="i.name" :value="i.id">
            </el-option>
          </el-select>
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
import hasNoStudent from '@/components/hasNoStudent'

export default {
  components: { hasNoStudent },
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
        this.$message('登出成功')
        this.$router.push('/login')
      })
      console.log(this.$store.state)
    },
    changeCurrentStudent(val) {
      this.$store.commit('changeCurrentStudentId', val)
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
      padding: 20px;
      text-align: left;
    }
    .btn {
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
