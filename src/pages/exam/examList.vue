<template>
  <div>

    <div class="card panel">
      <div style="text-align:center">
        <el-button @click="showAddExam=true" type="success" class="ml20 addBtn">添加新考试</el-button>
      </div>

      <no-data v-if="nodataImg"></no-data>
      <div class="examlist" v-else>
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
            <el-button :type="!i.IsSendMsg?'info':null" @click="sendExamNotice(i.ID)" :disabled="i.IsSendMsg">发通知</el-button>
            <el-button type="success" class="type" @click="$router.push('/exam/'+i.ID)">录入成绩</el-button>
            <el-button type="warning" class="type" @click="$router.push('/examChart/'+i.ID)">成绩报表</el-button>
          </div>
        </li>
      </div>

      <div class="chart">
        <div id="chart10" style="width:100%; height:400px;"></div>
      </div>
    </div>

    <el-dialog title="创建新考试" :visible.sync="showAddExam" size="tiny">
      <el-form :model="newExamData" label-width="100px">
        <div>
          <el-form-item label="所属班级">
            <el-select v-model="newExamData.ClassID" placeholder="请选择班级">
              <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试名称" :rules="[{ required: true}]">
            <el-input v-model="newExamData.ExamName" auto-complete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试时间" :rules="[{ required: true}]">
            <el-date-picker v-model="newExamData.ExamTime" type="date" placeholder="选择日期" format="yyyy 年 M 月 d 日">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="考试类型">
            <el-radio-group v-model="newExamData.Type" @change="examType">
              <el-radio class="radio" label="0">自定</el-radio>
              <el-radio class="radio" label="1">期中考试</el-radio>
              <el-radio class="radio" label="2">期末考试</el-radio>
              <el-radio class="radio" label="3">周考</el-radio>
              <el-radio class="radio" label="4">月考</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学科" :rules="[{ required: true}]">
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
import echarts from 'echarts';

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
        Type: '',
        ExamTime: '',
        ExamCourses: [],
        courses: []
      },
      data: [],
      chart10: null,
      chart10_xAxis: [],
      chart10_legend: [],
      chart10_series: [],
      chartData: {}
    }
  },
  computed: {
    isClassAdmin() {
      return false
    },
    currentClass() {
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
    }
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
          classid: this.currentClass,
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
    changeCurrentClass(n) {
      this.$store.commit('changeCurrentClass', n)
      this.$store.dispatch('getCurrentClassInfo')
      this.$store.dispatch('getExamList')
    },
    getData() {
      this.newExamData.ClassID = this.currentClass
      this.$API.getClassExamList(this.currentClass).then(res => {
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
    getChart() {
      this.$API.GetSingleCourseScoreByClassID(this.currentClass).then(res => {
        this.chartData = res
        this.chart10_legend = this.chartData[0].Info.map(b => { return b.CourseName })
        this.chart10_legend.forEach(o => {
          let seriesData = []
          this.chartData.forEach(b => {
            seriesData.push(b.Info.find(j => { return j.CourseName == o }).AvgTotalScore)
          })
          this.chart10_series.push({
            name: o,
            type: 'line',
            stack: '总量',
            data: seriesData
          })
        })
        this.chartData.forEach(o => {
          this.chart10_xAxis.push(o.ExamName)
        })
        this.setChart10()
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
    setChart10() {
      this.chart10.setOption({
        title: {
          text: '各科平均分走势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.chart10_legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chart10_xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: this.chart10_series
      })
    },
  },
  created() {
    this.getData()
    this.getChart()
  },
  mounted() {
    this.chart10 = echarts.init(document.getElementById('chart10'))
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  min-height: 600px;
  margin-bottom: 15px; // text-align: center;
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
</style>
