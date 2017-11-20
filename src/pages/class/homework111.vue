<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="card panel" >
      <div class="course">
        {{data.CourseName}}
      </div>
      <div class="tasktitle">{{data.Title}}</div>
      <div class="taskbox">
        <div class="taskcon">{{data.Content}}</div>
        <div class="albums">
          <li v-for="(p,index) in data.Albums" :key="index">
            <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
          </li>
        </div>
        <div class="taskbottom">
          <span class="time">{{data.CreateTime}}</span>
          <span title="删除" class="delBtn" v-if="isClassAdmin" @click="delPost(i.HID)">
            <i class="iconfont">&#xe630;</i>
            <span class="delBtnTitle">删除</span>
          </span>
        </div>
      </div>
    </div>
    <div class="card panel">
      <div class="look">
            <div class="lookNum">已读：{{data.LookCount}}人</div>
            <div class="lookuser">
              <div class="item" v-for="(i,index) in data.LookUser">
                <img :src="i.Headimgurl">
                <span class="name">{{i.TrueName}}</span>
              </div>
            </div>
          </div>
    </div>

    <el-dialog :visible.sync="showImgBig" class="bigImg">
      <img :src="imgBig">
    </el-dialog>

  </div>
</template>

<script>
import loadMore from "@/components/loadMore";
import noData from "@/components/noData";

export default {
  components: { loadMore, noData },
  data() {
    return {
      data: {},
      imgBig: "",
      showImgBig: false,
      fullscreenLoading: true
    };
  },
  computed: {
    course: function() {
      if (
        this.$store.state.currentUser.Role == "老师" &&
        this.$store.state.currentUser.ExtendInfo.Course.CourseName
      ) {
        this.classroom = true;
        return this.$store.state.currentUser.ExtendInfo.Course.CourseName;
      } else {
        return "暂无";
      }
    },
    classInfo() {
      return this.$store.state.currentClassInfo;
    },
    isClassAdmin() {
      if (this.$store.getters.role == "老师") {
        if (
          this.classInfo.teacher &&
          this.$store.state.currentUser.Meid == this.classInfo.teacher.Meid
        ) {
          return true;
        } else {
          this.notClassAdmin = true;
          return false;
        }
      }
    }
  },
  methods: {
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    },
    delPost(id) {
      this.$confirm("确认删除该作业吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = {
          hid: id
        };
        this.$API
          .deleteHomeWork(para)
          .then(() => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.refresh();
          })
          .catch(err => {
            this.$message({
              message: "删除失败了哦!",
              type: "error"
            });
          });
      });
    },
    getData() {
      this.$API.getHomework(this.$route.params.homeworkId).then(res => {
        this.fullscreenLoading = false;
        this.data = res;
      });
    }
  },
  created() {
    this.getData();
    this.$store.dispatch("getCourseList");
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";

.addHomework {
  background: #fff;
  text-align: center;
  margin-bottom: 15px;
  .iconfont {
    padding-right: 8px;
  }

  .title {
    line-height: 50px;
    cursor: pointer;
    color: @main;
    &:hover {
      background: @main;
      color: #fff;
    }
  }
}

.card {
  margin-bottom: 15px; // border: 1px solid @border;
  position: relative;

  .course {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 24px 0 30px;
    display: inline-block;
    background: @main;
    color: #fff;
    line-height: 36px;
    opacity: 0.6;
    &:before {
      position: absolute;
      content: "";
      left: 0;
      width: 0;
      height: 0;
      border: 18px solid transparent;
      border-left-color: #fff;
    }
  }
  .tasktitle {
    line-height: 36px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .taskbox {
    color: #666;
    .taskcon {
      margin: 0 auto;
      img {
        text-align: center;
        max-height: 100px;
      }
    }
    .albums {
      margin: 10px 0;
      li {
        display: inline-block;
        .imgCon {
          width: 160px;
          height: 160px;
          background-position: center;
          background-size: cover;
          display: inline-block;
          margin: 0 10px 10px 0;
        }
      }
    }
    .taskbottom {
      // text-align: right;
      margin-top: 10px;
      .time {
        padding-top: 20px;
        color: @grey;
        font-size: 12px;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}

.delBtn {
  font-size: 12px;
  float: right;
  &:hover {
    color: @main;
  }
}

.bigImg {
  img {
    max-width: 80%;
  }
}
.look {
  .lookNum {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  .lookuser {
    .item {
      display: inline-block;
      margin: 0 10px 10px 0;
      text-align: center;
      border-radius: 8px;
      img {
        width: 54px;
        height: 54px;
        border-radius: 8px;
        display: block;
      }
    }
  }
}
</style>
