<template>
  <div>
  
    <div class="card">
      <div class="header">修改家长资料</div>
      <div class="content">
        <el-form label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="data.Mobilephone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="data.TrueName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <el-radio class="radio" v-model="data.Sex" label="男">男</el-radio>
              <el-radio class="radio" v-model="data.Sex" label="女">女</el-radio>
            </template>
          </el-form-item>
          <div class="headImg">
            <div class="left" v-show="!showEditHeadImg">
              <el-button @click="showEditHeadImg=true">修改头像</el-button>
            </div>
            <div class="right" v-show="showEditHeadImg">
              <el-upload class="avatar-uploader" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
  
          <el-dialog title="修改密码" :visible.sync="showEditPw" size="mini">
            <div>
              <el-form :inline="true" label-width="100px">
                <div>
                  <el-form-item label="手机号">
                    <el-input v-model="editPwData.phone" :disabled="true">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="验证码">
                    <el-input v-model="editPwData.code">
                    </el-input>
                  </el-form-item>
                  <el-button type="primary" @click="getCheckNum">获取验证码</el-button>
                </div>
                <div>
                  <el-form-item label="新密码">
                    <el-input type="password" v-model="editPwData.newpwd">
                    </el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="重复新密码">
                    <el-input type="password" v-model="editPwData.newpwd2">
                    </el-input>
                  </el-form-item>
                </div>
  
              </el-form>
  
            </div>
  
            <span slot="footer" class="dialog-footer">
              <el-button @click="showEditPw = false">取 消</el-button>
              <el-button type="primary" @click="editPw">确 定</el-button>
            </span>
          </el-dialog>
  
        </el-form>
      </div>
      <div class="footer">
        <div class="btn">
          <el-button type="warning" style="float:left;" @click.native="startEditPw">修改密码</el-button>
          <el-button type="primary" @click.native="submitChange">提交修改</el-button>
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
      data: {},
      showEditHeadImg: false,
      showEditPw: false,
      editPwData: {
        phone:'',
        code:'',
        newpwd:'',
        newpwd2:''
      },
      imageUrl: ''
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData() {
      this.$API.getCurrentUser().then(res => {
        this.data = res
      })
    },
    submitChange() {
      this.data.role = 2
      this.$API.editParentInfo(this.data).then(res => {
        this.$API.getCurrentUser().then(user => {
          this.$store.commit('login', user)
        })
        this.$router.push('/parent')
      })
    },
    startEditPw() {
      this.showEditPw = true
      this.editPwData.phone = this.data.Mobilephone
    },
    getCheckNum() {
      this.$API.getSms().then(res => {
        this.$message.success('获取验证码成功，请查收短信')
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    editPw() {
      if(this.editPwData.code == ''){
        this.$message.error('短信验证码不能为空')
      }
      else if (this.editPwData.newpwd !== this.editPwData.newpwd2) {
        this.$message.error('两次输入的密码不一致，请检查!')
      }else if(this.editPwData.newpwd.length<6){
        this.$message.error('密码不能小于6位数')
      }
       else {
        this.$API.editPWBySms(this.editPwData).then(res => {
          this.$message.success('修改密码成功')
          this.showEditPw=false
        }).catch(err=>{
          this.$message.error(err.msg)
          this.editPwData.code=''
          this.editPwData.newpwd=''
          this.editPwData.newpwd2=''
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.Content[0]
      this.data.Headimgurl = this.imageUrl + '?x-oss-process=style/f300'
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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

.headImg {
  text-align: center;
  .left,
  .right {
    display: inline-block
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}


.card {
  margin: 15px 0;
  border: 1px solid @border;
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
