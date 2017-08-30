<template>
  <div>
    <has-no-student v-if="$store.getters.hasNoStudent && $store.getters.role == '家长' "></has-no-student>
  
    <div v-else>
  
      <div class="left">
        <router-view></router-view>
      </div>
  
      <div class="right">
        <div class="classInfo classbox">
          <div class="header">
            <h3>{{classInfo.name}}</h3>
            <!-- <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg"> -->
          </div>
          <div class="content">
            <!-- <p>{{classInfo.name}}</p> -->
            <div class="info">
              <span>班主任：{{classInfo.teacher?classInfo.teacher.TrueName:'暂无'}}</span>
              <span>人数：{{classInfo.student_count}}</span>
            </div>
            <div style="text-align:center;" v-show="isClassAdmin">
              <el-button type="warning" @click="$router.push('/admin')">班级管理</el-button>
            </div>
          </div>
        </div>
  
        <!-- <div class="card">
          <div class="title">
            公告
          </div>
          <div class="content">
            <div class="noticeItem">
              <div class="noticeTitle">{{notice.content}}</div>
              <div class="footer">
                <span>{{notice.auther}}</span>
                <span>{{notice.date}}</span>
              </div>
            </div>
          </div>
        </div> -->
  
        <div class="card">
          <div class="title">
            班级作业
            <div class="btn" @click="$router.push('/homework')">更多</div>
          </div>
          <div class="content" v-if="homework.length">
            <div class="homeworkItem" v-for="i in homework" :key="i.HID">
              <span>【{{i.CourseName}}】</span>
              <span class="homeworkCon">{{i.Title || '班级作业'}}</span>
            </div>
          </div>
          <div class="content" v-else>
            <div class="homeworkItem">
              <span>暂无作业</span>
            </div>
          </div>
        </div>
  
        <div class="card">
          <div class="title">
            班级教师
          </div>
          <div class="content">
            <div class="teacherItem" v-for="i in teachers" :key="i.Meid" @click="$router.push('/t/?id='+i.Meid)">
              <span class="teacherImg">
                <img :src="i.Headimgurl" v-if="i.Headimgurl!='http://pic.yearnedu.com/himg.png' ">
                <div class="headTextImg" v-else>{{(i.TrueName ||'教师').substr(0,1)}}</div>
              </span>
              <div>{{i.TrueName || '未命名'}}</div>
              <div class="subject">{{i.Course || '无学科'}}</div>
            </div>
  
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
  components: { hasNoStudent },
  data() {
    return {
      teachers: [],
      notice: {},
      homework: [],
    }
  },
  computed: {
    classInfo() {
      return this.$store.state.currentClassInfo
    },
    isClassAdmin(){
      if(this.$store.getters.role=='老师'){
        if(this.classInfo.teacher && this.$store.state.currentUser.Meid == this.classInfo.teacher.Meid){
          return true
        }else{
          return false
        }
      }
    }
  },
  methods: {
    getTeacherList() {
      this.$API.getTeacherList(this.$store.state.currentClassId).then((res) => {
        this.teachers = res
      }).catch(err => {

      })
    },
    getNotice() {
      let para = {
        cid: this.$store.state.currentClassId,
        currentPage: 1,
        pagesize: 1,
        type: 3,
      }
      this.$API.getAllClassDynamic(para).then((res) => {
        this.notice = res[0]
      }).catch(err => {

      })
    },
    getHomeWork() {
      let para = {
        cid: this.$store.state.currentClassId,
        currentPage: 1,
        pagesize: 5,
      }
      this.$API.getHomeworkList(para).then((res) => {
        this.homework = res
      }).catch(err => {

      })
    },
    getClassInfo() {
      this.$store.dispatch('getCurrentClassInfo')
    },
    getData() {
      this.getClassInfo()
      this.getTeacherList()
      this.getNotice()
      this.getHomeWork()
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  watch: {
    "$route": "getData"
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.left {
  width: calc(~"100% - 280px");
  float: left;
}

.right {
  float: right;
  width: 260px;


  .card {
    margin-bottom: 15px; // padding: 5px;
    background: #fff; // &:hover{
    //   border: 1px solid @main;
    // }
    .title {
      border-bottom: 1px solid @border;
      line-height: 40px;
      padding: 3px 15px;
      font-size: 16px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 13px;
        left: 0;
        width: 3px;
        height: 20px;
        background: @main;
      }
      .btn {
        float: right;
        font-size: 0.8em;
        color: @grey;
        cursor: pointer;
      }
    }
    .content {
      // line-height: 2em;
      padding: 10px;
      font-size: 14px;
      .noticeItem {
        .footer {
          color: @grey;
          font-size: 12px;
          span {
            margin-right: 10px;
          }
        }
      }
      .homeworkItem {
        font-size: 12px;
        height: 28px;
        overflow: hidden;
        .time {
          text-align: right;
          color: @grey;
          font-size: 12px;
        }
      }
      .teacherItem {
        text-align: center;
        width: 33%;
        display: inline-block;
        margin-bottom: 20px;
        cursor: pointer;
        .teacherImg {
          height: 50px;
          .headTextImg {
            vertical-align: top;
          }
        }
        .subject {
          font-size: 12px;
          color: @grey;
        }
        span {
          display: inline-block;
          margin-bottom: 0;
          line-height: 0;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
