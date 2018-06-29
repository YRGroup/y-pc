<template>
    <el-upload  class="uploadBox"
      accept="video/*"
      :action="videoAction"
      :http-request="getVideoId"
      :on-change="changeVideoList" 
      :before-upload="beforeVideoUpload"
      :on-remove="removeVideo"
      ref="upload">  
      <!-- <el-button size="small"  v-if="!hasUploadVideo" type="primary">点击上传</el-button> -->
      <slot v-if="showUpLoadBtn"></slot>
    </el-upload>
</template>
<script>
export default {
  data() {
    return {
      videoAction: "",
      videoId: "",
      videoStateNum: 0,
      filelist: []
    };
  },
  computed: {
    showUpLoadBtn() {
      return this.limitNumber > this.filelist.length ? true : false;
    }
  },
  props: {
    limitSize: {
      default: -1,
      type: Number
    },
    limitNumber: {
      default: 1,
      type: Number
    }
  },
  methods: {
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
        this.videoId = res.Content.VideoID;
        //创建上传实例
        let uploader = new VODUpload({
          // 开始上传
          onUploadstarted: function(uploadInfo) {
            var uploadAuth = res.Content.UploadAuth;
            var uploadAddress = res.Content.UploadAddress;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress
            );
            This.$emit("onUploadstarted", uploadInfo);
          },
          // 文件上传失败
          onUploadFailed: function(uploadInfo, code, message) {
            This.$emit("onUploadFailed", uploadInfo);
          },
          // 文件上传完成
          onUploadSucceed: function(uploadInfo) {
            This.$emit("onUploadSucceed", uploadInfo);
          },
          //视频上传进度监听
          onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
            let num = Math.ceil(uploadedSize * 100 / totalSize);
            This.videoStateNum = num;
          },
          // STS临时账号会过期，过期时触发函数
          onUploadTokenExpired: function() {
            this.$message.error("sts临时账号过期，请联系网络管理员");
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
    changeVideoList(file, filelist) {
      this.filelist = filelist;
      this.$emit("changeVideoList", file, filelist);
    },
    beforeVideoUpload(file) {
      let isSizeOk = true;
      if (this.limitSize > 0) {
        isSizeOk = file.size < this.limitSize * 1024 * 1024 ? true : false;
      }

      if (!isSizeOk && this.limitSize > 0) {
        this.$message.error(`视频不能超过${this.limitSize}M!`);
        return false;
      }
      //限制视频格式
      let isTypeOk = file.type.indexOf("video");

      if (isTypeOk == -1) {
        this.$message.error("视频格式错误!");
        return false;
      }
      return true;
    },
    removeVideo(file, filelist) {
      this.filelist = filelist;
      if (this.filelist.length == 0) {
        this.clearFiles();
      }
      this.$emit("removeVideo", file, filelist);
    },
    clearFiles() {
      this.videoId = "";
      this.filelist = [];
      this.videoStateNum = 0;
      this.$refs.upload.clearFiles();
    }
  },
  watch: {
    videoStateNum(newVal) {
      this.$emit("onUploadProgress", newVal);
    },
    videoId(newVal) {
      this.$emit("getVideoId", newVal);
    }
  }
};
</script>
