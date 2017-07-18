<template>
  <div>
  
    <header>
      <div class="container">
        <div class="logo">logo</div>
        <div class="nav">
          <li @click="$router.push('/')">首页</li>
          <li @click="$router.push('/class')">班级主页</li>
          <li @click="$router.push('/score')">成绩报告</li>
          <li @click="$router.push('/homework')">作业中心</li>
          <li @click="$router.push('/schoolcard')">一卡通</li>
          <li @click="$router.push('/user')">个人中心</li>
        </div>
      </div>
  
    </header>
  
    <router-view class="inview"></router-view>
  
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      msg: '123456789'
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
@import '../style/theme.less';

header {
  // position: fixed;
  // top: 0;
  width: 100%;
  height: 78px;
  list-style: none;
  line-height: 78px;
  // box-shadow: 0 3px 1px @grey;
  background: #fff;
  z-index: 1000;
  .container {
    max-width: 1090px;
    margin: 0 auto;
  }
  .logo {
    display: inline-block;
    font-size: 40px;
    color: @main;
    font-weight: bold;
  }
  .nav {
    float: right;
    font-size: 16px;
  }
  li {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      background: @main;
      color: #fff;
    }
  }
}

.inview {
  max-width: 1090px;
  margin: 0 auto;
  margin-top: 20px;
}

</style>
