<template>
  <div class="myclass">
    <h3><i class="iconfont">&#xe69b;</i>我的班级</h3>
    <el-select v-model="currentID" @change="changeClass" v-if="$store.state.currentUser">
      <el-option v-for="item in $store.state.currentUser.Classes" 
      :key="item.ClassID" 
      :label="item.ClassName+'（'+item.RoleName+'）'" 
      :value="item.ID">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      currentID: 0
    }
  },
  methods:{
     changeClass(val) {
      
      let c=this.findClass(val)
      if(!c)
        return
      this.$store.commit('changeCurrentClass', c.ClassID)
      this.$API.changeCurrentClass(c).then(res => {
        this.$message.success('成功切换班级')
        this.$store.dispatch('getCurrentUser')
        this.$store.dispatch('reset')
        this.$router.push('/class')
      })
    },
    findClass(id){
      id=parseInt(id)
      let tmp={}
      this.$store.state.currentUser.Classes.forEach(o => {
        if(o.ID==id)
          tmp= o
      })
      return tmp
    }
  },
   created() {
     this.$store.state.currentUser.Classes.forEach(o => {
        if(o.ClassID==this.$store.state.currentClassId && o.RoleName == this.$store.state.currentUser.Role )
          this.currentID= o.ID
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
