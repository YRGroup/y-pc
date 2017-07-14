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
      <div class="header">历次成绩报告</div>
  
      <div class="item" v-for="(i,index) in scoreList" :key="index">
        <div class="title">{{i.ExamName}}> </div>
        <div class="time">{{i.Time}}</div>
        <div class="score">{{i.Score}}分</div>
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
      scoreList:{},
    }
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
    .score {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 40px;
    }
  }
}
</style>
