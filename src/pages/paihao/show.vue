<template>
  <div :style="{backgroundImage: 'url(' + bgurl + ')'}" id="paihaoControl">
    <div id="logo">
      <img :src="logo" alt="">
    </div>
    <div class="main">
      <div class="title">
        2017年第一次期中考试
      </div>
      <div class="now">
        正在考试
        <span>{{nowObj.NowNo}}</span>
      </div>
      <div class="next">
        下一位
        <span>{{queueNext}}</span>
      </div>
      <div class="makeNext">
        <!--<span @click="toNext">下一号</span>-->
        <video :src="videoSrc" ref="video" controls width="100%" height="100%"></video>
      </div>
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
        logo:require('@/assets/publicImg.png'),
        videoURL:[
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/20161230%E5%A5%B3%E4%B8%ADBts_batch.mp4',
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/%E9%80%9A%E5%BE%80%E5%A4%A9%E5%9B%BD%E3%81%AE%E5%A5%94%E8%B7%91%E6%9C%80%E7%BB%88%E5%9B%9E_batch.mp4',
          'http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVideo/%E4%B9%9D%E5%AF%BC_batch.mp4'
        ],
        videoIndex:0,
        nowObj:{},
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
          if(this.videoIndex==this.videoURL.length-1){
            this.videoIndex=0;
          }else{
            this.videoIndex++;

          }
          this.$nextTick(()=>{
            video.play();
          })
        })

      },
      getInterval(){
        setTimeout(this.QueueGet,500)
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
  #paihaoControl{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    #logo{
      margin: auto;
      height: 120px;
      width: 200px;
      padding-top: 20px;
    }
    .main{
      width: 700px;
      height: 500px;
      margin:auto;
      margin-top: 20px;
      color:#fff;
      text-align: center;

      background: rgba(29,111,163,.5);
      .title{
        width: 460px;
        height: 100px;
        margin: auto;
        line-height: 100px;
        border-bottom: 2px solid #65B7E2;
        font-size: 25px;
      }
      .now{
        font-size: 60px;
        text-align: center;
        line-height: 120px;
        span{
          font-size: 55px;
          color: yellow;
        }
      }
      .next{
        font-size: 30px;
        line-height: 30px;
        span{
          font-size: 25px;
          color: yellow;
        }
      }
      .makeNext{
        width: 320px;
        height: 180px;
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

</style>
