<template>
  <div>
    <div class="left">
      <router-view></router-view>
    </div>

    <div class="right">

      <div class="card">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p class="name">{{$store.state.currentUser.TrueName}}</p>
          <span>
            <i class="iconfont">&#xe60b;</i> {{$store.state.currentUser.Mobilephone}}</span>
          <span>
            <i class="iconfont">&#xe66c;</i> {{$store.getters.role}}</span>
          <div class="btn">
            <el-button  type="primary" plain size="medium" @click.native="InviteParent=true">邀请家长</el-button>
            <el-button  type="warning" plain size="medium" @click.native="$router.push('/parent/edit')">修改资料</el-button>
            <el-button class="logou" size="small" type="text" @click.native="logout">退出</el-button>
          </div>
        </div>
      </div>

      <!-- <div class="card" v-if="!$store.state.currentUser.ExtendInfo.Students.length">
        <div class="header">
          暂无学生
        </div>
        <div class="btn">
          <el-button type="warning" @click="$router.push('/addStudent')">添加学生</el-button>
        </div>
      </div> -->

      <div class="panelbox">
          <h3><i class="iconfont">&#xe672;</i>学生信息</h3>
      </div>
      <div class="cardlist">
        <div class="header">
          <img :src="currentStudent.Headimgurl">
        </div>
        <div class="content">
          <p class="name">{{currentStudent.TrueName}} <span class="classname">{{currentStudent.ClassName}}</span></p>
          <p class="classNum">学号：{{currentStudent.StudentID}}</p>
        </div>
        <div class="currentStu">
          <changeClass></changeClass>
        </div>
      </div>
      <el-dialog title="邀请家长" :visible.sync="InviteParent" size="tiny">
        <div>
          <el-form label-width="90px">
            <div>
              <el-form-item label="手机号" :rules="[{ required: true}]">
                <el-input v-model.trim="Invitedata.MobilePhone" style="width:280px">
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="姓名" :rules="[{ required: true}]">
                <el-input v-model.trim="Invitedata.truename" style="width:280px">
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="关系" :rules="[{ required: true}]">
                <el-radio-group v-model="ParentType">
                  <el-radio class="radio" label="1">爸爸</el-radio>
                  <el-radio class="radio" label="2">妈妈</el-radio>
                  <el-radio class="radio" label="3">爷爷</el-radio>
                  <el-radio class="radio" label="4">奶奶</el-radio>
                  <el-radio class="radio" label="5">家人</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="">
                <el-button type="primary" @click="inviteParent">确 定</el-button>
                <el-button @click="InviteParent = false">取 消</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import changeClass from '@/components/changeClass'
export default {
  components: {changeClass},
  data() {
    return {
      InviteParent: false,
      Invitedata: {
        MobilePhone:'',
        truename:'',
        type: ''
      },
      ParentType: ''
    }
  },
  computed: {
    studentList() {
      if (this.$store.getters.isParent && this.$store.state.currentUser.ExtendInfo.Students.length) {
        let v = []
        this.$store.state.currentUser.ExtendInfo.Students.forEach(o => {
          let a = {
            name: o.TrueName,
            id: o.Meid
          }
          v.push(a)
        })
        return v
      }
    },
    currentStudent() {
      return this.$store.state.currentUser.ExtendInfo.Students.find(o => {
        return o.Meid == this.$store.state.currentStudentId
      })
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(res => {
        this.$router.push('/login')
        this.$message('退出成功')
      }).catch(err => {
        this.$message(err.msg)
      })
    },
    inviteParent() {
      this.Invitedata.type = this.ParentType
      this.Invitedata.student_id = this.currentStudent.StudentID
      this.Invitedata.student_meid = this.currentStudent.Meid
      if(!this.Invitedata.MobilePhone){
        this.$message('请填写手机号！')
      }else if(!this.Invitedata.truename){
        this.$message('请填写真实姓名！')
      }else if(!this.Invitedata.type){
        this.$message('请选择身份！')
      }else{
          this.$API.inviteParent(this.Invitedata).then(res => {
            this.$message('绑定成功~！')
            this.InviteParent = false
            this.Invitedata = {
              MobilePhone:'',
              truename:'',
              type: ''
            }
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

.left {
  width: calc(~"100% - 280px");
  float: left;
}

.right {
  float: right;
  width: 260px;
  .card {
    // border: 1px solid @border;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    &:hover {
      // border: 1px solid @main;
    }
    .header {
      height: 75px;
      position: relative;
      background: @main;
      line-height: 75px;
      color: #fff;
      font-size: 25px;
      img {
        border: 3px solid rgba(255, 255, 255, 0.5);
        width: 100px;
        position: absolute;
        left: 80px;
        top: 25px;
        border-radius: 50%;
        background: transparent;
      }
    }
    .content {
      margin-top: 40px;
      line-height: 2em;
      padding-bottom: 20px;
      padding: 20px;
      text-align: center;
      .btn{
        margin-top: 10px;
        .logou{
          display: inline;
          margin-top: 10px;
          margin-bottom: -10px;
        }
      }
      .name {
        font-size: 20px;
      }
      span {
        margin: 0 10px;
      }
      .iconfont {
        font-size: 16px;
      }
    }
  }
}

.cardlist{
  .content{
    .name{
      font-size: 16px;
    }
    .classNum{
      font-size: 12px;
      color: @grey;
    }
    .classname{
      font-size: 12px;
      color: @grey;
      margin-left:8px;
    }
  }
}
.currentStu{
  margin-top: 20px;
}
</style>
