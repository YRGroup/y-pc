<template>
  <div>
  
    <div class="nav">
      <span>首页 > </span>
      <span>校园动态</span>
    </div>
  
    <div class="card">
      <div class="body">
        <div class="title">【6月学习活动】奏起征战号角，打响学习第一枪！</div>
        <div class="time">2017-06-08</div>
        <div class="content">v猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 [详情]</div>
        <div class="footer">
          <div class="btn">share</div>
          <div class="btn">like:200</div>
        </div>
      </div>
  
      <div class="reply">
        <el-input class="input" size="large" v-model="input" placeholder="请输入内容"></el-input>
        <el-button class="btn" type="primary">回复</el-button>
      </div>
      <div class="replyList">
        <div class="title">全部回复（20）</div>
        <ul class="list">
          <li class="item" v-for="i in 6" :key="i">
            <div class="img">
              <img src="https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png">
            </div>
            <div class="top">
              <span class="name">刘丽</span>
              <span class="time">2017-5-21</span>
            </div>
            <div class="content">
              没有答案，只有课件点击一键直达
            </div>
          </li>
        </ul>
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

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.nav {
  font-size: 12px;
}

.card {
  margin: 15px 0;
  padding: 10px 20px;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  .body {
    text-align: center;
    .title {
      line-height: 80px;
      font-size: 25px;
    }
    .time {
      color: @grey;
      line-height: 30px;
    }
    .content {
      line-height: 2em;
      text-indent: 2em;
    }
    .footer {
      .btn {
        height: 60px;
        width: 60px;
        line-height: 60px;
        border-radius: 50%;
        color: #fff;
        background: @main;
        display: inline-block;
        margin: 20px;
      }
    }
  }
  .reply {
    padding: 20px;
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
      padding: 10px 20px;
      border-bottom: 1px solid @border;
    }
    .item {
      margin-left: 80px;
      padding-top: 10px;
      position: relative;
      min-height: 70px;
      border-bottom: 1px dotted @border;
    }
    .img {
      position: absolute;
      left: -70px;
      top: 10px;
      img {
        border-radius: 50%;
        width: 50px;
      }
    }
    .top {
      line-height: 30px;
      .time {
        color: @grey;
      }
    }
  }
}
</style>
