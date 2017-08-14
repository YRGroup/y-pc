<template>
  <div>
  
    <header>
      <div class="container">
        <div class="logo">
          <img class="logopic" :src="logo">
        </div>
        <div class="nav">
          <li @click="$router.push('/')" :class="link=='main'?'active':null">
            <i class="iconfont">&#xe636;</i>首页</li>
          <li @click="$router.push('/class')" :class="link=='klass'?'active':null">
            <i class="iconfont">&#xe633;</i>班级</li>
          <!-- <li @click="$router.push('/homework')" :class="link=='/homework'?'active':null"><i class="iconfont">&#xe608;</i>作业中心</li> -->
          <li @click="$router.push('/examList')" v-show="role=='老师'" :class="link=='examList'?'active':null">
            <i class="iconfont">&#xe67f;</i>考试</li>
          <li @click="$router.push('/schoolcard')" v-show="role=='老师'" :class="link=='schoolcard'?'active':null">
            <i class="iconfont">&#xe67f;</i>一卡通</li>
          <li @click="$router.push('/schoolcard')" v-show="role=='家长'" :class="link=='schoolcard'?'active':null">
            <i class="iconfont">&#xe67f;</i>一卡通</li>
          <li @click="$router.push('/contact')" :class="link=='contact'?'active':null">
            <i class="iconfont">&#xe6a5;</i>通讯录</li>
          <li @click="$router.push('/teacher')" v-show="role=='老师'" :class="link=='teacher'?'active':null">
            <i class="iconfont">&#xe64b;</i>个人主页</li>
          <li @click="$router.push('/student/'+$store.state.currentStudentId+'/score/1')" v-show="$store.state.role=='家长'" :class="link=='score'?'active':null">
            <i class="iconfont">&#xe60e;</i>成绩报告</li>
          <li @click="$router.push('/parent')" v-show="role=='家长'" :class="link=='parent'?'active':null">
            <i class="iconfont">&#xe64b;</i>个人主页</li>
        </div>
      </div>
  
    </header>
    <div class="mainbox">
      <router-view class="inview"></router-view>
    </div>
  
    <div class="footer">
      <div class="mainCon">
        <p>Copyright © 2017 yearnedu.com Inc. All Rights Reserved. 郑州育人教育集团</p>
        <p>备案/许可证编号：豫ICP备16026588号</p>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  computed: {
    role() {
      return this.$store.getters.role
    },
    link() {
      return this.$route.name
    }
  },
  methods: {

  },
  created() {
    console.log(this.$route.name)
  },
  mounted() {

  },
  watch: {
    '$route': function () {
      console.log(this.$route.name)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/theme.less';

header {
  height: 78px;
  list-style: none;
  line-height: 78px;
  border: 1px solid #ddd;
  background: @main;
  z-index: 1000;
  .container {
    max-width: 1090px;
    margin: 0 auto;
    overflow: hidden;
  }
  .logo {
    display: inline-block;
    img {
      height: 42px;
      background: transparent;
    }
  }
  .nav {
    float: right;
    font-size: 16px;
    color: #fff;
    .iconfont {
      margin-right: 5px;
    }
  }
  .active {
    color: #fff;
    opacity: 1;
    border-bottom: 4px solid rgba(255, 255, 255, .8);
    line-height: 70px;
  }
  li {
    display: inline-block;
    padding: 0 14px;
    cursor: pointer;
    opacity: .8;
    &:hover {
      opacity: 1;
    }
  }
}

.mainbox {
  width: 100%;
  background: #f3f0e0;
  padding: 20px 0;
  min-height: calc(~"100vh - 208px")
}

.inview {
  max-width: 1090px;
  margin: 0 auto;
  overflow: hidden;
}

.footer {
  background: #333;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  .mainCon {
    width: 1090px;
    margin: 0 auto;
    text-align: center;
    padding: 20px 0;
    color: #aaa;
    font-size: 12px;
  }
}
</style>
