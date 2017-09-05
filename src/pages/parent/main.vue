<template>
  <div>

    <el-tabs v-model="activeTab" type="border-card" class="tabs">
      <el-tab-pane name="main">
        <span class="title" slot="label">资料</span>
        <div class="content info">

          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe668;</i>个人资料
              <!-- <span class="setting"><el-button type="success" :plain="true" @click.native="$router.push('/parent/edit')">修改</el-button></span> -->
            </div>
            <div class="item-content">
              <p>
                <span class="title">姓名：</span>
                <span>{{currentUser.TrueName}}</span>
              </p>
              <p>
                <span class="title">手机：</span>
                <span>{{currentUser.Mobilephone}}</span>
              </p>
              <p>
                <span class="title">性别：</span>
                <span>{{currentUser.Sex}}</span>
              </p>
            </div>
          </div>

          <div v-if="currentStudent">
            <div class="itemList">
              <div class="header">
                <i class="iconfont">&#xe607;</i>学生资料
                <span class="setting" v-show="editStatus">
                  <el-button type="success" :plain="true" @click.native="$router.push('/student/edit')">修改</el-button>
                </span>
              </div>
              <div class="item-content">
                <p>
                  <span class="title">姓名：</span>
                  <span>{{currentStudent.TrueName}}</span>
                </p>
                <p>
                  <span class="title">学号：</span>
                  <span>{{currentStudent.StudentID}}</span>
                </p>
                <p>
                  <span class="title">性别：</span>
                  <span>{{currentStudent.Sex}}</span>
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
                  <span>{{currentStudent.CampusCard || '无'}}</span>
                </p>
              </div>
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

      <!-- <el-tab-pane name="addStudent">
          <span class="title" slot="label">添加学生</span>
          <div class="content">

            <add-student></add-student>

          </div>
        </el-tab-pane> -->
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
    currentUser: function() {
      return this.$store.state.currentUser
    },
    currentStudent() {
      return this.$store.state.currentUser.ExtendInfo.Students.find(o => {
        return o.Meid == this.$store.state.currentStudentId
      })
    },
    editStatus() {
      if (this.$store.getters.role === '家长' && this.currentStudent.Status == 0) {
        return true
      } else {
        return false
      }
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
  min-height: 600px; // margin-top:10px;
  .title {
    padding: 10px 30px 0 30px;
  }
  .content {
    line-height: 2em;
    .itemList {
      padding: 30px 20px;
      border-bottom: 1px solid @border;
      position: relative;
      &:last-child {
        border: none;
      }
      .setBtn {
        position: absolute;
        right: 20px;
        top: 30px;
        border: 1px solid @main;
        color: @main;
        padding: 1px 10px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: @main;
          color: #fff;
        }
      }
      .header {
        line-height: 28px;
        font-size: 16px;
        margin-bottom: 10px;
        color: @main;
        position: relative;
        .iconfont {
          margin-right: 8px;
        }
        .setting {
          position: absolute;
          top: -10px;
          right: 0;
        }
      }
      .item-content {
        // padding-top:30px;
        // text-align: center;
        margin-left: 40px;
        line-height: 2em;
        .name {
          width: 500px;
          display: inline-block;
        }
        .title {
          color: @grey;
          text-align: right;
          display: inline-block;
          width: 80px;
        }
        .img {
          display: inline-block;
          padding-right: 15px;
          img {
            width: 120px;
          }
        }
      }
    }
  }
}

</style>
