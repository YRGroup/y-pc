<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (localStorage.hasLogin) {
      this.$store.commit('login', JSON.parse(localStorage.user))
    } else {
      this.$router.push('/login')
    }
    console.log(this.$store.getters._APIurl)
    if (this.$store.state.role == '家长' && !this.$store.state.currentStudentId) {
      this.$message('请先添加学生')
      this.$router.push('/parent?tab=addStudent')
    }
  }
}
</script>

<style lang="less">
@import './style/theme.less';

body {
  // background: @bg;
}

* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

#app {
  min-height: 100vh;
}
</style>
