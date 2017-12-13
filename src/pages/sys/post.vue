<template>
  <div>
    <div class="mycard" v-for="i in data" :key="i.id">
      <div class="img">
        <img :src="i.userImg">
      </div>
      <div class="del" @click="del(i.ID)" v-if="!$route.query.id">删除</div>
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
        <li v-for="(p,index) in i.Albums">
            <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}" @click="openImgBig(p)"></div>
          </li>
      </div>
      <div class="footer">
        <span class="time">{{i.date}}</span>
        <span class="iconbtn">
          <span title="点赞数">
            <i class="iconfont">&#xe646;</i>{{i.like}}</span>
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="showImgBig" class="bigImg" top="10%">
      <img :src="imgBig">
    </el-dialog>
  
    <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
  
  </div>
</template>

<script>
import loadMore from '@//components/loadMore'

export default {
  components: { loadMore },
  data() {
    return {
      data: [],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      postLength: 0,
      imgBig: "",
      showImgBig: false,
    }
  },
  props: {
    id: String
  },
  methods: {
    getData() {
      let para = {}
      if(this.$route.query.id){
        para.meid = this.$route.query.id
      }else{
        para.meid = this.$store.getters.currentUserId
      }
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getAllUserDynamic(para).then(res => {
        console.log(res)
        let post = res.length
        this.$store.state.numLength.post = post
        if (res.length) {
          res.forEach((element) => {
            this.data.push(element)
          })
        } else {
          this.noMoreData = true
        }
      })
    },
    openImgBig(val) {
      this.imgBig = val;
      this.showImgBig = true;
    },
    del(id) {
      this.$confirm('确认删除该动态吗?', '提示', {
        type: 'warning'
      }).then(() => {
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
          this.$message({
            message: '删除失败了哦!',
            type: 'error',
          })
        })
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    }
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

.mycard {
  border-bottom: 1px dashed @border;
  position: relative;
  background: #fff;
  font-size: 12px;
  padding-left: 70px;
  padding-bottom: 10px;
  img{
    max-width: 100%;;
  }
  &:hover{
    background: @border;
  }
  &:hover .del{
    display: block;
  }
  .img {
    position: absolute;
    top: 10px;
    left: 10px;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
  }
  .header {
    line-height: 42px;
    font-size: 16px;
  }
  .content {
    width: calc(~"100% - 80px");
    line-height: 24px;
    overflow: hidden;
  }
  .content img{
    max-width: 100%;
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
  .del {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 1px solid @grey;
    color: @grey;
    padding: 1px 10px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    display: none;
    &:hover{
      border: 1px solid @sub;
      color: @sub;
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
      &:hover {
        color: @main;
      }
    }
  }
}
.bigImg {
  max-width: 100vw;
  max-height: 100vh;
  .el-dialog {
    top: 0;
  }
  img {
    max-width: 100%;
    max-height: 100vh;
  }
}
</style>
