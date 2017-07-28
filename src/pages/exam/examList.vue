<template>
  <div>
  
    <div class="card">
      <div class="title">
        当前班级:{{currentClassInfo.name}}
        <div class="btn">
          <el-select v-model="currentClass" placeholder="班级" @change="changeCurrentClass">
            <el-option :label="'班级'+i" :value="i" v-for="i in 10" :key="i"></el-option>
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
    </div>
  
    <div class="card">
      <div class="title">
        考试列表
      </div>
      <div class="content">
        <li class="item">
          <div class="index">1</div>
          <div class="name">三年级二班第一次月考</div>
          <div class="info">年级统一闭卷考试</div>
          <div class="type">全科目</div>
        </li>
        <li class="item" v-for="(i,index) in data" :key="index" @click="$router.push('/exam/'+i.ExamID)">
          <div class="index">{{index}}</div>
          <div class="name">i.Name</div>
          <div class="info">i.Remark</div>
          <div class="type">i.Type</div>
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
          <el-input v-model="newExamData.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="考试备注">
          <el-input v-model="newExamData.Remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-checkbox-group v-model="newExamData.Courses">
          <el-checkbox label="语文"></el-checkbox>
          <el-checkbox label="数学"></el-checkbox>
          <el-checkbox label="英语"></el-checkbox>
          <el-checkbox label="物理"></el-checkbox>
          <el-checkbox label="化学"></el-checkbox>
          <el-checkbox label="生物"></el-checkbox>
          <el-checkbox label="政治"></el-checkbox>
          <el-checkbox label="历史"></el-checkbox>
          <el-checkbox label="地理"></el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddExam = false">取 消</el-button>
        <el-button type="primary" @click="addNewExam">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentClass: '',
      showAddExam: false,
      newExamData: {
        Name: '',
        Remark: '',
        ClassID: '',
        Courses: ''
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
      console.log(this.data)
    },
    addNewExam() {

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
