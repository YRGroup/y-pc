<template>
  <div>
    
    <div class="cardSummary">
      <div class="total">
        <span class="item">
          <span>当前余额：</span>
          <span class="balance">{{balance}}</span>
        </span>
      </div>
    </div>
  
    <div class="cardList">
      <div class="header">消费记录</div>
      <div class="item" v-for="(i,index) in log" :key="index">
        <div class="title">{{i.Title}}</div>
        <div class="time">{{i.CreateTime}}</div>
        <div class="log">{{i.OpeaType}} {{i.Money}}</div>
      </div>
      <div class="btn">
        <el-button @click.native="loadmore">点击查看更多</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  components:{},
  data (){
    return{
      balance:'41.5',
      log:[],
      currentPage:1
    }
  },
  methods:{
    getData(){
      let para ={}
      para.currentPage= this.currentPage
      para.pagesize=10
      this.$API.getCardList(para).then(res=>{
        this.balance=res.Blance
        this.log=res.Log
      })
    },
    loadmore(){
      this.currentPage++
      this.gatData()
    },
  },
  created(){
    this.getData()
  },
  mounted(){

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.cardSummary {
  text-align: center;
  border: 1px solid @border;
  padding: 20px;
  background: #fff;
  margin: 10px 0;
  .total {
    .item {
      padding: 0 20px;
      span {
        vertical-align: middle;
      }
      .balance {
        color: @sub;
        font-size: 50px;
      }
    }
  }
  .list {
    .item {
      border: 1px solid @border;
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 20px;
      .score {
        line-height: 50px;
        .score {
          color: @sub;
        }
      }
      .name {
        line-height: 50px;
      }
    }
  }
}

.cardList {
  background: #fff;
  border: 1px solid @border;
  margin: 10px 0;
  padding: 20px;
  .header {
    line-height: 40px;
    font-weight: bold;
  }
  .item {
    padding: 20px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    .title {
      max-width: calc(~"100% - 150px");
    }
    .time {
      color: @grey;
    }
    .log {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 40px;
    }
  }
  .btn{
    text-align: center;
    padding:10px 0;
  }
}
</style>
