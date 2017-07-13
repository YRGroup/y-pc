<template>
  <div>
  
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

.addPost {
  .title {
    line-height: 50px;
    padding-left: 20px;
  }
  .btn {
    text-align: right;
    padding: 10px 50px;
  }
}

.card {
  margin: 15px 0;
  border: 1px solid @border;
  font-size: 13px;
  position: relative;
  background: #fff;
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
    margin-left: 85px;
    margin-top: -30px;
    line-height: 1.5rem;
  }
  .footer {
    padding: 10px 30px;
    .time {
      color: @grey;
    }
    .btn {
      float: right;
      padding: 0 15px;
    }
  }
}
</style>
