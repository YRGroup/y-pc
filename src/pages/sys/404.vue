<template>
  <div>
    <div class="box">
      <img :src="errpage" style="max-width:100%" @click="$router.push('/')">
      <h3>咦~页面不见了~</h3>
      <h5>请核对您输入的页面地址是否正确哦~</h5>
      <p> <el-button size="large"  type="success" @click="$router.push('/')">回到首页</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      errpage: require('@/assets/404.png'),
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
.box{
  width:500px;
  height: 400px;
  margin:0 auto;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -200px;
  img{
    background: transparent;
  }
  h3{
    font-size: 2rem;
    line-height: 2rem;
  }
  h5{
    font-size: 1.4rem;
    line-height: 3rem;
    font-weight: 400;
    color:#6d6d6d;
  }
  
}
</style>
