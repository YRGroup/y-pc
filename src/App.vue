<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (localStorage.hasLogin && !this.$store.getters.hasLogin) {
      this.$store.commit('login', JSON.parse(localStorage.user))
    }
    if(screen.width<600){
      window.location.href='http://jkyr.yearnedu.com/m/'
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
