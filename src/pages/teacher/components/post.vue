<template>
  <div>
  
    <div class="card" v-for="i in data" :key="i.id">
      <div class="img">
        <img :src="i.userImg">
      </div>
      <div class="del" @click="del(i.id)" v-if="!$route.query.id">删除</div>
      <div class="header">{{i.auther}}</div>
      <div class="content" @click="$router.push('/post/'+i.ID)">{{i.content}}</div>
      <div class="albums">
        <li v-for="(p,index) in i.albums" :key="index">
          <img :src="p">
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
      postLength: 0
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
  border-bottom: 1px dashed @border;
  position: relative;
  background: #fff;
  font-size: 12px;
  padding-left: 70px;
  padding-bottom: 10px;
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
  }
  .albums {
    li {
      padding: 10px;
      display: inline-block;
      img {
        max-height: 120px;
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
</style>
