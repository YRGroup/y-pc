<template>
  <div>
  
    <div class="card">
  
      <div class="info">
        <div class="header">资料</div>
        <div class="content">
          <div class="headImg">
            <img :src="data.Headimgurl">
          </div>
          <div class="item">
            <span class="title">姓名：</span>
            <span>{{data.TrueName}}</span>
          </div>
          <div class="item">
            <span class="title">学校：</span>
            <span>{{data.school.Name}}</span>
          </div>
          <div class="item">
            <span class="title">班级：</span>
            <span>{{data.class.Name}}</span>
          </div>
          <div class="item">
            <span class="title">性别：</span>
            <span>{{data.Sex}}</span>
          </div>
          <div class="item">
            <span class="title">手机：</span>
            <span>{{data.Mobilephone}}</span>
          </div>
          <div class="item">
            <span class="title">身份证号：</span>
            <span>{{data.IDCard}}</span>
          </div>
          <div class="item">
            <span class="title">学号：</span>
            <span>{{data.StudentID}}</span>
          </div>
          <div class="item">
            <span class="title">民族：</span>
            <span>{{data.Nation}}</span>
          </div>
          <div class="item">
            <span class="title">生日：</span>
            <span>{{data.Birthday}}</span>
          </div>
          <div class="item">
            <span class="title">地址：</span>
            <span>{{data.Address}}</span>
          </div>
        </div>
      </div>
  
      <div class="info">
        <div class="header">家长</div>
        <div class="content">
          <li v-for="(i,index) in parents" :key="index">
            <div class="item">
              <span class="title">姓名：</span>
              <span>{{i.ParentTrueName}}</span>
            </div>
            <div class="item">
              <span class="title">关系：</span>
              <span>{{i.ParentType}}</span>
            </div>
            <div class="item">
              <span class="title">手机：</span>
              <span>{{i.ParentPhone}}</span>
            </div>
            <div class="btn">
              <el-button @click="$router.push('/msg/'+i.ParentMeid)">发消息</el-button>
            </div>
            <hr />
          </li>
  
        </div>
      </div>
  
      <div class="info">
        <div class="header">一卡通</div>
        <div class="content">
          <div class="item">
            <span class="title">姓名：</span>
            <span>李明</span>
          </div>
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'studentInfo',
  components: {},
  data() {
    return {
      parents: [],
      data: {
        school:{},
        class:{}
      }
    }
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.$API.getStudentInfo(this.$route.query.id).then(res => {
          this.data = res.user
          this.data.school = res.School
          this.data.class = res.Class
          this.parents = res.Parents
        })
      } else {
        this.$API.getStudentInfo(this.$store.state.currentStudentId).then(res => {
          this.data = res.user
          this.data.school = res.School
          this.data.class = res.Class
          this.parents = res.Parents
        })
      }
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
@import '../../../style/theme.less';

.card {
  margin: 15px 0;
  padding: 10px 20px;
  border: 1px solid @border;
  background: #fff;
  .info {
    border-bottom: 1px dotted @border;
    position: relative;
    .header {
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
    }
    .content {
      padding: 20px 20%;
      li{
        position: relative;
      }
      .headImg {
        position: absolute;
        left: 0;
        img {
          width: 120px;
          border-radius: 50%;
        }
      }
      .item {
        line-height: 30px;
        .title {
          color: @grey;
        }
      }
      .btn{
        position: absolute;
        top:1em;
        right:1em;
      }
    }
  }
}
</style>
