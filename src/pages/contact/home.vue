<template>
  <div>
  
    <div class="left">
      
      <router-view></router-view>

    </div>
  
    <div class="right">
  
      <div class="card">
        <div class="title">
          联系人
        </div>
        <div class="content">
          <li class="item">老师(10)</li>
          <li class="item">学生(40)</li>
          <li class="item">家长(60)</li>
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
  .card {
    border: 1px solid @border;
    margin-bottom: 20px;
    background: #fff;
    .title {
      line-height: 60px;
      padding: 0 10px;
      background: @main;
      color:#fff;
      text-align: center;
    }
    .content {
      line-height: 2em;
      padding: 20px 0px;
      font-size: 16px;
      .item{
        line-height: 40px;
        cursor: pointer;
        padding:5px 20px;
        &:hover{
          background: @main;
          color:#fff;
        }
      }
    }
  }
}
</style>
