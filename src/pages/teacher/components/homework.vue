<template>
  <div>
  
    <div class="homework-card" v-for="(i,index) in data" :key="index">
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
      this.$API.getAllTeacherHomework(para).then(res => {
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

.homework-card {
  margin: 15px 0;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  position: relative;
  .course {
    height: 50px;
    width: 125px;
    display: inline-block;
    background: @main;
    color: #fff;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    border-bottom-right-radius: 20px;
  }
  .header {
    line-height: 50px;
    height: 50px;
    text-align: center;
    font-weight: bold;
    margin-top: -50px;
  }
  .body {
    line-height: 2rem;
    vertical-align: top;
    padding: 10px 30px;
    .footer {
      text-align: right;
      .time {
        padding-top: 20px;
        color: @grey;
      }
      .btn {
        float: right;
        padding: 0 15px;
      }
    }
  }
}

</style>
