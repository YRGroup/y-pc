<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (!this.$store.getters.hasLogin && !this.$route.meta.anonymous) {
      this.$store.dispatch('getCurrentUser')
    }
    if (localStorage.user && !this.$store.getters.hasLogin) {
      this.$store.commit('login', JSON.parse(localStorage.user))
    }
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
