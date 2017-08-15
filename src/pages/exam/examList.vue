<template>
  <div>
  
    <div class="card panel">
      <div class="examselect">
          <el-select v-model="currentClass" placeholder="班级" @change="changeCurrentClass">
            <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
          </el-select>
          <el-button @click="showAddExam=true" type="success" class="ml20">添加新考试</el-button>
      </div>

      <no-data v-if="nodataImg"></no-data>
      <div class="examlist" v-else>
        <li class="item" v-for="(i,index) in data" :key="index">
           <!-- <div class="index">{{index+1}}</div>  -->
          <div class="examtitle">{{i.ExamName}}</div>
          <div class="examinfo">
            <span><i class="iconfont">&#xe621;</i>创建时间：{{i.CreateTime}}</span>
            <span><i class="iconfont">&#xe6b4;</i>学科：
               <span v-if="i.Courses.length>3">多学科</span>
              <span v-else v-for="c in i.Courses" :key="c.ID">{{c.CourseName}}</span> 
            </span>
          </div>
          <div class="exambtn">
            <el-button class="delbtn" :plain="true" type="text" @click="delExam(i.ID,i.ExamName)" size="small"><i class="iconfont">&#xe630;</i> 删除</el-button>
            <el-button type="info">发通知</el-button>
            <el-button type="success" class="type" @click="$router.push('/exam/'+i.ID)">查看成绩</el-button>
          </div>
        </li>
      </div>
    </div>
  
    <el-dialog title="创建新考试" :visible.sync="showAddExam"  size="tiny">
      <el-form :model="newExamData" label-width="100px">
        <el-form-item label="所属班级">
          <el-select v-model="newExamData.ClassID" placeholder="请选择班级">
            <el-option :label="i.name" :value="i.id" v-for="i in currentClassList" :key="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input v-model="newExamData.ExamName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试科目">
          <el-radio-group v-model="newExamData.Type" @change="examType">
            <el-radio class="radio" label="0">全学科</el-radio>
            <el-radio class="radio" label="1">自选学科</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="newExamData.courses" class="checkbox">
            <el-checkbox :label="i.CourseId" v-for="i in courseList" :key="i.CourseId" class="item">
              {{i.name}} 
              <span style="font-size:12px">（总分
                <el-input v-model="i.FullScore" size="mini" style="width:50px;" placeholder="总分"></el-input>）
              </span>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click.native="addNewExam">确 定</el-button>
          <el-button @click="showAddExam = false" :plain="true" type="success">取 消</el-button>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
       
      </div> -->
    </el-dialog>
  
  </div>
</template>

<script>
import noData from '@//components/noData'

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
        ExamCourses: [],
        courses: []
      },
      data:[]
    }
  },
  computed: {
    isClassAdmin() {
      return false
    },
    // data() {
    //   return this.$store.state.currentExamList
    // },
    currentClass(){
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
  methods: {
    changeCurrentClass(n) {
      this.$store.commit('changeCurrentClass', n)
      this.$store.dispatch('getCurrentClassInfo')
      this.$store.dispatch('getExamList')
    },
    getData() {
      this.newExamData.ClassID = this.currentClass
      this.$API.getClassExamList(this.currentClass).then(res=>{
        this.data = res
        if(this.data.length == 0){
          this.nodataImg = true
        }
        let data = this.data
        for(var i = 0; i < data.length; i++){
          let time = new Date(data[i].CreateTime)
          data[i].CreateTime = time.Format('MM-dd hh:mm')
        }
      })
    },
    addNewExam() {
      this.newExamData.courses.forEach(obj => {
        let a = this.courseList.find(obj2 => {
          return obj2.CourseId == obj
        })
        this.newExamData.ExamCourses.push(a)
      })
      this.$API.addExam(this.newExamData).then(res => {
        this.$message.success('添加考试成功')
        this.newExamData = {}
        this.showAddExam = false
        this.getData()
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    examType(n) {
      if(n==0){
        this.newExamData.courses=[1,2,3,4,5,6,7,8,9]
      }
      if(n==1){
        this.newExamData.courses=[]
      }
    },
    delExam(id,name) {
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
      &:hover .exambtn .delbtn{
        display: inline-block;
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
        .delbtn{
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
