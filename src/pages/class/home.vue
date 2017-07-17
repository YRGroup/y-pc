<template>
  <div>
  
    <div class="left">
  
      <router-view></router-view>
  
    </div>
  
    <div class="right">
      
      <div class="classInfo">
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

      <div class="card" v-show="$store.state.currentClassList.length">
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
      </div>
  
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
          <div class="btn">更多</div>
        </div>
        <div class="content">
          <div class="homeworkItem" v-for="i in homework" :key="i.HID">
            <span>【{{i.CourseName}}】</span>
            <span class="content">{{i.Title}}</span>
            <span class="time">{{i.CreateTime}}</span>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="title">
          班级教师
        </div>
        <div class="content">
          <div class="teacherItem" v-for="i in teachers" :key="i.Meid">
            <img :src="i.Headimgurl">
            <p>{{i.TrueName}}</p>
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
      classInfo:{},
      teachers:[],
      notice:{},
      homework:[],
      currentClass:'',
    }
  },
  methods: {
    getTeacherList() {
      this.$API.getTeacherList(this.$store.state.currentClassId).then((res) => {
        this.teachers = res
      }).catch(err=>{
        
      })
    },
    getNotice() {
      let para = {
        cid : this.$store.state.currentClassId,
        currentPage : 1,
        pagesize : 1,
        type : 3,
      }
      this.$API.getAllClassDynamic(para).then((res) => {
        this.notice = res[0]
      }).catch(err=>{
                     
      })
    },
    getHomeWork() {
      let para = {
        cid : this.$store.state.currentClassId,
        currentPage : 1,
        pagesize : 5,
      }
      this.$API.getHomeworkList(para).then((res) => {
        this.homework = res
      }).catch(err=>{
              
      })
    },
    getClassInfo(){
      this.$API.getClassInfo(this.$store.state.currentClassId).then(res=>{
        this.classInfo = res
        this.classInfo.teacherName = res.teacher.TrueName    
      })
    },
    getData(){
      this.getClassInfo()
      this.getTeacherList()
      this.getNotice()
      this.getHomeWork()
    },
    changeCurrentClass(){
      this.$store.commit('changeCurrentClass',this.currentClass)
      this.getData()
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  watch:{
    "$route": "getData"
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.left {
  width: calc(~"100% - 300px");
  float: left;
  padding: 10px;
}

.right {
  float: right;
  width: 260px;
  padding: 20px 10px;
  .classInfo {
    background: @main;
    color: #fff;
    text-align: center;
    margin: 15px 0;
    .header {
      line-height: 120px;
      img {
        vertical-align: middle;
        width: 90px;
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
      }
    }
    .content {
      line-height: 30px;
      .info {
        line-height: 50px;
      }
    }
  }
  .card {
    border: 1px solid @border;
    margin-bottom: 20px;
    padding: 5px;
    background: #fff;
    .title {
      border-bottom: 1px solid @border;
      line-height: 40px;
      padding: 0 10px;
      .btn {
        float: right;
        font-size: 0.8em;
        color: @grey;
      }
    }
    .content {
      line-height: 2em;
      padding: 20px 10px;
      font-size: 12px;
      .noticeItem {
        .footer {
          color: @grey;
        }
      }
      .homeworkItem {
        .content{
          width:100px;
          overflow: hidden;
        }
        .time {
          display: block;
          text-align: right;
          color: @grey;
        }
      }
      .teacherItem {
        text-align: center;
        width: 33%;
        display: inline-block;
        img {
          width: 55px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
