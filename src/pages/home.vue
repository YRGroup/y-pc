<template>
  <div :class="isFullpage?'fullpage':null">

    <header>
      <div class="container">
        <div class="logo" @click="$router.push('/')">
          <img class="logopic" :src="logo">
        </div>
        <div class="nav">
          <li @click="$router.push('/')" :class="link=='main'?'active':null">
            <i class="iconfont">&#xe636;</i>首页</li>
          <li @click="$router.push('/class')" :class="(link=='klass' || link=='homework' || link=='post' || link=='admin'|| link=='sendmsg')?'active':null">
            <i class="iconfont">&#xe633;</i>班级</li>
          <!-- <li @click="$router.push('/homework')" :class="link=='/homework'?'active':null"><i class="iconfont">&#xe608;</i>作业中心</li> -->
          <li @click="$router.push('/examList')" v-show="$store.getters.isTeacher" :class="(link=='examList' || link=='exam')?'active':null">
            <i class="iconfont">&#xe60e;</i>考试</li>
          <li @click="$router.push('/schoolcard')" v-show="$store.getters.isTeacher" :class="link=='schoolcard'?'active':null">
            <i class="iconfont">&#xe67f;</i>一卡通</li>
          <li @click="$router.push('/schoolcard')" v-show="!$store.getters.isTeacher" :class="link=='schoolcard'?'active':null">
            <i class="iconfont">&#xe67f;</i>一卡通</li>
          <li @click="$router.push('/contact')" :class="(link=='contact'||link=='msg')?'active':null">
            <i class="iconfont">&#xe6a5;</i>通讯录</li>
          <li @click="$router.push('/video')" :class="link=='video'?'active':null">
            <i class="iconfont">&#xe63c;</i>视频课程</li>
          <li @click="$router.push('/teacher')" v-show="$store.getters.isTeacher" :class="link=='teacher'?'active':null">
            <i class="iconfont">&#xe64b;</i>个人主页</li>
          <li @click="$router.push('/student/'+$store.state.currentStudentId+'/score/0')" v-show="!$store.getters.isTeacher" :class="link=='score'?'active':null">
            <i class="iconfont">&#xe60e;</i>成绩报告</li>
          <li @click="$router.push('/parent')" v-show="$store.getters.isParent" :class="link=='parent'?'active':null">
            <i class="iconfont">&#xe64b;</i>个人主页</li>
          <li @click="$router.push('/student')" v-show="$store.getters.isStudent" :class="link=='student'?'active':null">
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
        
        <div class="followIcon">
          
          关注我们：
          <div class="wechat">
            <div class="qrcode"><img :src="wxQRcodeIMG"></div>
            <span>
              <i class="iconfont">&#xe659;</i>
            </span>
          </div>
        </div>
      </div>
    </div>
     <!-- 返回顶部 -->
     <div class="gototop" @click="goBacktopMain" v-show="goTopShow"><i class="iconfont">&#xe622;</i></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      logo: require('@/assets/logo.png'),
      wxQRcodeIMG: '',
      scroll: '',
      goTopShow:'',
    }
  },
  computed: {
    role() {
      return this.$store.getters.role
    },
    link() {
      return this.$route.name
    },
    isFullpage() {
      // return this.$route.name === 'video'
    }
  },
  methods: {
    getWXQRcode() {
      this.wxQRcodeIMG = this.$API.getWXQRcode()
    },
    menu() {
        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.scroll < 200) {
            this.goTopShow = false;
        }
        else {
            this.goTopShow = true;
        }
    },
    goBacktopMain() {
      
        let gotoTop= function(){
            let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= 30;
            if (currentPosition > 0) {
                window.scrollTo(0, currentPosition);
            }
            else {
                window.scrollTo(0, 0);
                clearInterval(timer);
                timer = null;
            }
        };
        let timer = setInterval(gotoTop,1);
    }
    
  },
  created() {
    this.getWXQRcode(),
    window.addEventListener('scroll', this.menu)
  },
  mounted() {

  },
  watch: {
    '$route': function() {

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
  background: #fff;
  position: relative;
  z-index: 1000;
  box-shadow: 0 3px 3px 0 rgba(7,17,27,.1);
  .container {
    max-width: 1090px;
    margin: 0 auto;
    overflow: hidden;
  }
  .logo {
    display: inline-block;
    cursor: pointer;
    img {
      height: 42px;
      background: transparent;
    }
  }
  .nav {
    float: right;
    font-size: 16px;
    .iconfont {
      margin-right: 5px;
    }
  }
  .active {
    color: @main;
    opacity: 1;
    // border-bottom: 4px solid rgba(255, 255, 255, .8);
    border-bottom:3px solid @main;
    line-height: 72px;
  }
  li {
    display: inline-block;
    padding: 0 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: @main;
    }
  }
}

.mainbox {
  width: 100%;
   background: url(../assets/mainBg2.jpg) center center;
   background-attachment:fixed;
   background-size:cover;
  // background: #f3f0e0;
  padding: 20px 0;
  height: calc(~"100vh - 208px");
  overflow: auto;
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
    text-align: left;
    padding: 20px 0;
    color: #aaa;
    font-size: 12px;
    position: relative;
    .followIcon {
      position: absolute;
      right: 20px;
      top: 32px;
      .wechat {
        display: inline-block;
        position: relative;
        .qrcode {
          width: 160px;
          height: 160px;
          position: absolute;
          bottom: 60px;
          right: -50px;
          transform-origin:50% 100%;
          transform: scale(0);
          opacity: 0;
          box-shadow: 0 2px 3px rgba(0,0,0,.5);
          color: #fff;
          img{
            width: 160px;
            height: 160px;
          }
          &:after{
            content: "";
            border: solid transparent;
            width: 0;
            height: 0;
            border-width:13px;
            border-top-color:#fff;
            position: absolute;
            bottom: -25px;
            left: 50%;
            margin-left: -13px;
          }
        }
        &:hover .qrcode {
          opacity: 1;
          transform: scale(1);
        }
      }
      .iconfont {
        font-size: 40px;
        line-height: 40px;
        vertical-align: -10px;
        margin: 0 8px;
        cursor: pointer;
      }
    }
  }
}

.fullpage {
  .mainbox {
    padding: 0;
  }
  .inview {
    max-width: 100%;
  }
}

//回到顶部
.gototop {
    position: fixed;
    bottom: 2rem;
    right:20px;
    margin-left: 520px;
    font-size: 48px;
    color: rgba(170,170,170,.3);
    cursor: pointer;
    &:hover{
      color: @main;
    }
}
@media (max-width: 1330px){
  .gototop {
    left: inherit;
    right: 2%;
    margin-left: 0;
}
}


</style>
