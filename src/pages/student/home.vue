<template>
  <div>
  
    <div class="left">

      <router-view></router-view>
  
    </div>

    <div class="right">
      <div class="card">
        <div class="header">
          <img :src="currentStudent.Headimgurl">
        </div>
        <div class="content">
          <p>{{currentStudent.TrueName}}</p>
          <p>{{currentStudent.school}}</p>
          <p>{{currentStudent.Class}}</p>
          <p>学号：{{currentStudent.StudentID}}</p>
        </div>
      </div>

      <div class="card" v-for="(i,index) in parents" :key="index">
        <div class="header">
          <img :src="i.ParentHeadimgurl">
        </div>
        <div class="content">
          <p>{{i.ParentType}}： {{i.ParentTrueName}}</p>
          <p>手机：{{i.ParentPhone}}</p>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      currentStudent:{
        school:'',
        Headimgurl:'',
        TrueName:'',
        StudentID:'',
        Class:'',
      },
      parents:[],
    }
  },
  methods: {
    getData(){
      this.$API.getStudentInfo(this.$store.state.currentStudentId).then(res=>{
        this.currentStudent.school=res.School.Name
        this.currentStudent.Class=res.Class.Name
        this.currentStudent.Headimgurl=res.user.Headimgurl
        this.currentStudent.TrueName=res.user.TrueName
        this.currentStudent.StudentID=res.user.StudentID
        this.parents = res.Parents
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.left {
  width: calc(~"100% - 280px");
  float: left;
  // padding: 10px;
}

.right {
  float: right;
  width: 260px;
  // padding: 20px 10px;
  .card {
    border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 15px;
    .header {
      height: 75px;
      position: relative;
      background: @main;
      img {
        width: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
      }
    }
    .content {
      margin-top: 60px;
      line-height: 2em;
      padding-bottom: 20px;
    }
  }
}
</style>
