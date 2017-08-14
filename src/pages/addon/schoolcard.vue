<template>
  <div>
    <has-no-student v-if="$store.state.hasNoStudent"></has-no-student>
    <div v-else>
      <div v-if="hasNoSchoolcard">
        <div class="noCard panel">
          <h4>
            请绑定卡号
          </h4>
          <el-form :inline="true" :model="cardNum" label-width="100px" class="cardNum">
            <el-form-item label="卡号">
              <el-input v-model.number="cardNum.CardID" placeholder="请输入卡号" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addCardID" size="large">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  
      <div v-else>
        <div class="cardSummary">
          <div class="total">
            <span class="item">
              <span>当前余额  </span>
              <span class="balance">{{Blance}}</span>
            </span>
          </div>
        </div>
        <div class="cardList leftCon">
          <div class="header">消费记录
            <!-- <el-select v-model="pageSize" class="pagesize" @change="changePagesize" >
                    <el-option
                      v-for="item in allPagesize"
                      :key="item"
                      :label="'每页显示'+item+'条'"
                      :value="item">
                    </el-option>
                  </el-select> -->
          </div>
          <div class="item" v-for="(i,index) in alllog" :key="index">
            <div class="title">{{i.Title}}</div>
            <div class="time">{{i.CreateTime}}</div>
            <div class="log">{{i.OpeaType}} {{i.Money}}</div>
          </div>
          <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
  
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import hasNoStudent from '@/components/hasNoStudent'
import loadMore from '@//components/loadMore'

export default {
  components:{loadMore ,hasNoStudent},
  data (){
    return{
      hasNoSchoolcard:false,
      Blance:0,
      alllog:[],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      allPagesize: [5, 10, 15, 20, 30, 50],
      cardNum:{}
    }
  },
  methods: {
    getData() {
      let para = {}
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getCardList(para).then(res => {
        if (res) {
          this.Blance = res.Blance
          if (res.Log.length) {
            res.Log.forEach((element) => {
              this.alllog.push(element)
            })
            let alllog = this.alllog
            for (var i = 0; i < alllog.length; i++) {
              let time = new Date(alllog[i].CreateTime)
              alllog[i].CreateTime = time.Format('MM-dd hh:mm')
            }
          } else {
            this.noMoreData = true
          }
        } else {
          this.hasNoSchoolcard = true
        }
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    },
    changePagesize() {
      this.alllog = []
      this.currentPage = 1
      this.getData()
    },
    addCardID() {
      this.$API.addSchoolcard(this.cardNum).then(res => {
        this.hasNoSchoolcard = false
        localStorage.setItem('CampusCard', true)
        this.$message('绑定卡号成功')
        this.getData()
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  },
  created() {
    this.getData()
    let card = this.$store.state.CampusCard
    if(card){
      this.hasNoSchoolcard = false
    }else{
      this.hasNoSchoolcard = true
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.noCard {
  // padding-bottom: 50px;
  min-height: 500px;
  // text-align: center;
  h4 {
    text-align: center;
    padding: 80px 0 50px;
    font-size: 20px;
    font-weight: 400;
  }
  .cardNum {
    width: 450px;
    margin: 0 auto;
  }
}

.cardSummary {
  text-align: center;
  border: 1px solid @border;
  padding: 40px 20px;
  background: #fff; // margin: 10px 0;
  // &:hover{
  //   border: 1px solid @main;
  // }
  .total {
    .item {
      padding: 0 20px;
      span {
        vertical-align: middle;
        font-size: 16px;
        color: #888;
      }
      .balance {
        color: @sub;
        font-size: 36px;
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
  margin: 15px 0;
  padding: 20px;
  .header {
    line-height: 36px;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid @border;
    .pagesize {
      float: right;
    }
  }
  .item {
    padding: 10px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    &:hover {
      // border-bottom: 1px solid @main;
      background: @border;
    }
    .title {
      max-width: calc(~"100% - 150px");
    }
    .time {
      color: @grey;
      font-size: 12px;
    }
    .log {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 28px;
    }
  }
}
</style>
