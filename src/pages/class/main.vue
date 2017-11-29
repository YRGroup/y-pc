<template>
  <div  v-loading.fullscreen.lock="fullscreenLoading">
    
    <div class="addPost">
      <div class="title addbtn" @click="showAddPost=true">
        <i class="iconfont">&#xe623;</i>发布动态</div>
    </div>

    <!-- <div class="sendpost">
      <div class="input">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="newPost.content">
          </el-input>
      </div>
      <div class="funArea">
        <div class="sendBtn"></div>
        <div class="kind">
          <a>
            <i class="iconfont">&#xe60e;</i>
            图片
          </a>
          <a>
            <i class="iconfont">&#xe60e;</i>
            视频
          </a>
        </div>
      </div>
    </div> -->

    <el-dialog title="发布动态" :visible.sync="showAddPost" width="30%">
      <el-form :model="newPost">
        <el-form-item>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="newPost.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-upload :http-request="imgUpload" :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item label="是否@某学生：">
          <el-switch on-text="" off-text="" v-model="showstudent"></el-switch>
        </el-form-item label="">
        <el-form-item v-show="showstudent">
          <el-select v-model="newPost.at_meid" multiple placeholder="请选择" style="width:300px">
            <el-option v-for="item in studentList" :key="item.NickName" :label="item.NickName" :value="item.Meid" style="width:300px">
            </el-option>
          </el-select>
        </el-form-item>
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
        <div class="img" @click="openUserPage(i)">
          <!-- <img :src="i.userImg" v-if="i.userImg!='http://pic.yearnedu.com/himg.png' && i.userImg!=''">
                      <div class="headTextImg" v-else>{{i.auther.substr(0,1)}}</div> -->
          <img :src="i.userImg">
        </div>
        <div class="tips">{{i.category}}</div>
        <div class="header">{{i.auther}}</div>
        <div class="content" @click="$router.push('/post/'+i.ID)">{{i.content}} <span class="atuser" v-for="item in i.AtUser">@{{item.TrueName}}</span></div>
        <div class="albums">
          <li v-for="(p,index) in i.albums" :key="index">
            <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
          </li>

        </div>
        <div class="comment" v-if="i.comment.length">
          <div class="name">
            {{i.comment[0].TrueName}}：
          </div>
          <div class="content">
            {{i.comment[0].content}}
          </div>
          <div class="btn" @click="$router.push('/post/'+i.ID)">查看更多</div>
        </div>
        <div class="footer">
          <span class="time">{{i.date}}</span>
          <span class="iconbtn">
            <span title="删除" class="delBtn" v-if="isAdmin" @click="delPost(i.ID)" v-loading.fullscreen.lock="fullscreenLoading">
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
import lrz from 'lrz'
import loadMore from '@//components/loadMore'
import noData from '@//components/noData'

export default {
  name: "app",
  components: { loadMore, noData },
  data() {
    return {
      newPost: {
        content: '',
        at_meid:[],
        img_url_list:''
      },
      showstudent: false,
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
      studentList:{}
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.currentUser.Meid == this.$store.state.currentClassInfo.teacher.Meid
    },
    imgBaseList(){
          let arr=[];
          this.imgUrls.forEach((n,i)=>{
              arr.push(n.src)
          })
        return arr;
      }
  },
  methods: {
    updateData: function(data) {
      this.newPost.content = data;
    },
    imgUpload() {
      this.fullscreenLoading = true
       let vm = this
       let file=this.$refs.upload.uploadFiles[this.$refs.upload.uploadFiles.length-1].raw;
       lrz(file, { quality :file.size>1024*200?0.7:1 }).then((rst)=>{
          vm.imgUrls.push({
              src:rst.base64,
              uid:file.uid
          });
          this.fullscreenLoading = false
          return rst;
        }).always(function() {
        // 清空文件上传控件的值
        //e.target.value = null;
        });
    },
    getData() {
      if(!this.$store.state.currentClassId)
        return;
      let para = {};
      para.cid = this.$store.state.currentClassId;
      para.currentPage = this.currentPage;
      para.pagesize = this.pageSize;
      para.type = 1;
      this.$API
        .getAllClassDynamic(para)
        .then(res => {
          this.fullscreenLoading = false
          if (res.length) {
            this.data = res
            // res.forEach(element => {
            //   if (element.comment.length) {
            //     element.comment1 = element.comment[0];
            //   }
            //   this.data.push(element);
            // });
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
      console.log(files);
    },
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
    delPost(id) {
      this.$confirm("确认删除该动态吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.fullscreenLoading = true;
        let para = {
          did: id
        };
        this.$API
          .deletePost(para)
          .then(() => {
            this.fullscreenLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.data = [];
            this.getData();
          })
          .catch(err => {
            this.$message({
              message: "删除失败了哦!",
              type: "error"
            });
          });
      });
    },
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    },
    handleRemove(file, fileList) {
      for(var i=0; i<this.imgUrls.length; i++) {
        if(this.imgUrls[i].uid== file.uid) {
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
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      //const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式!");
      }
      //if (!isLt5M) {
        //this.$message.error('上传图片大小不能超过 5MB!');
      //}
      return isJPG; //&& isLt5M;
    },

    addNewPost() {
      if (
        this.$store.getters.role == "家长" &&
        this.$store.state.currentStudentId != null
      ) {
        this.newPost.student_meid = this.$store.state.currentStudentId;
      }
      let inputCon = this.newPost.content;
      if(!inputCon && !this.newPost.img_base64_list){
        this.$message.error("内容不能为空");
      }else{
        this.fullscreenLoading = true
        if(!this.showstudent){
          this.newPost.at_meid = []
        }
        this.newPost.type = 1
        this.newPost.cid = this.$store.state.currentClassId
        this.newPost['img_url_list'] = this.fileList.join(',')
        this.newPost['img_base64_list'] = this.imgBaseList.join('|')
        this.$API.postNewClassDynamic(this.newPost).then(res => {
          this.fullscreenLoading = false
          this.showAddPost = false
          this.data = []
          this.$message.success('发布动态成功')
          this.getData()
          this.newPost.content = ''
          this.newPost.img_url_list = ''
          this.newPost.at_meid = []
          this.fileList = []
          this.$refs.upload.uploadFiles = []
          this.imgUrls=[]
        })
      }
    },
    openUserPage(u) {
      if (u.Role == "老师") {
        this.$router.push("/t?id=" + u.auther_meid);
      } else if (u.Role == "家长") {
        this.$message({
          showClose: true,
          message: "家长没有个人主页",
          type: "warning"
        });
      } else if (u.Role == "学生") {
        this.$router.push("/s?id=" + u.auther_meid);
      }
    }
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
    font-size: 16px;
    line-height: 42px;
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
</style>
