
<template>
  <div  v-loading.lock="fullscreenLoading"   element-loading-text="拼命加载中">
    <!-- 旧的发布动态 -->
    <publish-active @commitActive="commitActive"></publish-active>
    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <!-- <transition-group  
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      > -->
      <transition-group  
      name="slide"
      >
        <div class="card panel" v-for="(i,postIndex) in data" :key="i.ID">
          <div class="img">
            <div v-if="i.auther_role == '4'||i.auther_role == '8'" @click="$router.push('/t?id='+i.auther_meid)" class="category" :style="{background:colors[i.CourseName]}">{{ i.CourseName&&i.CourseName.substr(0,1) }}</div>
            <img v-else :src="i.userImg" @click="$router.push('/s?id='+i.auther_meid)">
          </div>
          <div class="tips">{{i.category}}</div>
          <div class="header">{{i.auther}}</div>
          <div class="content" @click="$router.push('/post/'+i.ID)">
          {{i.content}} 
          <span class="atuser" :key="index" v-for="(item,index) in i.AtUser">@{{item.TrueName}}</span>
          </div>
          <div class="videoCover" v-if="i.Video" @click="$router.push('/post/'+i.ID)">
            <span class="CoverImg">
              <span class="icon"><i class="iconfont">&#xe63c;</i></span>
              <span class="shade"></span>
              <img :src="i.Video.CoverUrl" alt="">
            </span>
          </div>
          <div class="albums">
            <li v-for="(p,index) in i.albums" :key="index">
              <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
            </li>

          </div>
          <div class="comment" v-if="i.comment.length" @click="$router.push('/post/'+i.ID)">
            <div class="name">
              {{i.comment[0].TrueName}}：
            </div>
            <div class="content">
              {{i.comment[0].content}}
            </div>
            <div class="btn">查看更多</div>
          </div>
          <div class="footer">
            <span class="time">{{i.date}}</span>
            <span class="iconbtn">
              <span title="删除" class="delBtn" @click="delPost(i.ID,postIndex)" v-loading.lock="fullscreenLoading"   v-if="showDelete(i.auther_meid)">
                <i class="iconfont">&#xe630;</i>
                <span class="delBtnTitle">删除</span>
              </span>
              <!-- <span title="点赞" v-else @click.once="doLike(i.ID)">
                <i class="iconfont">&#xe646;</i>{{i.like}}
              </span> -->
              <give-zan :isZan="i.IsZan" :num="i.like" :id="i.ID"></give-zan>
            </span>
          </div>
        </div>
      </transition-group >
      <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
    </div>

    <el-dialog :visible.sync="showImgBig" class="bigImg" width="50%" top="10vh">
      <img :src="imgBig">
    </el-dialog>

  </div>
</template>

<script>
require("@/common/js/aliyun-sdk.min.js");
require("@/common/js/vod-sdk-upload-1.1.0.min.js");

import lrz from "lrz";
import loadMore from "@//components/loadMore";
import noData from "@//components/noData";
import publishActive from "@//components/publishActive";
import giveZan from "@//components/giveZan";

export default {
  name: "app",
  components: { loadMore, noData, publishActive, giveZan },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      newPost: {
        content: "",
        at_meid: [],
        videoid: ""
      },
      data: [],
      fileList: [],
      imgUrls: [],
      imgbase64List: [],
      currentPage: 1,
      pageSize: 10,
      imgBig: "",
      showImgBig: false,
      noMoreData: false,
      nodataImg: false,
      showAddPost: false,
      fullscreenLoading: true,
      nodataPic: require("@/assets/nodata.png"),
      showUpImg: true,
      showProgress: false,
      videoBtn: true,
      studentList: []
    };
  },
  computed: {
    role() {
      return this.$store.getters.role;
    },
    imgBaseList() {
      let arr = [];
      this.imgUrls.forEach((n, i) => {
        arr.push(n.src);
      });
      return arr;
    },
    newActive() {
      return this.$store.state.newActive;
    },
    colors() {
      return this.$store.state.colors;
    }
  },
  methods: {
    //是否显示删除按钮
    commitActive(para) {
      this.getData();
    },
    showDelete(auther) {
      if (
        this.$store.state.currentUser.Meid == auther ||
        this.$store.state.currentStudentId == auther ||
        this.role == "班主任"
      ) {
        return true;
      } else {
        return false;
      }
    },
    getData(more) {
      if (!this.$store.state.currentClassId) return;
      this.currentPage = more ? this.currentPage : 1;
      let para = {};
      para.cid = this.$store.state.currentClassId;
      para.currentPage = this.currentPage;
      para.pagesize = this.pageSize;
      para.type = 1;
      this.$API
        .getAllClassDynamic(para)
        .then(res => {
          this.fullscreenLoading = false;
          this.videoBtn = true;
          if (res.length) {
            // if (more) {
            //   this.data = this.data.concat(res); //合并数组
            // } else {
            //   this.data = res;
            // }
            this.data = more ? this.data.concat(res) : res;
          } else if (res.length == 0 && this.currentPage == 1) {
            this.nodataImg = true;
          } else if (res.length == 0 && this.currentPage != 1) {
            this.noMoreData = true;
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    loadMore() {
      this.currentPage++;
      this.getData(true);
    },
    // 点赞
    doLike(id, index) {
      this.$API
        .doLikeThisPost(id)
        .then(res => {
          this.$message.success("点赞成功");
          this.data[index].like++; //赞数++
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    // 删除动态
    delPost(id, index) {
      console.log(index);
      this.$confirm("确认删除该动态吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.data.splice(index, 1);
        let para = {
          did: id
        };
        // this.fullscreenLoading = true;
        this.$API
          .deletePost(para)
          .then(() => {
            // this.fullscreenLoading = false;
            // this.$message({
            //   message: "删除成功",
            //   type: "success"
            // });
            // this.data = [];
            // this.currentPage = 1;
            // this.getData();
          })
          .catch(err => {
            this.$message({
              message: err.msg,
              type: "error"
            });
          });
      });
    },
    // 查看动态图片
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  // watch: {
  //   "$route": "getData"
  // },
  watch: {
    newActive(newVal) {
      if (newVal) {
        this.data = [];
        this.getData();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";

// .deleteImg {
//       margin-left: 54px;
//       width: 25px;
//       height: 30px;
//       line-height: 34px;
//       text-align: center;
//       position: absolute;
//       background: #000;
//       opacity: .4;
//       border-radius: 0 0.35em;
//       // right: 10;
//       left:15;
//       // top: 0;
//       bottom: 73px;
//       font-size: 16px;
//       color: #fff;
//       span {

//       }
//     }

.dynamics {
  height: 20vh;
  background-color: white;
  // border-radius: 5px;
}
.kind {
  margin: 6px;
  padding-left: 15px;
}
.submit {
  float: right;
}
.picture {
  margin-left: 20px;
}

.addPost {
  background: #fff;
  .title {
    line-height: 50px;
    padding-left: 20px;
    background: @main;
    color: #fff;
    margin-bottom: 10px;
  }
  .addbtn {
    text-align: center;
    cursor: pointer;
    background: #fff;
    color: @main;
    .iconfont {
      margin-right: 8px;
    }
    &:hover {
      background: @main;
      color: #fff;
    }
  }
  .content {
    padding: 10px 20px;
  }
  .btn {
    text-align: center;
    padding: 10px 50px;
  }
  .albums {
    padding: 0 20px;
  }
}
.card {
  overflow: hidden;
  margin: 15px 0;
  position: relative;
  background: #fff;
  padding-left: 80px;
  &:hover {
    // border: 1px solid @main;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
  }
  .img {
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
  .tips {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 12px 0 30px;
    display: inline-block;
    background: @main;
    color: #fff;
    line-height: 32px;
    font-size: 12px;
    opacity: 0.6;
    &:before {
      position: absolute;
      content: "";
      left: 0;
      width: 0;
      height: 0;
      border: 16px solid transparent;
      border-left-color: #fff;
    }
  }
  .header {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    line-height: 42px;
    &:hover {
      color: @main;
    }
  }
  .content {
    line-height: 24px;
    word-warp: break-word;
    word-break: break-all;
    cursor: pointer;
    color: #666;
  }
  .comment {
    background: #fbfbfb;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 8px;
    .name {
      display: inline-block;
      color: @main;
    }
    .content {
      display: inline-block;
    }
    .btn {
      border-top: 1px solid #e2e3e3;
      cursor: pointer;
      text-align: center;
      color: @main;
      padding-top: 5px;
      margin-top: 5px;
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
        cursor: pointer;
      }
    }
  }
  .footer {
    font-size: 12px;
    .time {
      color: @grey;
    }
    .iconbtn {
      float: right;
      cursor: pointer;
      .active {
        color: @main;
      }
      span {
        margin: 0 10px;
        &:hover {
          color: @main;
        }
      } // &:hover {
      //   color: @main;
      // }
    }
    .delBtn {
      width: 50px;
      .iconfont {
        display: inline-block;
      }
      .delBtnTitle {
        display: none;
        margin: 0;
      }
      &:hover {
        .delBtnTitle {
          display: inline-block;
        }
      }
    }
  }
}
.bigImg {
  max-width: 100vw;
  max-height: calc(100vh - 10vh);
  .el-dialog {
    top: 0;
  }
  img {
    max-width: 100%;
    max-height: 100vh;
  }
}

.funcArea {
  padding: 10px;
}
.upvideoBtn {
  position: relative;
  display: inline-block;
  input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.progress {
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.progress-bar {
  width: 140px;
  height: 5px;
  background: #ccc;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin: 10px 5px 0 0;
}
#progress-text {
  position: relative;
}
#progress-now {
  position: absolute;
  left: 0;
  right: 100%;
  top: 0;
  bottom: 0;
  background: #00c06f;
}
.slide-enter-active {
  animation: slide-fade-in ease 1s;
}
.slide-leave-active {
  animation: slide-fade-out ease 1s;
}
@keyframes slide-fade-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-fade-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
