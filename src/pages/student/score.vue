<template>
  <div>
  
    <div class="scoreSummary">
      <div class="title">2016-2017学年6月月考</div>
      <div class="info">
        <span>学生：赵敏</span>
        <span>年级：高二</span>
        <span>考试时间：2017-07-08</span>
      </div>
      <div class="total">
        <span class="item">
          <span>总分：</span>
          <span class="score">412.5</span>
        </span>
        <span class="item">
          <span>排名：</span>
          <span class="score">20</span>
        </span>
      </div>
      <div class="list">
        <div class="item" v-for="i in 6" :key="i">
          <div class="score">
            <span class="score">90</span>
            <span> / 120</span>
          </div>
          <div class="name">语文</div>
        </div>
      </div>
    </div>
  
    <div class="scoreList">
      <div class="header">历次成绩报告</div>
  
      <div class="item" v-for="i in 6" :key="i">
        <div class="title">2017年江西省抚州市八年级下学期期末学业水平测试（人教版）> </div>
        <div class="time">2017-06-14</div>
        <div class="score">412.5分</div>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      poster: require('@/assets/img/post.jpg')
    }
  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.scoreSummary {
  text-align: center;
  border: 1px solid @border;
  padding: 20px;
  background: #fff;
  margin: 10px 0;
  .title {
    font-size: 20px;
    line-height: 60px;
  }
  .info {
    color: @grey;
    span {
      padding: 0 20px;
    }
  }
  .total {
    .item {
      padding: 0 20px;
      span {
        vertical-align: middle;
      }
      .score {
        color: @sub;
        font-size: 50px;
      }
    }
  }
  .list {
    .item {
      border: 1px solid @border;
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 20px;
      .score {
        line-height: 50px;
        .score {
          color: @sub;
        }
      }
      .name {
        line-height: 50px;
      }
    }
  }
}

.scoreList {
  background: #fff;
  border: 1px solid @border;
  margin: 10px 0;
  padding: 20px;
  .header {
    line-height: 40px;
    font-weight: bold;
  }
  .item {
    padding: 20px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    .title {
      max-width: calc(~"100% - 150px");
    }
    .time {
      color: @grey;
    }
    .score {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 40px;
    }
  }
}
</style>
