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
        <span class="label">搜索：</span>
        <el-input placeholder="请输入关键词" size="small" style="width:220px" v-model="filter.key">
        </el-input>
        <el-button type="success" size="small" @click="getData">
          查询
        </el-button>
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
                <p class="name">
                  {{i.Title}}
                  <span class="delete" @click="deleteVideo(i.VideoId)" v-show="isAdmin">
                    <i class="iconfont">&#xe641;</i>
                  </span>
                </p>
                <div class="info">
                  <span>
                    <i class="iconfont">&#xe678;</i>{{i.TrueName}}</span>
                  <!-- <span class="time">
                    <i class="iconfont">&#xe621;</i>{{i.Duration | formatTime}}</span> -->
                  <span class="subject ">{{i.CateName}}</span>
                  <span class="grade">{{i.GradeName}}</span>
                </div>
                <div class="bottom">
                  <p class="desc">{{i.Description}}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    
    <div class="pagination">
              <el-pagination :current-Page="currentPage" :page-size="pageSize" 
                  layout="prev, pager, next" :total="16*currentPage+40"
                  @size-change="sizeChange" @current-change="pageIndexChange">
              </el-pagination>
            </div>
         </div >  
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
      gradeList: [],
      categoryList: [],
      data: [],
      currentPage: 1,
      pageSize: 16,
    }
  },
  filters: {
    formatTime(val) {
      if (val) {
        var theTime = parseInt(val)
        var theTime1 = 0
        var theTime2 = 0
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
          result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
          result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result
      } else {
        return '-'
      }
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
    isAdmin() {
      if (this.$route.name === 'teacher') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    sizeChange: function (pageSize) {
            this.currentPage=currentPage
            this.pageSize = pageSize;
            this.getData();
        },
         pageIndexChange: function (currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
    getData() {
       let para = {}
      para.currentPage = this.currentPage
      this.data = []
      if (this.$route.name == 'teacher') {
        this.getMyVideoList()
      } else {
        this.getVideoList()
      }
    },
    categoryName(id) {
      this.gradeName.forEach(element => {
        if(element.ID ==  id){
          return element.GradeName
        }
      })
    },
    getMyVideoList() {
      this.$API.getMyVideoList().then(res => {
        let myvideo = res.length
        this.$store.state.numLength.video = myvideo
        this.data = res
      })
    },
    getVideoList() {
      let para = this.filter
      para.currentPage=this.currentPage
      para.pageSize=this.pageSize
      this.$API.getVideoList(para).then(res => {
        console.log(res)
        res.forEach( element => {
        })
        this.data = res
        console.log(res)
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
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$API.deleteVideo(para).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res
        this.gradeList.unshift({ GradeName: '全部', ID: -1 })
      });
    },
    getCategoryList() {
      this.$API.getCategeryList().then(res => {
        this.categoryList = res
        this.categoryList.unshift({ CateName: '全部', CateID: -1 })
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

.pagination{
  border-top:solid 1px #fffeff;
  text-align: center;
  margin-top: 20px;
}

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
    margin: 0 0 10px 24px;
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
      &:hover .delete {
        display: block;
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
          position: relative;
          width: 220px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .info {
          font-size: 12px;
          font-weight: 300;
          color: @grey;
          overflow: hidden;
          .iconfont {
            margin-right: 5px;
          }
          span:nth-child(1){
            float: left;
          }
          .time,.subject,.grade{
            float: right;
          }
          .grade{
            margin:0 10px;
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

.delete {
  position: absolute;
  right: 0;
  top: 0;
  color: #666;
  display: none;
  font-size: 12px;
}

</style>
