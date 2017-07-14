<template>
  <div>
  
    <div class="addPost">
      <div class="title">添加新动态</div>
      <div calss="content">
        <vue-html5-editor :content="newPost.content" @change="updateData" :auto-height="true" :height="200"></vue-html5-editor>
      </div>
      <div class="footer">
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
  
    <div class="card" v-for="i in data" :key="i.id">
      <div class="img">
        <img :src="i.userImg">
      </div>
      <div class="header">{{i.auther}}</div>
      <div class="content" v-html="i.content"></div>
      <div class="albums">
        <li v-for="(p,index) in i.albums" :key="index">
          <img :src="p">
        </li>
      </div>
      <div class="footer">
        <span class="time">{{i.date}}</span>
        <span class="btn">
          <span>like:{{i.like}}</span>
        </span>
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
      newPost: {},
      data:[],
      fileList:[],
    }
  },
  methods: {
    updateData: function (data) {
      this.newPost.content = data
    },
    getData(){
      this.$API.getAllClassDynamic(this.$store.state.currentClassId).then(res=>{
        this.data=res
      })
    },
    doLike(id) {
      this.$API.doLikeThisPost(id).then((res) => {
        
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
    addNewPost(){
      this.$refs.upload.uploadFiles.forEach((obj)=> {
        this.fileList.push(obj.response.Content[0])
      })
      this.newPost.type = 1
      this.newPost.cid = this.$store.state.currentClassId
      this.newPost['img_url_list'] = this.fileList.join(',')
      this.$API.postNewClassDynamic(this.newPost).then(res=>{
		    this.$message('发布动态成功')
        this.getData()
      })
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    console.log(this.$store.getters._APIurl)
  },
  watch:{
    "$route": "getData"
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.addPost {
  .title {
    line-height: 50px;
    padding-left: 20px;
  }
  .btn {
    text-align: center;
    padding: 10px 50px;
  }
  .albums{
    padding:20px;
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
    line-height: 80px;
    display: inline-block;
    vertical-align: top;
  }
  .content {
    width: calc(~"100% - 120px");
    padding: 10px;
    margin-left: 85px;
    margin-top: -30px;
    line-height: 1.5rem;
  }
  .albums{
    li{
      padding:10px;
      display: inline-block;
      img{
        width:200px;
      }
    }
  }
  .footer {
    padding: 10px 30px;
    .time {
      color: @grey;
    }
    .btn {
      float: right;
      padding: 0 15px;
    }
  }
}
</style>
