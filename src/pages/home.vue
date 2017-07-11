<template>
  <div>
  
    <header>
      <div class="container">
        <div class="logo">logo</div>
        <div class="nav">
          <li @click="$router.push('/main')">首页</li>
          <li @click="$router.push('/class')">我的班级</li>
          <li @click="$router.push('/score')">成绩报告</li>
          <li @click="$router.push('/work')">作业中心</li>
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
  position: fixed;
  top:0;
  width:100%;
  height: 100px;
  list-style: none;
  line-height: 100px;
  box-shadow: 0 3px 1px #ccc;
  background: #fff;
  z-index: 1000;
  .container{
    max-width: 1200px;
    margin:0 auto;
  }
  .logo {
    display: inline-block;
    font-size: 40px;
    color:@c1;
    font-weight: bold;
  }
  .nav {
    display: inline-block;
    float: right;
  }
  li {
    display: inline-block;
    padding:0 20px;
    cursor: pointer;
    &:hover{
      background: @c1;
      color:#fff;
    }
  }
}

.inview{
  max-width: 1200px;
  margin:0 auto;
  margin-top:105px;
}
</style>
