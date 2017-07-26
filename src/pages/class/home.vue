<template>
  <div>
  
    <div class="left">
      <router-view></router-view>
    </div>
  
    <div class="right">
      <div class="classInfo classbox">
        <div class="header">
          <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg">
        </div>
        <div class="content">
          <p>{{classInfo.name}}</p>
          <div class="info">
            <span>班主任：{{classInfo.teacherName}}</span>
            <span>人数：{{classInfo.student_count}}</span>
          </div>
        </div>
      </div>
  
      <!-- <div class="card" v-show="$store.state.currentClassList.length">
        <div class="title">
          切换当前班级
        </div>
        <div class="content">
          <el-select v-model="currentClass" @change="changeCurrentClass" placeholder="请选择">
            <el-option 
              v-for="item in $store.state.currentClassList" 
              :key="item.id" 
              :label="item.name" 
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div> -->
  
      <div class="card">
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
      </div>
  
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
            <span>班级暂时没有作业</span>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="title">
          班级教师
        </div>
        <div class="content">
          <div class="teacherItem" v-for="i in teachers" :key="i.Meid">
            <span class="teacherImg"><img :src="i.Headimgurl"></span>
            <span>{{i.TrueName}}</span>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      classInfo: {},
      teachers: [],
      notice: {},
      homework: [],
      currentClass: '',
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
      this.$API.getClassInfo(this.$store.state.currentClassId).then(res => {
        this.classInfo = res
        this.classInfo.teacherName = res.teacher.TrueName
      })
    },
    getData() {
      this.getClassInfo()
      this.getTeacherList()
      this.getNotice()
      this.getHomeWork()
    },
    changeCurrentClass() {
      this.$store.commit('changeCurrentClass', this.currentClass)
      this.getData()
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
    margin-bottom: 15px;
    // padding: 5px;
    background: #fff;
    // &:hover{
    //   border: 1px solid @main;
    // }
    .title {
      border-bottom: 1px solid @border;
      line-height: 40px;
      padding:3px 15px;
      font-size: 16px;
      position: relative;
      &:before{
        content:'';
        position:absolute;
        top: 13px;
        left:0;
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
      padding:10px;
      font-size: 14px;
      .noticeItem {
        .footer {
          color: @grey;
          font-size:12px;
          span{
            margin-right:10px;
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
        .teacherImg{
          height: 50px;
        }
        span{
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
