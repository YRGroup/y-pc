<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (localStorage.hasLogin && !this.$store.state.currentUser) {
      this.$store.commit('login', JSON.parse(localStorage.user))
    }
    //  else {
    //   this.$router.push('/login')
    // }
  }
}
</script>

<style lang="less">
@import './style/theme.less';

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
