<template>
  <div>
    <div class="panel" v-show="showTool">
      <div class="toolBar">
        <span class="label">类别：</span>
        <el-select v-model="filter.cateid" size="small" placeholder="请选择" style="width:120px">
          <el-option v-for="item in categoryList" :key="item.CateID" :label="item.CateName" :value="item.CateID">
          </el-option>
        </el-select>
        <span class="label">年级：</span>
        <el-select v-model="filter.grade" size="small" placeholder="请选择" style="width:120px">
          <el-option v-for="item in gradeList" :key="item.ID" :label="item.GradeName" :value="item.ID">
          </el-option>
        </el-select>
         <!-- <span class="label">学科：</span>
        <el-select v-model="filter.courseid" size="small" placeholder="请选择" style="width:120px">
          <el-option v-for="item in courseList" :key="item.ID" :label="item.CourseName" :value="item.ID">
          </el-option>
        </el-select>  -->
        <span class="label">搜索：</span>
        <el-input placeholder="请输入关键词" icon="search" :on-icon-click="search" size="small" style="width:220px" v-model="filter.key">
        </el-input>

        <el-button type="success" size="small" @click="$router.push('/video/add')" style="float:right" v-show="role=='老师'">
          <i class="iconfont">&#xe623;</i> 上传视频
        </el-button>
      </div>
    </div>
    <div class="panel">
      <div class="course-list">
        <ul class="clearfix">
          <li class="container" v-for="(i,index) in data" :key="index">
            <a class="couse-card">
              <div class="top" @click="openVideo(i)">
                <img class="banner" :src="i.CoverUrl||'http://img.mukewang.com/576b7afb00019e4906000338-240-135.jpg'" style="display: inline;">
              </div>
              <div class="content">
                <h3 class="name">
                  {{i.Title}}
                  <span class="delete"  @click="deleteVideo(i.VideoId)" v-show="isAdmin"><i class="iconfont">&#xe641;</i></span>
                </h3>
                <div class="info">
                  <span>
                    <i class="iconfont">&#xe678;</i>{{i.TrueName}}</span>
                  <span>
                    <i class="iconfont">&#xe621;</i>{{i.Tags.replace(/,/g,' ')}}</span>
                </div>
                <div class="bottom">
                  <p class="desc">{{i.Description}}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        key: '',
        cateid: '',
        grade: ''
      },
      mockdata: [
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/uGlHQbFYwbOqtawebgKIBw==/6631585635678682130.png?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/XAZPnNfRddZqbrT04KUxrA==/6598247343671202738.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初三化学微课',
          TrueName: '李老师',
          Tags: "化学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/77PDx1agj4rzPFCD5so8zQ==/2568459162502715937.png?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/smdzncVmj3X3Cl5OFKIAhw==/6630623563001917320.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/huMaOaCPqytlKxQ_nUMQzA==/6631511968396193449.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/xLhTxA-12xVYZ5w3rsxC7w==/3387551344813173665.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/cFSnhZAB33crH-lP3y55Ug==/6597302863123106487.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/IyIYI1pi2EooL-v4mGnHFA==/3751498489699903968.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/rjjix596Qb68iAN9V5ZWRQ==/6598156084206716095.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },
        {
          CoverUrl: 'http://img-ph-mirror.nosdn.127.net/7pF5L7CiS2TtGPuUoQvygg==/6631914389652756457.jpg?imageView&thumbnail=223y124&quality=100',
          Title: '初中数学 八年级下册 同步精讲',
          TrueName: '李老师',
          Tags: "数学,同步"
        },

      ],
      gradeList:[],
      categoryList:[],
      data: [],
    }
  },
  computed: {
    role() {
      return this.$store.getters.role
    },
    showTool() {
      if (this.$route.name !== 'video') {
        return false
      } else {
        return true
      }
    },

    courseList() {
      if (this.$store.state.courseList) {
        return this.$store.state.courseList
      } else {
        this.$store.dispatch('getCourseList').then(() => {
          return this.$store.state.courseList
        })
      }
    },
    isAdmin() {
      if (this.$store.state.currentClassInfo.teacher) {
        return this.$store.state.currentUser.Meid == this.$store.state.currentClassInfo.teacher.Meid
      } else {
        return false
      }
    }
  },
  methods: {
    getData() {
      
      if (this.$route.name == 'teacher') {
        this.getMyVideoList()
      } else {
        this.getVideoList()
  
      }
    },
    getMyVideoList() {
      this.$API.getMyVideoList().then(res => {
        this.data = res
      })
    },
    getVideoList() {
      let para = this.filter
      this.$API.getVideoList(para).then(res => {
        this.data = res
      })
    },
    search() {
      let para = {
        key: 'keyword'
      }
      this.$API.searchVideo(para).then(res => {

      })
    },
    openVideo(val) {
      this.$router.push('/player?id=' + val.VideoId)
      this.$store.commit('setCurrentVideoInfo', val)
    },
    deleteVideo(id) {
      let para = {
        VideoId: id
      }
      this.$API.deleteVideo(para).then(res => {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        // this.$message.success('删除成功')
        // this.getData()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getGradeList() {
			  this.$API.getGradeList().then(res => {
							  this.gradeList = res;
							  // this.classList.splice(0,0,{Name:'全部',cid:-1});				
				});
    },
    getCategoryList() {
			  this.$API.getCategeryList().then(res => {
							  this.categoryList = res;
							  // this.classList.splice(0,0,{Name:'全部',cid:-1});				
				});
    },
  },
  created() {
    this.getData();
    this.$store.dispatch('getCurrentClassInfo')
  },
  mounted() {
    this.getGradeList();
    this.getCategoryList();
  },
  watch: {
    '$route': 'getData'
  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.panel {
  background: #fff;
  position: relative;
  .addbtn {
    position: absolute;
    right: 30px;
    top: 20px;
  }
  .toolBar {
    padding: 10px 0;
    border-bottom: 1px solid @border;
    .label {
      width: 52px;
      height: 20px;
      line-height: 30px;
      font-weight: 700;
      text-align: right;
      padding: 0 1em;
    }
    .bd {
      margin-left: 60px;
      .course-item {
        display: inline-block;
        margin: 0 4px;
        a {
          display: block;
          line-height: 14px;
          padding: 8px;
        }
      }
      .on a {
        background: @main;
        color: #fff;
        border-radius: 2px;
      }
    }
  }
}

.course-list {
  margin: 0 -20px 0;
  padding-left: 10px;
  .container {
    float: left;
    margin: 0 0 10px 28px;
    width: 230px;
    height: 230px;
    transition: .3s all linear;
    overflow: hidden;
    .couse-card {
      .top {
        border-radius: 6px;
        width: 230px;
        height: 130px;
        position: relative;
        border-radius: 6px;
        transition: all 0.3s;
        overflow: hidden;
        .banner {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          transition: transform .3s linear 0s;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      &:hover .delete{
        display: block;
        float: right;
      }
      .content {
        padding: 10px 5px;
        .name {
          font-size: 16px;
          line-height: 24px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 44px;
        }
        .info {
          font-size: 12px;
          font-weight: 300;
          color: @grey;
          .iconfont {
            margin-right: 5px;
          }
          span {
            margin-right: 20px;
          }
        }
        .bottom {
          font-size: 12px;
          font-weight: 300;
          color: @grey;
          line-height: 20px;
          overflow: hidden;
          height: 44px;
        }
      }
    }
  }
}
.delete{
  float: left;
  color:#666;
  display: none;
  font-size: 12px;
}
</style>
