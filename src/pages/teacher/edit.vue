<template>
  <div>
  
    <div class="card">
      <div class="header">修改教师资料</div>
      <div class="content">
        <el-form label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="data.Mobilephone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="data.TrueName"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="data.IDCard"></el-input>
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
              <el-upload
                class="avatar-uploader"
                :action="$store.getters._APIurl+'/api/Upload/ImageUpload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
          <br /><hr /><br />
          <el-form-item label="科目">
            <el-input v-model="data.Course"></el-input>
          </el-form-item>
          <el-form-item label="PersonalHonor">
            <el-input v-model="data.PersonalHonor"></el-input>
          </el-form-item>
          <el-form-item label="PoliticalStatus">
            <el-input v-model="data.PoliticalStatus"></el-input>
          </el-form-item>
          <el-form-item label="Professional">
            <el-input v-model="data.Professional"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="data.Remark"></el-input>
          </el-form-item>
          <el-form-item label="Title">
            <el-input v-model="data.Title"></el-input>
          </el-form-item>
          <el-form-item label="Resume">
            <el-input v-model="data.Resume"></el-input>
          </el-form-item>
          <el-form-item label="SchoolAge">
            <el-input v-model="data.SchoolAge"></el-input>
          </el-form-item>
          <el-form-item label="Volk">
            <el-input v-model="data.Volk"></el-input>
          </el-form-item>
          
          
        </el-form>
      </div>
      <div class="footer">
        <div class="btn">
          <el-button type="warning" style="float:left;" @click.native="submitChange">修改密码</el-button>
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
      showEditHeadImg:false,
      imageUrl:''
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData(){
      this.$API.getTeacherInfo(this.$store.state.currentUserId).then(res=>{
        this.data=res
      })
    },
    submitChange(){
      this.data.role = 3
      this.$API.editTeacherInfo(this.data).then(res=>{
        this.$router.push('/teacher')
			})
    },
    handleAvatarSuccess(res, file) {
			this.imageUrl = res.Content[0]
			this.data.Headimgurl=this.imageUrl
		},
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'||'image/png'
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

.headImg{
  text-align: center;
  .left,.right{
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
    padding-left:30px;
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
