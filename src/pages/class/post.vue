<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="body card">
      <div class="maintitle">
        <i class="iconfont">&#xe737;</i>动态详情
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/class')">返回</el-button>
        </span>
      </div>
      <div class="mainCon">
        <div class="img">
          <img :src="data.userImg">
        </div>
        <div class="header">
          {{data.auther}}
        </div>
        <div class="tips">{{data.category}}</div>
        <div class="content">
          {{data.content}}
            <span class="atuser" :key="index" v-for="(item,index) in data.AtUser">
              @{{item.TrueName}}
            </span>
          </div>
        <div class="video" v-if="data.Video">
          <div class="prism-player" id="J_prismPlayer"></div>
        </div>
        <div class="albums">
          <li v-for="(p,index) in data.albums" :key="index">
            <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
          </li>
        </div>
        <div class="footer">
          <span class="time">{{data.date}}</span>
          <span class="iconbtn">
            <span @click.once="doLike(data.ID),data.like++">
              <i class="iconfont">&#xe646;</i>{{data.like}}
            </span>
            <span @click="openQRcode(data.EncryptID)" style="position:relative">
              <i class="iconfont">&#xe60c;</i>分享
              <div v-show="showQRcode" class="QRcode">
                <canvas id="QRcodeInPost"></canvas>
              </div>
            </span>
          </span>
          <div class="liked">
            <div class="iszan"><i class="iconfont">&#xe611;</i></div>
            <div class="item">
              <span :key="index" v-for="(i,index) in data.zans">{{i.TrueName||'user'}} , </span>
            </div>
            <div class="zanNum">{{data.like}}人觉得很赞</div> 
          </div>
          <div class="look">
            <div class="lookNum">已读：{{data.LookCount}}人</div>
            <div class="lookuser">
              <div class="item" :key="index" v-for="(i,index) in data.LookUser">
                <img :src="i.Headimgurl">
                <span class="name">{{i.TrueName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="replybox" v-if="$store.getters.hasLogin">
      <div class="reply">
        <el-input class="input" size="small" v-model.trim="replyData.content" placeholder="请输入内容" v-show="showReply"></el-input>
        <el-button class="btn" size="small" type="primary" v-show="showReply" @click="submitReply">回复</el-button>
        <el-button class="btn" size="small"  type="primary"  style="float:right;margin-right:20px;margin-top:4px;" v-show="!showReply" @click.native="showReply=true">回复</el-button>
      </div>
      <div class="replyList">
        <div class="title">全部回复</div>
        <ul class="list">
          <li class="item" v-for="i in data.comment" :key="i.ID">
            <div>
              <span class="name">{{i.TrueName}}：</span>{{i.content}}</div>
            <div class="time">{{i.addTime}}</div>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog :visible.sync="showImgBig" class="bigImg">
      <img :src="imgBig">
    </el-dialog>

  </div>
</template>

<script>
var QRCode = require("qrcode");
export default {
  name: "post",
  components: {},
  data() {
    return {
      data: {},
      showReply: false,
      imgBig: "",
      showImgBig: false,
      replyData: {
        did: "",
        content: ""
      },
      showQRcode: false,
      fullscreenLoading: true
    };
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    }
  },
  methods: {
    getData() {
      if (this.$route.name === "post") {
        this.userGetData();
      }
      if (this.$route.name === "anonymousPost") {
        this.anonymousGetData();
      }
    },
    anonymousGetData() {
      this.$API.getPostAnonymouse(this.$route.params.postId).then(res => {
        this.data = res;
      });
    },
    userGetData() {
      this.$API
        .getClassDynamic(
          this.$store.state.currentClassId,
          this.$route.params.postId
        )
        .then(res => {
          this.fullscreenLoading = false
          this.data = res;
          console.log(this.data)
          if (this.data.Video) {
            this.$API.getVideoAuth({ videoid: this.data.Video.VideoId })
              .then(auth => {
                this.videoAuth = auth.toString();
                this.initPlayer();
                // this.player.play()
              });
          }
        });
    },
    // 视频播放器配置
    initPlayer() {
      if (this.player) {
        this.player = null;
      }
      this.player = new prismplayer({
        id: "J_prismPlayer",
        width: "80%",
        height: "400px",
        autoplay: true,
        useH5Prism: true,
        hideBar: true,
        vid: this.data.Video.VideoId,
        playauth: this.videoAuth,
        cover: this.data.Video.CoverUrl,
        skinLayout:[{"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"progress","align":"tlabs","x":0,"y":0},
                {"name":"playButton","align":"tl","x":15,"y":26},
                {"name":"fullScreenButton","align":"tr","x":20,"y":25},
                {"name":"timeDisplay","align":"tl","x":10,"y":24}]},
                {"name":"H5Loading","align":"cc"},
                {"name":"fullControlBar","align":"tlabs","x":0,"y":0,"children":[{"name":"fullTitle","align":"tl","x":25,"y":6},
                {"name":"fullNormalScreenButton","align":"tr","x":24,"y":13},
                {"name":"fullTimeDisplay","align":"tr","x":10,"y":12}]},
                {"name":"bigPlayButton","align":"cc","x":30,"y":80}],
      });
    },
    // 回复动态
    submitReply() {
      this.replyData.did = this.data.ID;
      if (
        this.$store.getters.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.replyData.student_meid = this.$store.state.currentStudentId;
      }
      this.$API.postNewComment(this.replyData).then(res => {
        this.$message.success("添加回复成功！");
        this.showReply = false;
        this.replyData.content = "";
        this.getData();
      }).catch(err => {
        this.$message.error(err.msg);
      })
    },
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    },
    doLike(id) {
      this.$API
        .doLikeThisPost(id)
        .then(res => {
          this.$message.success("点赞成功");
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    openQRcode(val) {
      this.showQRcode = !this.showQRcode;
      let url = document.location.origin + "/m/#/p/" + val;
      QRCode.toCanvas(document.getElementById("QRcodeInPost"), url, function(
        error
      ) {
        if (error) console.error(error);
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";

.nav {
  font-size: 12px;
}

.card {
  background: #fff;
  .mainCon {
    position: relative;
    padding: 0 20px 20px 80px;
    .img {
      position: absolute;
      left: 20px;
      top: 20px;
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
    }
    .header {
      display: inline-block;
      font-size: 16px; // line-height: 42px;
      margin-top: 24px;
    }
    .content {
      margin-top: 10px;
      position: relative;
    }
    .tips {
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
    .footer {
      font-size: 12px;
      .time {
        color: @grey;
      }
      .iconbtn {
        float: right;
        cursor: pointer;
        span {
          &:hover {
            color: @main;
          }
        }
        .iconfont {
          position: relative;
        }
      }
      .liked {
        .iszan {
          display: inline-block;
          position: relative;
          top: 5px;
          .iconfont {
            font-size: 24px;
            color: @main;
          }
        }
        .zanNum{
          display: inline-block;
        }
        .item {
          display: inline-block;
        }
      }

    }
  }
}

.replybox {
  background: #fff;
  margin-top: 20px;
  padding-bottom: 20px;
}

.reply {
  float: right;
  width: 600px;
  margin-top: 10px;
  .input {
    display: inline-block;
    width: 80%;
  }
  .btn {
    display: inline-block;
  }
}

.replyList {
  .title {
    padding: 15px 20px;
    font-size: 16px;
    border-bottom: 1px solid @border;
  }
  .item {
    border-bottom: 1px dotted @border;
    margin: 10px 40px;
    padding: 10px 0;
    .name {
      color: @grey;
    }
    .time {
      color: #999;
      font-size: 12px;
    }
    .reply-content {
      display: inline-block;
      margin-left: 20px;
      margin-top: 10px;
      vertical-align: top;
    }
  }
}

.QRcode {
  position: absolute;
  z-index: 100;
  right: 0;
  top: 20px;
  background: #fff;
  box-shadow: 0 1px 1px 1px rgba(7, 17, 7, 0.1);
}
.atuser {
  color: #0c92f3;
  margin-right: 8px;
}
</style>
