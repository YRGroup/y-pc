<template>
<el-form class="publish">
  <el-form-item>
    <el-input type="textarea" :rows="3" :autosize="{ minRows: 2, maxRows: 6}"  placeholder="有什么新鲜事分享给大家？"  v-model.trim="options.content"></el-input>
    
  </el-form-item>
  <div class="todos">
    <div>
      <el-popover ref="popImg"><i class="iconfont">&#xe613;</i> 图片
        <el-upload multiple 
          :http-request="imgUpload"
          name='img'
          accept=""
          list-type="picture-card"
          :action="action"
          :on-remove="handleRemove"
          :before-upload="beforePictureUpload" 
          ref="popImg">
            <i class="el-icon-picture-outline"></i>
        </el-upload>
      </el-popover>
      <span><i class="iconfont">&#xe66b;</i> 视频</span>
    </div>
    <div>
      <span><i class="iconfont"></i>@</span>
      <el-button type="primary">发布</el-button>
    </div>
  </div>
</el-form>
</template>

<script>
  export default{
    name:'publishActive',
    data(){
      return {
        options:{},
        showUpImg:true,
        action:'',
      }
    },
    methods:{
      //移除图片
      handleRemove(file, fileList) {  
        console.log(file, fileList);
      },

      //上传前检测
      beforePictureUpload(){
        console.log('检测是不是指定文件')
      },

      //上传
      imgUpload(){
        console.log('上传')
      }
    },
    watchs:{
      
    }

  }
</script>

<style lang="less" scoped>
@import '../style/theme.less';
  .publish{
    background: #fff;
    padding: 10px;
    font-family:"微软雅黑";
    font-size: 14px;
    .iconfont{
      margin-right: 5px;
      cursor: pointer;
      color: @main;
      
    }
    span{
      margin: 5px;
      cursor: pointer;
    }
    .todos{
      display: flex;
      justify-content: space-between;
      flex-wrap:no-wrap;
      align-items: center;
    }
  }
</style>