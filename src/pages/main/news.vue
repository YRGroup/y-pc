<template>
  <div>
    <!-- <div class="nav">
      <span>首页 > </span>
      <span>校园动态</span>
    </div> -->
  
    <div class="card">
      <div class="maintitle">
        <i class="iconfont">&#xe737;</i>校园动态
        <span class="goreturn">
          <el-button size="small" @click="$router.go(-1)" type="success" :plain="true">返回</el-button>
        </span>
      </div>
      <div class="body">
        <div class="title">{{data.Title}}</div>
        <div class="time">{{data.AddTime}}</div>
        <div class="content" v-html="data.content"></div>
        <div class="footer">
          <div class="btn"><i class="iconfont">&#xe60c;</i></div>
        </div>
      </div>
  
      <div class="reply">
        <el-input class="input" v-model="commentData.Content" placeholder="请输入内容" @keyup.enter.native="addComment"></el-input>
        <el-button class="btn" type="success" @click="addComment">回复</el-button>
      </div>
      <div class="replyList">
        <div class="title">全部回复（{{data.Comments.length}}）</div>
        <ul class="list">
          <li class="item" v-for="(i,index) in data.Comments" :key="index">
            <div class="img">
              <div class="headTextImg">{{i.UserName.substr(0,1)}}</div>
            </div>
            <div class="top">
              <span class="name">{{i.UserName}}</span>
              <span class="time">{{i.AddTime}}</span>
            </div>
            <div class="content">
              {{i.Content}}
            </div>
          </li>
        </ul>
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
      data: {
        Title: '',
        content: '',
        AddTime: '',
        Comments: []
      },
      commentData: {},
    }
  },
  methods: {
    getData() {
      let para = {
        articleid: this.$route.query.id
      }
      this.$API.getNewsInfo(para).then(res => {
        this.data = res
      })
    },
    addComment() {
      this.commentData.ArticleID = this.$route.query.id
      this.$API.addNewsComment(this.commentData).then(res => {
        this.$message.success('添加评论成功！')
        this.commentData.Content = ''
        this.getData()
      })
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.nav {
  font-size: 12px;
  margin-top: -10px;
}

.card {
  // margin: 15px 0;
  // padding: 20px 40px;
  border: 1px solid @border;
  background: #fff;
  .body {
    padding: 20px 80px;
    text-align: center;
    .title {
      margin-top: 10px;
      line-height: 36px;
      font-size: 24px;
    }
    .time {
      color: @grey;
      line-height: 30px;
    }
    .content {
      line-height: 2em;
      text-indent: 2em;
      text-align: left;
      .ql-align-center{
        text-align: center!important;
        margin:10px 0;
      }
    }
    .footer {
      .btn {
        height: 60px;
        width: 60px;
        line-height: 60px;
        border-radius: 50%;
        color: #fff;
        background: @main;
        display: inline-block;
        margin: 20px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .reply {
    text-align: center;
    padding: 20px;
    .input {
      display: inline-block;
      width: 80%;
    }
    .btn {
      display: inline-block;
    }
  }
  .replyList {
    .list{
      padding:0 40px 20px;
    }
    .title {
      padding: 10px 20px;
      border-bottom: 1px solid @border;
    }
    .item {
      padding-left: 80px;
      padding-top: 10px;
      position: relative;
      min-height: 70px;
      border-bottom: 1px dashed @border;
    }
    .img {
      position: absolute;
      left: 20px;
      top: 10px;
      img {
        border-radius: 50%;
        width: 50px;
      }
    }
    .top {
      line-height: 30px;
      margin-bottom: 5px;
      .time {
        color: @grey;
        margin-left: 20px;
      }
    }
  }
}
</style>
