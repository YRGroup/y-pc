<template>
  <div>
  
    <el-tabs v-model="activeTab" type="border-card" class="tabs leftCon">
      <el-tab-pane name="profile">
        <span class="title" slot="label">信息</span>
        <y-profile></y-profile>
      </el-tab-pane>

      <el-tab-pane name="score">
        <span class="title" slot="label">成绩</span>
        <y-score></y-score>
      </el-tab-pane>
      <el-tab-pane name="post">
        <span class="title" slot="label">动态</span>
        <y-post></y-post>
      </el-tab-pane>
      <el-tab-pane name="edit">
        <span class="title" slot="label">修改资料</span>
        <y-edit v-if="this.activeTab==='edit'"></y-edit>
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>

<script>
import YProfile from '@/pages/student/coms/profile'
import YEdit from '@/pages/student/edit'
import YScore from '@/pages/student/score'
import YPost from '@/pages/sys/post'

export default {
  name: 'studentMain',
  components: { YProfile,YEdit,YScore,YPost },
  data() {
    return {
      activeTab: 'profile',
      profileData:{}
    }
  },
  methods: {
  },
  created() {
    if(this.$route.query.tab){
      this.activeTab=this.$route.query.tab
    }
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
