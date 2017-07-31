<template>
  <div>
<!--   
    <div class="card panel">
      <div class="title">
        当前班级:{{currentClassInfo.name}}
        <div class="btn">
          <el-select v-model="currentClass" placeholder="班级" @change="changeCurrentClass">
            <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="content">
        当前班级:{{currentClassInfo.name}}
      </div>
      <div class="footer">
        <div class="btn">
          <el-button @click="showAddExam=true" size="small">添加新考试</el-button>
        </div>
      </div>
    </div> -->
  
    <div class="card panel">
      <div class="examselect">
          <el-select v-model="currentClass" placeholder="班级" @change="changeCurrentClass">
            <el-option :label="'班级'+i" :value="i" v-for="i in 10" :key="i"></el-option>
          </el-select>
          <el-button @click="showAddExam=true" type="success" class="ml20">添加新考试</el-button>
      </div>
      <div class="examlist">
        <li class="item" v-for="(i,index) in data" :key="index" @click="$router.push('/exam/'+i.ExamID)">
          <!-- <div class="index">{{index+1}}</div> -->
          <div class="examtitle">{{i.Name}}</div>
          <div class="examinfo">
            <span><i class="iconfont">&#xe621;</i>创建时间：{{i.CreateTime}}</span>
            <span><i class="iconfont">&#xe6b4;</i>学科：语文</span>
          </div>
          <div class="exambtn">
            <el-button :plain="true" type="danger" @click="delExam(i.ExamID)">删除</el-button>
            <el-button type="success" class="type">查看成绩</el-button>
          </div>
        </li>
      </div>
    </div>
  
    <el-dialog title="创建新考试" :visible.sync="showAddExam">
      <el-form :model="newExamData" label-width="100px">
        <el-form-item label="所属班级">
          <el-select v-model="newExamData.ClassID" placeholder="请选择班级">
            <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input v-model="newExamData.ExamName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试类别">
          <el-radio class="radio" v-model="newExamData.Type" label="1">备选项</el-radio>
          <el-radio class="radio" v-model="newExamData.Type" label="2">备选项</el-radio>
          <el-input v-model="newExamData.Type" auto-complete="off"></el-input>
        </el-form-item>
  
        <el-checkbox-group v-model="newExamData.courses" class="checkbox">
          <el-checkbox :label="i.CourseId" v-for="i in courseList" :key="i.id" class="item">
            {{i.name}}，总分：
            <el-input v-model="i.FullScore" size="mini" style="width:50px;" placeholder="总分"></el-input>
          </el-checkbox>
        </el-checkbox-group>
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddExam = false" :plain="true" type="success">取 消</el-button>
        <el-button type="success" @click="addNewExam">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentClass: 1,
      showAddExam: false,
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
        ClassID: 1,
        ExamCourses:[],
        courses:[]
      },
    }
  },
  computed: {
    isClassAdmin() {
      return false
    },
    data() {
      return this.$store.state.currentExamList
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
  methods: {
    changeCurrentClass(n) {
      this.$store.commit('changeCurrentClass', n)
      this.$store.dispatch('getCurrentClassInfo')
      this.$store.dispatch('getExamList')
    },
    getData() {
      this.$store.dispatch('getExamList')
      this.currentClass = this.$store.state.currentClassId
      this.newExamData.ClassID = this.currentClass
    },
    addNewExam() {
      this.newExamData.courses.forEach(obj => {
        let a = this.courseList.find(obj2 => {
          return obj2.CourseId == obj
        })
        console.log(a)
        this.newExamData.ExamCourses.push(a)
      })
      this.$API.addExam(this.newExamData).then(res => {
        this.$message.success('添加考试成功')
        this.newExamData = {}
        this.showAddExam = false
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    delExam(n) {
      let para = {}
      para.ExamID = n
      this.$API.deleteExam(para).then(res => {
        this.$message.warning('删除考试' + n + '成功')
        this.getData()
      }).catch(err => {
        this.$message.error('删除考试失败：'+err.msg)
      })
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
  margin-bottom: 15px;
  .ml20{
    margin-left: 20px;
  }
  .examselect{
    margin:0 20px;
  }
  .examlist {
    padding: 20px 0;
    .item {
      &:first-child{
        border-top: 1px solid @border;
      }
      border-bottom: 1px solid @border;
      padding: 20px 30px;
      position: relative;
      &:hover {
        background: @border;
      }
      .examtitle {
        line-height: 30px;
        font-size: 18px;
      }
      .examinfo{
        line-height: 30px;
        color: #888;
        span{
          margin-right: 20px;
        }
        .iconfont{
          margin-right: 8px;
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
  padding: 10px;
  .item {
    margin: 10px;
  }
}
</style>
