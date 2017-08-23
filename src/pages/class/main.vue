<template>
  <div>
  
    <div class="addPost">
      <div class="title addbtn" @click="showAddPost=true">
        <i class="iconfont">&#xe623;</i>发布动态</div>
    </div>
  
    <el-dialog title="发布动态" :visible.sync="showAddPost" size="tiny">
      <el-form :model="newPost">
        <el-form-item>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="newPost.content">
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :model="newPost">
        <el-form-item>
          <el-upload :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="addNewPost">发 布</el-button>
      </div>
    </el-dialog>
  
    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <div class="card panel" v-for="i in data" :key="i.ID">
        <div class="img" @click="openUserPage(i)">
          <img :src="i.userImg" v-if="i.userImg!='http://yrgroup.oss-cn-beijing.aliyuncs.com/timg.jpg' && i.userImg!=''">
          <div class="headTextImg" v-else>{{i.auther.substr(0,1)}}</div>
        </div>
        <div class="tips">{{i.category}}</div>
        <div class="header">{{i.auther}}</div>
        <div class="content" @click="$router.push('/post/'+i.ID)">{{i.content}}</div>
        <div class="albums">
          <li v-for="(p,index) in i.albums" :key="index">
            <img :src="p" @click="openImgBig(p)">
          </li>
        </div>
        <div class="comment" v-if="i.comment1">
          <div class="name">
            {{i.comment1.TrueName}}：
          </div>
          <div class="content">
            {{i.comment1.content}}
          </div>
          <div class="btn" @click="$router.push('/post/'+i.ID)">查看更多</div>
        </div>
        <div class="footer">
          <span class="time">{{i.date}}</span>
          <span class="iconbtn">
            <span title="删除" class="delBtn" v-if="isAdmin" @click="delPost(i.id)">
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
  
    <el-dialog :visible.sync="showImgBig" class="bigImg">
      <img :src="imgBig">
    </el-dialog>
  
  </div>
</template>

<script>
import loadMore from '@//components/loadMore'
import noData from '@//components/noData'

export default {
  name: 'app',
  components: { loadMore, noData },
  data() {
    return {
      newPost: {},
      data: [],
      fileList: [],
      currentPage: 1,
      pageSize: 10,
      imgBig: '',
      showImgBig: false,
      noMoreData: false,
      nodataImg: false,
      showAddPost: false,
      nodataPic: require('@/assets/nodata.png')
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.currentUser.Meid == this.$store.state.currentClassInfo.teacher.Meid
    }
  },
  methods: {
    updateData: function (data) {
      this.newPost.content = data
    },
    getData() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      para.type = 1
      this.$API.getAllClassDynamic(para).then(res => {
        if (res.length) {
          res.forEach((element) => {
            if (element.comment.length) {
              element.comment1 = element.comment[0]
            }
            this.data.push(element)
          })
        } else if (res.length == 0 && this.currentPage == 1) {
          this.nodataImg = true
        } else if (res.length == 0 && this.currentPage != 1) {
          this.noMoreData = true
        }
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then((res) => {
        this.$message.success('点赞成功')
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    delPost(id) {
      let para = {
        did: id
      }
      this.$API.deletePost(para).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        this.data = []
        this.getData()
      }).catch((err) => {
        console.error('fff>>>>', err)
        this.$message({
          message: '删除失败了哦!',
          type: 'error',
        })
      })
    },
    openImgBig(val) {
      this.imgBig = val
      this.showImgBig = true
    },
    handleRemove(file, fileList) {
      console.log(fileList);
      let c = file.response.Content[0]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforePictureUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },
    addNewPost() {
      if (this.$store.getters.role == '家长' && this.$store.state.currentStudentId != null) {
        this.newPost.student_meid = this.$store.state.currentStudentId
      }
      let inputCon = this.newPost.content
      if (inputCon != undefined) {
        this.$refs.upload.uploadFiles.forEach((obj) => {
          this.fileList.push(obj.response.Content[0])
        })
        this.newPost.type = 1
        this.newPost.cid = this.$store.state.currentClassId
        this.newPost['img_url_list'] = this.fileList.join(',')
        this.$API.postNewClassDynamic(this.newPost).then(res => {
          this.showAddPost = false
          this.data = []
          this.$message('发布动态成功')
          this.getData()
          this.newPost.content = ''
          this.newPost.img_url_list = ''
          this.fileList = []
          this.$refs.upload.uploadFiles = []
        })
      } else {
        this.$message('内容不能为空')
      }
    },
    openUserPage(u){
      if(u.Role=='老师'){
        this.$router.push('/t?id='+u.auther_meid)
      }else if(u.Role=='家长'){
        this.$message({
          showClose: true,
          message: '家长没有个人主页',
          type: 'warning'
        })
      }else if(u.Role=='学生'){
        this.$router.push('/s?id='+u.auther_meid)
      }
    }
  },
  created() {
      this.getData()
  },
  mounted() {
  },
  watch: {
    "$route": "getData"
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

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
    padding: 0 24px 0 30px;
    display: inline-block;
    background: @main;
    color: #fff;
    line-height: 36px;
    opacity: 0.6;
    &:before {
      position: absolute;
      content: '';
      left: 0;
      width: 0;
      height: 0;
      border: 18px solid transparent;
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
      img {
        max-height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
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
</style>
