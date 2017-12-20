<template>
<el-form class="publish">
  <el-form-item>
    <el-input type="textarea" :rows="3" :autosize="{ minRows: 2, maxRows: 6}"  placeholder="有什么新鲜事分享给大家？"  v-model.trim="options.content"></el-input>  
  </el-form-item>
  <div class="todos">
    <div>
      <el-popover ref="popImg" placement="bottom" v-model="isShowUpImg" trigger="manual" popper-class="upPop">
        <i class="el-icon-close closeBtn" @click="delUpImg"></i>
        <el-form-item>
          <el-upload multiple 
          action="aa"
          :auto-upload="false"
          list-type="picture-card"
          :on-remove="handleRemove" 
          :on-change="changeImgList" 
          :before-upload="beforePictureUpload" 
          ref="upload">  
          </el-upload>
          
        </el-form-item>  
      </el-popover>
      <span v-popover:popImg @click="showUpImg"><i class="iconfont">&#xe613;</i> 图片</span>
      <el-popover ref="popVideo"  placement="bottom" v-model="isShowUpVideo" trigger="manual" class="upPop">
        <i class="el-icon-close closeBtn" @click="delUpVideo"></i>
        <el-form-item>
          <el-upload action="aa"  multiple :http-request="imgUpload" :auto-upload="false" list-type="picture-card" :on-remove="handleRemove" :before-upload="beforePictureUpload" ref="upload">
          </el-upload>
        </el-form-item> 
      </el-popover>
      <span v-popover:popVideo @click="showUpVideo"><i class="iconfont">&#xe66b;</i> 视频</span>
    </div>
    <div>
      <span><i class="iconfont"></i>@</span>
      <el-button size="small" type="primary">发布</el-button>
    </div>
  </div>
</el-form> 
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'

  Vue.use(Element)

  export default{
    name:'publishActive',
    data(){
      return {
        options:{},
        isShowUpImg:false,
        isShowUpVideo:false,
        action:'',
      }
    },
    methods:{
      //显示上传图片
      showUpImg(){
        if(this.isShowUpVideo){
          this.delUpVideo();
        }else{
          this.isShowUpImg=true;
        }
      },
      //显示上传视频
      showUpVideo(){
        if(this.isShowUpImg){
          this.delUpImg();
        }else{
          this.isShowUpVideo=true;
        }
      },

      //取消上传图片
      delUpImg(){
        this.$confirm('确定放弃上传图片吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.isShowUpImg=false;    
        }).catch()
      }, 
      
      //取消上传视频
      delUpVideo(){
        this.$confirm('确定放弃上传视频吗？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.isShowUpVideo=false;
        }).catch()
      },
      changeImgList(file,fileList){
        console.log(img,imgList)
      },
      //移除图片
      handleRemove(file,fileList) {  
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
  .closeBtn{
    position: absolute;
    right: 0;
    top: 0;
  }
  .upPop{
    padding-top: 20px;
  }
</style>