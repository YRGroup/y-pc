<template>
  <div>
  
    <div class="left">
  
      <div class="addPost">
        <div class="title">添加新动态</div>
        <div calss="content">
          <vue-html5-editor :content="newPost.content" @change="updateData" :auto-height="true" :height="200"></vue-html5-editor>
        </div>
        <div class="footer">
          <div class="btn">
            <button>发布</button>
          </div>
        </div>
      </div>
  
      <div class="card" v-for="i in 6" :key="i">
        <div class="img">
          <img src="https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png">
        </div>
        <div class="header">张丽丽（语文）</div>
        <div class="content">猫刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 刀老师BEC公开课6月27日倾情开课！一节公开课为你扫盲BEC备考！快快扫描下方二维码关注公开课吧 [详情]</div>
        <div class="footer">
          <span class="time">2017-06-08 20:26</span>
          <span class="btn">
            <span>view:200</span>
            <span>like:200</span>
          </span>
        </div>
      </div>
  
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
@import '../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.left {
  width: calc(~"100% - 300px");
  float: left;
  padding: 10px;
  .addPost {
    .title{
      line-height: 50px;
      padding-left:20px;
    }
    .btn {
      text-align: right;
      padding: 10px 50px;
    }
  }
  .card {
    margin: 15px 0;
    border: 1px solid #ccc;
    font-size: 13px;
    position: relative;  background: #fff;

    .img {
      display: inline-block;
      padding: 20px;
      img {
        width: 50px;
      }
    }
    .header {
      line-height: 80px;
      display: inline-block;
      vertical-align: top;
    }
    .content {
      width: calc(~"100% - 120px");
      padding: 10px;
      margin-left:85px;
      margin-top:-30px;
      line-height: 1.5rem;
    }
    .footer {
      padding:10px 30px;
      .time {
        color: #CCC;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}

.right {
  float: right;
  width: 260px;
  padding: 20px 10px;
  .classInfo{
    background: @c1;
    color:#fff;
    text-align: center;
    margin: 15px 0;
    .header{
      line-height: 120px;
      img{
        vertical-align: middle;
        width:90px;
        border:3px solid rgba(255,255,255,0.5);
        border-radius: 10px;
      }
    }
    .content{
      line-height: 30px;
      .info{
        line-height: 50px;
      }
    }
  }
  .card {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding:5px;  
    background: #fff;

    .title{
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      padding:0 10px;
      .btn{
        float: right;
        font-size: 0.8em;
        color:#ccc;
      }
    }
    .content {
      line-height: 2em;
      padding: 20px 10px;
      font-size: 12px;
      .noticeItem{
        .footer{
          color:#ccc;
        }
      }
      .homeworkItem{
        .time{
          float: right;
          color:#ccc;
        }
      }
      .teacherItem{
        text-align: center;
        width:33%;
        display: inline-block;
        img{
          width:55px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
