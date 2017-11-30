<template>
  <div>
    <has-no-student v-if="$store.getters.hasNoStudent && $store.getters.role == '家长'"></has-no-student>
    <div v-else>
      <div class="left">
    
        <router-view></router-view>
    
      </div>
    
      <div class="right">
        <div class="classInfo classbox">
          <div class="header">
            <h3>{{classInfo.name}}</h3>
            <!-- <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg"> -->
          </div>
          <div class="content">
            
            <div class="info">
              <span>班主任：{{classInfo.teacher?classInfo.teacher.TrueName:'暂无'}}</span>
              <span>人数：{{classInfo.student_count}}</span>
            </div>
          </div>
        </div>
    
        <div class="card">
          <div class="title">
            联系人
          </div>
          <div class="content">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item :title="'老师（'+teachers.length+ '）'" name="1">
                <li class="item" v-for="(i,index) in teachers" :key="index">
                  <div class="top" @click="$router.push('/t/?id='+i.Meid)">
                    <div class="img">
                      <!-- <img :src="i.Headimgurl" v-if="i.Headimgurl!='http://pic.yearnedu.com/himg.png' && i.Headimgurl!=''">
                      <div class="headTextImg" v-else>{{(i.TrueName ||'教师').substr(0,1)}}</div> -->
                      <img :src="i.Headimgurl">
                    </div>
                    <div class="name">
                      {{i.TrueName}}
                      <span>{{i.Course}}</span>
                    </div>
                  </div>
    
                  <div class="bottom">
                    <div class="tel">{{i.Mobilephone}}</div>
                    <el-button size="mini" class="btn" @click="$router.push('/msg/'+i.Meid)">消息</el-button>
                  </div>
    
                </li>
              </el-collapse-item>
              <el-collapse-item :title="'学生（'+students.length+ '）'" name="2">
                <li class="item" v-for="(i,index) in students" :key="index">
    
                  <div class="top" @click="role=='老师'?$router.push('/s/?id='+i.Meid):null">
                    <div class="img">
                      <!-- <img :src="i.Headimgurl" v-if="i.Headimgurl!='http://pic.yearnedu.com/himg.png' && i.Headimgurl!=''">
                      <div class="headTextImg" v-else>{{i.TrueName.substr(0,1)}}</div> -->
                      <img :src="i.Headimgurl">
                    </div>
                    <div class="name">{{i.TrueName}}</div>
                  </div>
    
                  <div class="bottom" v-show="role=='老师' || role=='学生'">
                    <div class="tel" >学号：{{i.StudentID}}</div>
                    <el-button size="mini" class="btn" @click="$router.push('/msg/'+i.Meid)">消息</el-button>
                  </div>
    
                </li>
              </el-collapse-item>
              <el-collapse-item :title="'家长（'+parents.length+ '）'" name="3">
                <li class="item" v-for="(i,index) in parents" :key="index">
    
                  <div class="top">
                    <div class="img">
                      <!-- <img :src="i.ParentHeadimgurl" v-if="i.ParentHeadimgurl!='http://pic.yearnedu.com/himg.png' && i.ParentHeadimgurl!=''">
                      <div class="headTextImg" v-else>{{i.StudentTrueName.substr(0,1) || 'null'}}</div>  -->
                      <img :src="i.ParentHeadimgurl">
                    </div>
                    <div class="name">
                      {{i.ParentTrueName}}
                      <span> - {{i.StudentTrueName}}</span>
                    </div>
                  </div>
    
                  <div class="bottom" v-show="role=='老师'">
                    <div class="tel">{{i.ParentPhone}}</div>
                    <el-button size="mini" class="btn" @click="$router.push('/msg/'+i.ParentMeid)">消息</el-button>
                  </div>
    
                </li>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
    
      </div>
    </div>
  
  </div>
</template>

<script>
import hasNoStudent from '@/components/hasNoStudent'

export default {
  components: {  hasNoStudent },
  data() {
    return {
      activeName: '0',
      classInfo: {
        name: '',
        teacher: '',
        student_count: '',
      },
      teachers: [],
      students: [],
      parents: [],
    }
  },
  computed: {
    classId() {
      return this.$store.state.currentClassId
    },
    showBackBtn() {
      let url = this.$route.path.slice(0, 4)
      if (url == '/msg') {
        return true
      } else {
        return false
      }
    },
    role() {
      return this.$store.getters.role
    },
  },
  methods: {
    getData() {
      this.getClassInfo()
      this.getStudentList()
      this.getParentList()
      this.getTeacherList()
    },
    getClassInfo() {
      this.$API.getClassInfo(this.classId).then(res => {
        this.classInfo = res
      })
    },
    getStudentList() {
      this.$API.getStudentList(this.classId).then(res => {
        this.students = res
      })
    },
    getParentList() {
      this.$API.getParentList(this.classId).then(res => {
        this.parents = res
      })
    },
    getTeacherList() {
      this.$API.getTeacherList(this.classId).then(res => {
        this.teachers = res
      })
    },
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
}

*{
    transition:all .3s;
}

.right {
  float: right;
  width: 260px;
  .card {
    // border: 1px solid @border;
    margin-bottom: 20px;
    background: #fff;
    .title {
      line-height: 40px;
      padding: 0 10px;
      background: @main;
      color: #fff;
      text-align: center;
    }
    .content {
      padding: 0 10px;
      line-height: 2em;
      font-size: 16px;
    }
  }
}

.backBtn {
  text-align: center;
  padding: 20px 0;
}

.item {
  padding: 5px;
  margin: 5px 0;
  position: relative;
  cursor: pointer;
  &:hover {
    background: @bg;
    height: 50px;
    .top {
      .img {
        margin-left: 5px;
        img {
          width: 50px;
        }
        .headTextImg {
          width: 48px;
          height: 48px;
          line-height: 48px;
          font-size: 22px;
        }
      }
      .name {
        padding-left: 65px;
      }
    }
    .bottom {
      display: block;
    }
  }
  .top {
    .img {
      height: 30px;
      width: 30px;
      float: left;
      margin-top: 0px;
      img {
        width: 30px;
        border-radius: 50%;
      }
      .headTextImg {
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 18px;
      }
    }
    .name {
      line-height: 30px;
      padding-left: 45px;
    }
  }
  .bottom {
    display: none;
    .tel {
      padding-left: 65px;
    }
    .btn {
      position: absolute;
      top: 20px;
      right: 5px;
    }
  }
}
</style>
