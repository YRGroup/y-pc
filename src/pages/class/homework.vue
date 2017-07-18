<template>
  <div>
  
    <div class="title">
      <span>班级作业</span>
      <div class="btn" v-show="$store.state.role=='老师'">
        <el-button type="primary" @click="showAddHomework = true">添加新作业</el-button>
      </div>
    </div>
  
    <div class="card" v-for="(i,index) in homework" :key="index">
      <div class="course">
        {{i.CourseName}}
      </div>
      <div class="header">{{i.Title}}</div>
      <div class="body">
        <div class="content" v-html="i.Content"></div>
        <div class="footer">
          <span class="time">{{i.CreateTime}}</span>
        </div>
      </div>
    </div>
    
    <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>

    <el-dialog title="收货地址" :visible.sync="showAddHomework">
      <el-form :model="newHomeworkData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="newHomeworkData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-input v-model="course" :disabled="true"></el-input>
        </el-form-item>
        <vue-html5-editor :content="newHomeworkData.content" @change="updateData" :auto-height="true" :height="200"></vue-html5-editor>
        <el-form-item class="addImgBtn">
          <div class="file">
            <a href="javascript:;" class="a-upload">
              <input type="file" accept="image/jpeg,image/png" multiple="multiple" id="imgFiles" @change="addImg"> 点击这里上传图片
            </a>
            <div class="imgPreviewContainer">
              <div class="imgPreview" v-for="(i,index) in fileList" :key="index">
                <div class="deleteImg">
                  <span @click="deleteImg(index)">X</span>
                </div>
                <img :src="i">
              </div>
            </div> 
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddHomework = false">取 消</el-button>
        <el-button type="primary" @click="addNewHomework">确 定</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
import loadMore from '@//components/loadMore'

export default {
  components:{loadMore},
  data() {
    return {
      homework:[],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      showAddHomework:false,
      newHomeworkData:{
      },
      fileList: [],
    }
  },
  computed:{
    course:function(){
      if(this.$store.state.currentUser.ExtendInfo.Course){
        return this.$store.state.currentUser.ExtendInfo.Course
      }
    }
  },
  methods: {
    updateData: function (data) {
      this.newHomeworkData.content = data
    },
    addImg() {
      if (this.fileList.length < 9) {
        let imgFiles = document.getElementById('imgFiles').files
        this.$API.uploadImg(imgFiles).then((res) => {
          res.forEach((val) => {
            this.fileList.push(val)
            this.newHomeworkData.content += '<img style="max-width:100%;" src='+ val +'>'
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      }else{
        this.$message.error('最多上传9张图片')
      }
    },
    deleteImg(val) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (i == val) {
          this.fileList.splice(i, 1)
        }
      }
    },
    getData(){
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getHomeworkList(para).then(res=>{
        if (res.length) {
          res.forEach((element) => {
            this.homework.push(element)
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
    addNewHomework(){
      this.newHomeworkData['class_id']=this.$store.state.currentClassId
      this.newHomeworkData['course_name']=this.$store.state.currentUser.ExtendInfo.Course
      this.$API.addHomework(this.newHomeworkData).then(res=>{
        this.showAddHomework = false
        this.getData()
      })
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
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.title {
  border-bottom: 1px solid @border;
  line-height: 50px;
  padding:0 30px;
  .btn{
    float: right;
  }
}

.card {
  margin: 15px 0;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  position: relative;
  &:hover{
    border: 1px solid @main;
  }
  .course {
    height: 50px;
    width: 125px;
    display: inline-block;
    background: @main;
    color:#fff;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    border-bottom-right-radius:20px;
  }
  .header{
    line-height: 50px;
    height:50px;
    text-align: center;
    font-weight: bold;
    margin-top:-50px;
  }
  .body {
    line-height: 2rem;
    vertical-align: top;
    padding: 10px 30px;
    .footer {
      text-align: right;
      .time {
      padding-top:20px;
        color: @grey;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}

.file {
  padding-top: 5px;
  .a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
  }
  .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }
}

.imgPreviewContainer {
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
  display: none;
  .imgPreview {
    position: relative;
    width: 33.33%;
    height: 150px;
    overflow: hidden;
    &:hover .deleteImg {
      display: block;
    }
    .deleteImg {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      line-height: 10rem;
      font-size: 50px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      span {
        cursor: pointer;
      }
    }
    .imgName {
      color: @main;
    }
    img {
      width:100%;
    }
  }
}

.addImgBtn{
  padding:10px;
}
</style>
