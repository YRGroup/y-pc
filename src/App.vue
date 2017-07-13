<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import './style/theme.less';

body{
  background: @bg;
}
*{
  margin:0;
  padding:0;
}
li{
  list-style: none;
}
</style>
