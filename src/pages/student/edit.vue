<template>
  <div>

    <div class="card">
      <div class="header">修改学生资料</div>
      <div class="content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="data.TrueName" :disabled="true" style="width:260px"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="data.StudentID" :disabled="true" style="width:260px"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="data.IDCard" style="width:360px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <el-radio class="radio" v-model="data.Sex" label="男">男</el-radio>
              <el-radio class="radio" v-model="data.Sex" label="女">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="data.Address" style="width:260px"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <template>
              <el-upload class="avatar-uploader" list-type="picture-card" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="tips">请上传真实头像，以方便班级正常管理和班级内互动</div>
            </template>
          </el-form-item>
          <el-form-item label="地址">
            <vue-address @change="submitAddress"></vue-address>
            <div>{{data.Province+' '+(data.City||'')+' '+(data.County||'')}}</div>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="data.Nation" placeholder="民族">
              <el-option v-for="i in $store.state.nationList" :key="i" :label="i" :value="i">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="birthday" @change="submitBirthday" type="date" placeholder="选择日期">
            </el-date-picker>
            <div style="display:inline-block">&nbsp; {{ new Date(data.Birthday).Format('yyyy-mm-dd') }} </div>
          </el-form-item>

        </el-form>
      </div>
      <div class="footer">
        <div class="btn">
          <el-button type="primary" @click.native="submitChange">提交修改</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import vueAddress from '@/components/address'
export default {
  name: 'app',
  components: { vueAddress },
  data() {
    return {
      birthday: '',
      showEditAddr: false,
      data: {},
      showEditHeadImg: false,
      imageUrl: '',
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    submitBirthday(val) {
      this.data.Birthday = val
    },
    submitAddress(val) {
      this.data.Province = val.province
      this.data.City = val.city
      this.data.County = val.county
    },
    getData() {
      if (this.$route.query.id) {
        this.$API.getStudentInfo(this.$route.query.id).then(res => {
          this.data = res.user
        })
      } else {
        this.$API.getStudentInfo(this.$store.state.currentStudentId).then(res => {
          this.data = res.user
        })
      }
    },
    submitChange() {
      this.showEditAddr = false
      // this.submitAddress(this.add)
      this.data.role = 1
      this.$API.editStudentInfo(this.data).then(res => {
        this.$message.success('修改成功')
        this.$router.go(-1)
      })
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
    display: inline-block;
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
.tips{
  color:@grey;
}
</style>
