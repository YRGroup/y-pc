<template>
  <div class="card">
    <div class="maintitle">
      添加视频
      <span class="goreturn">
        <el-button size="small" @click="$router.go(-1)" type="success" :plain="true">返回</el-button>
      </span>
    </div>
    <div class="addvideo">
      <el-form :model="data" label-width="120px">
        <div>
          <el-form-item label="视频名称">
            <el-input v-model="data.Title" style="width:400px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="视频介绍">
            <el-input v-model="data.Description" style="width:400px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学科">
            <el-input type="textarea" v-model="data.ExamName" style="width:400px"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addVideo',
  data() {
    return {
      data:{}
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card{
  background: #fff;
}
.addvideo{
  padding:50px 0 20px 50px;
}
</style>
