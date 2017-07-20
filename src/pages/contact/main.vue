<template>
  <div>
  
    <div class="card">
      <div class="title">消息列表</div>
      <li class="item" v-for="(i,index) in data" :key="index" @click="$router.push('/msg/'+i.ToMeid)">
        <div class="img">
          <img :src="i.ToHeadImg">
        </div>
        <div class="content">
          <div class="name">{{i.ToName}}</div>
          <div class="time">{{i.LastTime}}</div>
          <div class="msg">{{i.Content}}</div>
        </div>
      </li>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'msg',
  components: {},
  data() {
    return {
      data: [],
    }
  },
  methods: {
    getData() {
      this.$API.getMsgList(this.userId).then(res => {
        this.data = res
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  margin: 10px 0;
  background: #fff;
  border: 1px solid @border;
  .title {
    border-bottom: 1px solid @border;
    font-size: 20px;
    line-height: 50px;
    padding-left: 20px;
  }
  .item {
    padding: 5px 20px;
    margin: 5px 0;
    border-bottom: 1px dotted @border;
    cursor: pointer;
    &:hover {
      border-bottom: 1px dotted @main;
    }
    .img {
      display: inline-block;
      img {
        width: 60px;
        border-radius: 50%;
      }
    }
    .content {
      vertical-align: top;
      display: inline-block;
      line-height: 30px;
      padding-left: 20px;
      .name{
        display: inline-block;
      }
      .time {
        padding-left:20px;
        display: inline-block;
        color: @grey;
      }
    }
    .btn {
      float: right;
      line-height: 60px;
    }
  }
}
</style>
