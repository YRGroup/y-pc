<template>
    <div id="paihaoControl">
       <div id="logo">
         <img :src="logo" alt="">
       </div>
        <div class="main">
            <div class="title">
              2017年第一次期中考试
              <span @click="shezhiNum">设置人数</span>
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

          <div class="makeNext">
            <span @click="QueueAdd" v-if="nowObj.NowNo<nowObj.MaxNo">下一号</span>
            <span @click="QueueSetZero" v-else>重置</span>
            <!--<video :src="videoSrc" ref="video" controls width="100%" height="100%"></video>-->
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
                logo:require('@/assets/logo1.png'),
                lid:'',
                nowObj:{}
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

          shezhiNum(){
            this.$prompt('请输入排队的人数', '设置', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^[0-9]*$/,
              inputErrorMessage: '请填写个数字',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '提交中...';
                  var data={
                    lid:this.lid,
                    name:'队列'+this.lid,
                    MaxNo:instance.inputValue
                  }
                  return this.$API.UpdateQueueConfig(data).then(res => {
                    done();
                    instance.confirmButtonLoading = false;
                    this.QueueGet();
                  }).catch(()=>{
                    this.$message({
                      type: 'error',
                      message: '网络异常'
                    });
                    instance.confirmButtonText = '再次提交';
                    instance.confirmButtonLoading = false;
                  })
                } else {
                  done();
                }
              }
            }).then(({ value }) => {

            }).catch(() => {

            });
          },
          QueueGet(){
            var data={
              lid:this.lid
            }
            return this.$API.QueueGet(data).then(res => {
                var a=JSON.parse(res);
                this.nowObj=a
                this.nowObj.NowNo++;
            }).catch((res)=>{

//                this.shezhiNum();
            })
          },
          QueueAdd(){
            var data={
              lid:this.lid
            }
            return this.$API.QueueAdd(data).then(res => {
                this.nowObj.NowNo++;
            }).catch(()=>{
              this.$message({
                type: 'error',
                message: '网络异常'
              });
            })
          },
          QueueSetZero(){
            if(this.nowObj.NowNo==this.nowObj.MaxNo){
                this.doQueueSetZero();
            }else{
              this.$confirm('还没轮到最后一位，是否确定要重置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.doQueueSetZero();
              }).catch(() => {

              });
            }
          },
          doQueueSetZero(){
            if(this.queueNext=='暂未设置排队人数') {
                return
            }
            var data={
              lid:this.lid,
              nowNo:0,
            }
            return this.$API.QueueSetNowNo(data).then(res => {
              this.nowObj.NowNo=1;
            }).catch(()=>{
              this.$message({
                type: 'error',
                message: '网络异常'
              });
            })
          }
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
              this.QueueGet();
            })
        },
    }
</script>

<style lang="less">
  #paihaoControl{
    background: url(../../assets/mainBg.jpg) no-repeat center center;
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
        width: 460px;
        height: 100px;
        margin: auto;
        line-height: 100px;
        border-bottom: 2px solid #65B7E2;
        font-size: 25px;
        span{
          float: right;
          color: yellow;
          font-size: 13px;
          cursor: pointer;
        }
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
        display: inline-block;
        padding-right: 20px;
        span{
          font-size: 25px;
          color: yellow;
        }
      }
      .makeNext{
        width: 320px;
        height: 180px;
        margin: auto;
        margin-top: 30px;
        /*padding-top: 50px;*/
        span{
          width: 280px;
          height: 60px;
          line-height: 60px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          display: block;
          margin: auto;
          cursor: pointer;
          position: relative;
          top: 100px;
          font-size: 20px;
          background: linear-gradient(180deg,#8DCFFF,#4CB9F6);
        }

      }
    }
  }

</style>
