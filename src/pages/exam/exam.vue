<template>
  <div>
  
    <div class="card">
  
      <div class="title">
        当前考试:{{data.Name}}
      </div>
  
      <div class="content">
        <p>当前考试:{{data.Name}}</p>
        <p>当前考试:{{data.Remark}}</p>
      </div>
  
    </div>
  
    <el-tabs v-model="currentCourse" type="border-card">
  
      <el-tab-pane :label="'course'+i.CourseID" :name="'course'+i.CourseID" v-for="(i,index) in data.Courses" :key="index">
        <div class="info">
          <div>
            总分：{{i.FullScore}}
          </div>
          <div class="btn">
            <el-button type="primary">编辑</el-button>
          </div>
        </div>
  
        <el-table :data="i.Scores" height="250" border style="width: 100%">
          <el-table-column prop="StudentID" label="学号" width="180">
          </el-table-column>
          <el-table-column prop="TrueName" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="Score" label="分数" sortable>
          </el-table-column>
          <el-table-column prop="Score" label="排名">
          </el-table-column>
          <el-table-column prop="Score" label="编辑分数">
            <template scope="scope">
               <el-input v-model="scope.row.Score" type="number" placeholder="修改分数"></el-input> 
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
  
    </el-tabs>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCourse: 'course1'
    }
  },
  computed: {
    data() {
      return this.$store.state.currentExamList.find(val => {
        return val.ExamID = this.$route.params.examId
      })
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
    getData() {
      console.log(this.data)
    }
  },
  created() {
    this.getData()
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
</style>
