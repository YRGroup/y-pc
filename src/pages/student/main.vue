<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs leftCon">

      <el-tab-pane name="profile">
        <span class="title" slot="label">信息</span>

        <y-profile></y-profile>

      </el-tab-pane>

      <el-tab-pane name="edit">
        <span class="title" slot="label">修改资料</span>

        <y-edit></y-edit>

      </el-tab-pane>

      <el-tab-pane name="score">
        <span class="title" slot="label">成绩</span>

        <y-score></y-score>
        
      </el-tab-pane>

      <el-tab-pane name="card">
        <span class="title" slot="label">一卡通</span>

        <y-profile></y-profile>
        
      </el-tab-pane>

    </el-tabs>
  
  </div>
</template>

<script>
import YProfile from './coms/profile'
import YEdit from './edit'
import YScore from './score'

export default {
  name: 'studentMain',
  components: { YProfile,YEdit,YScore },
  data() {
    return {
      activeTab: 'profile',
      profileData:{}
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

.tabs{
  .title{
    padding:10px 30px;
  }
}
</style>
