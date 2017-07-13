<template>
  <div>
  
    <div class="title">
      <li>班级作业</li>
    </div>
  
    <div class="card" v-for="i in 6" :key="i">
      <div class="img"></div>
      <div class="body">
        <div class="header">【6月学习活动】奏起征战号角，打响学习第一枪！</div>
        <div class="content">猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 [详情]</div>
        <div class="footer">
          <span class="time">2017-06-08 20:26</span>
          <span class="btn">
            <span>view:200</span>
            <span>like:200</span>
          </span>
  
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

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.title {
  border-bottom: 1px solid @border;
  line-height: 50px;
  li {
    display: inline-block;
    padding: 5px 15px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: @main;
    }
  }
}

.card {
  margin: 15px 0;
  height: 130px;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  position: relative;
  .img {
    height: 100%;
    width: 225px;
    background-image: url('https://modao.cc/uploads3/images/1080/10800322/raw_1499235662.png');
    background-position: center;
    display: inline-block;
  }
  .body {
    width: calc(~"100% - 250px");
    display: inline-block;
    height: 110px;
    line-height: 2rem;
    vertical-align: top;
    padding: 10px;
    .footer {
      position: absolute;
      bottom: 0;
      left: 240px;
      right: 0;
      .time {
        color: @grey;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}
</style>
