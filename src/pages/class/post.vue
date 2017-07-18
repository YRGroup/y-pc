<template>
  <div>
  
    <div class="card">
      <div class="body">
        <div class="img">
          <img :src="data.userImg">
        </div>
        <div class="header">
          {{data.auther}}
          <span class="time">{{data.date}}</span>
        </div>
        <div class="content" v-html="data.content"></div>
        <div class="albums">
          <li v-for="(p,index) in data.albums" :key="index">
            <img :src="p">
          </li>
        </div>
        <div class="footer">
          <div class="btn" @click="doLike(data.id),data.like++">like:{{data.like}}</div>
        </div>
      </div>

      <div class="reply">
        <el-input class="input" size="large" v-model="replyData.content" placeholder="请输入内容" v-show="showReply"></el-input>
        <el-button class="btn" type="primary" v-show="showReply" @click="submitReply">回复</el-button>
        <el-button class="btn" type="primary" v-show="!showReply" @click.native="showReply=true">添加回复</el-button>
      </div>
      <div class="replyList">
        <div class="title">全部回复（20）</div>
        <ul class="list">
          <li class="item" v-for="i in data.comment" :key="i.id">
            <div class="top">
              <div class="name">{{i.TrueName}}</div>
              <div class="time">{{i.addTime}}</div>
            </div>
            <div class="reply-content">
              {{i.content}}
            </div>
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
  .albums {
    padding-left: 85px;
    li {
      padding: 10px;
      display: inline-block;
      img {
        width: 200px;
      }
    }
  }
  .footer {
    padding: 10px 30px;
    text-align: right;
    .btn{
      cursor: pointer;
      &:hover{
        color:@main;
      }
    }
  }
}

.reply {
  padding: 20px;
  padding-right:100px;
  text-align: right;
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
    margin-left: 20px;
    padding-top: 10px;
    position: relative;
    min-height: 70px;
    border-bottom: 1px dotted @border;
    .top {
      display: inline-block;
      line-height: 35px;
      text-align: right;
      position: relative;
      .time {
        color: @grey;
      }
      &:after{
        content: "";
        display: inline-block;
        width:1px;
        height:50px;
        background: @grey;
        position: absolute;
        top:5px;
        right:-12px;
      }
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
