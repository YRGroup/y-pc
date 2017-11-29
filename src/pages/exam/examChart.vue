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
          <p class="examtime">创建时间：{{data.CreateTime}}</p>
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
        <el-row>
          <el-col :span="12">
            <div id="chart1" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <div class="scorebox">
              <div class="toolBar">
                <span class="label"></span>
                <el-select v-model="chart2courseId" size="small" placeholder="请选择学科" style="width:120px" @change="refshchart2Data">
                  <el-option v-for="item in chart2CourseList" :key="item.ID" :label="item.CourseName" :value="item.ID">
                  </el-option>
                </el-select>
                <el-button type="success" size="small" @click="refshchart2Data">
                  查询
                </el-button>
              </div>
              <div id="chart2" style="width:100%; height:400px;"></div>
            </div>
          </el-col>
        </el-row>
        <div id="chart3"></div>
        <div class="toolBar">
          <span>切换学科：</span>
          <el-select v-model="chart4course" size="small" placeholder="请选择学科" style="width:180px" @change="refshchart4Data">
            <el-option v-for="item in chart4Selector" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div id="chart4" style="width:100%; height:700px;"></div>
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
      chart2AllData: {},
      chart2Data: {},
      chart2: null,
      chart2_legend: [],
      chart2_series: [],
      chart2CourseList: [],
      chart2courseId: '',
      chart3Data: null,
      chart3: null,
      chart3_legend: [],
      chart3_series: [],
      chart3_yAxis_data: [],
      chart4: null,
      chart4_series: [],
      chart4course: '总分',
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
    },
    chart4Selector() {
      this.chart3_legend.unshift('总分')
      return this.chart3_legend
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
        this.getchart2Data()
        this.getChart3Data()
      })
    },
    refshchart2Data() {
      this.chart2_legend = []
      this.chart2_series = []
      this.chart2CourseList = []
      this.chart2.clear()
      this.chart2Data = this.chart2AllData.find(o => {
        return this.chart2courseId == o.CourseID
      })
      this.chart2AllData.forEach(o => {
        this.chart2CourseList.push({ CourseName: o.CourseName, ID: o.CourseID })
      })
      this.chart2_legend = Object.keys(this.chart2Data.Regions)
      this.chart2_legend.forEach(o => {
        let a = { value: this.chart2Data.Regions[o], name: o }
        this.chart2_series.push(a)
      })
      this.setchart2()
    },
    getchart2Data() {
      let para = {
        classid: this.$store.state.currentClassId,
        examid: this.$route.params.examId
      }
      this.$API.GetSingleCourseRegionByClassID(para).then(res => {
        this.chart2AllData = res
        this.chart2Data = this.chart2AllData[0]
        res.forEach(o => {
          this.chart2CourseList.push({ CourseName: o.CourseName, ID: o.CourseID })
        })
        // this.chart2courseId = this.chart2CourseList[0].ID
        this.chart2_legend = Object.keys(this.chart2Data.Regions)
        this.chart2_legend.forEach(o => {
          let a = { value: this.chart2Data.Regions[o], name: o }
          this.chart2_series.push(a)
        })
        this.setchart2()
      })
    },
    setchart2() {
      this.chart2.setOption({
        title: {
          text: '各科成绩段分布',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: this.chart2_legend,
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
            name: '成绩段分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chart2_series
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
    },
    getChart3Data() {
      this.$API.getGradeExamInfo({ examid: this.data.ParentID }).then(res => {
        this.chart3Data = res
        this.chart3_legend = res[0].CoursesList.map(p => { return p.CourseName })
        this.chart3_legend.forEach(o => {
          this.chart3_series.push({
            name: o,
            type: 'bar',
            stack: '总分',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: res.map(u => { return u.Courses.find(y => { return y.CourseName === o }).AvgScore })
          })
        })
        res.forEach(o => {
          this.chart3_yAxis_data.push(o.ClassName)
          this.chart4_series.push(o.AvgCourseTotalScore)
        })
        this.setChart3()
        this.setChart4()
      })
    },
    setChart3() {
      this.chart3.setOption({
        title: {
          text: '班级成绩排名',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.chart3_legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.chart3_yAxis_data
        },
        series: this.chart3_series
      })
    },
    setChart4() {
      this.chart4.setOption({
        title: {
          text: '班级各科成绩排名',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.chart3_yAxis_data
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            barMaxWidth: '100',
            data: this.chart4_series
          }
        ]
      })
    },
    refshchart4Data(val) {
      if (val !== '总分') {
        this.chart4_series = this.chart3Data.map(u => { return u.Courses.find(y => { return y.CourseName === val }).AvgScore })
        this.setChart4()
      } else {
        this.chart4_series = this.chart3Data.map(o => { return o.AvgCourseTotalScore })
        this.setChart4()
      }
    },
  },
  created() {
    this.getData()
    if(this.$store.state.currentUser){
      this.chart4course = this.$store.state.currentUser.ExtendInfo.Course.CourseName
      this.chart2courseId = this.$store.state.currentUser.ExtendInfo.Course.ID
    }
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'), 'macarons')
    this.chart2 = echarts.init(document.getElementById('chart2'), 'macarons')
    this.chart3 = echarts.init(document.getElementById('chart3'), 'macarons')
    this.chart4 = echarts.init(document.getElementById('chart4'), 'macarons')
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

.scorebox {
  position: relative;
  .toolBar {
    position: absolute;
    right: 100px;
    z-index: 100;
  }
}

#chart3 {
  width: 100%;
  height: 500px;
  margin-top: 40px;
  display: none;
}

</style>
