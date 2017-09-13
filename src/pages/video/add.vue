<template>
  <div class="addVideo">
    <div class="header">
      添加新视频
    </div>
    <div class="panel">
      <iframe src="../../../static/videoupload.html" frameborder="0" id="videoUploadFrame"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addVideo',
  data() {
    return {
      data: {
        FileName: '',
        FileSize: '',
        Title: '',
        Description: '',
        Coverurl: '',
        CateId: '',
        Grade: '',
        Tags: '',
      },
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.header {
  color: #fff;
  background: @main;
  line-height: 50px;
  padding: 0 3rem;
}

.info {
  display: inline-block;
  color: @grey;
}

#videoUploadFrame {
  width: 100%;
  height: 690px;
}
</style>
