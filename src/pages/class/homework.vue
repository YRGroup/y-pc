<template>
  <div>

    <div class="addHomework" v-show="$store.getters.role=='老师'">
      <!-- <span>班级作业</span>
                  <div class="btn">
                    <el-button type="primary" @click="showAddHomework = true">添加新作业</el-button>
                  </div>  -->
      <div class="title" :class="showAddHomework?null:'addbtn'" @click="showAddHomework = true">
        <i class="iconfont">&#xe623;</i>布置作业</div>
    </div>

    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <div class="card panel" v-for="(i,index) in homework" :key="index">
        <div class="course">
          {{i.CourseName}}
        </div>
        <div class="tasktitle">{{i.Title}}</div>
        <div class="taskbox">
          <div class="taskcon">{{i.Content}}</div>
          <div class="albums">
            <li v-for="(p,index) in i.Albums" :key="index">
              <img :src="p">
            </li>
          </div>
          <div class="taskbottom">
            <span class="time">{{i.CreateTime}}</span>
          </div>
        </div>
      </div>

      <load-more @click.native="loadMore" :noMoreData="noMoreData" v-show="!$route.query.id"></load-more>

      <el-dialog title="布置作业" :visible.sync="showAddHomework" size="tiny">
        <el-form :model="newHomeworkData" label-width="60px">
          <el-form-item label="标题">
            <el-input v-model.trim="newHomeworkData.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="科目">
            <el-input v-model="course" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="newHomeworkData.content">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-upload :action="this.$store.getters._APIurl+'/api/Upload/ImageUpload'" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="success" @click="addNewHomework">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import loadMore from '@//components/loadMore'
import noData from '@//components/noData'

export default {
  components: { loadMore, noData },
  data() {
    return {
      homework: [],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      showAddHomework: false,
      newHomeworkData: {
      },
      fileList: [],
      nodataImg: false,
      nodataPic: require('@/assets/nodata.png')
    }
  },
  computed: {
    course: function() {
      if (this.$store.state.currentUser.ExtendInfo.Course.CourseName) {
        return this.$store.state.currentUser.ExtendInfo.Course.CourseName
      }
    }
  },
  methods: {
    updateData: function(data) {
      this.newHomeworkData.content = data
    },
    addImg() {
      if (this.fileList.length < 9) {
        let imgFiles = document.getElementById('imgFiles').files
        this.$API.uploadImg(imgFiles).then((res) => {
          res.forEach((val) => {
            this.fileList.push(val)
            this.newHomeworkData.content += '<img style="max-width:320px;text-align:center" src=' + val + '>'
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      } else {
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
    refresh() {
      this.homework = []
      if (!this.$route.query.id) {
        this.getData()
      } else {
        this.$API.getHomework(this.$route.query.id).then(res => {
          this.homework.push(res)
        })
      }
    },
    getData() {
      let para = {}
      para.cid = this.$store.state.currentClassId
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getHomeworkList(para).then(res => {
        if (res.length) {
          res.forEach((element) => {
            this.homework.push(element)
          })
        } else if (this.currentPage == 1) {
          this.nodataImg = true
        } else {
          this.noMoreData = true
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(fileList);
      let c = file.response.Content[0]
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
    loadMore() {
      this.currentPage++
      this.getData()
    },
    addNewHomework() {
      this.newHomeworkData['class_id'] = this.$store.state.currentClassId
      this.newHomeworkData['course_name'] = this.$store.state.currentUser.ExtendInfo.Course.CourseName
      this.$refs.upload.uploadFiles.forEach((obj) => {
        this.fileList.push(obj.response.Content[0])
      })
      if (!this.newHomeworkData.title) {
        this.$message('请填写作业标题')
      } else if (!this.newHomeworkData.content) {
        this.$message('请填写作业内容')
      } else {
        this.$API.addHomework(this.newHomeworkData).then(res => {
          this.showAddHomework = false
          this.$message('发布作业成功')
          this.getData()
          this.newHomeworkData = {}
          this.$message.error(err.msg)
        })
      }
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  watch: {
    "$route": "refresh"
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';
@import 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';

.addHomework {
  background: #fff;
  text-align: center;
  margin-bottom: 15px;
  .iconfont {
    padding-right: 8px;
  }

  .title {
    line-height: 50px;
    cursor: pointer;
    color: @main;
    &:hover {
      background: @main;
      color: #fff;
    }
  }
}

.card {
  margin-bottom: 15px; // border: 1px solid @border;
  position: relative;
  &:hover {
    // border: 1px solid @main;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
  }
  .course {
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
  .tasktitle {
    line-height: 36px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .taskbox {
    color: #666;
    cursor: pointer;
    .taskcon {
      margin: 0 auto;
      img {
        text-align: center;
        max-height: 100px;
      }
    }
    .taskbottom {
      // text-align: right;
      margin-top: 10px;
      .time {
        padding-top: 20px;
        color: @grey;
        font-size: 12px;
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
      width: 150px;
      height: 150px;
    }
  }
}

.addImgBtn {
  // padding: 10px;
}
</style>
