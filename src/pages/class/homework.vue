<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="addHomework" v-show="$store.getters.role=='老师' && !this.$route.query.id">
      <div class="title" :class="showAddHomework?null:'addbtn'" @click="handleAddHomework">
        <i class="iconfont">&#xe623;</i>布置作业</div>
    </div>

    <no-data v-if="nodataImg"></no-data>
    <div v-else>
      <div class="card panel" v-for="(i,index) in homework" :key="index">
        <div class="course">
          
          {{i.CourseName}}
        </div>
        <div class="tasktitle" @click="$router.push('/homework?id='+i.HID)">
          <span class="unread" v-if="!i.IsRead">[未读]</span>
          {{i.Title}}
        </div>
        <div class="taskbox">
          <div class="taskcon" @click="$router.push('/homework?id='+i.HID)">{{i.Content}}</div>
          <div class="albums">
            <li v-for="(p,index) in i.Albums" :key="index">
              <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
            </li>
          </div>
          <div class="taskbottom">
            <span class="time">{{i.CreateTime}}</span>
            <span title="删除" class="delBtn" v-if="isClassAdmin" @click="delPost(i.HID)" v-loading.fullscreen.lock="fullscreenLoading">
              <i class="iconfont">&#xe630;</i>
              <span class="delBtnTitle">删除</span>
            </span>
          </div>
        </div>
        <div class="isread" v-show="isread">
          <div class="look">
            <div class="lookNum">已读：{{i.LookCount}}人</div>
            <div class="lookuser">
              <div class="item" v-for="item in i.LookUser">
                <img :src="item.Headimgurl">
                <span class="name">{{item.TrueName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <load-more @click.native="loadMore" :noMoreData="noMoreData" v-show="!$route.query.id"></load-more>

    </div>

    <el-dialog title="布置作业" :visible.sync="showAddHomework" size="tiny">
      <el-form :model="newHomeworkData" label-width="60px">
        <el-form-item label="标题" :rules="[{ required: true}]">
          <el-input v-model.trim="newHomeworkData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科目" v-show='notClassAdmin'>
          <el-input v-model="course" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="科目" v-show='isClassAdmin' :rules="[{ required: true}]">
          <el-select v-model="newHomeworkData.course_name" size="small" placeholder="请选择" style="width:120px">
            <el-option v-for="i in courseList" :key="i.ID" :label="i.CourseName" :value="i.CourseName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :rules="[{ required: true}]">
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
        <el-button type="success" @click="addNewHomework" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showImgBig" class="bigImg">
      <img :src="imgBig">
    </el-dialog>

  </div>
</template>

<script>
import loadMore from '@/components/loadMore'
import noData from '@/components/noData'

export default {
  components: { loadMore, noData },
  data() {
    return {
      homework: [],
      currentPage: 1,
      pageSize: 10,
      imgBig: '',
      showImgBig: false,
      noMoreData: false,
      showAddHomework: false,
      newHomeworkData: {
        title: '',
        content: '',
        course_name: ''
      },
      fileList: [],
      nodataImg: false,
      nodataPic: require('@/assets/nodata.png'),
      notClassAdmin: false,
      fullscreenLoading: true,
      isread:false
    }
  },
  computed: {
    course: function() {
      if (this.$store.state.currentUser.Role == '老师' && this.$store.state.currentUser.ExtendInfo.Course.CourseName) {
        this.classroom = true
        return this.$store.state.currentUser.ExtendInfo.Course.CourseName
      } else {
        return '暂无'
      }
    },
    classInfo() {
      return this.$store.state.currentClassInfo
    },
    isClassAdmin() {
      if (this.$store.getters.role == '老师') {
        if (this.classInfo.teacher && this.$store.state.currentUser.Meid == this.classInfo.teacher.Meid) {
          return true
        } else {
          this.notClassAdmin = true
          return false
        }
      }
    },
    courseList() {
      if (this.$store.getters.courseList) {
        this.$store.getters.courseList.shift()
        return this.$store.getters.courseList
        // return this.$store.getters.courseList.map(o => {
        //   return {
        //     courseID: o.ID,
        //     name: o.CourseName
        //   }
        // })
      }
    }
  },
  methods: {
    openImgBig(val) {
      this.imgBig = val
      this.showImgBig = true
    },
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
    delPost(id) {
      this.$confirm('确认删除该作业吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true;
        let para = {
          hid: id
        }
        this.$API.deleteHomeWork(para).then(() => {
          this.fullscreenLoading = false;
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.homework = []
          this.getData();
          this.refresh()
        }).catch((err) => {
          this.$message({
            message: '删除失败了哦!',
            type: 'error',
          })
        })
      })
    },
    refresh() {
      this.homework = []
      if (!this.$route.query.id) {
        this.isread = false
        this.getData()
      } else {
        this.$API.getHomework(this.$route.query.id).then(res => {
          this.fullscreenLoading = false
          this.homework = []
          this.isread = true
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
        this.fullscreenLoading = false
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
      if (this.notClassAdmin == true) {
        this.newHomeworkData['course_name'] = this.$store.state.currentUser.ExtendInfo.Course.CourseName
      }
      this.$refs.upload.uploadFiles.forEach((obj) => {
        this.fileList.push(obj.response.Content[0])
      })
      this.newHomeworkData['img_url_list'] = this.fileList.join(',')
      if (!this.newHomeworkData.title) {
        this.$message.error('请填写标题')
      } else if (!this.newHomeworkData.course_name) {
        this.$message.error('请选择学科')
      } else if (!this.newHomeworkData.content) {
        this.$message.error('请填写内容')
      } else {
        this.$API.addHomework(this.newHomeworkData).then(res => {
          this.fullscreenLoading = false
          this.showAddHomework = false
          this.$message.success('发布作业成功')
          this.refresh()
          this.homework = []
          this.getData();
          this.newHomeworkData = {
            title: '',
            content: '',
            course_name: '',
            img_url_list:''
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    handleAddHomework() {
      this.showAddHomework = true
    }
  },
  created() {
    // this.getData()
    this.refresh()
    this.$store.dispatch('getCourseList')
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
    cursor: pointer;
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

.delBtn {
  font-size: 12px;
  float: right;
  &:hover {
    color: @main;
  }
}

.bigImg {
  img {
    max-width: 80%;
    ;
  }
}

</style>
