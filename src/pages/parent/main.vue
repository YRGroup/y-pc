<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs">
      <el-tab-pane name="main">
        <span class="title" slot="label">资料</span>
        <div class="content info">
  
          <div class="item">
            <div class="header">家长资料</div>
            <div class="item-content">
              <p>
                <span class="title">姓名：</span>
                <span>{{currentUser.TrueName}}</span>
              </p>
              <p>
                <span class="title">性别：</span>
                <span>{{currentUser.Sex}}</span>
              </p>
              <p>
                <span class="title">手机：</span>
                <span>{{currentUser.Mobilephone}}</span>
              </p>
            </div>
          </div>

          <div class="item">
            <div class="header">学生资料</div>
            <div class="item-content">
              <p>
                <span class="title">姓名：</span>
                <span>{{currentStudent.TrueName}}</span>
              </p>
              <p>
                <span class="title">性别：</span>
                <span>{{currentStudent.Sex}}</span>
              </p>
              <p>
                <span class="title">学号：</span>
                <span>{{currentStudent.StudentID}}</span>
              </p>
              <p>
                <span class="title">学校：</span>
                <span>{{currentStudent.SchoolName}}</span>
              </p>
              <p>
                <span class="title">班级：</span>
                <span>{{currentStudent.ClassName}}</span>
              </p>
              <p>
                <span class="title">校园卡号：</span>
                <span>{{currentStudent.CampusCard}}</span>
              </p>
            </div>
          </div>
  
          <div class="item">
            <div class="header">其他功能</div>
            <div class="item-content">
              <p>
                <el-button>育人官网</el-button>
              </p>
              <p>
                <el-button>育人官网</el-button>
              </p>
  
            </div>
          </div>
  
        </div>
      </el-tab-pane>
  
      <el-tab-pane name="msg">
        <span class="title" slot="label">消息</span>
        <div class="content">
  
          <msg></msg>
  
        </div>
      </el-tab-pane>
  
      <el-tab-pane name="addStudent">
        <span class="title" slot="label">添加学生</span>
        <div class="content">
  
          <add-student></add-student>
  
        </div>
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>

<script>
import addStudent from '@/pages/parent/addStudent'
import msg from '@/pages/contact/main'

export default {
  name: 'parent',
  components: { addStudent, msg },
  data() {
    return {
      activeTab: 'main',
      postData: [],
      homeworkData: [],
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    },
    currentStudent(){
      return this.$store.state.currentUser.ExtendInfo.Students.find(o=>{
        return o.Meid==this.$store.state.currentStudentId
      })
    }
  },
  methods: {
    getData() {

    },
  },
  created() {
    if (this.$route.query.tab) {
      this.activeTab = this.$route.query.tab
    }
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.tabs {
  .title {
    padding: 10px 30px;
  }
  .content {
    line-height: 2em;
    .item {
      padding: 30px 0;
      border-bottom: 1px solid @grey;
      .header {
        line-height: 1em;
      }
      .item-content {
        padding-top: 30px;
        text-align: center;
        line-height: 3em;
        .title {
          color: @grey;
          width:20%;
        }
        .itemInfo{
          width:80%;
        }
        .img {
          display: inline-block;
          padding: 10px;
          img {
            width: 120px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
