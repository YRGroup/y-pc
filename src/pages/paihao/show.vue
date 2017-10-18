<template>
  <div id="paihaoControl">
    <video  ref="video" :src="videoSrc">
    </video>
    <div class="fade"></div>
    <div class="wrap"></div>
    <div id="logo" style="position: relative;z-index: 999">
      <img :src="logo" alt="">
    </div>
    <div class="main" style="position: relative;z-index: 999">
      <div class="title">
        {{nowObj.Name}}
      </div>
      <div class="now">
        正在考试
        <span>{{nowObj.NowNo}}</span>
      </div>
      <div class="next">
        总人数
        <span>{{nowObj.MaxNo}}</span>
      </div>
      <div class="next">
        下一位
        <span>{{queueNext}}</span>
      </div>

      <!--<div class="makeNext">-->
        <!--<span @click="toNext">下一号</span>-->
      <!--</div>-->
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
    data(){
      return {
        bgurl:require('@/assets/mainBg.jpg'),
        logo:require('@/assets/logo1.png'),
        videoURL:[
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/20161230%E5%A5%B3%E4%B8%ADBts_batch.mp4',
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/%E9%80%9A%E5%BE%80%E5%A4%A9%E5%9B%BD%E3%81%AE%E5%A5%94%E8%B7%91%E6%9C%80%E7%BB%88%E5%9B%9E_batch.mp4',
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/%E4%B9%9D%E5%AF%BC_batch.mp4'
        ],
        videoIndex:0,
        nowObj:{},
        isQuanping:false,
        lid:''
      }
    },
    computed: {
      videoSrc(){
        return this.videoURL[this.videoIndex]
      },
      queueNext(){
        if(this.nowObj.NowNo!=undefined){
          var a=this.nowObj.NowNo+1;
          if(this.nowObj.MaxNo<a){
            a='无'
          }
          return a
        }else{
          return '暂未设置排队人数'
        }

      }
    },
    methods: {
      toNext(){
        var audio=this.$refs.audio;
        audio.play();
      },
      init(){
        var video=this.$refs.video;
        video.play();
        video.addEventListener('ended',()=> {
          this.qieVideo()
        })
      },
      qieVideo(){
        var video=this.$refs.video;
        if(this.videoIndex==this.videoURL.length-1){
          this.videoIndex=0;
        }else{
          this.videoIndex++;

        }
        this.$nextTick(()=>{
          video.play();
        })
      },
      quanping(){
          if(!this.isQuanping){
            this.isQuanping=true;
            var el = document.documentElement,
              rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
              wscript;

            if(typeof rfs != "undefined" && rfs) {
              rfs.call(el);
              return;
            }

            if(typeof window.ActiveXObject != "undefined") {
              wscript = new ActiveXObject("WScript.Shell");
              if(wscript) {
                wscript.SendKeys("{F11}");
              }
            }
          }else{
            this.isQuanping=false;
            var el = document,
              cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
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
      getInterval(){
        setTimeout(this.QueueGet,3000)
      },
      QueueGet(){
        this.getInterval();
        var data={
          lid:this.lid
        }
        return this.$API.QueueGet(data).then(res => {
          var a=JSON.parse(res);
          var now=this.nowObj.NowNo;
          if((a.NowNo+1)==now){

          }else{
            this.nowObj=a
            this.nowObj.NowNo++;
            this.toNext();
          }

        }).catch((res)=>{

        })
      },
    },
    components: {},
    watch: {},
    beforeCreated(){

    },
    mounted(){

    },
    created(){
      this.lid=window.location.href.split('?lid=')[1];
      this.$nextTick(()=>{
        this.init();
        this.getInterval();
      })
    },
  }
</script>

<style lang="less">
  .picon{
    width: 50px;
    height: 50px;
    background: rgba(0,0,0,.2);
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
  .picon:hover{
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    background: #000;
  }
  #paihaoControl{
    background: url(../../assets/mainBg.jpg) no-repeat center center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    video{
      position: fixed;
      z-index: 1;

    }
    .fade{
      background: url(../../assets/icon.png);
      opacity: .4;
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 10;
    }
    #logo{
      margin: auto;
      height: 120px;
      width: 200px;
      padding-top: 20px;
      img{
        background: transparent;
      }
    }
    .main{
      width: 1000px;
      height: 600px;
      margin:auto;
      margin-top: 20px;
      color:#fff;
      text-align: center;

      background: rgba(29,111,163,.5);
      .title{
        width: 860px;
        height: 100px;
        margin: auto;
        line-height: 100px;
        border-bottom: 2px solid rgba(101,183,226,.4);
        font-size: 32px;
      }
      .now{
        font-size: 80px;
        text-align: center;
        line-height: 300px;
        span{
          font-size: 100px;
          color: yellow;
        }
      }
      .next{
        font-size: 40px;
        line-height: 30px;
        display: inline-block;
        margin: 0 100px;
        span{
          color: yellow;
        }
      }
      .makeNext{
        width: 800px;
        height: 400px;
        background: #000;
        margin: auto;
        margin-top: 30px;
        /*padding-top: 50px;*/
        span{
          width: 150px;
          height: 40px;
          line-height: 40px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          display: block;
          margin: auto;
          cursor: pointer;
          background: linear-gradient(180deg,#8DCFFF,#4CB9F6);
        }

      }
    }
  }
.wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  background: rgba(0,0,0,.4);
  z-index: 20;
}
</style>
