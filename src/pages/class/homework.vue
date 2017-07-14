<template>
  <div>
  
    <div class="title">
      <li>班级作业</li>
    </div>
  
    <div class="card" v-for="(i,index) in homework" :key="index">
      <div class="course">
        {{i.CourseName}}
      </div>
      <div class="header">{{i.Title}}</div>
      <div class="body">
        <div class="content" v-html="i.Content"></div>
        <div class="footer">
          <span class="time">{{i.CreateTime}}</span>
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
      homework:[],
    }
  },
  methods: {
    getData(){
      this.$API.getHomeworkList(this.$store.state.currentClassId).then(res=>{
        this.homework = res
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

.title {
  border-bottom: 1px solid @border;
  line-height: 50px;
  li {
    display: inline-block;
    padding: 5px 15px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: @main;
    }
  }
}

.card {
  margin: 15px 0;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  position: relative;
  .course {
    height: 50px;
    width: 125px;
    display: inline-block;
    background: @main;
    color:#fff;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    border-bottom-right-radius:20px;
  }
  .header{
    line-height: 50px;
    height:50px;
    text-align: center;
    font-weight: bold;
    margin-top:-50px;
  }
  .body {
    // width: calc(~"100% - 250px");
    // display: inline-block;
    line-height: 2rem;
    vertical-align: top;
    padding: 10px 30px;
    .footer {
      text-align: right;
      .time {
      padding-top:20px;
        color: @grey;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}
</style>
