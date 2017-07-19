<template>
  <div>
  
    <div class="left">
      <div class="card">
        <div class="title">对话列表</div>
        <li class="item" v-for="i in 20" :key="i">
          <div class="img">
            <img src="https://modao.cc/uploads3/images/900/9007936/raw_1493017171.jpeg">
          </div>
          <div class="content">
            <div class="name">李家长</div>
            <div class="tel">1380012354</div>
          </div>
        </li>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'msg',
  components: {},
  data() {
    return {
    }
  },
  computed:{
    userId(){
      return this.$route.params.id
    }
  },
  methods: {
    getData(){
      this.$message(this.$route.params.id)
      this.$API.getMsgInfo(this.userId)
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  watch:{
    '$route':'getData'
  }
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
    &:hover {
      background: @bg;
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
      .tel {
        color: @grey;
      }
    }
  }
  .right{

  }
}
</style>
