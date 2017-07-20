<template>
  <div>
  
    <div class="card" v-for="i in data" :key="i.id">
      <div class="img">
        <img :src="i.userImg">
      </div>
      <div class="tips">{{i.category}}</div>
      <div class="header">{{i.auther}}</div>
      <div class="content" v-html="i.content"></div>
      <div class="albums">
        <li v-for="(p,index) in i.albums" :key="index">
          <img :src="p">
        </li>
      </div>
      <div class="footer">
        <span class="time">{{i.date}}</span>
        <span class="iconbtn">
          <span title="点赞数"><i class="iconfont">&#xe646;</i>{{i.like}}</span>
        </span>
      </div>
    </div>

    <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
  
  </div>
</template>

<script>
import loadMore from '@//components/loadMore'

export default {
  components:{loadMore},
  data() {
    return {
      data: [],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
    }
  },
  props: {
    id: String
  },
  methods: {
    getData() {
      let para = {}
      para.meid = this.id
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      this.$API.getAllTeacherDynamic(para).then(res => {
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
@import '../../../style/theme.less';

.card {
  margin: 15px 0;
  border-bottom: 1px dashed @border;
  font-size: 13px;
  position: relative;
  background: #fff;
  padding-left:70px;
  padding-bottom:10px;
  .img {
    position: absolute;
    top: 10px;
    left: 10px;
    img {
      width: 46px;
      height: 46px;
    }
  }
  .header {
    line-height: 42px;
    font-size: 16px;
  }
  .content {
    width: calc(~"100% - 120px");
  }
  .albums{
    // margin:10px 0;
    li{
      padding:10px;
      display: inline-block;
      img{
        // width:200px;
        max-height:120px;
      }
    }
  }
    .tips{
    position: absolute;
    right: 0;
    top: 6px;
    border:1px solid @main;
    color:@main;
    padding:1px 10px;
    border-radius: 3px;
    font-size: 12px;
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
