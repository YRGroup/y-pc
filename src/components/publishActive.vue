<template>
<el-form  class="publish">
 
  <el-form-item class="textItem">
    <el-input type="textarea" :rows="3" :autosize="{ minRows: 2, maxRows: 6}"  placeholder="有什么新鲜事分享给大家？"  v-model.trim="content"></el-input>  
  </el-form-item>
  <div class="todos">
    <div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-popover ref="popImg" placement="bottom" v-model="isShowUpImg" trigger="manual" popper-class="upPop">
        <p class="closeBox"> <i class="el-icon-close closeBtn" @click="delUpImg"></i></p>
        <el-form-item>
          <el-upload multiple class="uploadBox"
          accept="image/*"
          :auto-upload="true"
          :action="imgAction"
          :http-request="getImgBaseList"
          :on-remove="changeImgUrlList"
          list-type="picture-card"
          :on-preview="imgPreview"
          :before-upload="beforePictureUpload"
          ref="uploadImg">  
          <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>  
      </el-popover>
      <span class="popImg" v-popover:popImg @click="showUpImg"><i class="iconfont" style="color:#ffa405">&#xe613;</i> 图片</span>
      <el-popover ref="popVideo"  placement="bottom" v-model="isShowUpVideo" trigger="manual" class="upPop">
        <p class="closeBox"> <i class="el-icon-close closeBtn" @click="delUpVideo"></i></p>
        <el-form-item style="text-align:center">
          <el-upload  class="uploadBox"
          accept="video/*"
          :action="videoAction"
          :http-request="getVideoId"
          :on-change="changeVideoList" 
          :before-upload="beforeVideoUpload"
          :on-remove="removeVideo"
          ref="uploadVideo">  
          <el-button size="small"  v-if="!hasUploadVideo" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> 
        <el-progress  v-if="videoStateNum" :text-inside="true" :stroke-width="18" :percentage="videoStateNum" status="success"></el-progress>
        <p  v-text="videoState"></p>
      </el-popover>
      <span class="popVideo" v-popover:popVideo @click="showUpVideo"><i class="iconfont" style="color:#5a8ce6">&#xe705;</i> 视频</span>
    </div>
    <div>
        <el-select size="small"  v-if="$store.getters.isTeacher" v-model="at_meid" multiple placeholder="@某学生" style="width:270px;margin-right:20px">
          <el-option v-for="item in studentList" :key="item.Meid" :label="item.NickName" :value="item.Meid">
          </el-option>
        </el-select>
      <el-button :loading="isLoading" @click="postNewClassDynamic"  size="medium" type="primary">发布</el-button>
    </div>
  </div>
</el-form> 
</template>

<script>
  require("@/common/js/aliyun-sdk.min.js");
  require("@/common/js/vod-sdk-upload-1.1.0.min.js");
  
  import lrz from "lrz";
  import Vue from 'vue'
  import Element from 'element-ui'

  Vue.use(Element)

  export default{
    name:'publishActive',
    data(){
      return {
        isShowUpImg:false,
        isShowUpVideo:false,
        imgAction:'',
        videoAction:'',
        currentPag:1,
        content:'',
        at_meid:[],
        videoId:'',
        isLoading:false,
        hasUploadVideo:false,
        videoState:'',   //视频上传状态
        videoStateNum:0,
        studentList:[],
        imgBaseList:'', //已传图片的base64集合
        imgUrlList:{},  //key:value
        imgUrlArrList:[], //提交的地址列表
        dialogVisible:false,
        dialogImageUrl:''
      }
    },
    computed:{
    
      //发布的参数对象
      options(){
        let options= {
          content:this.content,                                        //内容
          at_meid: this.at_meid,                                       //@的人Meid列表
          cid:this.$store.state.currentClassId,                       //发布者所在班级id  this.$store.state.currentClassId                            
          type:1,                                                     //默认1                   
        }
        //学生或家长时
        if(this.role=="家长"&&this.$store.state.currentStudentId != null){
          options.student_meid = this.$store.state.currentStudentId      //学生的currentStudentId  this.$store.state.currentStudentId
        }else if(this.role=="任课教师"){
          options.meid = this.$store.getters.currentUserId                  //老师的meid       this.$store.state.currentUserId
        }
        //传图片时 
        if(this.isShowUpImg){
          options.img_url_list=this.imgUrlArrList                           //图片地址列表
        }
        //传视频时
        if(this.isShowUpVideo){
          options.videoid=this.videoId                                                  //视频id
        }
        return options
      },
      
      //获取用户角色名
      role(){
        return this.$store.getters.role
      },
      //学生id
      meid(){
        if (
          this.$store.getters.role == "家长" &&
          this.$store.state.currentStudentId != null
        ) {
          return this.$store.state.currentStudentId;
        }
      }
    },
    methods:{
      //获取可@学生列表
      getStudentList() {
        this.$API.getStudentList(this.$store.state.currentClassId).then(res => {
          this.studentList = res
          }).catch(err => {
            this.$message.error(err.msg)
        })
      },
      //显示上传图片
      showUpImg(){
        if(this.isShowUpVideo){
          this.delUpVideo(()=>{
            this.isShowUpImg=true;
          })
        }else{
          this.isShowUpImg=true;
        }   
      },
      //显示上传视频
      showUpVideo(){
        if(this.isShowUpImg){
          this.delUpImg(()=>{
            this.isShowUpVideo=true;
          })
        }else{
          this.isShowUpVideo=true;
        }   
      },
      //重置视频上传状态
      restVideo(){
          this.videoId='';    
          this.isShowUpVideo=false;               
          this.hasUploadVideo=false;
          this.videoState="";
          this.videoStateNum=0;
          this.$refs.uploadVideo.clearFiles();//清空视频列标
      },
      //重置图片上传状态
      restImg(){
        this.imgBaseList='';
        this.isShowUpImg=false;
        this.imgUrlList={};
        this.$refs.uploadImg.clearFiles();//清空图片列表
      },
      //取消上传图片
      delUpImg(callBack){
        if(this.imgBaseList){
          this.$confirm('确定放弃上传图片吗？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.restImg()
            try {
                callBack()
            } catch (error) {}
          
          }).catch()
        }else{
          this.restImg()
          try {
              callBack()
            } catch (error) {}
        }
      },
      //取消上传视频
      delUpVideo(callBack){
        if(this.videoId){
            this.$confirm('确定放弃上传视频吗？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.restVideo();
            try {
                callBack()
            } catch (error) {}
          }).catch()
        }else{
          this.restVideo();
          try {
                callBack()
            } catch (error) {}
        }
      },
      //移除视频
      removeVideo(file,filelist){
        this.restVideo();
      },

      //图片加载前检测
      beforePictureUpload(file) {
        let isJPG = file.type === "image/jpeg" || file.type === "image/png";
        // let isNumOk = filelist.file.length<10?true:false;
        //const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error("上传图片只能是 JPG或PNG 格式!");
        }
        //if (!isLt5M) {
        //this.$message.error('上传图片大小不能超过 5MB!');
        //}
        return isJPG; //&& isLt5M;
      },
      //上传图片预览
      imgPreview(file){
        this.dialogVisible=true
        this.dialogImageUrl=file.url
      },
      //自动获取图片base64,并上传阿里云
      getImgBaseList(el){
        //读取base64编码  
        lrz(el.file, { quality: el.file.size> 1024*200 ? 0.7 : 1 })
        .then(rst => {
          let para={
            b64str:[{
                Value:rst.base64,
                ID:el.file.uid
              }],
          }
          this.$API.postDynamicImg(para).then((res)=>{
            this.imgUrlList[el.file.uid]=res[el.file.uid]   
          }).catch((error)=>{
            console.log(error)
          })
        })
        .always(function() {
          // 清空文件上传控件的值
          //e.target.value = null;
        });
      }, 
    
      //删除图片 只删除imgurl
      changeImgUrlList(el){
        delete this.imgUrlList[el.uid]
      },

      //视频上传前检测
      beforeVideoUpload(file){
        //限制20m
        let isSizeOk=file.size<20*1024*1024?true:false
        if(!isSizeOk){
          this.$message.error("视频不能超过20M!");
        }

        //限制视频格式
        let isTypeOk=file.type.indexOf('video');
        
        if(isTypeOk==-1){
          this.$message.error("视频格式错误!");
          isTypeOk=false;
        }else{
          isTypeOk=true;
        }
        return  isSizeOk&&isTypeOk

      },
      //视频列表变化  只允许上传一个视频
      changeVideoList(file,filelist){
        if(filelist.length){
          this.hasUploadVideo=true
        }else{
          this.hasUploadVideo=false
        }
      },
      //上传视频  
      getVideoId(file){
        let params = {  
          FileName: file.file.name,
          Title:  file.file.name,
          FileSize: file.file.size,
          Description: "Description",
          Coverurl: "",
          CateId: 16,
          CourseId: 0,
          Grade: 0,
          Tags: ""
        };
        let This = this;
        this.$API.getVideoUploadAuth(params).then(res=>{
          this.videoId=res.VideoID;
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
              This.videoState="开始上传";
            },
            // 文件上传失败
            onUploadFailed: function(uploadInfo, code, message) {
              This.videoState="上传失败";
            },
            // 文件上传完成
            onUploadSucceed: function(uploadInfo) {
              This.videoState="上传成功";
            },
            //视频上传进度监听
            onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
              let num = Math.ceil(uploadedSize * 100 / totalSize);
              This.videoStateNum=num;
              This.videoState="正在上传";
            },
            // STS临时账号会过期，过期时触发函数
            onUploadTokenExpired: function() {
              this.$message.error("sts临时账号过期，请联系网络管理员");
              This.videoState="sts临时账号过期，请联系网络管理员";
            },
          });
          // 初始化上传实例   点播上传。每次上传都是独立的鉴权，所以初始化时，不需要设置鉴权  
          uploader.init();
          var userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
          uploader.addFile(file.file, null, null, null, userData);
          uploader.startUpload();
        })
      },
      //重置发布信息
      resetForm(){
        this.$refs.uploadImg.clearFiles();//清空图片列表
        this.content='';
        this.at_meid=[];
        this.restVideo(); 
        this.restImg();   
      },

      //发布
      postNewClassDynamic(){
        if(this.content){
          this.imgUrlArrList=Object.values(this.imgUrlList)   //获取地址列表
          this.isLoading=true;
          this.$API.postNewClassDynamic(this.options).then((res)=>{
            this.isLoading=false;
            this.$message.success("发布动态成功");
            this.resetForm();     
            this.$nextTick(() => {
              this.$store.commit('changeNewActive',true);   //是否有新动态 true
            });
          })
        }else{
            this.$message({
              message: '内容还空着呢，说点什么吧...',
              type: 'warning'
          });
        }
      }
    },
    created(){
      this.getStudentList();
    }
  }
</script>

<style lang="less" scoped>
@import '../style/theme.less';
  .publish{
    background: #fff;
    padding: 10px;
    font-family:"微软雅黑";
    font-size: 14px;
    .iconfont{
      font-size: 18px;
      margin-right: 3px;
      cursor: pointer;
      color: @main;
      position: relative;
      top: 2px;
    }
    span{
      margin:0 4px;
      font-size: 13px;
      line-height: 18px;
      cursor: pointer;
      opacity: 0.9;
      &:hover{
        opacity: 1;
      }
    }
    .textItem{
      margin-bottom: 10px;
    }
    .todos{
      display: flex;
      justify-content: space-between;
      flex-wrap:no-wrap;
      align-items: center;
    }
  }
  .closeBox{
    height: 20px;
    line-height: 20px;
    position: relative;
    font-size: 20px;
    .closeBtn{
      color: #999;
      position: absolute;
      right: -5px;
      top: -5px;
      z-index: 999;
      cursor: pointer;
    }
  }
  .upPop{
    padding-top: 20px;
  }
  .uploadBox{
    line-height: 0;
    max-width: 353px;
    overflow: hidden;
  }
  </style>