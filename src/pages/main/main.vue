<template>
  <div>
    <img class="poster" :src="poster">
  
    <div class="left panel">
      <ul class="title">
        <li class="active">校园动态</li>
        <li>资料库</li>
      </ul>
  
      <div class="card" v-for="i in 6" :key="i">
        <div class="img"></div>
        <div class="cardCon">
          <div class="cardtitle"><a href="#">【6月学习活动】奏起征战号角，打响学习第一枪！</a></div>
          <div class="content">猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 <a href="#">[ 详情 ]</a></div>
          <div class="cardfooter">
            <span class="time">2017-06-08 20:26</span>
            <span class="iconbtn">
              <span title="阅读数"><i class="iconfont">&#xe6c3;</i>200</span>
              <span title="点赞数"><i class="iconfont">&#xe646;</i>200</span>
            </span>
  
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="card"  v-if="$store.state.role==='家长'">
        <div class="header">
          <img src="https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png">
        </div>
        <div class="content">
          <p>赵明敏 的家长</p>
          <p>孩子信息</p>
          <p>经开区育人国际学校</p>
          <p>学号：454874667</p>
        </div>
      </div>
  
      <div class="card" v-if="$store.state.role==='老师'">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p>{{ $store.state.currentUser.TrueName }} 【{{ $store.state.currentUser.ExtendInfo.Course }}】</p>
          <p>经开区育人国际学校</p>
        </div>
      </div>

      <div class="card" v-if="$store.state.role==='guest'">
        <div class="header">
          <div class="title">登录</div>
        </div>
        <div class="content">
          <p>000</p>
          <p>经开区育人国际学校</p>
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
      poster: require('@/assets/img/post.jpg')
    }
  },
  methods: {

  },
  created() {
    // this.$router.push('/class')
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.poster {
  width: 100%;
  margin-bottom: 10px;
}

.left {
  width: calc(~"100% - 320px");
  float: left;
  .title {
    border-bottom: 1px solid @border;
    line-height: 36px;
    margin-bottom: -1px;
    .active{
      color:@main;
      border-bottom: 3px solid @main;
    }
    li {
      display: inline-block;
      padding: 5px 15px;
      cursor: pointer;
      font-weight: bold;
      font-size:15px;
      color:#666;
      &:hover {
        color: @main;
      }
    }
  }
  .card {
    height: 130px;
    font-size: 13px;
    padding:15px 10px;
    position: relative;
    border-bottom: 1px solid @border;
    &:hover{
      background: #fcfcfc;
    }
    
    .img {
      height: 100%;
      width: 225px;
      background-image: url('https://modao.cc/uploads3/images/1080/10800322/raw_1499235662.png');
      background-position: center;
      display: inline-block;
    }
    .cardCon {
      width: calc(~"100% - 240px");
      display: inline-block;
      line-height: 2rem;
      vertical-align: top;
      margin-left: 10px;
      .cardtitle{
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        overflow: hidden;
        margin-top: 5px;
        a{
          color: #333;
          &:hover{
            color:@main;
          }
        }
      }
      .content{
        margin-top:8px;
        line-height: 24px;
        color: #666;
        height: 48px;
        overflow: hidden;
        a{
          color: @main;
          margin-left:5px;
        }
      }
      .cardfooter {
          color: @grey;
          font-size: 12px;
      }
    }
  }
}

.right {
  float: right;
  width: 260px;
  .card {
    border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    .header {
      height: 75px;
      position: relative;
      background: @main;
      .title{
        color:#fff;
        line-height: 75px;
      }
      img {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
      }
    }
    .content {
      margin-top: 60px;
      line-height: 2em;
      padding-bottom: 20px;
    }
  }
}
</style>
