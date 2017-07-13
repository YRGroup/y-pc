<template>
  <div>
  
    <div class="left">

      <router-view></router-view>
  
    </div>
    
    <div class="right">
      <div class="card">
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

.left {
  width: calc(~"100% - 300px");
  float: left;
  padding: 10px;
}

.right {
  float: right;
  width: 260px;
  padding: 20px 10px;
  .card {
    border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    .header {
      height: 75px;
      position: relative;
      background: @main;
      img {
        width: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
      }
    }
    .content {
      margin-top: 80px;
      line-height: 2em;
      padding-bottom: 20px;
    }
  }
}
</style>
