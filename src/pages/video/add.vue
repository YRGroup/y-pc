<template>
  <div class="addVideo">
    <!-- <div class="header">
      添加新视频
    </div> -->
    <div class="card">
      <div class="maintitle">
        <i class="iconfont">&#xe63c;</i>上传视频
        <span class="goreturn">
          <el-button size="small" @click="$router.push('/video')" type="success" :plain="true">返回</el-button>
        </span>
      </div>
    </div>
    <div class="panel">
      <!-- <iframe src="/web/static/videoupload.html" frameborder="0" id="videoUploadFrame"></iframe> -->
        <el-form class="form" ref="form" :model="form" label-position="left" label-width="80px">
          <el-form-item label="标题" 
          prop="Title"
          :rules="[{ required: true, message: '必填', trigger: 'blur' }]"
          >
          <el-input type="text" name="Title" v-model="form.Title" ></el-input>
        </el-form-item>
          
        <el-form-item label="描述" 
          prop="Description"
          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
          <el-input type="textarea" name="Description" v-model="form.Description"></el-input>
        </el-form-item>
        <el-form-item label="类别"
        prop="CateId"
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
          <el-select  placeholder="视频分类" name="CateId" v-model="form.CateId">
            <el-option v-for="item in categoryList" :key="item.CateID" :label="item.CateName" :value="item.CateID">
          </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="年级" 
        prop="Grade"
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
          <el-select placeholder="年级" name="Grade" v-model="form.Grade">
            <el-option v-for="item in gradeList" :key="item.ID" :label="item.GradeName" :value="item.ID">
          </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="关键词" 
        prop="Tags"
        :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
          <el-input type="text" name="Tags" v-model="form.Tags"></el-input>
        </el-form-item>

        <el-form-item 
          label="选择文件"
          prop="videoId"
          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
          <el-upload  class="uploadBox"
          v-model="form.videoId"
          name="videoId"
           accept="video/*"
          :http-request="getVideoId"
          :action="videoAction"
          :on-change="changeVideoList" 
          :before-upload="beforeVideoUpload"
          :on-remove="removeVideo"
          ref="uploadVideo">  
          <i v-if="showUploadIcon"  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-progress  v-if="videoStateNum" :text-inside="true" :stroke-width="18" :percentage="videoStateNum" status="success"></el-progress>
          <p v-if="videoState" v-text="videoState"></p>
        </el-form-item> 
        <el-form-item >
          <el-button :disabled="disabled"  type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addVideo",
  data() {
    return {
      // FileName: '',
      // FileSize: '',
      // Title: '',
      // Description: '',
      // Coverurl: '',
      // CateId: '',
      // Grade: '',
      // Tags: '',
      videoAction: "",
      showUploadIcon: true,
      videoState: 0, //上传状态
      videoStateNum: 0, //上传进度
      videoId: "",
      categoryList: [],
      gradeList: [],
      form: {
        FileName: "",
        FileSize: "",
        Title: "",
        Description: "",
        CateId: "",
        Grade: "",
        Tags: "",
        videoId: ""
      }
    };
  },
  computed: {
    disabled() {
      return this.videoStateNum == 100 ? false : true;
    }
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$API
            .getVideoUploadAuth(this.form)
            .then(res => {
              if (res.Status == 1) {
                this.$message.success("上传成功");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置视频上传状态
    restVideo() {
      this.videoId = "";
      this.showUploadIcon = true;
      this.videoState = "";
      this.videoStateNum = 0;
      this.$refs.uploadVideo.clearFiles(); //清空视频列标
    },
    //视频上传前检测
    beforeVideoUpload(file) {
      //限制20m
      let isSizeOk = file.size < 20 * 1024 * 1024 ? true : false;
      if (!isSizeOk) {
        this.$message.error("视频不能超过20M!");
      }

      //限制视频格式
      let isTypeOk = file.type.indexOf("video");

      if (isTypeOk == -1) {
        this.$message.error("视频格式错误!");
        isTypeOk = false;
      } else {
        isTypeOk = true;
      }
      return isSizeOk && isTypeOk;
    },
    //移除视频
    removeVideo(file, filelist) {
      this.restVideo();
    },
    //视频列表变化  只允许上传一个视频
    changeVideoList(file, filelist) {
      console.log(file);
      this.form.FileName = file.name;
      this.form.FileSize = file.size;
      if (filelist.length) {
        this.showUploadIcon = false;
      } else {
        this.showUploadIcon = true;
      }
    },
    //上传视频
    getVideoId(file) {
      let params = {
        FileName: file.file.name,
        Title: file.file.name,
        FileSize: file.file.size,
        Description: "Description",
        Coverurl: "",
        CateId: 16,
        CourseId: 0,
        Grade: 0,
        Tags: ""
      };
      let This = this;
      this.$API.getVideoUploadAuth(params).then(res => {
        // this.videoId = res.VideoID;
        //创建上传实例
        let uploader = new VODUpload({
          // 开始上传
          onUploadstarted: function(uploadInfo) {
            var uploadAuth = res.UploadAuth;
            var uploadAddress = res.UploadAddress;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress
            );
            This.videoState = "开始上传";
          },
          // 文件上传失败
          onUploadFailed: function(uploadInfo, code, message) {
            This.videoState = "上传失败";
          },
          // 文件上传完成
          onUploadSucceed: function(uploadInfo) {
            This.videoState = "上传成功";
            This.videoId = res.VideoID;
            This.form.videoId = res.VideoID;
          },
          //视频上传进度监听
          onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
            let num = Math.ceil(uploadedSize * 100 / totalSize);
            This.videoStateNum = num;
            This.videoState = "正在上传";
          },
          // STS临时账号会过期，过期时触发函数
          onUploadTokenExpired: function() {
            this.$message.error("sts临时账号过期，请联系网络管理员");
            This.videoState = "sts临时账号过期，请联系网络管理员";
          }
        });
        // 初始化上传实例   点播上传。每次上传都是独立的鉴权，所以初始化时，不需要设置鉴权
        uploader.init();
        var userData =
          '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
        uploader.addFile(file.file, null, null, null, userData);
        uploader.startUpload();
      });
    },
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res;
      });
    },
    getCategoryList() {
      this.$API.getCategeryList().then(res => {
        this.categoryList = res;
      });
    }
  },
  created() {
    this.getGradeList();
    this.getCategoryList();
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";

.header {
  color: #fff;
  background: @main;
  line-height: 50px;
  padding: 0 3rem;
}
.card {
  background: #fff;
}
.info {
  display: inline-block;
  color: @grey;
}
.form {
  width: 500px;
  padding-left: 50px;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #ddd;
  }
}
#videoUploadFrame {
  width: 100%;
  height: 630px;
}
</style>
