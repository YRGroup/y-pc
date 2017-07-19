<template>
  <div>
  
    <header>
      <div class="container">
        <div class="logo">logo</div>
        <div class="nav">
          <li @click="$router.push('/')" :class="link=='/'?'active':null">首页</li>
          <li @click="$router.push('/class')" :class="link=='/class'?'active':null">班级主页</li>
          <li @click="$router.push('/homework')" :class="link=='/homework'?'active':null">作业中心</li>
          <li @click="$router.push('/teacher/schoolcard')" v-show="$store.state.role=='老师'" :class="link=='/teacher/schoolcard'?'active':null">一卡通</li>
          <li @click="$router.push('/student/schoolcard')" v-show="$store.state.role=='家长'" :class="link=='/student/schoolcard'?'active':null">一卡通</li>
          <li @click="$router.push('/teacher')" v-show="$store.state.role=='老师'" :class="link=='/teacher'?'active':null">教师主页</li>
          <li @click="$router.push('/student/score')" v-show="$store.state.role=='家长'" :class="link=='/student/score'?'active':null">成绩报告</li>
          <li @click="$router.push('/parent')" v-show="$store.state.role=='家长'" :class="link=='/parent'?'active':null">家长主页</li>
        </div>
      </div>
  
    </header>
  
    <router-view class="inview"></router-view>
  
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
    }
  },
  computed:{
    link(){
      return this.$route.path
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
  .active{
    color:@main;
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
