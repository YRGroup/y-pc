<template>
  <div class="card panel">
    <div style="text-align:center">
      <el-button @click="showAddExam=true" type="success" class="ml20 addBtn">添加新考试</el-button>
    </div>

    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <div class="examlist">
        <li class="item" v-for="(i,index) in data" :key="index">
          <div class="examtitle">{{i.ExamName}}</div>
          <div class="examinfo">
            <span>
              <i class="iconfont">&#xe621;</i>考试时间：{{i.ExamTime|FormatDate}}</span>
            <span>
              <i class="iconfont">&#xe6b4;</i>考试类型： {{i.Type | formatExamType}}
            </span>
          </div>
          <div class="exambtn">
            <el-button class="delbtn" :plain="true" type="text" @click="delExam(i.ID,i.ExamName)" size="small">
              <i class="iconfont">&#xe630;</i> 删除</el-button>
            <el-button :type="!i.IsSendMsg?'info':null" @click="sendExamNotice(i.ID)" :disabled="i.IsSendMsg">推送</el-button>
            <el-button type="success" class="type" @click="publishExam(i.ID)" :disabled="i.IsPublished">发布</el-button>
            <el-button type="warning" class="type" @click="$router.push('/examChart/'+i.ID)">报表</el-button>
            <el-button type="success" class="type" @click="$router.push('/exam/'+i.ID)">详情</el-button>
          </div>
        </li>
      </div>

      <div class="card panel">
        <div class="chart">
          <div class="header" style="margin-bottom:20px">
            <div class="label">选择数据来源：</div>
            <el-radio-group v-model="chartDataNum">
              <el-radio :label="1">最近1次</el-radio>
              <el-radio :label="2">最近2次</el-radio>
              <el-radio :label="3">最近3次</el-radio>
              <el-radio :label="4">最近4次</el-radio>
            </el-radio-group>
            <el-button type="primary" @click="getChart11" style="margin-left:20px">查询</el-button>
          </div>
          <div id="chart11" style="width:100%; height:450px;"></div>
        </div>

      </div>

    </div>

    <el-dialog title="创建新考试" :visible.sync="showAddExam">
      <el-form :model="newExamData" label-width="120px">
        <div>
          <el-form-item label="所属班级">
            <el-select v-model="newExamData.ClassID" placeholder="请选择班级" :disabled="true">
              <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试名称" :rules="[{ required: true}]">
            <el-input v-model="newExamData.ExamName" auto-complete="off" style="width:400px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试时间" :rules="[{ required: true}]">
            <el-date-picker v-model="newExamData.ExamTime" type="date" placeholder="选择日期" format="yyyy 年 M 月 d 日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试类型" :rules="[{ required: true}]">
            <el-radio-group v-model="newExamData.Type" @change="examType" size="small">
              <el-radio class="radio" label="0">自订</el-radio>
              <el-radio class="radio" label="1">期中考试</el-radio>
              <el-radio class="radio" label="2">期末考试</el-radio>
              <el-radio class="radio" label="3">周考</el-radio>
              <el-radio class="radio" label="4">月考</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学科">
            <el-checkbox-group v-model="newExamData.courses" class="checkbox">
              <el-checkbox :label="i.CourseId" v-for="i in courseList" :key="i.CourseId" class="item" :disabled="newExamData.Type!=0">
                {{i.name}}
                <span style="font-size:12px">（总分
                  <el-input v-model="i.FullScore" size="mini" style="width:50px;" placeholder="总分"></el-input>）
                </span>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="">
            <el-button type="success" @click.native="addNewExam">确 定</el-button>
            <el-button @click="showAddExam = false" :plain="true" type="success">取 消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import noData from '@//components/noData'
import echarts from 'echarts'

export default {
  components: { noData },
  data() {
    return {
      showAddExam: false,
      nodataImg: false,
      courseList: [
        {
          CourseId: 1,
          FullScore: 100,
          name: '语文'
        },
        {
          CourseId: 2,
          FullScore: 100,
          name: '数学'
        },
        {
          CourseId: 3,
          FullScore: 100,
          name: '英语'
        },
        {
          CourseId: 4,
          FullScore: 100,
          name: '物理'
        },
        {
          CourseId: 5,
          FullScore: 100,
          name: '化学'
        },
        {
          CourseId: 6,
          FullScore: 100,
          name: '生物'
        },
        {
          CourseId: 7,
          FullScore: 100,
          name: '历史'
        },
        {
          CourseId: 8,
          FullScore: 100,
          name: '地理'
        },
        {
          CourseId: 9,
          FullScore: 100,
          name: '政治'
        },
      ],
      newExamData: {
        Name: '',
        Remark: '',
        ClassID: '',
        Type: '4',
        ExamTime: '',
        ExamCourses: [],
        courses: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      data: [],
      chartDataType: ["1", "2", "3", "4"],
      chartDataStack: false,
      chartDataNum: 2,
      chart11: null,
      chart11_xAxis: [],
      chart11_legend: [],
      chart11_series: [],
      chartData: {}
    }
  },
  computed: {
    isClassAdmin() {
      return false
    },
    currentClassId() {
      return this.$store.state.currentClassId
    },
    currentClassInfo() {
      if (!this.$store.state.currentClassInfo) {
        return this.$store.dispatch('getCurrentClassInfo')
      } else {
        return this.$store.state.currentClassInfo
      }
    },
    currentClassList() {
      return this.$store.state.currentClassList
    },

  },
  filters: {
    formatExamType(val) {
      switch (val) {
        case 0:
          return '自定'
        case 1:
          return '期中考试'
        case 2:
          return '期末考试'
        case 3:
          return '周考'
        case 4:
          return '月考'
      }
    },
    FormatDate(val) {
      let data = new Date(val)
      return data.getFullYear() + " 年 " + (data.getMonth() + 1) + " 月 " + data.getDate() + " 日"
    }
  },
  methods: {
    sendExamNotice(id) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: this.currentClassId,
          examid: id
        }
        this.$API.sendExamSms(para).then(res => {
          this.$message.success('发送成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      })
    },
    publishExam(id) {
      this.$confirm('请确认考试成绩录入完整', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          classid: this.currentClassId,
          examid: id
        }
        this.$API.publishExam(para).then(res => {
          this.$message.success('发送成功')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      })
    },
    changeCurrentClass(n) {
      this.$store.commit('changeCurrentClass', n)
      this.$store.dispatch('getCurrentClassInfo')
      this.$store.dispatch('getExamList')
    },
    getData() {
      this.newExamData.ClassID = this.currentClassId
      this.$API.getClassExamList(this.currentClassId).then(res => {
        this.data = res
        if (this.data.length == 0) {
          this.nodataImg = true
        }
        let data = this.data
        for (var i = 0; i < data.length; i++) {
          let time = new Date(data[i].CreateTime)
          data[i].CreateTime = time.Format('MM-dd hh:mm')
        }
      })
    },
    getChart11() {
      this.chart11_xAxis = []
      this.chart11_legend = []
      this.chart11_series = []
      if (this.chart11) {
        this.chart11.clear()
      }
      let para = {
        ClassID: this.currentClassId,
        Type: this.chartDataType.join(',')
      }
      this.$API.GetSingleCourseScoreByClassID(para).then(res => {
        this.chartData = res.slice(0, this.chartDataNum)
        this.chart11_xAxis = this.chartData[0].Info.map(b => { return b.CourseName })
        this.chartData.forEach(o => {
          this.chart11_legend.push(o.ExamName)
          this.chart11_series.push({
            name: o.ExamName,
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            barCategoryGap: '30%',
            data: o.Info.map(b => { return b.AvgTotalScore }),
          })
        })
        this.setChart11()
      })
    },
    addNewExam() {
      this.newExamData.courses.forEach(obj => {
        let a = this.courseList.find(obj2 => {
          return obj2.CourseId == obj
        })
        this.newExamData.ExamCourses.push(a)
      })
      console.log(this.newExamData)
      if (!this.newExamData.ExamName) {
        this.$message.error('请填写考试名称')
      } else if (!this.newExamData.ExamTime) {
        this.$message.error('请添加考试时间')
      } else if (!this.newExamData.ExamCourses.length) {
        this.$message.error('请选择学科')
      } else {
        this.$API.addExam(this.newExamData).then(res => {
          this.$message.success('添加考试成功')
          this.newExamData = {
            Name: '',
            Remark: '',
            ClassID: '',
            Type: '',
            ExamCourses: [],
            courses: []
          }
          this.showAddExam = false
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
          this.newExamData = {
            Name: '',
            Remark: '',
            ClassID: '',
            Type: '',
            ExamCourses: [],
            courses: [1, 2, 3, 4, 5, 6, 7, 8, 9]
          }
        })
      }
    },
    examType(n) {
      if (n == 0) {
        this.newExamData.courses = []
      } else {
        this.newExamData.courses = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      }
    },
    delExam(id, name) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {}
        para.ExamID = id
        para.name = name

        this.$API.deleteExam(para).then(res => {
          this.$message.warning('删除考试 "' + name + ' "成功')
          this.getData()
        }).catch(err => {
          this.$message.error('删除考试失败：' + err.msg)
        })
      })
    },
    setChart11() {
      this.chart11.setOption({
        // color: ['#5793f3', '#d14a61', '#675bba'],
        title: {
          text: '最近考试对比',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.chart11_legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.chart11_xAxis,
            splitArea: {
              show: true
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitArea: {
              show: false
            },
          }
        ],
        series: this.chart11_series
      })
    }
  },
  created() {
    this.getData()
    this.getChart11()
  },
  mounted() {
    this.chart11 = echarts.init(document.getElementById('chart11'), 'macarons')
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  margin-bottom: 15px;
  .ml20 {
    margin-left: 20px;
  }
  .addBtn {
    text-align: center;
  }
  .examselect {
    margin: 0 20px;
  }
  .examlist {
    padding: 20px 0;
    .item {
      &:first-child {
        border-top: 1px solid @border;
      }
      border-bottom: 1px solid @border;
      padding: 20px 30px;
      position: relative;
      &:hover {
        background: @border;
      }
      &:hover .exambtn .delbtn {
        display: inline-block;
      }
      .examtitle {
        line-height: 30px;
        font-size: 18px;
      }
      .examinfo {
        line-height: 30px;
        color: #888;
        span {
          margin-right: 20px;
        }
        .iconfont {
          margin-right: 5px;
          color: @main;
          font-size: 16px;
        }
      }
      .time {
        padding-left: 10px;
        color: @grey;
      }
      .exambtn {
        position: absolute;
        right: 30px;
        top: 24px;
        .delbtn {
          display: none;
        }
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

.checkbox {
  // padding: 10px;
  .item {
    margin-right: 40px;
    margin-left: 0;
  }
}

.chart {
  margin-top: 30px;
  .header {
    line-height: 50px;
    border-bottom: 1px solid @border;
    .label {
      display: inline-block;
      width: 100px;
      padding-right: 20px;
      text-align: right;
    }
    .el-checkbox-group {
      display: inline-block;
    }
  }
  #chart10 {
    margin-top: 20px;
  }
}
</style>
