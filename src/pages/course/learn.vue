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
            <div class="info">
              <!-- <span>总分：<b>500</b></span> -->
            </div>
      
            <el-table :data="summaryScore" height="600" border style="width: 100%">
              <el-table-column prop="StudentID" label="学号" width="130" align="center">
              </el-table-column>
              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>
              <el-table-column :prop="i.CourseName" :label="i.CourseName" v-for="i in data.CoursesList" :key="i.ID" align="center">
              </el-table-column> 
              <el-table-column prop="TotalScore" label="总分" sortable align="center" width="100">
              </el-table-column>
              <el-table-column prop="Ranking" label="总排名" align="center">
              </el-table-column>
            </el-table>
          </el-tab-pane>
      
          <el-tab-pane :label="i.CourseName" :name="i.CourseName" v-for="(i,index) in data.CoursesSummary" :key="index">
            <div class="info">
              <span>总分：<b>{{i.FullScore}}</b></span>  <span>平均分：<b>{{i.AverageScore}}</b></span>
              <div class="btn">
                <el-button size="small" type="warning" @click="startEdit=i.CourseName , scoreEdit = true" v-show="startEdit!=i.CourseName">批量修改</el-button>
                <el-button size="small" @click="startEdit=0,scoreEdit = false" v-show="startEdit==i.CourseName">取消</el-button>
                <el-button size="small" type="primary" @click="submitAllScore(i.CourseName),startEdit=0,scoreEdit = false" v-show="startEdit==i.CourseName">全部提交</el-button>
              </div>
            </div>
      
            <el-table :data="i.Scores" height="600" border style="width: 100%">
              <el-table-column prop="StudentID" label="学号" width="150" align="center">
              </el-table-column>
              <el-table-column prop="TrueName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="Score" label="分数" sortable align="center">
              </el-table-column>
              <el-table-column prop="Ranking" label="排名" align="center">
              </el-table-column>
              <el-table-column prop="Score" label="操作" width="160" align="center">
                <template scope="scope">
                  <el-input v-show="scoreEdit" :class="(startEdit!=scope.row.ExamCourseID)?'inline':null" size="small" :disabled="startEdit!=i.CourseName" v-model="scope.row.Score" type="number" placeholder="修改分数"></el-input>
                  <el-button type="text" @click.native="startEditOneScore(scope.row)" v-show="startEdit!=i.CourseName">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
      
        </el-tabs>


    
        <el-dialog title="修改成绩" :visible.sync="showEditOneScore" size="tiny">
          <el-form label-width="120px">
            <el-form-item label="当前考试">
              <el-input v-model="data.Name" :disabled="true" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="editScoreOneData.StudentID" :disabled="true" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="editScoreOneData.TrueName" :disabled="true" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="分数">
              <el-input v-model="editScoreOneData.Score" style="width:100px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitEditOneScore">确 定</el-button>
              <el-button type="success" :plain="true" @click="showEditOneScore = false">取 消</el-button>
            </el-form-item>
          </el-form>

        </el-dialog>
      </div>
  
    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:{},
      startEdit: 0,
      showEditOneScore: false,
      editScoreOneData: {},
      currentCourse: '成绩汇总',
      scoreEdit: false
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
      this.$API.getExamInfo(this.$route.params.examId).then(res=>{
        this.data=res
        let data = this.data
        let time = new Date(data.CreateTime)
        data.CreateTime = time.Format('MM-dd hh:mm')
      })
    }
  },
  created() {
    this.getData()
  },
  mounted(){
  },
  watch:{
    '$route':'getData'
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
