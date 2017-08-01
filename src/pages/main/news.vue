<template>
  <div>
  
    <div class="nav">
      <span>首页 > </span>
      <span>校园动态</span>
    </div>
    
    <div class="card">
      <div class="body">
        <div class="title">{{data.Title}}</div>
        <div class="time">{{data.AddTime}}</div>
        <div class="content" v-html="data.content"></div>
        <div class="footer">
          <div class="btn">share</div>
        </div>
      </div>
  
      <div class="reply">
        <el-input class="input" size="large" v-model="commentData.Content" placeholder="请输入内容" @keyup.enter.native="addComment"></el-input>
        <el-button class="btn" type="primary" @click="addComment">回复</el-button>
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
        Title:'',
        content:'',
        AddTime:'',
        Comments:[]
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
        this.commentData.Content=''
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
}

.card {
  margin: 15px 0;
  padding: 10px 20px;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  .body {
    text-align: center;
    .title {
      line-height: 80px;
      font-size: 25px;
    }
    .time {
      color: @grey;
      line-height: 30px;
    }
    .content {
      line-height: 2em;
      text-indent: 2em;
      text-align: left;
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
      }
    }
  }
  .reply {
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
    .title {
      padding: 10px 20px;
      border-bottom: 1px solid @border;
    }
    .item {
      margin-left: 80px;
      padding-top: 10px;
      position: relative;
      min-height: 70px;
      border-bottom: 1px dotted @border;
    }
    .img {
      position: absolute;
      left: -70px;
      top: 10px;
      img {
        border-radius: 50%;
        width: 50px;
      }
    }
    .top {
      line-height: 30px;
      .time {
        color: @grey;
      }
    }
  }
}
</style>
