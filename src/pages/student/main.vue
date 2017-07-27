<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs">
      <el-tab-pane name="profile">
        <span class="title" slot="label">个人</span>
        <y-profile></y-profile>
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>

<script>
import YProfile from './coms/profile'

export default {
  name: 'studentMain',
  components: { YProfile },
  data() {
    return {
      activeTab: 'profile',
      poster: require('@/assets/img/post.jpg')
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

.nav {
  font-size: 12px;
}

.card {
  margin: 15px 0;
  padding: 10px 20px;
  border: 1px solid @border;
  font-size: 13px;
  background: #fff;
  .info {
    border-bottom: 1px dotted @border;
    position: relative;
    .header {
      font-size: 20px;
      line-height: 40px;
      font-weight: bold;
    }
    .content {
      padding: 20px 20%;
      .item {
        line-height: 30px;
        .title {
          color: @grey;
        }
      }
    }
    .btn {
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
}
</style>
