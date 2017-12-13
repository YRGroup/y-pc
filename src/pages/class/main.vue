
<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
    
    <div class="addPost">
      <div class="title addbtn" @click="showAddPost=true">
        <i class="iconfont">&#xe623;</i>发布动态</div>
    </div>
    <!-- <div class="dynamics">
      <div class="input">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="newPost.content">
          </el-input>
      </div>
      <div class="funcArea">
        <div class="func">
          <el-button type="primary" @click="addNewPost"  class="submit" v-loading.fullscreen.lock="fullscreenLoading">发 布</el-button>
        </div>
        <div class="kind">
          <el-popover placement="bottom-start" width="200" trigger="click">
            <el-button slot="reference"  type="text" ><i class="iconfont">&#xe613;</i> 图片</el-button> 
            <div>1112121</div>
          </el-popover>
        </div>
      </div>
    </div> -->

    <el-dialog title="发布动态" :visible.sync="showAddPost" width="30%">
      <el-form :model="newPost">
        <el-form-item>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="newPost.content">
          </el-input>
        </el-form-item>
        <el-form-item v-if="showUpImg">
          <el-upload multiple :http-request="imgUpload" :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
            <i class="el-icon-picture-outline"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item v-if="role =='老师' ">
          <el-select v-model="newPost.at_meid" multiple placeholder="@某学生" style="width:300px">
            <el-option v-for="item in studentList" :key="item.NickName" :label="item.NickName" :value="item.Meid" style="width:300px">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain class="upvideoBtn" v-if="videoBtn" @click="addVideoBtn">
            上传视频
            <input type="file" accept="video/*" capture="camcorder" multiple="multiple" id="videoFile" @change="addVideo">
          </el-button>
          <div id="progress" class="progress" v-if="showProgress">
            <span class="progress-bar">
              <div id="progress-now"></div>
            </span>
            <span id="progress-text"></span>
            <span id="pass20M"></span>
          </div>
        </el-form-item>
        <el-form-item><span style="color:#F40;fontSize:12px">注：上传视频和上传图片只能选其一</span></el-form-item>
        <!-- <el-form-item>
          <el-upload :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-input>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewPost" v-loading.fullscreen.lock="fullscreenLoading">发 布</el-button>
      </div>
    </el-dialog>

    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <div class="card panel" v-for="i in data" :key="i.ID">
        <div class="img">
          <div v-if="i.auther_role == '3'" @click="$router.push('/t?id='+i.auther_meid)" class="category" :style="{background:colors[i.CourseName]}">{{ i.CourseName.substr(0,1) }}</div>
          <img v-else :src="i.userImg" @click="$router.push('/s?id='+i.auther_meid)">
        </div>
        <div class="tips">{{i.category}}</div>
        <div class="header">{{i.auther}}</div>
        <div class="content" @click="$router.push('/post/'+i.ID)">{{i.content}} <span class="atuser" v-for="item in i.AtUser">@{{item.TrueName}}</span></div>
        <div class="videoCover" v-if="i.Video" @click="$router.push('/post/'+i.ID)">
          <span class="CoverImg">
            <span class="icon"><i class="iconfont">&#xe63c;</i></span>
            <span class="shade"></span>
            <img :src="i.Video.CoverUrl" alt="">
          </span>
        </div>
        <div class="albums">
          <li v-for="(p,index) in i.albums" :key="index">
            <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
          </li>

        </div>
        <div class="comment" v-if="i.comment.length" @click="$router.push('/post/'+i.ID)">
          <div class="name">
            {{i.comment[0].TrueName}}：
          </div>
          <div class="content">
            {{i.comment[0].content}}
          </div>
          <div class="btn">查看更多</div>
        </div>
        <div class="footer">
          <span class="time">{{i.date}}</span>
          <span class="iconbtn">
            <span title="删除" class="delBtn" @click="delPost(i.ID)" v-loading.fullscreen.lock="fullscreenLoading" v-if="i.showDelete">
              <i class="iconfont">&#xe630;</i>
              <span class="delBtnTitle">删除</span>
            </span>
            <span title="点赞" @click.once="doLike(i.ID),i.like++">
              <i class="iconfont">&#xe646;</i>{{i.like}}
            </span>
          </span>
        </div>
      </div>
      <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
    </div>

    <el-dialog :visible.sync="showImgBig" class="bigImg" width="40%" top="10vh">
      <img :src="imgBig">
    </el-dialog>

  </div>
</template>

<script>
require("@/common/js/aliyun-sdk.min.js");
require("@/common/js/vod-sdk-upload-1.1.0.min.js");

import lrz from "lrz";
import loadMore from "@//components/loadMore";
import noData from "@//components/noData";
export default {
  name: "app",
  components: { loadMore, noData },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      newPost: {
        content: "",
        at_meid: [],
        videoid: ""
      },
      // showstudent: false,
      data: [],
      fileList: [],
      imgUrls: [],
      imgbase64List: [],
      currentPage: 1,
      pageSize: 10,
      imgBig: "",
      showImgBig: false,
      noMoreData: false,
      nodataImg: false,
      showAddPost: false,
      fullscreenLoading: true,
      nodataPic: require("@/assets/nodata.png"),
      studentList: {},
      showDelete: false,
      showUpImg: true,
      showProgress: false,
      videoBtn: true
    };
  },
  computed: {
    isAdmin() {
      return (
        this.$store.state.currentUser.Meid ==
        this.$store.state.currentClassInfo.teacher.Meid
      );
    },
    role() {
      return this.$store.getters.role
    },
    imgBaseList() {
      let arr = [];
      this.imgUrls.forEach((n, i) => {
        arr.push(n.src);
      });
      return arr;
    },
    colors() {
      return this.$store.state.colors;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    updateData: function(data) {
      this.newPost.content = data;
    },
    // 图片上传
    imgUpload() {
      this.fullscreenLoading = true;
      let vm = this;
      let file = this.$refs.upload.uploadFiles[
        this.$refs.upload.uploadFiles.length - 1
      ].raw;
      lrz(file, { quality: file.size > 1024 * 200 ? 0.7 : 1 })
        .then(rst => {
          vm.imgUrls.push({
            src: rst.base64,
            uid: file.uid
          });
          this.fullscreenLoading = false;
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          //e.target.value = null;
        });
    },
    getData() {
      if (!this.$store.state.currentClassId) return;
      let para = {};
      para.cid = this.$store.state.currentClassId;
      para.currentPage = this.currentPage;
      para.pagesize = this.pageSize;
      para.type = 1;
      this.$API
        .getAllClassDynamic(para)
        .then(res => {
          this.fullscreenLoading = false;
          this.videoBtn = true
          if (res.length) {
            //如果老师、家长、班主任 显示删除按钮
            res.forEach(element => {
              if (
                this.$store.state.currentUser.Meid == element.auther_meid ||
                this.$store.state.currentStudentId == element.auther_meid ||
                this.isAdmin
              ) {
                element.showDelete = true;
              } else {
                element.showDelete = false;
              }
            this.data.push(element)
            });
          } else if (res.length == 0 && this.currentPage == 1) {
            this.nodataImg = true;
          } else if (res.length == 0 && this.currentPage != 1) {
            this.noMoreData = true;
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
      this.$API.getStudentList(para.cid).then(res => {
        this.studentList = res;
      });
    },
    loadMore() {
      this.currentPage++;
      this.getData();
    },
    addImg(e) {
      let files = e.target.files || e.dataTransfer.files;
    },
    addVideoBtn() {
      this.showProgress = true
      // let progress = document.getElementById('progress')   
      // progress.innerHTML = ""
    },
    // 上传视频
    addVideo(e) {
      var pass20M = document.getElementById('pass20M') 
      pass20M.innerHTML = ""

      let videoFile = document.getElementById('videoFile')  
      // 不显示图片  图片清空
      this.showUpImg = false;
      this.newPost.img_base64_list = "";

      let files = e.target.files || e.dataTransfer.files;

      // 限制视频大小 20M
      let videoSize = e.target.files[0].size
      if(videoSize > 20*1024*1024){
        let progress = document.getElementById('pass20M')       
        pass20M.innerHTML = "视频大小不能超过20M！~"
        videoFile.value = ""
        return false
      }

      if (!files.length) {
        this.showProgress = false
        return
      }
      let vue_this = this;
      let file = files[0];
      let params = {
        FileName: file.name,
        Title: file.name,
        FileSize: file.size,
        Description: "Description",
        Coverurl: "",
        CateId: 16,
        CourseId: 0,
        Grade: 0,
        Tags: ""
      };
      let _event = e
      this.$API.getVideoUploadAuth(params).then(res => {
        this.newPost.videoid = res.VideoID; //保存视频ID
        //this.log(res);
        var uploader;
        uploader = new VODUpload({
          // 文件上传失败
          onUploadFailed: function(uploadInfo, code, message) {
            var text = document.getElementById('progress-text') 
            text.innerHTML = "上传失败！~"
            vue_this.log(
              "onUploadFailed: file:" +
                uploadInfo.file.name +
                ",code:" +
                code +
                ", message:" +
                message
            );

          },
          // 文件上传完成
          onUploadSucceed: function(uploadInfo) {
            vue_this.log(
              "onUploadSucceed: " +
                uploadInfo.file.name +
                ", endpoint:" +
                uploadInfo.endpoint +
                ", bucket:" +
                uploadInfo.bucket +
                ", object:" +
                uploadInfo.object
            );
          },
          // 文件上传进度
          // 'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
          //     vue_this.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(uploadedSize * 100 / totalSize) + "%");
          // },
          onUploadProgress: function(uploadInfo, totalSize, uploadedSize) {
            vue_this.log(Math.ceil(uploadedSize * 100 / totalSize));
            let num = Math.ceil(uploadedSize * 100 / totalSize)
            vue_this.refreshProgress(num, _event);
          },
          // STS临时账号会过期，过期时触发函数
          onUploadTokenExpired: function() {
            vue_this.log("onUploadTokenExpired");
          },
          // 开始上传
          onUploadstarted: function(uploadInfo) {
            var uploadAuth = res.UploadAuth;
            var uploadAddress = res.UploadAddress;
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAuth,
              uploadAddress
            );

            vue_this.log(
              "onUploadStarted:" +
                uploadInfo.file.name +
                ", endpoint:" +
                uploadInfo.endpoint +
                ", bucket:" +
                uploadInfo.bucket +
                ", object:" +
                uploadInfo.object
            );
          }
        });
        // 点播上传。每次上传都是独立的鉴权，所以初始化时，不需要设置鉴权
        uploader.init();
        var userData =
          '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}';
        uploader.addFile(file, null, null, null, userData);
        uploader.startUpload();
      });
    },
    log(content) {
      console.log(content)
    },
    // 上传进度
    refreshProgress(n,event) {
      let name = event.target.files[0].name
      let obj = document.getElementById("progress-now")
      let text = document.getElementById('progress-text') 
      let progress = document.getElementById('progress') 
      obj.style.right = (100 - n) + '%'
      text.innerHTML = n + '%'
      if(n == 100){
        progress.innerHTML = "视频上传成功 ~ "
        this.videoBtn = false
      }
    },
    // 点赞
    doLike(id) {
      this.$API
        .doLikeThisPost(id)
        .then(res => {
          this.$message.success("点赞成功");
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    // 删除动态
    delPost(id) {
      this.$confirm("确认删除该动态吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = {
          did: id
        };
        this.fullscreenLoading = true;
        this.$API
          .deletePost(para)
          .then(() => {
            this.fullscreenLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.data = [];
            this.currentPage = 1
            this.getData();
          })
          .catch(err => {
            this.$message({
              message: err.msg,
              type: "error"
            });
          });
      });
    },
    // 查看动态图片
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    },
    handleRemove(file, fileList) {
      for (var i = 0; i < this.imgUrls.length; i++) {
        if (this.imgUrls[i].uid == file.uid) {
          this.imgUrls.splice(i, 1);
          break;
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforePictureUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      //const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式!");
      }
      //if (!isLt5M) {
      //this.$message.error('上传图片大小不能超过 5MB!');
      //}
      return isJPG; //&& isLt5M;
    },
    // 发布动态
    addNewPost() {
      this.currentPage = 1
      if (
        this.$store.getters.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.newPost.student_meid = this.$store.state.currentStudentId;
      }
      let inputCon = this.newPost.content;
      if (!inputCon && !this.newPost.img_base64_list) {
        this.$message.error("内容不能为空");
      } else {
        this.fullscreenLoading = true;
        console.log(this.newPost.at_meid)
        // if (!this.showstudent) {
        //   this.newPost.at_meid = [];
        // }
        this.newPost.type = 1;
        this.newPost.cid = this.$store.state.currentClassId;
        // this.newPost["img_url_list"] = this.fileList.join(",");
        this.newPost["img_base64_list"] = this.imgBaseList.join("|");
        this.$API.postNewClassDynamic(this.newPost).then(res => {
          this.fullscreenLoading = false;
          this.showAddPost = false;
          this.data = [];
          this.$message.success("发布动态成功");
          this.$nextTick(() => {
            this.getData();
          });
          this.newPost = {
            content:'',
            at_meid: [],
            videoid:'',
            img_base64_list:''
          }
          this.showProgress = false,
          this.fileList = [];
          // this.$refs.upload.uploadFiles = [];
          this.imgUrls = [];
        });
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {}
  // watch: {
  //   "$route": "getData"
  // },
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";

// .deleteImg {
//       margin-left: 54px;
//       width: 25px;
//       height: 30px;
//       line-height: 34px;
//       text-align: center;
//       position: absolute;
//       background: #000;
//       opacity: .4;
//       border-radius: 0 0.35em;
//       // right: 10;
//       left:15;
//       // top: 0;
//       bottom: 73px;
//       font-size: 16px;
//       color: #fff;
//       span {

//       }
//     }

.dynamics {
  height: 20vh;
  background-color: white;
  // border-radius: 5px;
}
.kind {
  margin: 6px;
  padding-left: 15px;
}
.submit {
  float: right;
}
.picture {
  margin-left: 20px;
}

.addPost {
  background: #fff;
  .title {
    line-height: 50px;
    padding-left: 20px;
    background: @main;
    color: #fff;
    margin-bottom: 10px;
  }
  .addbtn {
    text-align: center;
    cursor: pointer;
    background: #fff;
    color: @main;
    .iconfont {
      margin-right: 8px;
    }
    &:hover {
      background: @main;
      color: #fff;
    }
  }
  .content {
    padding: 10px 20px;
  }
  .btn {
    text-align: center;
    padding: 10px 50px;
  }
  .albums {
    padding: 0 20px;
  }
}
.card {
  margin: 15px 0;
  position: relative;
  background: #fff;
  padding-left: 80px;
  &:hover {
    // border: 1px solid @main;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
  }
  .img {
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
  .tips {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 12px 0 30px;
    display: inline-block;
    background: @main;
    color: #fff;
    line-height: 32px;
    font-size: 12px;
    opacity: 0.6;
    &:before {
      position: absolute;
      content: "";
      left: 0;
      width: 0;
      height: 0;
      border: 16px solid transparent;
      border-left-color: #fff;
    }
  }
  .header {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    line-height: 42px;
    &:hover {
      color: @main;
    }
  }
  .content {
    line-height: 24px;
    word-warp: break-word;
    word-break: break-all;
    cursor: pointer;
    color: #666;
  }
  .comment {
    background: #fbfbfb;
    border-radius: 5px;
    padding: 10px 20px;
    margin-bottom: 8px;
    .name {
      display: inline-block;
      color: @main;
    }
    .content {
      display: inline-block;
    }
    .btn {
      border-top: 1px solid #e2e3e3;
      cursor: pointer;
      text-align: center;
      color: @main;
      padding-top: 5px;
      margin-top: 5px;
    }
  }
  .albums {
    margin: 10px 0;
    li {
      display: inline-block;
      .imgCon {
        width: 160px;
        height: 160px;
        background-position: center;
        background-size: cover;
        display: inline-block;
        margin: 0 10px 10px 0;
        cursor: pointer;
      }
    }
  }
  .footer {
    font-size: 12px;
    .time {
      color: @grey;
    }
    .iconbtn {
      float: right;
      cursor: pointer;
      span {
        margin: 0 10px;
        &:hover {
          color: @main;
        }
      } // &:hover {
      //   color: @main;
      // }
    }
    .delBtn {
      width: 50px;
      .iconfont {
        display: inline-block;
      }
      .delBtnTitle {
        display: none;
        margin: 0;
      }
      &:hover {
        .delBtnTitle {
          display: inline-block;
        }
      }
    }
  }
}
.bigImg {
  max-width: 100vw;
  max-height: calc(100vh - 10vh);
  .el-dialog {
    top: 0;
  }
  img {
    max-width: 100%;
    max-height: 100vh;
  }
}

.funcArea {
  padding: 10px;
}
.upvideoBtn {
  position: relative;
  display: inline-block;
  input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.progress{
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.progress-bar {
      width:140px;
      height: 5px;
      background: #ccc;
      border-radius: 3px;
      position: relative;
      overflow: hidden;
      display: inline-block;
      margin: 10px 5px 0 0;
    }
#progress-text{
  position: relative;
}
#progress-now {
  position: absolute;
  left: 0;
  right: 100%;
  top: 0;
  bottom: 0;
  background: #00c06f;
}
</style>
