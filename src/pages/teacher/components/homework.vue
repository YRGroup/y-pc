<template>
  <div>
  
    <div class="homework-card" v-for="(i,index) in data" :key="index" @click="$router.push('/homework?id='+i.HID)">
      <div class="course">
        {{i.CourseName}}
      </div>
      <div class="tasktitle">{{i.Title}}</div>
      <div class="taskbox">
        <div class="taskcon" v-html="i.Content"></div>
        <div class="albums">
          <li v-for="(p,index) in i.Albums">
              <div class="imgCon" :style="{backgroundImage:'url\('+p+'\)'}"></div>
            </li>
        </div>
        <div class="taskbottom">
          <span class="time">{{i.CreateTime}}</span>
        </div>
      </div>
    </div>
  
    <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
  
  </div>
</template>

<script>
import loadMore from '@/components/loadMore'

export default {
  components: { loadMore },
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
        let homework = res.length
        this.$store.commit('setNumLength',{homework:homework})
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
  padding: 10px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid @border;
  &:hover{
    background: @border;
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
    .taskcon {
      margin: 0 auto;
      line-height: 24px;
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
</style>
