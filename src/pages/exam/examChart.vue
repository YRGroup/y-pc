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
          <p class="examtime">创建时间：{{data.CreateTExamIDime}}</p>
        </div>
      </div>

      <div class="list">
        <div class="item" v-for="(i,index) in data.CoursesSummary" :key="index">
          <div class="mainscore">
            <span class="score">{{i.AverageScore}}</span>
            <span> / {{i.FullScore}}</span>
          </div>
          <div class="name">{{i.CourseName}}</div>
        </div>
      </div>

      <div class="panel">
        <div id="chart1" style="width:100%; height:400px;"></div>
        <div class="toolBar">
          <span class="label">学科：</span>
          <el-select v-model="chart3courseId" size="small" placeholder="请选择" style="width:120px">
            <el-option v-for="item in chart3CourseList" :key="item.ID" :label="item.CourseName" :value="item.ID">
            </el-option>
          </el-select>
          <el-button type="success" size="small" @click="refshChart3Data">
            <i class="iconfont">&#xe623;</i> 重新查询
          </el-button>
        </div>
        <div id="chart3" style="width:100%; height:400px;"></div>
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
      chart1_legend: [],
      chart1_indicator: [],
      chart1_series: [],
      chart3AllData: {},
      chart3Data: {},
      chart3: null,
      chart3_legend: [],
      chart3_series: [],
      chart3CourseList: [],
      chart3courseId: ''
    }
  },
  computed: {
    currentClassInfo() {
      if (!this.$store.state.currentClassInfo) {
        return this.$store.dispatch('getCurrentClassInfo')
      } else {
        return this.$store.state.currentClassInfo
      }
    },
    courseList() {
      if (this.$store.state.courseList) {
        return this.$store.state.courseList
      } else {
        this.$store.dispatch('getCourseList').then(() => {
          return this.$store.state.courseList
        })
      }
    }
  },
  methods: {
    getData() {
      this.$API.getExamInfo(this.$route.params.examId).then(res => {
        this.data = res
        this.data.CreateTime = new Date(this.data.CreateTime).Format('MM-dd hh:mm')
        this.data.CoursesSummary.forEach(o => {
          this.chart1_indicator.push({ name: o.CourseName, max: o.FullScore })
          this.chart1_series.push(o.AverageScore)
        })
        this.setChart1()
        this.getChart3Data()
      })
    },
    refshChart3Data() {
      this.chart3_legend = []
      this.chart3_series = []
      this.chart3CourseList = []
      this.chart3.clear()
      this.chart3Data = this.chart3AllData.find(o => {
        return this.chart3courseId == o.CourseID
      })
      this.chart3AllData.forEach(o => {
        this.chart3CourseList.push({ CourseName: o.CourseName, ID: o.CourseID })
      })
      this.chart3_legend = Object.keys(this.chart3Data.Regions)
      this.chart3_legend.forEach(o => {
        let a = { value: this.chart3Data.Regions[o], name: o }
        this.chart3_series.push(a)
      })
      this.setChart3()
    },
    getChart3Data() {
      let para = {
        classid: this.$store.state.currentClassId,
        examid: this.$route.params.examId
      }
      this.$API.getChart3Data(para).then(res => {
        this.chart3AllData = res
        this.chart3Data = this.chart3AllData[0]
        res.forEach(o => {
          this.chart3CourseList.push({ CourseName: o.CourseName, ID: o.CourseID })
        })
        this.chart3_legend = Object.keys(this.chart3Data.Regions)
        this.chart3_legend.forEach(o => {
          let a = { value: this.chart3Data.Regions[o], name: o }
          this.chart3_series.push(a)
        })
        this.setChart3()
      })
    },
    setChart3() {
      this.chart3.setOption({
        title: {
          text: '各科成绩段分布',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: this.chart3_legend,
          formatter: function(o) {
            return o.replace(/R/g, '').replace(/_/g, '-')
          }

        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: this.chart3_series
          }
        ]
      });
    },
    setChart1() {
      this.chart1.setOption({
        title: {
          text: '班级各科平均分'
        },
        tooltip: { show: true },
        legend: {
          show: true,
          data: this.chart1_legend,
          right: 'right'
        },
        label: {
          normal: {
            show: true,
            formatter: function(params) {
              return params.value;
            }
          }
        },
        radar: {
          name: {
            formatter: '【{value}】',
            textStyle: {
              color: '#666'
            }
          },
          indicator: this.chart1_indicator
        },
        series: [{
          type: 'radar',
          itemStyle: { normal: { areaStyle: { type: 'default' } } },
          data: [
            {
              name: this.chart1_legend,
              value: this.chart1_series,
              itemStyle: {
                normal: {
                  color: '#F9713C'
                }
              },
            },
          ]
        }]
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
    this.chart3 = echarts.init(document.getElementById('chart3'), 'macarons')
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

.list {
  padding: 0 50px;
  margin-top: 20px;
  .item {
    border: 1px solid @border;
    background: #f1faf6;
    display: inline-block;
    text-align: center;
    width: 100px;
    height: 80px;
    padding: 16px;
    margin: 10px;
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
</style>
