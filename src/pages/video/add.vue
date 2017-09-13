<template>
<<<<<<< HEAD
  <div class="addVideo">
    <div class="header">
      添加新视频
    </div>
    <div class="panel">
      <iframe src="../../../static/videoupload.html" frameborder="0" id="videoUploadFrame"></iframe>
=======
  <div class="card">
    <div class="addvideo">
      this is add video page
>>>>>>> a2fffc14ba087822ee610d537e50214eadda10d4
    </div>
  </div>
</template>

<script>
export default {
  name: 'addVideo',
  data() {
    return {
<<<<<<< HEAD
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
=======
      data:{}
>>>>>>> a2fffc14ba087822ee610d537e50214eadda10d4
    }
  },
  computed: {

  },
  methods: {

  },
  created() {

  },
  mounted() {
<<<<<<< HEAD

  },
  watch: {
=======
>>>>>>> a2fffc14ba087822ee610d537e50214eadda10d4

  }
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

<<<<<<< HEAD
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
=======
.card{
  background: #fff;
}
.addvideo{
  padding:50px 0 20px 50px;
>>>>>>> a2fffc14ba087822ee610d537e50214eadda10d4
}
</style>
