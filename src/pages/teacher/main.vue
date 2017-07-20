<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs">
      <el-tab-pane name="profile">
        <span class="title" slot="label">个人</span>
        <div class="content info">
          <div class="itemList">
            <div class="header"><i class="iconfont">&#xe668;</i>个人资料</div>
            <div class="setBtn" @click="$router.push('/teacher/edit')">修改资料</div>
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
                <span class="title">角色：</span>
                <span>{{currentUser.Role}}</span>
              </p>
              <p>
                <span class="title">学科：</span>
                <span>{{currentUser.ExtendInfo.Classes[0].CourseName}}</span>
              </p>
              <p>
                <span class="title">手机：</span>
                <span>{{currentUser.Mobilephone}}</span>
              </p>
            </div>
          </div>

          <div class="itemList">
            <div class="header"><i class="iconfont">&#xe69b;</i>教学经历</div>
            <div class="item-content">
              <p>
                <span class="name">郑州航空港育人国际学校</span>
                <span class="time">2016.8-- 2017.6</span>
              </p>
              <p>
                <span class="name">郑州航空港育人国际学校</span>
                <span class="time">2016.8-- 2017.6</span>
              </p>
            </div>
          </div>

          <div class="itemList">
            <div class="header"><i class="iconfont">&#xe63d;</i>个人荣誉</div>
            <div class="item-content">
              <div class="img" v-for="i in 5" :key="i">
                <img src="https://modao.cc/uploads3/images/907/9074147/raw_1493192685.png">
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
  // margin-top:10px;
  .title {
    padding: 10px 30px;
  }
  .content {
    line-height: 2em;
    .itemList{
      padding:30px 20px;
      border-bottom: 1px solid @border;
      position: relative;
      .setBtn{
        position: absolute;
        right: 20px;
        top: 30px;
        border:1px solid @main;
        color:@main;
        padding:1px 10px;
        border-radius: 4px;
        cursor: pointer;
        &:hover{
          background: @main;
          color:#fff;
        }
      }
      .header{
        line-height: 28px;
        font-size: 16px;
        margin-bottom: 10px;
        .iconfont{
          margin-right:8px;
          color:@grey;
        }

      }
      .item-content{
        // padding-top:30px;
        // text-align: center;
        margin-left: 40px;
        line-height: 3em;
        .name{
          width: 500px;
          display: inline-block;
        }
        .title {
          color: @grey;
        }
        .img{
          display: inline-block;
          padding-right:15px;
          img{
            width:120px;
            // border-radius: 50%;
          }
        }
      }
    }
  }
}

</style>
