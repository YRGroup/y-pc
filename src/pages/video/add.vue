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
          prop="VideoID"
          :rules="[{ required: true, message: '必填', trigger: 'blur' }]">

          <upload-video 
            ref="uploadVideo"
            :limitSize="20"
            :limitNumber="2"
            @removeVideo="removeVideo"
            @getVideoId="getVideoId"
            @onUploadProgress="onUploadProgress"
            @onUploadSucceed="onUploadSucceed"
            @onUploadFailed="onUploadFailed"
            @changeVideoList="changeVideoList"
          >
          <i class="el-icon-plus avatar-uploader-icon"></i>
          </upload-video> 
          <!-- <el-upload  class="uploadBox"
          v-model="form.VideoID"
          name="VideoID"
           accept="video/*"
          :http-request="getVideoId"
          :action="videoAction"
          :on-change="changeVideoList" 
          :before-upload="beforeVideoUpload"
          :on-remove="removeVideo"
          ref="uploadVideo">  
          <i v-if="showUploadIcon"  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->

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
import uploadVideo from "@/components/uploadVideo";
export default {
  name: "addVideo",
  data() {
    return {
      videoAction: "",
      videoState: 0, //上传状态
      videoStateNum: 0, //上传进度
      categoryList: [],
      gradeList: [],
      form: {
        // FileName: "",
        // FileSize: "",
        Title: "",
        Description: "",
        CateId: "",
        Grade: "",
        Tags: "",
        VideoID: "",
        Coverurl: ""
      }
    };
  },
  components: {
    uploadVideo
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
          this.$API
            .upLoadVideoForm(this.form)
            .then(res => {
              if (res.Status == 1) {
                this.$message.success("上传成功");
                this.restVideo();
                this.$refs["form"].resetFields();
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
      this.videoState = "";
      this.videoStateNum = 0;
      this.$refs.uploadVideo.clearFiles(); //清空视频列标
    },
    //移除视频
    removeVideo(file, filelist) {
      console.log("remove");
    },
    //视频列表变化
    changeVideoList(file, filelist) {

    },
    //获取当前视频id
    getVideoId(id) {
      this.form.VideoID = id;
    },
    //进度
    onUploadProgress(num) {
      this.videoStateNum = num;
      if (num > 0) {
        this.videoState = "正在上传";
      }
    },
    onUploadFailed(info) {
      this.videoState = "上传失败";
    },
    onUploadSucceed(info) {
      this.videoState = "上传成功";
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
