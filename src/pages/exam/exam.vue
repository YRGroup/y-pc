<template>
  <div>
  
    <div class="card">
      <div class="maintitle">
        <i class="iconfont">&#xe737;</i>考试详情
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/examList')" type="success" :plain="true">返回列表</el-button>
        </span>
      </div>
      <div class="panel">
        <div class="examinfo">
          <p class="title">{{data.Name}}</p>
          <!-- <p>当前考试:{{data.Remark}}</p> -->
          <p class="examtime">创建时间：{{data.CreateTime}}</p>
        </div>
        <el-tabs v-model="currentCourse">
    
          <el-tab-pane label="成绩汇总" name="成绩汇总">
            <!-- <div class="info">
              总分：500
            </div> -->
    
            <el-table :data="summaryScore" height="750" border style="width: 100%">
              <el-table-column prop="StudentID" label="学号" width="150" sortable  align="center">
              </el-table-column>
              <el-table-column prop="TrueName" label="姓名"  align="center">
              </el-table-column>
              <!-- <el-table-column :label="i.CourseName" sortable v-for="(i,index) in data.StudentSummary[0].Courses" :key="index">
                  <template scope="scope">
                    <div v-if="data.StudentSummary[scope.$index].Courses[index]">{{data.StudentSummary[scope.$index].Courses[index].Score}}</div> 
                  </template>
                </el-table-column>  -->
    
              <el-table-column :prop="i" :label="i" sortable v-for="i in courseList" :key="i"  align="center">
              </el-table-column>
              <el-table-column prop="TotalScore" label="总分" sortable  align="center">
              </el-table-column>
              <el-table-column prop="Ranking" label="班级总排名" sortable  align="center">
              </el-table-column>
            </el-table>
          </el-tab-pane>
    
          <el-tab-pane :label="i.CourseName" :name="i.CourseName" v-for="(i,index) in data.CoursesSummary" :key="index">
            <div class="info">
               <span>总分：<b>{{i.FullScore}}</b></span>  <span>平均分：<b>{{i.AverageScore}}</b></span>
              <div class="btn">
                <el-button size="small" type="warning" @click="startEdit=i.CourseName" v-show="startEdit!=i.CourseName">批量修改</el-button>
                <el-button size="small" :plain="true" type="success" @click="startEdit=0" v-show="startEdit==i.CourseName">取消</el-button>
                <el-button size="small"  type="success" @click="submitAllScore(i.CourseName)" v-show="startEdit==i.CourseName">全部提交</el-button>
              </div>
            </div>
    
            <el-table :data="i.Scores" height="750" border style="width: 100%">
              <el-table-column prop="StudentID" label="学号" width="150" sortable  align="center">
              </el-table-column>
              <el-table-column prop="TrueName" label="姓名"  align="center">
              </el-table-column>
              <el-table-column prop="Score" label="分数" sortable  align="center">
              </el-table-column>
              <el-table-column prop="Ranking" label="班级排名" sortable  align="center">
              </el-table-column>
              <el-table-column prop="Score" label="操作" width="220"  align="center">
                <template scope="scope">
                  <el-input :class="(startEdit!=scope.row.ExamCourseID)?'inline':null" size="small" :disabled="startEdit!=i.CourseName" v-model="scope.row.Score" type="number" placeholder="修改分数"></el-input>
                  <el-button @click.native="startEditOneScore(scope.row)" v-show="startEdit!=i.CourseName" type="text">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
    
        </el-tabs>
    
        <el-dialog title="修改成绩" :visible.sync="showEditOneScore">
          <el-form label-width="220px">
            <el-form-item label="当前考试">
              <el-input v-model="data.Name" :disabled="true" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="editScoreOneData.StudentID" :disabled="true" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="editScoreOneData.TrueName" :disabled="true" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="分数">
              <el-input v-model="editScoreOneData.Score" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitEditOneScore">确 定</el-button>
              <el-button type="success" :plain="true" @click="showEditOneScore = false">取 消</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            
          </div>
        </el-dialog>
      </div>
  
    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      fakeData: [{
        StudentID: '123',
        TrueName: '张三',
        Score1: 50,
        Score2: 60,
        rank: 10
      }],
      courseList: [

      ],
      startEdit: 0,
      showEditOneScore: false,
      editScoreOneData: {},
      currentCourse: '成绩汇总'
    }
  },
  computed: {
    data() {
      return this.$store.state.currentExamList.find(val => {
        return val.ExamID == this.$route.params.examId
      })
    },
    summaryScore() {
      let all = []
      this.data.StudentSummary[0].Courses.forEach(c => {
        this.courseList.push(c.CourseName)
      })
      this.data.StudentSummary.forEach((obj, index) => {
        let a = {}
        a.StudentID = obj.StudentID
        a.TrueName = obj.TrueName
        a.TotalScore = obj.TotalScore
        a.Ranking = index + 1
        obj.Courses.forEach((c, n) => {
          a[c.CourseName] = c.Score
        })
        all.push(a)
      })
      return all
    },
    currentClassInfo() {
      if (!this.$store.state.currentClassInfo) {
        return this.$store.dispatch('getCurrentClassInfo')
      } else {
        return this.$store.state.currentClassInfo
      }
    },
    courselist() {
      return this.data.Courses
    }
  },
  methods: {
    sort(a, b) {
      console.log(a)
    },
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
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getData() {

    }
  },
  created() {
    this.getData()
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  background: #fff;
  .examinfo {
    text-align: center;
    .title{
      font-size: 24px;
      line-height: 36px;
    }
    .examtime{
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
  span{
    margin-right: 20px;
  }
  b{
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
.el-tabs{
  margin:10px 0;
  padding:10px 20px; 
  background: #f8f8f8;
  .el-tabs__nav-wrap{
    background: red;
  }
}
</style>
