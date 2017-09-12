<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="videoCol">
        <div class="video">
          <div class="prism-player" id="J_prismPlayer">
          </div>
          <!-- <div class="danmu">
            <li v-for="(i,index) in 20" :style="{top:index+1+'em'}">弹幕000</li>
          </div> -->
        </div>
        <!-- <div class="card" v-show="videoCol===12">
          <div class="title">播放器控制</div>
          <div class="content">
            <el-button type="primary" @click="changeSize('small')">小</el-button>
            <el-button type="primary" @click="changeSize('middle')">中</el-button>
            <el-button type="primary" @click="changeSize('large')">大</el-button>
          </div>
        </div> -->
      </el-col>
      <!-- <el-col :span="24-videoCol" v-show="videoCol!==24">
        <div class="card" v-show="videoCol===18">
          <div class="title">播放器控制</div>
          <div class="content">
            <el-button type="primary" @click="changeSize('small')">小</el-button>
            <el-button type="primary" @click="changeSize('middle')">中</el-button>
            <el-button type="primary" @click="changeSize('large')">大</el-button>
          </div>
        </div>
        <div class="card">
          <div class="title">课程列表</div>
          <div class="content">
            <div class="item" v-for="i in 4">
              <div class="header">课程1</div>
              <div class="time">2017-9-11</div>
            </div>
          </div>
        </div>
      </el-col> -->
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <!-- <div class="card" v-show="videoCol===24">
          <div class="title">播放器控制</div>
          <div class="content">
            <el-button type="primary" @click="changeSize('small')">小</el-button>
            <el-button type="primary" @click="changeSize('middle')">中</el-button>
            <el-button type="primary" @click="changeSize('large')">大</el-button>
          </div>
        </div> -->
        <div class="card">
          <div class="title">课程介绍</div>
          <div class="content">
            {{text}}
          </div>
          <!-- <div class="content">
            <div class="add">
              <el-input class="input" v-model="width"></el-input>
              <el-button class="button" type="primary" @click="addComment">添加评论</el-button>
            </div>
            <div class="item" v-for="i in 6">
              <div class="header">李老师：</div>
              <div class="item_content">很好</div>
              <div class="time">2017-9-11</div>
            </div>
          </div> -->
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="title">主讲老师</div>
          <div class="techerInfo">
            <span class="headerImg"></span>
            <span class="name">王老师</span>
            <span class="banji">三年二班</span>
            <span class="course">语文</span>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data() {
    return {
      player: null,
      videoCol: 24,
      width: '100%',
      text:'简介：亲，这里有资深讲师为初学者量身打造的Java Web入门级课程JSP，讲师将通过大量的案例向您展示JavaWeb开发环境搭建、工具使用和JSP的基本语法，深入理解Java Web开发思想，最终使您能独立开发简单的Java Web应用。'
    }
  },
  methods: {
    getVideoList() {
      let para = {
        key:'',
        cateid:'',
        courseid:'',
        grade:''
      }
      this.$API.getVideoList(para).then(res=>{
        
      })
    },
    getVideoInfo() {
      let para = {
        videoId:"7f6a4afc988a48b78eb1481ca78174bc"
      }
      this.$API.getVideoAuth(para).then(res=>{
        
      })
    },
    addComment() {
      // 000
    },
    changeSize(val) {
      if (val === 'large') {
        this.player.setPlayerSize("100%", "640px")
        this.videoCol = 24
      } else if (val === 'middle') {
        this.player.setPlayerSize("100%", "460px")
        this.videoCol = 18
      } else if (val === 'small') {
        this.player.setPlayerSize("100%", "300px")
        this.videoCol = 12
      }
    },
    initPlayer() {
      this.player = null
      this.player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '600px',
        autoplay: false,
        source: "//common.qupai.me/player/qupai.mp4",
        vid: '7f6a4afc988a48b78eb1481ca78174bc',
        playauth: 'eyJTZWN1cml0eVRva2VuIjoiQ0FJU3VBSjFxNkZ0NUIyeWZTaklxdktIR3YzZ2hhVm03cnU0VEV6cnZtUmdldUVlM2FMUHBqejJJSHBLZVhkdUFlQVhzL28wbW1oWjcvWVlsck1xRzhVZkdCMlpNWmNxczgwTm9WcitKcExGc3QySjZyOEpqc1Y2anZ4WWhGMnBzdlhKYXNEVkVmbkFHSjcwR1VpbSt3WjN4YnpsRHh2QU8zV3VMWnlPajdOK2M5MFRSWFBXUkRGYUJkQlFWRTBBenNvR0xpbnBNZis4UHdURG4zYlFiaTV0cGhFdXNXZDIrSVc1ek1yK2pCL0Nsdy9XeCtRUHRwenRBWlcxRmI0T1dxMXlTTkNveHVkN1c3UGMyU3BMa1hodytieHhrYlpQOUVXczNMamZJU0VJczByZGJiV0VyNFV4ZFZVbFB2VmxJY01lOHFpZ3o4OGZrL2ZJaW9INnh5eEtPZXhvU0NuRlRPaWl1cENlUnI3M2FJNXBKT3VsWUNxVmc0bmZiSU9KbWdjbGNHOGRDZ1JHUU5Nb01VUnNFaVlyVGp6SzJ3RlFQcVFob0d3YWdBR1QraU54eC9GZi9JUElBRHd6RnZJc29QeHFFckZoZkVNazdRanRVM0VuckdCSmU0TitybnJVV0F3NVNGRnJSN1NKcG5xM25WWGhTTlBQT0xiN20ybmN2dXFmbDg0MWtNeGIyQzdodlNnSkMrSXZ5QTJYWXN0cHFiUXFWQ3RORjFvN0VyMk80bXkrQWRtRk0vN3ZiZjF4VCt2RVF5aEp0Y0YzRHAvRnh5SWJtdz09IiwiQXV0aEluZm8iOiJ7XCJFeHBpcmVUaW1lXCI6XCIyMDE3LTA5LTEyVDA0OjEyOjMwWlwiLFwiTWVkaWFJZFwiOlwiN2Y2YTRhZmM5ODhhNDhiNzhlYjE0ODFjYTc4MTc0YmNcIixcIlNpZ25hdHVyZVwiOlwiTHNQR0IwS2lPRmJaVlJBU1pLRkZybUErLzNzPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiN2Y2YTRhZmM5ODhhNDhiNzhlYjE0ODFjYTc4MTc0YmMiLCJUaXRsZSI6IuWwj+iOieW4ruW/mV94MjY0Lm1wNCIsIkNvdmVyVVJMIjoiaHR0cDovL3ZpZGVvLnllYXJuZWR1LmNvbS9zbmFwc2hvdC83ZjZhNGFmYzk4OGE0OGI3OGViMTQ4MWNhNzgxNzRiYzAwMDAxLmpwZyIsIkR1cmF0aW9uIjozNjEuMjh9LCJBY2Nlc3NLZXlJZCI6IlNUUy5LMTJRR1RoekdZeVNOalpaZDV2bjIyZ2REIiwiUGxheURvbWFpbiI6InZpZGVvLnllYXJuZWR1LmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IjRvWkw5SjNWYmJDYllCSGYyTjg1eUpiN044UU5IWWJNaGMzaWVSRVlRRkFhIiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxODIyNTk1NDQyNTEyODE3fQ==',
        cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
      })
      this.player.play()
    }
  },
  created() {

  },
  mounted() {
    this.initPlayer()
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

@keyframes fly {
  from {
    right: 0;
  }
  to {
    right: 100%;
  }
}

.video {
  position: relative;
  margin-bottom: 1em;
  #J_prismPlayer {
  }
  .danmu {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    padding: 2em;
    li {
      color: red;
      position: absolute;
      font-size: 22px;
      width: 100px;
      right: 100%;
      animation: fly 2s ease;
    }
  }
}

.card {
  background: #fff;
  margin-bottom: 1em;
  .title {
    border-bottom: 1px solid @border;
    font-size: 16px;
    padding: 0 20px;
    line-height: 52px;
    color: @main;
    font-weight: 600;
  }
  .content {
    padding: 2em;
    button {
      margin: .5em;
    }
    .add {
      margin-bottom: 2em;
      .input {
        display: inline-block;
        width: calc(~"100% - 105px");
      }
      .button {
        width: 100px;
      }
    }
    .item {
      border-bottom: 1px solid @border;
      margin-bottom: 1em;
      padding: 1em;
      .header {
        display: inline-block;
      }
      .item_content {
        display: inline-block;
      }
    }
  }
  .techerInfo{
    padding: 10px;
    overflow: hidden;
    position: relative;
    padding-left: 80px;
    height: 60px;
    .headerImg{
      position: absolute;
      left: 10px;
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: red;
    }
    .name{
      font-size: 16px;
      display: block;
      margin:5px 0;
    }
    .banji{
      color: @grey;
      margin-right: 10px;
    }
    .course{
      color: @grey;
    }
  }
}
</style>
