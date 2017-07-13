<template>
  <div>
  
    <div class="left">
  
      <router-view></router-view>
  
    </div>
  
    <div class="right">
      <div class="classInfo">
        <div class="header">
          <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg">
        </div>
        <div class="content">
          <p>一年级二班</p>
          <div class="info">
            <span>班主任：王大明</span>
            <span>人数：100</span>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="title">
          公告
        </div>
        <div class="content">
          <div class="noticeItem">
            <div class="noticeTitle">每日英语测试（5月20日）练习</div>
            <div class="footer">
              <span>冯老师</span>
              <span>2017-07-05</span>
            </div>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="title">
          班级作业
          <div class="btn">更多</div>
        </div>
        <div class="content">
          <div class="homeworkItem" v-for="i in 5" :key="i">
            <span>【语文】</span>
            <span>每日测试</span>
            <span class="time">7-10</span>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="title">
          班级教师
        </div>
        <div class="content">
          <div class="teacherItem" v-for="i in 5" :key="i">
            <img src="https://modao.cc/uploads3/images/935/9354273/raw_1494308650.jpeg">
            <p>王老师</p>
          </div>
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
      newPost: {}
    }
  },
  methods: {
    updateData: function (data) {
      this.newPost.content = data
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.left {
  width: calc(~"100% - 300px");
  float: left;
  padding: 10px;
}

.right {
  float: right;
  width: 260px;
  padding: 20px 10px;
  .classInfo {
    background: @main;
    color: #fff;
    text-align: center;
    margin: 15px 0;
    .header {
      line-height: 120px;
      img {
        vertical-align: middle;
        width: 90px;
        border: 3px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
      }
    }
    .content {
      line-height: 30px;
      .info {
        line-height: 50px;
      }
    }
  }
  .card {
    border: 1px solid @border;
    margin-bottom: 20px;
    padding: 5px;
    background: #fff;

    .title {
      border-bottom: 1px solid @border;
      line-height: 40px;
      padding: 0 10px;
      .btn {
        float: right;
        font-size: 0.8em;
        color: @grey;
      }
    }
    .content {
      line-height: 2em;
      padding: 20px 10px;
      font-size: 12px;
      .noticeItem {
        .footer {
          color: @grey;
        }
      }
      .homeworkItem {
        .time {
          float: right;
          color: @grey;
        }
      }
      .teacherItem {
        text-align: center;
        width: 33%;
        display: inline-block;
        img {
          width: 55px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
