<template>
  <div>
  
    <div class="card">
      <div class="title">
        当前考试:{{data.Name}}  
        <span class="time"> 考试时间： {{data.CreateTime}}</span>
      </div>
    </div>
  
    <el-tabs v-model="currentCourse" type="border-card">
  
      <el-tab-pane label="成绩汇总" name="成绩汇总">
        <div class="info">
          总分：500
        </div>
  
        <el-table :data="summaryScore" height="600" border style="width: 100%">
          <el-table-column prop="StudentID" label="学号" width="150" sortable>
          </el-table-column>
          <el-table-column prop="TrueName" label="姓名">
          </el-table-column>
          <el-table-column :prop="i.CourseName" :label="i.CourseName" sortable v-for="i in data.CoursesList" :key="i.ID">
          </el-table-column> 
          <el-table-column prop="TotalScore" label="总分" sortable>
          </el-table-column>
          <el-table-column prop="Ranking" label="总排名" sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
  
      <el-tab-pane :label="i.CourseName" :name="i.CourseName" v-for="(i,index) in data.CoursesSummary" :key="index">
        <div class="info">
          总分：{{i.FullScore}} 平均分：{{i.AverageScore}}
          <div class="btn">
            <el-button type="warning" @click="startEdit=i.CourseName" v-show="startEdit!=i.CourseName">批量修改</el-button>
            <el-button @click="startEdit=0" v-show="startEdit==i.CourseName">取消修改</el-button>
            <el-button type="primary" @click="submitAllScore(i.CourseName)" v-show="startEdit==i.CourseName">全部提交</el-button>
          </div>
        </div>
  
        <el-table :data="i.Scores" height="600" border style="width: 100%">
          <el-table-column prop="StudentID" label="学号" width="150" sortable>
          </el-table-column>
          <el-table-column prop="TrueName" label="姓名">
          </el-table-column>
          <el-table-column prop="Score" label="分数" sortable>
          </el-table-column>
          <el-table-column prop="Ranking" label="排名" sortable>
          </el-table-column>
          <el-table-column prop="Score" label="编辑分数" width="200">
            <template scope="scope">
              <el-input :class="(startEdit!=scope.row.ExamCourseID)?'inline':null" size="small" :disabled="startEdit!=i.CourseName" v-model="scope.row.Score" type="number" placeholder="修改分数"></el-input>
              <el-button @click.native="startEditOneScore(scope.row)" v-show="startEdit!=i.CourseName">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
  
    </el-tabs>
  
    <el-dialog title="修改单条成绩" :visible.sync="showEditOneScore">
      <el-form label-width="70px">
        <el-form-item label="当前考试">
          <el-input v-model="data.Name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="editScoreOneData.StudentID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editScoreOneData.TrueName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="editScoreOneData.Score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditOneScore = false">取 消</el-button>
        <el-button type="primary" @click="submitEditOneScore">确 定</el-button>
      </div>
    </el-dialog>
  
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
      currentCourse: '成绩汇总'
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
      let editData=[]
      editData.push(this.editScoreOneData)
      this.$API.addExamScore(editData).then(res=>{
        this.$message.success('添加成绩成功')
        this.editScoreOneData={}
        this.showEditOneScore = false
      }).catch(err=>{
        this.$message.error(err)
      })
    },
    submitAllScore(n){
      let allData = this.data.CoursesSummary.find(el=>{
        return el.CourseName == n
      })
      this.$API.addExamScore(allData.Scores).then(res=>{
        this.$message.success('添加成绩成功')
        this.editScoreOneData={}
      }).catch(err=>{
        this.$message.error(err)
      })
    },
    getData() {
      this.$API.getExamInfo(this.$route.params.examId).then(res=>{
        this.data=res
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
  margin: 15px 0;
  padding: 15px;
  .title {
    border-bottom: 1px solid @border;
    line-height: 50px;
    padding-left: 30px;
    font-size: 1.5rem;
    .btn {
      float: right;
    }
  }
  .content {
    padding: 20px 0;
    .item {
      border-bottom: 1px dotted @border;
      padding: 10px;
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
  line-height: 50px;
  .btn {
    float: right;
  }
}

.inline {
  display: inline-block;
  width: 90px;
}
</style>
