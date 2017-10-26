<template>
  <div id="paihaoControl">

    <!-- <div id="logo" style="position: relative;z-index: 999">
      <img :src="logo" alt="">
    </div> -->
    <!-- <div class="fade"></div> -->
    <!-- <div class="wrap"></div> -->
    <div class="main">
      <div class="title">
        {{nowObj.Name}}
      </div>
      <div class="now">
        正在考试
        <span>{{nowObj.NowNo}}</span>
        号考生
      </div>
      <div class="next">
        总人数
        <span>{{nowObj.MaxNo}}</span>
      </div>
      <div class="next">
        请
        <span>{{queueNext}}</span>
        号考生准备候场
      </div>
    </div>
        <div class="myvideo">
      <div class="logo"><img :src="logo" alt=""></div>
      <video ref="video" :src="videoSrc">
      </video>
    </div>
    <div class=" iconfont picon" style="right:160px" @click="qieVideo">
      &#xe610;
    </div>
    <div class=" iconfont picon" style="right:60px" @click="quanping">
      &#xe662;
    </div>
    <audio src="http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVoice/1.mp3" id="audio" ref="audio"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      bgurl: require("@/assets/mainBg.jpg"),
      logo: require("@/assets/logo.png"),
      videoURL: [
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/01%2010%E5%91%A8%E5%B9%B4%E5%AE%A3%E4%BC%A0%E7%89%873%E5%88%86%E9%92%9F%E7%89%88%5B%E8%82%B2%E4%BA%BA%E6%95%99%E8%82%B2%E9%9B%86%E5%9B%A2%5D_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/02%E4%BD%A0%E5%9C%A8%E7%9E%8E%E5%BF%99%E4%BB%80%E4%B9%88%5B%E8%82%B2%E4%BA%BA%E6%95%99%E8%82%B2%E9%9B%86%E5%9B%A2%E5%8A%B1%E5%BF%97%E5%AE%A3%E4%BC%A0%E7%89%87%5D_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/20161230%E5%A5%B3%E4%B8%ADBts_batch_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/stand%20by%20me%E6%88%90%E7%89%87_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E4%BA%BA-%E7%9B%B8%E4%BF%A1%E4%BA%BA%E7%9A%84%E5%8A%9B%E9%87%8F201710_x264.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E4%BA%BAidol%E6%9D%8E%E7%91%B620170613_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E4%BA%BAiodl%E5%90%B4%E8%BF%AA-04.05.2017-PFBI_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E4%BA%BAiodl%E5%B2%B3%E8%80%81%E5%B8%8820170602_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E4%BA%BAiodl%E9%83%9D%E7%B4%A0%E9%9C%9E%E5%B7%B2%E8%B0%83%E8%89%B2-04.019.2017-PFBI_batch.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E8%82%B2%E8%A7%81%E6%88%91%E7%9A%84%E6%9C%AA%E6%9D%A5%5B%E5%AE%A3%E4%BC%A0%E9%83%A8%5D20170110.mp4",
        "http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/meiyu/%E9%83%91%E5%A4%96%E5%A5%B3%E4%B8%AD%E6%88%90%E5%93%81%E7%AC%AC%E4%BA%8C%E5%9B%9E_batch.mp4",
      ],
      videoIndex: 0,
      nowObj: {},
      isQuanping: false,
      lid: ""
    };
  },
  computed: {
    videoSrc() {
      return this.videoURL[this.videoIndex];
    },
    queueNext() {
      if (this.nowObj.NowNo) {
        var a = this.nowObj.NowNo + 1;
        if (this.nowObj.MaxNo < a) {
          a = "无";
        }
        return a;
      } else {
        return "请设置";
      }
    }
  },
  methods: {
    toNext() {
      var audio = this.$refs.audio;
      audio.play();
    },
    init() {
      var video = this.$refs.video;
      video.play();
      video.volume = 0.3;
      video.addEventListener("ended", () => {
        this.qieVideo();
      });
    },
    qieVideo() {
      var video = this.$refs.video;
      if (this.videoIndex == this.videoURL.length - 1) {
        this.videoIndex = 0;
      } else {
        this.videoIndex++;
      }
      this.$nextTick(() => {
        video.play();
      });
    },
    quanping() {
      if (!this.isQuanping) {
        this.isQuanping = true;
        var el = document.documentElement,
          rfs =
            el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullScreen,
          wscript;

        if (typeof rfs != "undefined" && rfs) {
          rfs.call(el);
          return;
        }

        if (typeof window.ActiveXObject != "undefined") {
          wscript = new ActiveXObject("WScript.Shell");
          if (wscript) {
            wscript.SendKeys("{F11}");
          }
        }
      } else {
        this.isQuanping = false;
        var el = document,
          cfs =
            el.cancelFullScreen ||
            el.webkitCancelFullScreen ||
            el.mozCancelFullScreen ||
            el.exitFullScreen,
          wscript;

        if (typeof cfs != "undefined" && cfs) {
          cfs.call(el);
          return;
        }

        if (typeof window.ActiveXObject != "undefined") {
          wscript = new ActiveXObject("WScript.Shell");
          if (wscript != null) {
            wscript.SendKeys("{F11}");
          }
        }
      }
    },
    getInterval() {
      setTimeout(this.QueueGet, 3000);
    },
    QueueGet() {
      this.getInterval();
      var data = {
        lid: this.lid
      };
      return this.$API
        .QueueGet(data)
        .then(res => {
          var a = JSON.parse(res);
          var now = this.nowObj.NowNo;
          if (a.NowNo + 1 == now) {
          } else {
            this.nowObj = a;
            this.nowObj.NowNo++;
            this.toNext();
          }
        })
        .catch(res => {});
    }
  },
  components: {},
  watch: {},
  beforeCreated() {},
  mounted() {},
  created() {
    this.lid = window.location.href.split("?lid=")[1] || 200;
    this.$nextTick(() => {
      this.init();
      this.QueueGet();
    });
  }
};
</script>

<style lang="less" scoped>
.picon {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  position: fixed;
  z-index: 999;
  bottom: 50px;
  cursor: pointer;
}
.picon:hover {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  background: #000;
}
#paihaoControl {
  background: #000 no-repeat center center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow-y: hidden;
  .myvideo {
    position: relative;
    top: 20px;
    width: 100vw;
    height: 100%;
    margin:0 auto;
    text-align: center;
    z-index: 999;
    overflow: hidden;
  }
  .logo {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 180px;
    img{
      background: transparent;
      width: 100%;
    }
  }
  video {
    width: 100%;
    // height: 100%;
  }
  .fade {
    background: url(../../assets/icon.png);
    opacity: 0.4;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
  }
  .main {
    position: relative;
    top: 0;
    z-index: 999;
    max-width: 1000px;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    font-size: 26px;
    line-height: 0;
    padding: 20px 0 10px;
    .title {
      // border-bottom: 2px solid rgba(101, 183, 226, 0.4);
      height: 24px;
      line-height: 24px;
    }
    .now {
      font-size: 64px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      padding: 10px 0 20px;
      span {
        font-size: 80px;
        color: yellow;
      }
    }
    .next {
      height: 32px;
      line-height: 32px;
      display: inline-block;
      margin: 0 100px;
      span {
        color: yellow;
      }
    }
    .makeNext {
      width: 800px;
      height: 400px;
      margin: auto;
      margin-top: 30px;
      /*padding-top: 50px;*/
      span {
        width: 150px;
        height: 40px;
        line-height: 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        display: block;
        margin: auto;
        cursor: pointer;
        background: linear-gradient(180deg, #8dcfff, #4cb9f6);
      }
    }
  }
}
.wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20;
}
</style>
