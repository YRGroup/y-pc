<template>
  <div>
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <div class="ques-wrap card">
        <div class="ques-info">
          <img :src="data.Headimgurl">
          <span class="name">{{data.TrueName}}</span>
          <p class="msg-info">
            <span>
              <i class="iconfont">&#xe690;</i>{{data.Course || '暂无'}}</span>
            <span>
              <i class="iconfont">&#xe618;</i>{{data.Mobilephone}}</span>
          </p>
        </div>
        <num-length></num-length>
        <div class="content">
          <div class="btn-info" v-if="!$route.query.id">
            <el-button plain type="primary" @click.native="startEditPw" size="mini">修改密码</el-button>
            <el-button plain type="primary" @click.native="logout" size="mini">退出</el-button>
          </div>
          <div class="btn-info" v-else>
            <el-button type="primary" size="mini" plain @click.native="$router.push('/msg/'+data.Meid)">发消息</el-button>
          </div>

          <el-dialog title="修改密码" :visible.sync="showEditPw" width="30%">
            <div>
              <el-form :inline="true" label-width="90px">
                <div>
                  <el-form-item label="手机号">
                    <el-input v-model="editPwData.phone" :disabled="true" style="width:260px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="验证码">
                    <el-input v-model="editPwData.code" style="width:160px">
                    </el-input>
                  </el-form-item>
                  <el-button type="primary" plain @click="getCheckNum">获取验证码</el-button>
                </div>
                <div>
                  <el-form-item label="新密码">
                    <el-input type="password" v-model="editPwData.newpwd" style="width:260px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="重复新密码">
                    <el-input type="password" v-model="editPwData.newpwd2" style="width:260px">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label=" ">
                    <el-button type="primary" @click="editPw">确 定</el-button>
                    <el-button type="primary" :plain="true" @click="showEditPw = false">取 消</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-dialog>

        </div>
      </div>

      <!-- <div class="card" v-for="(i,index) in data.Classes" :key="index">
          <div class="header">
            {{i.ClassName}}
          </div>
          <div class="content noHeadImg">
            <div class="btn">
              <el-button type="info" @click.native="changeClass(i.ClassID),$router.push('/class')">班级主页</el-button>
            </div>
            <div class="btn" v-show="data.Classes.length>1">
              <el-button type="warning" v-if="classId!=i.ClassID" @click.native="changeClass(i.ClassID)">设为当前班级</el-button>
              <p v-else>当前班级</p>
            </div>
          </div>
        </div> -->
      <!-- <div class="panelbox">
        <h3><i class="iconfont">&#xe69b;</i>我的班级</h3>
      </div> -->
      <!-- <div class="card"> -->
        <changeClass></changeClass>
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
      <!-- </div> -->
      <div class="panelbox artical" v-show="data.TrueName == '张继锋' ">
        <el-button @click="$router.push('/meiyu')" type="success" class="ml20 addBtn">美育活动</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import changeClass from '@/components/changeClass'
import numLength from '@/components/numLength'
export default {
  components: {changeClass,numLength},
  data() {
    return {
      data: {
        ExtendInfo: {},
        Course:''
      },
      showEditPw: false,
      editPwData: {
        phone: '',
        code: '',
        newpwd: '',
        newpwd2: ''
      },
    }
  },
  computed: {
    classId() {
      return this.$store.state.currentClassId
    },
  },
  methods: {
    getData() {
      if (this.$route.query.id) {
        this.$API.getTeacherInfo(this.$route.query.id).then(res => {
          this.data = res
          this.data.Course = res.Course
        })
      } else {
        this.data = this.$store.state.currentUser
        this.data.Course = this.data.ExtendInfo.Course
        
      }
    },
    startEditPw() {
      this.showEditPw = true
      this.editPwData.phone = this.data.Mobilephone
    },
    getCheckNum() {
      this.$API.getSms().then(res => {
        this.$message.success('获取验证码成功，请查收短信')
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    editPw() {
      if (this.editPwData.code == '') {
        this.$message.error('短信验证码不能为空')
      }
      else if (this.editPwData.newpwd !== this.editPwData.newpwd2) {
        this.$message.error('两次输入的密码不一致，请检查!')
      } else if (this.editPwData.newpwd.length < 6) {
        this.$message.error('密码不能小于6位数')
      }
      else {
        this.$API.editPWBySms(this.editPwData).then(res => {
          this.$message.success('修改密码成功')
          this.showEditPw = false
        }).catch(err => {
          this.$message.error(err.msg)
          this.editPwData.code = ''
          this.editPwData.newpwd = ''
          this.editPwData.newpwd2 = ''
        })
      }
    },
    logout() {
      this.$store.dispatch('logout').then(res => {
        this.$message('退出成功')
        this.$router.push('/login')
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
  float: left; // padding: 10px;
}

.right {
  float: right;
  width: 260px; // padding: 20px 10px;
  .card {
    background: #fff;
    padding:20px;
    margin-bottom: 15px;
    &:hover {
      // border: 1px solid @main;
    }
    .header {
      text-align: center;
      font-size: 16px;
      padding: 15px 0 10px;
      border-bottom: 1px solid @border;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.5)
      }
      .name {
        display: block;
      }
    }
    .content {
      line-height: 2em;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
      }
      span {
        margin: 0 10px;
        .iconfont {
          margin-right: 5px;
        }
      }
      .btn {
        text-align: center;
      }
    }
    .noHeadImg {
      margin-top: 10px;
    }
  }
}

.ques-wrap {
  .ques-info {
    text-align: center;
    font-size: 16px;
    padding: 0 0 10px;
    border-bottom: 1px solid @border;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5)
    }
    .name {
      display: block;
    }
  }
}

.num-info {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid @border;
  li {
    display: inline-block;
    line-height: 40px;
    width: 43%;
    color: #888;
    text-align: center;
    span {
      color: #333;
      margin-left: 10px;
    }
  }
}

.msg-info {
  font-size: 13px;
  margin-top: 5px;
  color: #888;
  span {
    margin: 0 10px;
    .iconfont {
      margin-right: 5px;
    }
  }
}

.btn-info {
  text-align: center;
  margin-top: 15px;
  .el-button {
    margin: 0 10px;
  }
}
.artical{
  padding:20px;
  text-align: center;
}
</style>
