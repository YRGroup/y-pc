<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="video">
          <div class="prism-player" id="J_prismPlayer">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <div class="card introduce">
          <h3 class="videoTitle">{{title}}</h3>
          <div class="title">课程介绍</div>
          <div class="content">
            <!-- {{videoinfo.Description}} -->
            <h2>适用人群</h2>
            <p>中考总复习的初三学生。部分初二学生。</p>
            </br>
            <h2>课程概述</h2>
            <p>本系列课程重点介绍中考数学综合性考题。包括二次函数套直角三角形、等腰三角形、相似三角形。二次函数套平行四边形、菱形。纯粹的几何问题：一线三等角，重叠问题，旋转问题。</p>
            <p>主要介绍上诉题型的逻辑分析和解题技巧。每种考点引申出2、3题类似题型，做到举一反三，定能受益良多。</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="card">
          <div class="title">主讲老师</div>
          <div class="techerInfo">
            <span class="headerImg">
              <img :src="videoinfo.Headimgurl">
            </span>
            <span class="name">{{videoinfo.TrueName}}</span>
            <span class="course">{{videoinfo.Tags.replace(/,/g,' ')}}</span>
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
      videoId: '',
      videoAuth: '',
      videoinfo: this.$store.state.currentVideoInfo,
      videoCover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
    }
  },
  methods: {
    getVideoInfo() {
      let para = {
        videoId: this.videoId
      }
      this.$API.getVideoAuth(para).then(res => {
        this.videoAuth = res
        this.initPlayer()
        this.player.play()
      })
    },
    initPlayer() {
      if (this.player) {
        this.player = null
      }
      this.player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '614px',
        autoplay: false,
        // useH5Prism: false,
        useFlashPrism: true,
        vid: this.videoId,
        playauth: this.videoAuth,
        cover: this.videoCover,
      })
    }
  },
  created() {
    if (this.$route.query.id) {
      this.videoId = this.$route.query.id
    }
  },
  mounted() {
    this.getVideoInfo()
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
  #J_prismPlayer {}
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

.videoTitle {
  font-size: 20px;
  line-height: 48px;
  height: 48px;
  overflow: hidden;
  padding: 10px 20px;
}

.introduce {
  min-height: 300px;
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
  .techerInfo {
    padding: 10px;
    overflow: hidden;
    position: relative;
    padding-left: 80px;
    height: 60px;
    .headerImg {
      position: absolute;
      left: 10px;
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      img {
        max-width: 100%;
        ;
      }
    }
    .name {
      font-size: 16px;
      display: block;
      margin: 5px 0;
    }
    .banji {
      color: @grey;
      margin-right: 10px;
    }
    .course {
      color: @grey;
    }
  }
}
</style>
