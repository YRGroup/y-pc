<template>
  <div>
    <div class="body card">
      <div class="maintitle">
        <i class="iconfont">&#xe737;</i>动态详情
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/class')" type="success" :plain="true">返回</el-button>
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
        <div class="content">{{data.content}}</div>
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
          <div class="liked" v-if="$store.getters.hasLogin">
            <div class="iszan"><i class="iconfont">&#xe611;</i></div>
            <div class="item">
              <span v-for="(i,index) in data.zans">{{i.TrueName||'user'}} , </span>
            </div>
            <div class="zanNum">{{data.like}}人觉得很赞</div> 
          </div>
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
      </div>
    </div>
    <div class="replybox" v-if="$store.getters.hasLogin">
      <div class="reply">
        <el-input class="input" v-model.trim="replyData.content" placeholder="请输入内容" v-show="showReply"></el-input>
        <el-button class="btn" type="success" v-show="showReply" @click="submitReply">回复</el-button>
        <el-button class="btn" size="small" style="float:right;margin-right:20px;margin-top:4px;" :plain="true" type="success" v-show="!showReply" @click.native="showReply=true">回复</el-button>
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
    };
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
          this.data = res;
        });
    },
    submitReply() {
      this.replyData.did = this.data.ID;
      if (
        this.$store.getters.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.replyData.student_meid = this.$store.state.currentStudentId;
      }
      this.$API.postNewComment(this.replyData).then(res => {
        this.$message("添加回复成功！");
        this.showReply = false;
        this.replyData.content = "";
        this.getData();
      });
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
      .look{
        background: #f7f7f7;
        padding: 10px;
        margin-top: 20px;
        .lookNum{
          font-size: 14px;
          margin-bottom: 8PX;
          font-weight: 600;
        }
        .lookuser{
          .item{
            display: inline-block;
            margin:0 10px 10px 0;
            text-align: center;
            border-radius: 8px;
            img{
              width: 54px;
              height: 54px;
              border-radius: 8px;
              display: block;
            }
          }
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
</style>
