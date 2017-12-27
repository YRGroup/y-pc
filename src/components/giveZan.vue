<template>
  <span title="点赞" class="active" v-if="isZan">
    <i class="iconfont">&#xe646;</i>{{zanNum}}
  </span>
  <span title="点赞" v-else @click.once="doLike(id)" :class="{'active': hasZan}">
    <i class="iconfont">&#xe646;</i>{{zanNum}}
  </span>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'

  Vue.use(Element)

  export default{
    name:'giveZan',
    data(){
      return {
        hasZan:false,
        zanNum:this.num
      }
    },
    props:['isZan','id','num'],
  
    computed:{
      
    },
    methods:{
      doLike(id,index) {
        this.$API
        .doLikeThisPost(id)
        .then(res => {
          this.$message.success("点赞成功");
          this.zanNum++;      //赞数++
          this.hasZan=true;   //已赞

        })
        .catch(err => {
          this.$message.error(err.msg);
        });
      },
    }
  }
</script>

<style lang="less" scoped>

@import '../style/theme.less';

  .active{
    color: @main;
  }
  .iconfont {
    margin-right: 8px;
  }
</style>