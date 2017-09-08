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

export default {
  data() {
    return {
      data: {},
      chart1: null
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
        let data = this.data
        let time = new Date(data.CreateTime)
        data.CreateTime = time.Format('MM-dd hh:mm')
      })
    },
    setChart1() {
			this.chart1.setOption({
				title: {
					text: '学校信息',
					subtext: '暂无数据',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					}
				},
				legend: {
					data: ['已激活', '未激活'],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				yAxis: {
					type: 'value',
				},
				xAxis: {
					type: 'category',
					data: ['学校1', '学校2', '学校3', '学校4', '学校5', '学校6'],
				},
				series: [
					{
						name: '已激活',
						type: 'bar',
						stack: '总用户',
						data: [300, 354, 141, 155, 240, 320],
					},
					{
						name: '未激活',
						type: 'bar',
						stack: '总用户',
						data: [500, 600, 500, 300, 400, 700],
					}
				],
			});
		},
  },
  created() {
    this.getData()
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'))
    this.setChart1()
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
