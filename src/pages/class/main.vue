<template>
  <div>

    <div class="addPost">
      <div class="title" :class="showAddPost?null:'addbtn'" @click="showAddPost?showAddPost=false:showAddPost=true"><i class="iconfont">&#xe623;</i>添加动态</div>
      <div calss="content" v-show="showAddPost">
        <vue-html5-editor :content="newPost.content" @change="updateData" :auto-height="true" :height="200"></vue-html5-editor>
      </div>
      <div class="footer" v-show="showAddPost">
        <div class="albums">
          <el-upload
            :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforePictureUpload"
            ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div class="btn">
          <el-button type="primary" @click.native="addNewPost">发布</el-button>
        </div>
      </div>
      
    </div>
  
    <div class="card panel" v-for="i in data" :key="i.id">
      <div class="img">
        <img :src="i.userImg">
      </div>
      <div class="tips">{{i.category}}</div>
      <div class="header">{{i.auther}}</div>
      <div class="content" v-html="i.content" @click="$router.push('/post/'+i.id)"></div>
      <div class="albums">
        <li v-for="(p,index) in i.albums" :key="index">
          <img :src="p">
        </li>
      </div>
      <div class="footer">
        <span class="time">{{i.date}}</span>
        <span class="iconbtn">
          <!-- <span title="阅读数"><i class="iconfont">&#xe6c3;</i>{{i.like}}</span> -->
          <span title="点赞数"  @click="doLike(i.id),i.like++"><i class="iconfont">&#xe646;</i>{{i.like}}</span>
        </span>
      </div>
    </div>
  
    <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
  
  </div>
</template>

<script>
import loadMore from '@//components/loadMore'

export default {
  name: 'app',
  components: { loadMore },
  data() {
    return {
      newPost: {},
      data: [],
      fileList: [],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      showAddPost:false,
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
            this.data.push(element)
          })
        } else {
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
        this.$message.success('点赞成功');
      })
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
      this.$refs.upload.uploadFiles.forEach((obj) => {
        this.fileList.push(obj.response.Content[0])
      })
      this.newPost.type = 1
      this.newPost.cid = this.$store.state.currentClassId
      this.newPost['img_url_list'] = this.fileList.join(',')
      this.$API.postNewClassDynamic(this.newPost).then(res => {
        this.$message('发布动态成功')
        this.getData()
      })
    },
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
    color:#fff;
  }
  .addbtn{
    text-align: center;
    cursor: pointer;
    background: #fff;
    color:@main;
    .iconfont{
      margin-right:8px;
    }
    &:hover{
      background: @main;
      color:#fff;
    }
  }
  .btn {
    text-align: center;
    padding: 10px 50px;
  }
  .albums {
    padding: 20px;
  }
}

.card {
  margin: 15px 0;
  position: relative;
  background: #fff;
  padding-left:80px;
  border: 1px solid #fff;
  &:hover{
    // border: 1px solid @main;
    box-shadow: 0 3px 2px rgba(0,0,0,0.1);
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
  .tips{
    position: absolute;
    right: 20px;
    top: 24px;
    border:1px solid @main;
    color:@main;
    padding:1px 10px;
    border-radius: 3px;
    font-size: 12px;
  }
  .header {
    display: inline-block;
    font-size: 16px;
    line-height: 42px;
  }
  .content {
    // width: calc(~"100% - 120px");
    cursor: pointer;
  }
  .albums {
    margin: 10px 0;
    li {
      display: inline-block;
      img {
        max-height: 120px;
      }
    }
  }
  .footer {
    font-size:12px;
    .time {
      color: @grey;
    }
    .iconbtn {
      float: right;
      cursor: pointer;
      &:hover{
        color:@main;
      }
    }
  }
}
</style>
