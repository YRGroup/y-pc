<template>
  <div>
    <no-data v-if="score.length"></no-data>
    <div v-else>
      <div class="scoreSummary">
        <div class="title">{{score.ExamName || "暂无"}}</div>
        <div class="info">
          <span>考试时间：{{score.Time}}</span>
        </div>
        <div class="total">
          <span class="item">
            <span>总分</span>
            <span class="score">{{score.Score}}</span>
            <span> / {{score.FullScore}}</span>
          </span>
        </div>
        <div class="list">
          <div class="item" v-for="(i,index) in score.ScoreInfo" :key="index">
            <div class="mainscore">
              <span class="score">{{i.Score}}</span>
              <span> / {{i.FullScore}}</span>
            </div>
            <div class="name">{{i.CourseName}}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div id="scoreChart" ref="scoreChart"></div>
      </div>

      <div class="scoreList panel">
        <div class="header">
          历次成绩报告
        </div>

        <div class="item" v-for="(i,index) in currentScoreList" :key="index" @click="changeScore(i.ExamID)">
          <div class="title">{{i.ExamName || "暂无"}}> </div>
          <div class="time">{{i.Time}}</div>
          <div class="score">{{i.Score}} 分</div>
        </div>

        <div class="footer">
          <el-button-group>
            <el-button type="primary" :class="i==currentPage?'active':null" v-for="i in pageCount" :key="i" @click="currentPage=i">{{i}}</el-button>
          </el-button-group>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/radar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import noData from '@//components/noData'
export default {
  name: 'app',
  components: { noData },
  data() {
    return {
      score: {},
      scoreList: [],
      currentPage: 1,
      pagesize: 5,
      allPagesize: [5, 10, 15, 20, 30, 50],
      chartsIndicator: [],
      chartsValue: [],
      myChart: null
    }
  },
  computed: {
    currentScoreList: function() {
      let offset = (this.currentPage - 1) * this.pagesize
      if ((offset + this.pagesize) >= this.scoreList.length) {
        return this.scoreList.slice(offset, this.scoreList.length)
      } else {
        return this.scoreList.slice(offset, offset + this.pagesize)
      }
    },
    pageCount: function() {
      return Math.ceil(this.scoreList.length / this.pagesize)
    },
  },
  methods: {
    getData() {
      this.getScore()
      this.getScoreList()
    },
    getScore(ExamID) {
      if (this.$route.query.id) {
        this.$API.getExamScore(this.$route.query.id, ExamID).then(res => {
          this.score = res
          this.setCharts(res.ScoreInfo)
        })
      } else {
        this.$API.getExamScore(this.$store.state.currentStudentId, ExamID).then(res => {
          this.score = res
          this.setCharts(res.ScoreInfo)
        })
      }
    },
    getScoreList() {
      if (this.$route.query.id) {
        this.$API.getExamList(this.$route.query.id).then(res => {
          this.scoreList = res
        })
      } else {
        this.$API.getExamList(this.$store.state.currentStudentId).then(res => {
          this.scoreList = res
        })
      }
    },
    changeScore(ExamID) {
      this.$router.push('/student/' + this.$store.state.currentStudentId + '/score/' + ExamID)
      this.getScore(ExamID)
    },
    setCharts(val) {
      this.chartsValue = []
      this.chartsIndicator = []
      while (val.length < 3) {
        val.push({ Score: 1, CourseName: '无', FullScore: 100 })
      }
      val.forEach(o => {
        if (o.Score == 0) {
          this.chartsValue.push(1)
        } else {
          this.chartsValue.push(o.Score)
        }
        let a = {
          name: o.CourseName,
          max: o.FullScore
        }
        this.chartsIndicator.push(a)
      })
      this.myChart.setOption({
        title: {
          text: '各科成绩分布图'
        },
        tooltip: {},
        legend: {
          data: ['班级平均分数', '实际分数']
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: this.chartsIndicator
        },
        series: [{
          name: '平均分数对比',
          type: 'radar',
          data: [
            // {
            //   value: [4300, 10000, 28000, 35000, 50000, 19000],
            //   name: '班级平均分数'
            // },
            {
              value: this.chartsValue,
              name: '实际分数'
            }
          ]
        }]
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('scoreChart'))
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.scoreSummary {
  text-align: center;
  border: 1px solid @border;
  background: url(../../assets/bgTop.png) no-repeat;
  padding: 20px;
  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 48px;
    color: #344251;
  }
  .total {
    margin-top: 20px;
    .item {
      font-size: 18px;
      span {
        vertical-align: middle;
      }
      .score {
        color: @sub;
        font-size: 50px;
        font-weight: 700;
      }
    }
  }
  .list {
    margin-top: 20px;
    .item {
      // border: 1px solid @border;
      background: rgba(255, 255, 255, 1);
      display: inline-block;
      width: 100px;
      height: 80px;
      margin: 20px;
      &:hover {
        background: rgba(255, 255, 255, 1);
      }
      .mainscore {
        line-height: 40px;
        color: @grey;
        .score {
          color: @sub;
          font-size: 20px;
        }
      }
      .name {
        line-height: 40px;
        font-weight: 600;
      }
    }
  }
}

.scoreList {
  border: 1px solid @border;
  margin: 15px 0;
  .header {
    line-height: 40px;
    font-weight: bold;
    .pagesize {
      float: right;
    }
  }
  .item {
    padding: 10px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    cursor: pointer;
    &:hover {
      // border-bottom: 1px solid @main;
      background: @border;
    }
    &:hover .title {
      color: @main;
    }
    .title {
      max-width: calc(~"100% - 150px");
      height: 30px;
      overflow: hidden;
      cursor: pointer;
    }
    .time {
      color: @grey;
      font-size: 12px;
    }
    .score {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 24px;
    }
  }
  .footer {
    text-align: right;
    padding: 10px;
    .active {
      color: #20a0ff;
      background: #fff;
    }
    .el-button-group {
      button {
        padding: 5px 10px;
      }
    }
  }
}

.card {
  background: #fff;
  margin: 20px 0;
  padding: 20px;
}

#scoreChart {
  width: 600px;
  height: 250px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
