<template>
  <div class="pagination" >
     <el-pagination :current-Page="currentPage" :page-size="pageSize" 
         layout="prev, pager, next" :total="50"
         @size-change="sizeChange" @current-change="pageIndexChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:['currentPage','pageSize','total'],
  methods:{
    sizeChange(){
      this.$emit('sizechange')
    },
    pageIndexChange(){
      this.$emit('pageIndexChange')
    }
    
  }
}
</script>

<style lang="less" scoped>
@import '../style/theme.less';
.pagination{
  text-align: center;
  margin-top: 20px;
}
</style>
