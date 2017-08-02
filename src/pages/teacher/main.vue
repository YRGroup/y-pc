<template>
  <div>
    <el-tabs v-model="activeTab" type="border-card" class="tabs leftCon">
      <el-tab-pane name="profile" v-if="!$route.query.id">
        <span class="title" slot="label">个人</span>
        <div class="content info">
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe668;</i>个人资料</div>
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
                <span>{{currentUser.ExtendInfo.Course}}</span>
              </p>
              <p>
                <span class="title">手机：</span>
                <span>{{currentUser.Mobilephone}}</span>
              </p>
            </div>
          </div>
  
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe69b;</i>教学经历</div>
            <div class="item-content">
              <p v-for="(i,index) in profileData.TeachExperience" :key="index">
                <span class="name">{{i.SchoolName}}</span>
                <span class="time">{{i.StartTime}} - {{i.EndTime}}</span>
              </p>
            </div>
          </div>
  
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe63d;</i>个人荣誉</div>
            <div class="item-content">
              <li class="honorItem" v-for="(i,index) in profileData.PersonalHonor" :key="index">
                <img :src="i.ImgPath">
                <div class="info">{{i.Description}}</div>
              </li>
            </div>
          </div>
  
        </div>
      </el-tab-pane>
  
      <el-tab-pane name="profile" v-else>
        <span class="title" slot="label">资料</span>
        <div class="content info">
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe668;</i>个人资料</div>
            <!-- <div class="setBtn" @click="$router.push('/msg/'+profileData.Meid)">发消息</div> -->
            <div class="item-content">
              <p>
                <span class="title">姓名：</span>
                <span>{{profileData.TrueName}}</span>
              </p>
              <p>
                <span class="title">性别：</span>
                <span>{{profileData.Sex}}</span>
              </p>
              <p>
                <span class="title">学科：</span>
                <span>{{profileData.Course}}</span>
              </p>
              <p>
                <span class="title">手机：</span>
                <span>{{profileData.Mobilephone}}</span>
              </p>
            </div>
          </div>
  
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe69b;</i>教学经历</div>
            <div class="item-content">
              <p v-for="(i,index) in profileData.TeachExperience" :key="index">
                <span class="name">{{i.SchoolName}}</span>
                <span class="time">{{i.StartTime}} - {{i.EndTime}}</span>
              </p>
            </div>
          </div>
  
          <div class="itemList">
            <div class="header">
              <i class="iconfont">&#xe63d;</i>个人荣誉</div>
            <div class="item-content">
              <li class="honorItem" v-for="(i,index) in profileData.PersonalHonor" :key="index">
                <img :src="i.ImgPath">
                <div class="info">{{i.Description}}</div>
              </li>
            </div>
          </div>
  
        </div>
      </el-tab-pane>
  
      <el-tab-pane name="post">
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
  
      <el-tab-pane name="msg" v-if="!$route.query.id">
        <span class="title" slot="label">消息</span>
        <div class="content">
  
          <msg></msg>
  
        </div>
      </el-tab-pane>
  
    </el-tabs>
  </div>
</template>

<script>
import teacherHomework from '@/pages/teacher/components/homework'
import teacherPost from '@/pages/teacher/components/post'
import msg from '@/pages/contact/main'

export default {
  name: 'app',
  components: { teacherHomework, teacherPost, msg },
  data() {
    return {
      activeTab: 'profile',
      profileData: {},
      postData: [],
      homeworkData: [],
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.$API.getTeacherInfo(this.$route.query.id).then(res => {
          this.profileData = res
        })
      } else {
        this.$API.getTeacherInfo(this.$store.state.currentUserId).then(res => {
          this.profileData = res
        })
      }

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
    .itemList {
      padding: 30px 20px;
      border-bottom: 1px solid @border;
      position: relative;
      &:last-child{
        border:none;
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
        .iconfont {
          margin-right: 8px;
        }
      }
      .item-content {
        // padding-top:30px;
        // text-align: center;
        margin-left: 40px;
        line-height: 3em;
        .name {
          width: 500px;
          display: inline-block;
        }
        .title {
          color: @grey;
        }
        .img {
          display: inline-block;
          padding-right: 15px;
          img {
            width: 120px; // border-radius: 50%;
          }
        }
      }
    }
  }
}

.honorItem {
  max-width: 120px;
  display: inline-block;
  text-align: center;
  padding: 20px;
  img {
    width: 100%;
  }
  .info {
    color: @grey;
  }
}

.el-tabs--border-card .el-tabs__item.is-active {
  border-top: 2px solid @main;
  color: @main ;
}
</style>
