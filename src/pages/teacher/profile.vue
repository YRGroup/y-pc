<template>
  <div>
  
    <div class="nav">
      <span>首页 > </span>
      <span>教师主页</span>
    </div>
  
    <div class="card">

      <div class="info">
        <div class="header">资料</div>
        <div class="content">
          <div class="item">
            <span class="title">姓名：</span>
            <span>李明</span>
          </div>
          <div class="item">
            <span class="title">性别：</span>
            <span>男</span>
          </div>
          <div class="item">
            <span class="title">手机：</span>
            <span>13817485974</span>
          </div>
          <div class="item">
            <span class="title">地址：</span>
            <span>银河</span>
          </div>
        </div>
        <div class="btn">
          <el-button>修改</el-button>
        </div>
      </div>

      <div class="info">
        <div class="header">班级</div>
        <div class="content">
          <div class="item">
            <span class="title">姓名：</span>
            <span>李明</span>
          </div>
          <div class="item">
            <span class="title">手机：</span>
            <span>13817485974</span>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="header">简历</div>
        <div class="content">
          <div class="item">
            <span class="title">姓名：</span>
            <span>李明</span>
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
      poster: require('@/assets/img/post.jpg')
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
@import '../../style/theme.less';

.nav {
  font-size: 12px;
}

.card {
  margin: 15px 0;
  padding: 10px 20px;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  .info{
    border-bottom: 1px dotted @border;
    position: relative;
    .header{
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
    }
    .content{
      padding:20px 20%;
      .item{
        line-height: 30px;
        .title{
          color:@grey;
        }
      }
    }
    .btn{
      position: absolute;
      right:30px;
      top:30px;
    }
  }
}
</style>
