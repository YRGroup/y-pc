<template>
  <div>
    <has-no-student v-if="$store.getters.hasNoStudent"></has-no-student>
    <div v-else>
      <div class="left">
        <router-view></router-view>
      </div>
      <div class="right">
        <div class="card">
          <div class="header">
            <img :src="currentStudent.Headimgurl">
          </div>
          <div class="content">
            <p class="name">{{currentStudent.TrueName}}</p>
            <p>{{currentStudent.school}}</p>
            <p>{{currentStudent.Class}}</p>
            <p>学号：{{currentStudent.StudentID}}</p>
            <!-- <el-button size="small" type="sucssess" @click.native="unbind" v-show="$store.getters.isParent">解绑</el-button> -->
            <el-button size="mini" type="primary" plain  @click.native="logout" v-show="$store.getters.isStudent">退出</el-button>
          </div>
        </div>

        <div class="panelbox">
          <h3><i class="iconfont">&#xe672;</i>家长信息</h3>
        </div>


        <div class="cardlist" v-for="(i,index) in parents" :key="index">
          <div class="header">
            <img :src="i.ParentHeadimgurl">
          </div>
          <div class="content">
            <h3><span class="parent">{{i.ParentType}}</span>{{i.ParentTrueName}}</h3>
            <p class="phone"><i class="iconfont">&#xe618;</i>{{i.ParentPhone}}</p>
          </div>
        </div>
    
      </div>
    </div>
  
  </div>
</template>

<script>
import hasNoStudent from '@/components/hasNoStudent'

export default {
  name: 'app',
  components: {hasNoStudent},
  data() {
    return {
      data: {},
      currentStudent: {
        school: '',
        Headimgurl: '',
        TrueName: '',
        StudentID: '',
        Class: '',
      },
      parents: [],
      bingdata:{}
    }
  },
  computed: {

  },
  methods: {
    getData() {
      if (this.$route.query.studentId) {
        this.$API.getStudentInfo(this.$route.query.studentId).then(res => {
          this.data = res
          this.currentStudent.school = res.School.Name
          this.currentStudent.Class = res.Class.Name
          this.currentStudent.Headimgurl = res.user.Headimgurl
          this.currentStudent.TrueName = res.user.TrueName
          this.currentStudent.StudentID = res.user.StudentID
          this.parents = res.Parents
        })
      } else {
        this.$API.getStudentInfo(this.$store.state.currentStudentId).then(res => {
          this.data = res
          this.currentStudent.school = res.School.Name
          this.currentStudent.Class = res.Class.Name
          this.currentStudent.Headimgurl = res.user.Headimgurl
          this.currentStudent.TrueName = res.user.TrueName
          this.currentStudent.StudentID = res.user.StudentID
          this.parents = res.Parents
        })
      }
    },
    logout() {
      this.$store.dispatch('logout').then(res => {
        this.$router.push('/login')
        this.$message('退出成功')
      }).catch(err=>{
        this.$message('登出00')
      })
    },
    unbind() {
      this.bingdata.student_meid = this.$store.state.currentStudentId
      this.$API.UnBindStudent(this.bingdata).then(res => {
        this.$message('解绑成功！')
        this.$router.push('/')
        this.$store.dispatch('getCurrentUser')
        this.getData()
      }).catch(err => {
        this.$message.error(err.msg)
      })
      console.log(this.$store.state)
    }
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
      img {
        border:3px solid rgba(255,255,255,0.5);
        width: 100px;
        position: absolute;
        left: 80px;
        top: 15px;
        border-radius: 50%;
        background: transparent;
      }
    }
    .content {
      margin-top: 50px;
      line-height: 2em;
      padding-bottom: 20px;
      .name{
        font-size: 20px;
      }
    }
  }
  
}
</style>
