<template>
  <div>
    <div class="card panel">
      <div class="addbtn" v-show="role=='老师'">
        <el-button type="success" size="small" @click="$router.push('/video/add')">
          <i class="iconfont">&#xe623;</i> 上传视频
        </el-button>
      </div>
      <div class="course-row">
        <span class="hd">学科：</span>
        <div class="bd">
          <ul>
            <li class="course-item on">
              <a>全部</a>
            </li>
            <li class="course-item">
              <a>语文</a>
            </li>
            <li class="course-item">
              <a>语文</a>
            </li>
            <li class="course-item">
              <a>语文</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="course-row">
        <span class="hd">搜索：</span>
        <div class="bd">
          <el-input placeholder="请输入关键词" icon="search" :on-icon-click="search" size="small" style="width:260px">
          </el-input>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="course-list">
        <ul class="clearfix">
          <li class="container">
            <a class="couse-card" @click="$router.push('/player')">
              <div class="top">
                <img class="banner" src="http://img.mukewang.com/576b7afb00019e4906000338-240-135.jpg" style="display: inline;">
              </div>
              <div class="content">
                <h3 class="name">JAVA遇见HTML——JSP篇</h3>
                <div class="info">
                  <span>
                    <i class="iconfont">&#xe621;</i>01:13:34</span>
                  <span>
                    <i class="iconfont">&#xe678;</i>133</span>
                </div>
                <div class="bottom">
                  <p class="desc">Java Web入门级教程JSP，带你轻松的学习JSP基础知识</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  computed: {
    role() {
      return this.$store.getters.role
    },
  },
  methods: {
    search() {
      console.log(11111)
    }
  },
  created() {
  },
  mounted() {
  },
  watch: {
    '$route': 'getData'
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  background: #fff;
  position: relative;
  .addbtn {
    position: absolute;
    right: 30px;
    top: 20px;
  }
  .course-row {
    padding: 10px 0;
    border-bottom: 1px solid @border;
    .hd {
      width: 52px;
      height: 20px;
      line-height: 30px;
      font-weight: 700;
      text-align: right;
      float: left;
    }
    .bd {
      margin-left: 60px;
      .course-item {
        display: inline-block;
        margin: 0 4px;
        a {
          display: block;
          line-height: 14px;
          padding: 8px;
        }
      }
      .on a {
        background: @main;
        color: #fff;
        border-radius: 2px;
      }
    }
  }
}

.course-list {
  margin: 0 -20px 0;
  padding-left: 10px;
  .container {
    float: left;
    margin: 0 0 10px 28px;
    width: 230px;
    height: 230px;
    transition: .3s all linear;
    overflow: hidden;
    .couse-card {
      .top {
        border-radius: 6px;
        width: 230px;
        height: 130px;
        position: relative;
        border-radius: 6px;
        transition: all 0.3s;
        overflow: hidden;
        .banner {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          transition: transform .3s linear 0s;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      .content {
        padding: 10px 5px;
        .name {
          font-size: 16px;
          line-height: 24px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 44px;
        }
        .info {
          font-size: 12px;
          font-weight: 300;
          color: @grey;
          .iconfont {
            margin-right: 5px;
          }
          span {
            margin-right: 20px;
          }
        }
        .bottom {
          font-size: 12px;
          font-weight: 300;
          color: @grey;
          line-height: 20px;
          overflow: hidden;
          height: 44px;
        }
      }
    }
  }
}
</style>
