<template>
  <div>
  
      <div class="body card panel">
        <div class="img">
          <img :src="data.userImg">
        </div>
        <div class="header">
          {{data.auther}}
        </div>
        <div class="content" v-html="data.content"></div>
        <div class="albums">
          <li v-for="(p,index) in data.albums" :key="index">
            <img :src="p">
          </li>
        </div>
        <div class="footer">
          <span class="time">{{data.date}}</span>
          <span class="iconbtn">
          <span title="点赞数" @click="doLike(data.id),data.like++"><i class="iconfont">&#xe646;</i>{{data.like}}</span>
        </span>
          
          <!-- <div class="btn" @click="doLike(data.id),data.like++">like:{{data.like}}</div> -->
        </div>
      </div>
      <div class="replybox">
        <div class="reply">
          <el-input class="input" v-model="replyData.content" placeholder="请输入内容" v-show="showReply"></el-input>
          <el-button class="btn" type="success" v-show="showReply" @click="submitReply">回复</el-button>
          <el-button class="btn" style="margin-left:500px;" :plain="true" type="success" v-show="!showReply" @click.native="showReply=true">添加回复</el-button>
        </div>
        <div class="replyList">
          <div class="title">全部回复</div>
          <ul class="list">
            <li class="item" v-for="i in data.comment" :key="i.id">
                <div><span class="name">{{i.TrueName}}：</span>{{i.content}}</div>
                <div class="time">{{i.addTime}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  
</template>

<script>
export default {
  name: 'post',
  components: {},
  data() {
    return {
      data: {},
      showReply:false,
      replyData: {
        did:'',
        content:''
      }
    }
  },
  methods: {
    getData() {
      this.$API.getClassDynamic(this.$store.state.currentClassId, this.$route.params.postId).then(res => {
        this.data = res
      })
    },
    submitReply(){
      this.replyData.did=this.data.id
      this.$API.postNewComment(this.replyData).then(res=>{
        this.$message('添加回复成功！')
        this.showReply = false
        this.replyData.content = ''
        this.getData()
      })
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then((res) => {
        this.$message.success('点赞成功');
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
  // margin: 15px 0;
  border: 1px solid @border;
  font-size: 13px;
  position: relative;
  padding-left:80px;
  background: #fff;
  .img {
    position: absolute;
    left: 20px;
    top: 20px;
    img {
      width: 46px;
      height:46px;
      border-radius: 50%;
    }
  }
  .header {
    display: inline-block;
    font-size: 16px;
    line-height: 42px;
  }
  .content {
    width: calc(~"100% - 120px");
  }
  .albums {
    li {
      padding: 10px 10px 10px 0;
      display: inline-block;
      img {
        max-height: 120px;
      }
    }
  }
  .footer {
    font-size:12px;
    .time {
      color: @grey;
    }
    .iconbtn {
      float: right;
      cursor: pointer;
      &:hover{
        color:@main;
      }
    }
  }
}
.replybox{
  background: #fff;
  margin-top: 20px;
}
.reply {
  float: right;
  width: 600px;
  margin-top: 10px;
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
    padding: 15px 24px;
    font-size: 16px;
    border-bottom: 1px solid @border;
  }
  .item {
    border-bottom: 1px dotted @border;
    padding:10px 40px;
    .name{
      color:@grey;
    }
    .time {
      color: #999;
      font-size: 12px;
    }
    .reply-content{
      display: inline-block;
      margin-left:20px;
      margin-top:10px;
      vertical-align: top;
    }
  }
}
</style>
