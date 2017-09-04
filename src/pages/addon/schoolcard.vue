<template>
  <div>
    <has-no-student v-if="$store.getters.hasNoStudent && $store.getters.role == '家长'"></has-no-student>
    <div v-else>
      <div v-if="$store.getters.hasNoSchoolCard">
        <div class="noCard panel">
          <h4>
            请先绑定校园卡号
          </h4>
          <el-form :model="addCardData" label-width="100px" class="cardNum">
            <!-- <el-form-item label="学生：" v-if="$store.getters.role==='家长'">
                    <el-select v-model="addCardData.student_meid" placeholder="请选择学生">
                      <el-option v-for="i in studentList" :key="i.id" :label="i.name" :value="i.id">
                      </el-option>
                    </el-select>
                  </el-form-item> -->
            <el-form-item label="卡号：">
              <el-input v-model.number="addCardData.CardID" placeholder="请输入校园卡号" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addCardID" size="large">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div v-else>
        <div class="cardSummary">
          <div class="total">
            <!-- <div class="student" v-if="$store.getters.role==='家长'">
                    <el-select v-model="addCardData.student_meid" @change="changeCurrentStudent" placeholder="请选择学生">
                      <el-option v-for="i in studentList" :key="i.id" :label="i.name" :value="i.id">
                      </el-option>
                    </el-select>
                  </div> -->
            <span class="item">
              <span>当前余额 </span>
              <span class="balance">{{Blance}}</span>
            </span>
          </div>
        </div>

        <div class="cardList">
          <no-data v-if="noData"></no-data>
          <div v-else>
            <div class="header">消费记录
            </div>
            <div class="item" v-for="(i,index) in alllog" :key="index">
              <div class="title">{{i.Title}}</div>
              <div class="time">{{i.CreateTime}}</div>
              <div class="log">{{i.OpeaType}} {{i.Money}}</div>
            </div>
            <load-more @click.native="loadMore" :noMoreData="noMoreData"></load-more>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import hasNoStudent from '@/components/hasNoStudent'
import loadMore from '@/components/loadMore'
import noData from '@/components/noData'

export default {
  components: { loadMore, hasNoStudent, noData },
  data() {
    return {
      addCardData: {
        CardID: '',
        student_meid: this.$store.state.currentStudentId
      },
      Blance: 0,
      alllog: [],
      currentPage: 1,
      pageSize: 10,
      noMoreData: false,
      noData: false
    }
  },
  computed: {
    studentList() {
      if (this.$store.getters.role === '家长' && this.$store.state.currentUser.ExtendInfo.Students.length) {
        let v = []
        this.$store.state.currentUser.ExtendInfo.Students.forEach(o => {
          let a = {
            name: o.TrueName,
            id: o.Meid
          }
          v.push(a)
        })
        return v
      }
    }
  },
  methods: {
    getData() {
      let para = {}
      para.currentPage = this.currentPage
      para.pagesize = this.pageSize
      para.student_meid = this.$store.state.currentStudentId
      this.$API.getCardList(para).then(res => {
        if (res) {
          if (this.Blance == 0) {
            this.Blance = res.Blance
          }
          if (res.Log.length) {
            res.Log.forEach(element => {
              let time = new Date(element.CreateTime)
              element.CreateTime = time.Format('MM-dd hh:mm')
              this.alllog.push(element)
            })
          } else {
            this.noMoreData = true
          }
        }else if(this.currentPage==1){
          this.noData = true
        } else {
          this.$message.error('没有更多消费记录')
        }
      }).catch(err => {
        if (err.msg) {
          this.$message.error(err.msg)
        }
      })
    },
    loadMore() {
      this.currentPage++
      this.getData()
    },
    addCardID() {
      this.$API.addSchoolcard(this.addCardData).then(res => {
        this.$store.dispatch('getCurrentUser')
        this.$message('绑定卡号成功')
        this.getData()
      }).catch((err) => {
        this.$message.error(err.msg)
      })
    },
    changeCurrentStudent(val) {
      this.$store.commit('changeCurrentStudentId', val)
      this.getData()
    }
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.noCard {
  min-height: 500px;
  h4 {
    text-align: center;
    padding: 80px 0 50px;
    font-size: 20px;
    font-weight: 400;
  }
  .cardNum {
    width: 450px;
    margin: 0 auto;
  }
}

.cardSummary {
  text-align: center;
  border: 1px solid @border;
  padding: 40px 20px;
  background: #fff;
  .total {
    .student {
      float: left;
    }
    .item {
      padding: 0 20px;
      span {
        vertical-align: middle;
        font-size: 16px;
        color: #888;
      }
      .balance {
        color: @sub;
        font-size: 36px;
      }
    }
  }
  .list {
    .item {
      border: 1px solid @border;
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 20px;
      .score {
        line-height: 50px;
        .score {
          color: @sub;
        }
      }
      .name {
        line-height: 50px;
      }
    }
  }
}

.cardList {
  background: #fff;
  border: 1px solid @border;
  margin: 15px 0;
  padding: 20px;
  min-height: 500px;
  .header {
    line-height: 36px;
    font-weight: bold;
    font-size: 16px;
    border-bottom: 1px solid @border;
    .pagesize {
      float: right;
    }
  }
  .item {
    padding: 10px;
    position: relative;
    line-height: 30px;
    border-bottom: 1px dotted @border;
    &:hover {
      background: @border;
    }
    .title {
      max-width: calc(~"100% - 150px");
    }
    .time {
      color: @grey;
      font-size: 12px;
    }
    .log {
      position: absolute;
      top: 20px;
      right: 10px;
      color: @sub;
      font-size: 28px;
    }
  }
}
</style>
