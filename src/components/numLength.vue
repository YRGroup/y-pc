<template>
  <ul class="num-info">
    <li>动态
      <el-tag size="small">{{$store.state.numLength.post}}</el-tag>
    </li>
    <li>作业
      <el-tag size="small">{{$store.state.numLength.homework}}</el-tag>
    </li>
    <li>视频
      <el-tag size="small">{{$store.state.numLength.video}}</el-tag>
    </li>
    <li>消息
      <el-tag size="small">{{$store.state.numLength.msg}}</el-tag>
    </li>
    <li>通知
      <el-tag size="small">{{$store.state.numLength.notice}}</el-tag>
    </li>
  </ul>

</template>
<script>

export default {
  data() {
    return {
  
    }
  },

}
</script>


<style lang="less" scoped>

@import '../style/theme.less';

.num-info {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid @border;
  li {
    display: inline-block;
    line-height: 40px;
    width: 43%;
    color: #888;
    text-align: center;
    cursor: pointer;
  }
}
</style>
