<template>
  <div>
  
    <div class="card leftCon">
      <div class="maintitle">
        <i class="iconfont">&#xe649;</i>与 {{data.sendto_TrueName}} 的对话列表
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/contact')" type="success" :plain="true">返回</el-button>
        </span>
      </div>
      <li class="item" :class="(i.SendTo==userId)?'right':'left'" v-for="i in msgList" :key="i.ID">
        <div class="header">
          <div class="img">
            <img :src="currentUser.img" v-if="i.SendTo==userId">
            <img :src="data.sendto_Headimgurl" v-else>
          </div>
          <div class="name" v-if="i.SendTo==userId">{{currentUser.name}}</div>
          <div class="name" v-else>{{data.sendto_TrueName}}</div>
          <div class="time">{{i.CreateTime}}</div>
        </div>
        <div class="msgCon">
          <div class="isread" v-show="i.showRead">{{i.IsRead == false ? '未读' : '已读'}}</div>
          <div class="content">
            {{i.Content}}
          </div>
        </div>
        
      </li>
      <li class="noMsg" v-show="msgList.length==0">
        暂无消息
      </li>
      <div class="newMsgContent">
        <el-input class="input" style="width:80%" placeholder="请输入内容" v-model="newMsgData.content" @keyup.enter.native="addMsg"></el-input>
        <el-button @click="addMsg" class="btn" type="primary">发送</el-button>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'msg',
  components: {},
  data() {
    return {
      data: {},
      msgList: [],
      newMsgData: {},
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    currentUser() {
      let user = {}
      user.name = this.$store.state.currentUser.TrueName
      user.img = this.$store.state.currentUser.Headimgurl
      return user
    }
  },
  methods: {
    getData() {
      this.$API.getMsgInfo(this.userId).then(res => {
        this.data = res
        this.msgList = res.CL
        this.msgList.forEach(element => {
          element.showRead = null
          if(this.userId == element.SendTo){
            element.showRead = true
          }else{
            element.showRead = false
          }
        })
      })
    },
    addMsg() {
      this.newMsgData.sendto = this.userId
      if (this.newMsgData.content == undefined) {
        this.$message.warning('不能为空')
      } else {
        this.$API.replyMsg(this.newMsgData).then(res => {
          // this.$message.success('发送消息成功')
          this.newMsgData.content = ""
          this.getData()
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  watch: {
    '$route': 'getData'
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  background: #fff;
  padding-bottom: 80px;
  position: relative;
  .item {
    padding: 5px 20px;
    margin: 15px 0;
    min-height: 60px;
    overflow: hidden;
    .header {
      position: relative;
      .img {
        position: absolute;
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }
      .name,
      .time {
        line-height: 24px;
      }
    }
    .content {
      display: inline-block;
      // max-width: calc(~"100% - 210px");
      padding: 6px 10px;
      border-radius: 6px;
      margin: 0 5px;
    }
    .msgCon{
      max-width: calc(~"100% - 210px");
      overflow: hidden;
    }
  }
  .left {
    text-align: left;
    .content {
      background: #bfe778;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        left: -12px;
        top: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-right-color: #bfe778;
      }
    }
    .header {
      float: left;
      .img {
        left: 0;
        top: 0;
      }
      .name,
      .time {
        padding-left: 60px;
      }
    }
  }
  .right {
    text-align: right;
    .msgCon{
      float: right;
    }
    .content {
      background: #f5f5f5;
      color: #333;
      text-align: left;
      display: inline-block;
      position: relative;
      max-width: calc(~"100% - 59px");
      &:before {
        position: absolute;
        content: '';
        right: -12px;
        top: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left-color: #f5f5f5;
      }
    }
    .isread{
      display: inline-block;
      margin-right: 5px;
      color: @grey;
      font-size: 12px;
      float: left;
    }
    .header {
      float: right;
      .img {
        right: 0;
        top: 0;
      }
      .name,
      .time {
        padding-right: 60px;
      }
    }
  }
}

.newMsgContent {
  // background: #edf1f5;
  border-top: 1px solid @border;
  box-sizing: border-box;
  position: absolute;
  padding:20px 10px;
  bottom: 0;
  width: 100%;
}

.noMsg {
  text-align: center;
  line-height: 200px;
  color: @grey;
}
</style>
