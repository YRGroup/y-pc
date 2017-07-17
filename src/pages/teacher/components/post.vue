<template>
  <div>
  
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
    padding-left:85px;
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
