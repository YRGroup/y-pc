<template>
  <div>

    <div class="card">
      <div class="maintitle">
        <i class="iconfont">&#xe737;</i>成绩报表
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/examList')" type="success" :plain="true">返回考试列表</el-button>
        </span>
      </div>
      <div class="panel">
        <div class="examinfo">
          <p class="title">{{data.Name}}</p>
          <!-- <p>当前考试:{{data.Remark}}</p> -->
          <p class="examtime">创建时间：{{data.CreateTime}}</p>
        </div>
      </div>
      <div class="panel">
        <div id="chart1" style="width:100%; height:400px;"></div>
        <div id="chart2" style="width:100%; height:400px;"></div>
        <div id="chart3" style="width:100%; height:400px;"></div>
        <div id="chart4" style="width:100%; height:400px;"></div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts';
import theme from '../../../static/macarons.js'

export default {
  data() {
    return {
      data: {},
      chart1: null,
      chart1_X: [],
      chart1_legend: [],
      chart1_series: [],
      chart2: null,
      chart2_indicator: [],
      chart2_series: [],
    }
  },
  computed: {
    summaryScore() {
      return this.data.VueData
    },
    currentClassInfo() {
      if (!this.$store.state.currentClassInfo) {
        return this.$store.dispatch('getCurrentClassInfo')
      } else {
        return this.$store.state.currentClassInfo
      }
    },
  },
  methods: {
    startEditOneScore(val) {
      this.showEditOneScore = true
      this.editScoreOneData = val
    },
    submitEditOneScore() {
      let editData = []
      editData.push(this.editScoreOneData)
      this.$API.addExamScore(editData).then(res => {
        this.$message.success('添加成绩成功')
        this.editScoreOneData = {}
        this.showEditOneScore = false
      }).catch(err => {
        this.$message.error(err)
      })
    },
    submitAllScore(n) {
      let allData = this.data.CoursesSummary.find(el => {
        return el.CourseName == n
      })
      this.$API.addExamScore(allData.Scores).then(res => {
        this.$message.success('添加成绩成功')
        this.editScoreOneData = {}
        this.getData()

      }).catch(err => {
        this.$message.error(err)
      })
    },
    getData() {
      this.$API.getExamInfo(this.$route.params.examId).then(res => {
        this.data = res
        let time = new Date(this.data.CreateTime)
        this.data.CreateTime = time.Format('MM-dd hh:mm')
        this.data.StudentSummary.forEach(o => {
          this.chart1_X.push(o.TrueName)
          let oneRadar = 0
          this.chart2_series.push({
            name: '学生曲线',
            type: 'radar',
            symbol: 'none',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 1
                }
              },
              emphasis: {
                areaStyle: { color: 'rgba(0,250,0,0.3)' }
              }
            },
            data: [
              {
                value: o.Courses.map(b => { return b.Score }),
                name: o.TrueName
              }
            ]
          })
        })
        this.data.CoursesList.forEach(o => {
          this.chart1_legend.push(o.CourseName)
        })
        this.data.CoursesSummary.forEach(o => {
          this.chart1_series.push({
            name: o.CourseName,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: o.Scores.map(b => { return b.Score })
          })
          this.chart2_indicator.push({ text: o.CourseName, max: o.FullScore })
        })
        this.setChart1()
        this.setChart2()
      })
    },
    setChart1() {
      this.chart1.setOption({
        title: {
          text: '班级学生成绩详情'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.chart1_legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.chart1_X
        },
        series: this.chart1_series
      });
    },
    setChart2() {
      this.chart2.setOption({
        title: {
          text: '班级学生各科成绩分布',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)'
        },
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true
        },
        radar: {
          indicator: this.chart2_indicator
        },
        series: this.chart2_series
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'),'macarons')
    this.chart2 = echarts.init(document.getElementById('chart2'),'macarons')

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
  .examinfo {
    text-align: center;
    .title {
      font-size: 24px;
      line-height: 36px;
    }
    .examtime {
      color: @grey;
    }
    .item {
      position: relative;
      cursor: pointer;
      &:hover {
        border-bottom: 1px dotted @main;
      }
      .index {
        position: absolute;
        left: 0;
        top: 10px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        background: @main;
        color: #fff;
        text-align: center;
      }
      .name {
        padding-left: 30px;
        line-height: 30px;
        font-size: 20px;
      }
      .info {
        padding-left: 30px;
        color: @grey;
      }
      .type {
        position: absolute;
        right: 10px;
        top: 10px;
        background: @main;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .footer {
    border-top: 1px solid @border;
    line-height: 40px;
    .btn {
      padding-right: 30px;
      text-align: right;
    }
  }
}

.info {
  color: @grey;
  span {
    margin-right: 20px;
  }
  b {
    color: @sub;
  }
  .btn {
    float: right;
    margin-bottom: 5px;
  }
}

.inline {
  display: inline-block;
  width: 90px;
}

.el-tabs {
  margin: 10px 0;
  padding: 10px 20px;
  background: #f8f8f8;
  .el-tabs__nav-wrap {
    background: red;
  }
}
</style>
