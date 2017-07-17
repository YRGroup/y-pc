<template>
  <div class="loadMore" >
      <span class="item item1" v-show="!noMoreData">
        点击加载更多
      </span>
      <span class="item item2" v-show="noMoreData">
        已经加载全部数据
      </span>
  </div>
</template>

<script>
export default {
  props: {
    noMoreData: Boolean,
  },
}
</script>

<style lang="less" scoped>
@import '../style/theme.less';

.loadMore{
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
  padding:10px 0;
  .item1{
    color:#000;
    cursor: pointer;
  }
  .item2{
    color:@grey;
  }
  .item{
    position: relative;
    z-index: 2;
    &:before{
      content: "";
      display: inline-block;
      height:1px;
      width:140px;
      background: linear-gradient(to left, @grey, transparent);
      vertical-align: middle;
    }
    &:after{
      content: "";
      display: inline-block;
      height:1px;
      width:140px;
      background: linear-gradient(to right, @grey, transparent);
      vertical-align: middle;
    }
  }
  
}
</style>
