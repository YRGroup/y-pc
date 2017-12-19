<template>
  <div class="panel">
    <ul class="classinfo classbox">
      <li class="list name">{{classInfo.name}}</li>
      <li class="list">
        <span>
          <i class="iconfont">&#xe607;</i>学生人数：</span> {{studentList.length}}</li>
      <li class="list">
        <span>
          <i class="iconfont">&#xe605;</i>教师人数：</span> {{teacherList.length}}</li>
      <li class="list">
        <el-button type="primary" plain @click="showMessage = true">发短信</el-button>
      </li>
    </ul>
    <el-dialog title="发短信" :visible.sync="showMessage">
        <el-form :model="msgDate" label-width="80px">
            <el-form-item label="班级：">
              <el-input v-model.trim="classInfo.name"  :disabled="true" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="接收人：">
              <el-input :disabled="true" style="width:200px" value="全部家长"></el-input>
            </el-form-item>
            <el-form-item label="类型：" :rules="[{ required: true}]">
                <el-radio-group v-model="msgDate.text" @change="getContent">
                    <el-radio v-for="i in msgTemplate" :label="i.TemplateName" :key="i.ID">
                        {{i.TemplateName}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内容："  v-show="msgContent">
                <div v-html="msgContent"></div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sendSms">确 定</el-button>
            <el-button plain type="primary" @click="showMessage = false">取 消</el-button>
        </div>
    </el-dialog>
    <div class="content">
      <no-data v-if="nodataImg"></no-data>
      <div v-else class="msglist">
        <div class="listTitle"><i class="iconfont">&#xe61b;</i>所有短信</div>
        <div class="item" v-for="item in msgList">
            <div class="title"><span class="typename">{{item.TemplateName}}</span><span class="time"><i class="iconfont">&#xe621;</i>发送时间：{{item.CreateTime | FormatDate}}</span></div>
            <div class="msgcontent">{{item.TemplateExample}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "@//components/noData";

export default {
  name: "addTeacher",
  components: { noData },
  data() {
    return {
      ClassID: "",
      classInfo: {
        name: "",
        teacher: "",
        student_count: ""
      },
      nodataImg: false,
      teacherList: [],
      studentList: [],
      showMessage: false,
      msgDate: {
        name: "",
        text: "",
        address: "",
        time: ""
      },
      msgContent: "",
      msgTemplate: "",
      msgList: ""
    };
  },
  computed: {
    classId() {
      return this.$store.state.currentClassId;
    },
    courseList() {
      if (this.$store.state.courseList) {
        return this.$store.state.courseList.map(o => {
          return {
            CourseId: o.ID,
            name: o.CourseName
          };
        });
      }
    }
  },
  filters: {
    FormatDate(val) {
      let data = new Date(val);
      return (
        data.getMonth() +
        1 +
        "/" +
        data.getDate() +
        " " +
        data.getHours() +
        " : " +
        data.getMinutes()
      );
    }
  },
  methods: {
    getData() {
      this.ClassID = this.$store.state.currentClassId;
      this.$API.getClassInfo(this.classId).then(res => {
        this.classInfo = res;
      });
      // 获取教师列表
      this.$API.getTeacherList(this.ClassID).then(res => {
        this.teacherList = res;
      });
      //获取学生列表
      this.$API.getStudentList(this.ClassID).then(res => {
        this.studentList = res;
      });
      //获取短信模板
      this.$API.getMsgTemplate().then(res => {
        this.msgTemplate = res;
        console.log(res)
      });
      //获取短信模板
      this.$API.getMsglog().then(res => {
        this.msgList = res;
        if (this.msgList.length == 0) {
          this.nodataImg = true;
        }
      });
    },
    getContent() {
      let text = this.msgDate.text
      let msg = "";
      this.msgTemplate.forEach(o => {
        if (text == o.TemplateName) {
          msg = o.Content;
        }
      });
      let time = ` <input id="timedata" class="inputtext" placeholder="时间" name="时间"></el-input> `;
      let address = ` <input id="addessdata" class="inputtext" placeholder="地址" name="地点"></el-input> `;
      this.msgContent = msg
        .replace(/\$\{studentname\}/gi, " X X X ")
        .replace(/\$\{classname\}/gi, "X X班 ")
        .replace(/\-/gi, "<br />")
        .replace(/\$\{teachername\}/gi, " X X X")
        .replace(/\$\{time\}/gi, time)
        .replace(/\$\{teacher\}/gi, " XX老师 ")
        .replace(/\$\{course\}/gi, " XX学科 ")
        // .replace(/\$\{content\}/gi, "XX学科")
        .replace(/\$\{address\}/gi, address);
    },
    sendSms() {
      //验证短信类型不能为空
      if(this.msgDate.text){
        let ele = document.getElementById("addessdata");
        let addessdata = "";
        if (ele) {
          addessdata = ele.value;
        }
        let timedata = document.getElementById("timedata");
        // 所需要参数
        let data = {};
        data.Meid = this.$store.state.currentUser.Meid;
        data.ClassID = this.ClassID;
        data.Parms = {};
        data.Parms.address = addessdata;
        data.Parms.time = timedata.value;
        data.OperType = this.msgDate.text;
        // 数据为空时验证
        if (ele && timedata) {
          if (!timedata.value || !ele.value) {
            this.$message.error("请完善内容");
          } else {
            this.$message("发送成功");
            this.$API.sendMsg(data).then(res => {
              this.showMessage = false;
              this.$message("发送成功");
            });
          }
        } else if (timedata) {
          if (!timedata.value) {
            this.$message.error("请完善内容");
          } else {
            this.$API.sendMsg(data).then(res => {
              this.showMessage = false;
              this.$message("发送成功");
            });
          }
        }
      }else{
        this.$message.error("请选择短信类型~")
      }
    }
  },
  created() {
    this.getData();
  },
  watch() {}
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";
.panel {
  padding: 20px;
}

.classbox {
  border: 1px solid @border;
  background: #fff;
  padding: 20px 60px;
  font-size: 16px;
  .name {
    font-weight: 16px;
    font-weight: 600;
    color: #333;
  }
  .list {
    display: inline-block;
    border-right: 1px dashed @border;
    margin-right: 30px;
    padding-right: 30px;
    line-height: 60px;
    &:last-child {
      border-right: none;
      float: right;
    }
    span {
      color: @grey;
    }
    .iconfont {
      margin-right: 5px;
    }
  }
}

.typeRadio {
  line-height: 5em;
  .title {
    padding: 0 2em;
    display: inline-block;
  }
}

.content {
  padding: 1em;
  background: #fff;
  .el-row {
    margin-bottom: 20px;
  }
}

.footer {
  padding-left: 3em;
}

.card {
  padding: 1em;
  background: #fff;
}

.tableHeader {
  line-height: 50px;
  font-size: 16px;
  font-weight: 600;
}

.teacherlist {
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.cell {
  img {
    background: transparent;
    padding: 10px 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}

.xlsDown {
  font-size: 12px;
  margin-left: 20px;
  color: @main;
  text-decoration: underline;
}
.msglist {
  .listTitle {
    border-bottom: 1px solid @border;
    margin-top: 50px;
    font-size: 16px;
    color: @main;
    line-height: 32px;
    .iconfont {
      margin-right: 6px;
    }
  }
  .item {
    padding: 20px 10px;
    border-bottom: 1px solid @border;
    &:hover {
      background: @border;
    }
    .title {
      font-size: 16px;
      .typename {
        width: 130px;
        display: inline-block;
      }
      .time {
        font-size: 14px;
        color: #888;
      }
      .iconfont {
        color: @main;
        font-size: 16px;
        margin-right: 5px;
      }
    }
    .msgcontent {
      letter-spacing: 2px;
    }
  }
}
</style>
