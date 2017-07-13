<template>
  <div>
  
      <div class="card">
        <div class="title">学生(40)</div>
        <li class="item" v-for="i in 20" :key="i">
          <div class="img">
            <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg">
          </div>
          <div class="content">
            <div class="name">李家长</div>
            <div class="tel">1380012354</div>
          </div>
          <div class="btn">
            <el-button>查看主页</el-button>
          </div>
        </li>
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

  .card{
    margin: 10px 0;  
    background: #fff;
    border: 1px solid @border;
    .title{
      border-bottom: 1px solid @border;
      font-size: 20px;
      line-height: 50px;
      padding-left: 20px;
    }
    .item{
      padding:5px 20px;
      margin:5px 0;
      &:hover{
        background: @bg;
      }
      .img{
        display: inline-block;
        img{
          width:60px;
          border-radius: 50%;
        }
      }
      .content{
        vertical-align: top;
        display: inline-block;
        line-height: 30px;
        padding-left:20px;
        .tel{
          color:@grey;
        }
      }
      .btn{
        float: right;
        line-height: 60px;
      }
    }
  }

</style>
