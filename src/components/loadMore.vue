<template>
  <div class="loadMore" >
      <span class="item item1" v-show="!noMoreData">
        加载更多
      </span>
      <span class="item item2" v-show="noMoreData">
        没有更多啦~
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
  line-height: 20px;
  padding:10px 0;
  background: #fff;
  cursor: pointer;
  .item1{
    // padding:10px 100px;
    
    &:hover{
      color: @main;
    }
  }
  .item2{
    color:@grey;
    // padding:10px 100px;
    background: #fff;
  }
  .item{
    // position: relative;
    // z-index: 2;
    // &:before{
    //   content: "";
    //   display: inline-block;
    //   height:1px;
    //   width:140px;
    //   background: linear-gradient(to left, @grey, transparent);
    //   vertical-align: middle;
    // }
    // &:after{
    //   content: "";
    //   display: inline-block;
    //   height:1px;
    //   width:140px;
    //   background: linear-gradient(to right, @grey, transparent);
    //   vertical-align: middle;
    // }
  }
  
}
</style>
