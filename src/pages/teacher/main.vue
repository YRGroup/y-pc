<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs">
      <el-tab-pane name="profile">
        <span class="title" slot="label">个人</span>
        <div class="content info">

          <div class="item">
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
            <div class="header">教学经历</div>
            <div class="item-content">
              <p>
                <span class="name">郑州航空港育人国际学校</span>
                <span class="time">2017-5-6</span>
              </p>
              <p>
                <span class="name">郑州航空港育人国际学校</span>
                <span class="time">2017-5-6</span>
              </p>
            </div>
          </div>

          <div class="item">
            <div class="header">个人荣誉</div>
            <div class="item-content">
              <div class="img" v-for="i in 5" :key="i">
                <img src="http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg">
              </div>
            </div>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane name="post" >
        <span class="title" slot="label">动态</span>
        <div class="content">

          <teacher-post :id="$store.state.currentUserId"></teacher-post>

        </div>
      </el-tab-pane>
      <el-tab-pane name="homework">
        <span class="title" slot="label">作业</span>
        <div class="content">

          <teacher-homework :id="$store.state.currentUserId"></teacher-homework>

        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import teacherHomework from '@/pages/teacher/components/homework'
import teacherPost from '@/pages/teacher/components/post'

export default {
  name: 'app',
  components: {teacherHomework,teacherPost},
  data() {
    return {
      activeTab:'profile',
      postData: [],
      homeworkData:[],
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData(){

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

.tabs {
  margin-top:10px;
  .title {
    padding: 10px 30px;
  }
  .content {
    line-height: 2em;
    .item{
      padding: 30px 0;
      border-bottom: 1px solid @grey;
      .header{
        line-height: 1em;
      }
      .item-content{
        padding-top:30px;
        text-align: center;
        line-height: 3em;
        .title {
          color: @grey;
        }
        .img{
          display: inline-block;
          padding:10px;
          img{
            width:120px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

</style>
