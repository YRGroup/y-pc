<template>
  <div id="paihaoControl">
    <div id="logo">
      <img :src="logo" alt="">
    </div>
    <div class="main">
      <div class="title">
        {{nowObj.Name}}
      </div>
      <div class="now">
        正在考试
        <span>{{nowObj.NowNo}}</span>
        号考生
      </div>
      <div class="next">
        总人数
        <span>{{nowObj.MaxNo}}</span>
      </div>
      <div class="next">
        请
        <span>{{queueNext}}</span>
        号考生准备候场
      </div>

      <div class="makeNext">
        <span @click="QueueAdd" v-if="nowObj.NowNo<nowObj.MaxNo">下一号</span>
        <span @click="QueueSetZero" v-else>重置</span>
        <!--<video :src="videoSrc" ref="video" controls width="100%" height="100%"></video>-->
      </div>
      <span @click="settingShow=true" class="doshezhi">设置</span>
      <span @click="QueueSetZero" class="doshezhi">重置</span>
    </div>
    <audio src="http://yr-zhxy.oss-cn-beijing.aliyuncs.com/YRVoice/1.mp3" id="audio" ref="audio"></audio>
    <el-dialog title="设置" :visible.sync="settingShow" size="tiny">
      <!--<el-form-item label="活动名称" :label-width="formLabelWidth">-->
      <!--<el-input v-model="form.name" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <el-form>
        <el-form-item label="考试标题" label-width="80px">
          <el-input v-model="nowObj.Name"></el-input>
        </el-form-item>
        <el-form-item label="人数" label-width="80px">
          <el-input v-model="nowObj.MaxNo"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">

        <el-button @click="settingShow = false">取 消</el-button>
        <el-button type="primary" @click="shezhiNum" :loading="setAjax">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
      logo: require("@/assets/logo1.png"),
      lid: "",
      nowObj: {
        Name: "",
        MaxNo: ""
      },
      settingShow: false,
      setAjax: false
    };
  },
  computed: {
    videoSrc() {
      return this.videoURL[this.videoIndex];
    },
    queueNext() {
      if (this.nowObj.NowNo != undefined) {
        var a = this.nowObj.NowNo + 1;
        if (this.nowObj.MaxNo < a) {
          a = "无";
        }
        return a;
      } else {
        return "请设置";
      }
    }
  },
  methods: {
    shezhiNum() {
      var data = {
        lid: this.lid,
        name: this.nowObj.Name,
        MaxNo: this.nowObj.MaxNo
      };
      this.setAjax = true;

      this.$API
        .UpdateQueueConfig(data)
        .then(res => {
          this.settingShow = false;
          this.nowObj = {
            Name: "",
            MaxNo: ""
          };
          this.QueueGet();
          this.$message.success("修改成功");
          this.setAjax = false;
        })
        .catch(err => {
          this.$message.error(err.msg);
          this.setAjax = false;
        });
    },
    QueueGet() {
      var data = {
        lid: this.lid
      };
      return this.$API
        .QueueGet(data)
        .then(res => {
          var a = JSON.parse(res);
          this.nowObj = a;
          this.nowObj.NowNo++;
        })
        .catch(res => {
          //                this.shezhiNum();
        });
    },
    QueueAdd() {
      var data = {
        lid: this.lid
      };
      return this.$API
        .QueueAdd(data)
        .then(res => {
          this.nowObj.NowNo++;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    QueueSetZero() {
      if (this.nowObj.NowNo == this.nowObj.MaxNo) {
        this.doQueueSetZero();
      } else {
        this.$confirm("还没轮到最后一位， 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.doQueueSetZero();
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    doQueueSetZero() {
      if (this.queueNext == "暂未设置排队人数") {
        return;
      }
      var data = {
        lid: this.lid,
        nowNo: 0
      };
      return this.$API
        .QueueSetNowNo(data)
        .then(res => {
          this.nowObj.NowNo = 1;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  },
  components: {},
  watch: {},
  beforeCreated() {},
  mounted() {},
  created() {
    this.lid = window.location.href.split("?lid=")[1] || 1;
    this.$nextTick(() => {
      this.QueueGet();
    });
  }
};
</script>

<style lang="less" scoped>
#paihaoControl {
  background: url(../../assets/mainBg.jpg) no-repeat center center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow-y:hidden;
  #logo {
    margin: auto;
    height: 120px;
    width: 134px;
    padding-top: 20px;
    img {
      background: transparent;
    }
  }
  .main {
    width: 1000px;
    height: 460px;
    margin: auto;
    color: #fff;
    text-align: center;
    background: rgba(29, 111, 163, 0.7);
    .doshezhi {
      padding-right: 20px;
      cursor: pointer;
    }
    .title {
      width: 860px;
      height: 80px;
      margin: auto;
      line-height: 80px;
      border-bottom: 2px solid rgba(101, 183, 226, 0.4);
      font-size: 32px;
      span {
        float: right;
        color: yellow;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .now {
      font-size: 60px;
      text-align: center;
      line-height: 100px;
      margin-bottom: 20px;
      span {
        font-size: 80px;
        color: yellow;
      }
    }
    .next {
      font-size: 40px;
      line-height: 30px;
      display: inline-block;
      margin: 0 100px;
      span {
        color: yellow;
      }
    }
    .makeNext {
      height: 150px;
      margin: auto;
      /*padding-top: 50px;*/
      span {
        width: 280px;
        height: 60px;
        line-height: 60px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        display: block;
        margin: auto;
        cursor: pointer;
        position: relative;
        top: 60px;
        font-size: 20px;
        background: linear-gradient(180deg, #8dcfff, #4cb9f6);
      }
    }
  }
}
</style>
