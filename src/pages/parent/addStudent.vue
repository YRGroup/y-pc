<template>
  <div>
    <div class="card">
      <!-- <div class="header">添加学生</div> -->
      <div class="content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model.trim="data.truename"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model.trim="data['student_id']"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <template>
              <el-radio class="radio" v-model="data.type" label="1">爸爸</el-radio>
              <el-radio class="radio" v-model="data.type" label="2">妈妈</el-radio>
              <el-radio class="radio" v-model="data.type" label="3">爷爷</el-radio>
              <el-radio class="radio" v-model="data.type" label="4">奶奶</el-radio>
              <el-radio class="radio" v-model="data.type" label="5">家人</el-radio>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAdd">确认添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <div class="btn">

        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      data: {
        truename: '',
        'student_id': '',
        type: ''
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    submitAdd() {
      if (this.data.truename == '') {
        this.$message.error('请填写学生姓名')
      } else if (this.data['student_id'] == '') {
        this.$message.error('请填写学生学号')
      } else {
        this.$API.addStudent(this.data).then(res => {
          this.$message.success('学生绑定成功！')
          this.$store.dispatch('getCurrentUser')
          this.$router.push('/class')
          this.getData()
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
  },
  created() {
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  margin: 15px 0;
  font-size: 13px;
  position: relative;
  background: #fff;
  .img {
    display: inline-block;
    padding: 20px;
    img {
      width: 50px;
    }
  }
  .header {
    line-height: 40px;
    vertical-align: middle;
    padding-left: 30px;
  }
  .content {
    width: calc(~"100% - 120px");
    padding: 10px;
    margin-left: 25px;
    line-height: 1.5rem;
  }
  .footer {
    padding: 10px 30px;
    .btn {
      text-align: right;
      padding: 0 15px;
    }
  }
}
</style>
