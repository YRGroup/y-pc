<template>
  <div>
    <has-no-student v-if="$store.getters.hasNoStudent && $store.getters.isParent "></has-no-student>
  
    <div v-else>
  
      <div class="left">
        <router-view></router-view>
      </div>
  
      <div class="right">
        <div class="classInfo classbox">
          <div class="header">
            <h3>{{classInfo.name}}</h3>
          </div>
          <div class="content">
            <div class="info">
              <span>班主任：{{classInfo.teacher?classInfo.teacher.TrueName:'暂无'}}</span>
              <span>人数：{{classInfo.student_count}}</span>
            </div>
            <div style="text-align:center;" v-show="$store.getters.isAdviserTeacher">
              <el-button type="primary" plain size="medium" @click="$router.push('/admin')">班级管理</el-button>
              <el-button type="warning" plain size="medium" @click="$router.push('/sendmsg')">发短信</el-button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="title">
            班级作业
            <div class="btn" @click="$router.push('/homework')">更多</div>
          </div>
          <div class="content" v-if="homework.length">
            <div class="homeworkItem" v-for="i in homework" :key="i.HID" @click="$router.push('/homework?id='+i.HID)">
              <span class="unread" v-if="!i.IsRead">[未读]</span>
              <span class="homeworkCon">{{i.CreateTime | formatDateMMdd}} </span>
              <span>【{{i.CourseName}}】{{i.Title || '班级作业'}}</span>
            </div>
          </div>
          <div class="content" v-else>
            <div class="homeworkItem">
              <span>暂无作业</span>
            </div>
          </div>
        </div>
  
        <div class="card" style="padding-bottom:20px">
          <div class="title">
            班级教师
          </div>
          <div class="content">
            <div class="teacherItem" v-for="i in teachers" :key="i.Meid" @click="$router.push('/t/?id='+i.Meid)">
                <!-- <img :src="i.Headimgurl"> -->
              <div class="category" :style="{background:colors[i.Course]}">{{ i.Course.substr(0,1) }}</div>
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
import hasNoStudent from "@/components/hasNoStudent";
import {formatDate} from '@/common/js/formatdate.js';
export default {
  name: "app",
  components: { hasNoStudent },
  data() {
    return {
      teachers: [],
      notice: {},
      homework: [],
    };
  },
  filters: {
        formatDateMMdd(time) {
            var date = new Date(time);
            return formatDate(date, "MM-dd");
        }
  },
  computed: {
    classInfo() {
      return this.$store.state.currentClassInfo;
    },
    classId() {
      return this.$store.state.currentClassId
    },
    colors() {
      return this.$store.state.colors
    },
  },
  methods: {
    getTeacherList() {
      this.$API
        .getTeacherList(this.classId)
        .then(res => {
          this.teachers = res;
        })
        .catch(err => {});
    },
    // getNotice() {
    //   let para = {
    //     cid: this.$store.state.currentClassId,
    //     currentPage: 1,
    //     pagesize: 1,
    //     type: 3
    //   };
    //   this.$API
    //     .getAllClassDynamic(para)
    //     .then(res => {
    //       this.notice = res[0];
    //     })
    //     .catch(err => {});
    // },
    getHomeWork() {
      let para = {
        cid: this.classId,
        currentPage: 1,
        pagesize: 5
      };
      this.$API
        .getHomeworkList(para)
        .then(res => {
          this.homework = res;
        })
        .catch(err => {});
    },
    getClassInfo() {
      this.$store.dispatch("getCurrentClassInfo");
    },
    getData() {
      if(!this.classId)
        return;
      this.getClassInfo();
      this.getHomeWork();
      this.getTeacherList()
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  watch: {
    $route: "getData"
  }
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";
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
        content: "";
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
      max-height: 300px;
      overflow-y: auto;
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
        cursor: pointer;
        overflow: hidden;
        .time {
          text-align: right;
          color: @grey;
          font-size: 12px;
        }
        &:hover {
          color: @main;
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
