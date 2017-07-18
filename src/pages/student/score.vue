<template>
  <div>
  
    <div class="scoreSummary">
      <div class="title">{{score.ExamName}}</div>
      <div class="info">
        <span>考试时间：{{score.Time}}</span>
      </div>
      <div class="total">
        <span class="item">
          <span>总分：</span>
          <span class="score">{{score.Score}}</span>
          <span> / {{score.FullScore}}</span>
        </span>
        <!--<span class="item">
          <span>排名：</span>
          <span class="score">20</span>
        </span>-->
      </div>
      <div class="list">
        <div class="item" v-for="(i,index) in score.ScoreInfo" :key="index">
          <div class="score">
            <span class="score">{{i.Score}}</span>
            <span> / {{i.FullScore}}</span>
          </div>
          <div class="name">{{i.CourseName}}</div>
        </div>
      </div>
    </div>
  
    <div class="scoreList">
      <div class="header">
        历次成绩报告
        <el-select v-model="pagesize" class="pagesize" @change="currentPage=1" >
          <el-option
            v-for="item in allPagesize"
            :key="item"
            :label="'每页显示'+item+'条'"
            :value="item">
          </el-option>
        </el-select>
      </div>
  
      <div class="item" v-for="(i,index) in currentScoreList" :key="index">
        <div class="title">{{i.ExamName}}> </div>
        <div class="time">{{i.Time}}</div>
        <div class="score">{{i.Score}}分</div>
      </div>

      <div class="footer">
        <el-button-group>
          <el-button type="primary" :class="i==currentPage?'active':null" 
          v-for="i in pageCount" :key="i"
          @click="currentPage=i">{{i}}</el-button>
        </el-button-group>
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
      score:{},
      scoreList:[],
      currentPage:1,
      pagesize:5,
      allPagesize:[5,10,15,20,30,50],
    }
  },
  computed:{
    currentScoreList:function(){
      let offset = (this.currentPage-1)*this.pagesize
      if((offset + this.pagesize) >= this.scoreList.length){
        return this.scoreList.slice(offset, this.scoreList.length)
      }else{
        return this.scoreList.slice(offset, offset + this.pagesize)
      }
    },
    pageCount:function(){
      return Math.ceil(this.scoreList.length / this.pagesize)
    },
  },
  methods: {
    getData(){
      this.getScore()
      this.getScoreList()
    },
    getScore(){
      this.$API.getExamScore(this.$store.state.currentStudentId).then(res=>{
        this.score=res
      })
    },
    getScoreList(){
      this.$API.getExamList(this.$store.state.currentStudentId).then(res=>{
        this.scoreList=res
      })
    }
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

.scoreSummary {
  text-align: center;
  border: 1px solid @border;
  padding: 20px;
  background: #fff;
  margin: 10px 0;
  .title {
    font-size: 20px;
    line-height: 60px;
  }
  .info {
    color: @grey;
    span {
      padding: 0 20px;
    }
  }
  .total {
    .item {
      padding: 0 20px;
      span {
        vertical-align: middle;
      }
      .score {
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
      &:hover{
    border: 1px solid @main;
  }
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

.scoreList {
  background: #fff;
  border: 1px solid @border;
  margin: 10px 0;
  padding: 20px;
  .header {
    line-height: 40px;
    font-weight: bold;
    .pagesize{
      float: right;
    }
  }
  .item {
    padding: 20px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    &:hover{
    border-bottom: 1px solid @main;
  }
    .title {
      max-width: calc(~"100% - 150px");
    }
    .time {
      color: @grey;
    }
    .score {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 40px;
    }
  }
  .footer{
    text-align: right;
    padding:10px;
    .active{
      color:#20a0ff;
      background: #fff;
    }
    .el-button-group{
      button{
        padding:5px 10px;
      }
    }
  }
}
</style>
