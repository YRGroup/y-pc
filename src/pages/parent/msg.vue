<template>
  <div>
  
000

  </div>
</template>

<script>
export default {
  data() {
    return {
      data:[],
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    getData(){
      this.$API.getMsgList().then(res=>{
        this.data=res
      })
    },
  },
  created() {
    this.getData()
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

</style>
