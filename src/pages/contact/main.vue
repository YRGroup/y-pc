<template>
  <div>
    <div class="card leftCon">
      <div class="maintitle">
        <i class="iconfont">&#xe649;</i>消息列表
      </div>

      <div style="padding:0 20px" v-if="data.length">
        <li class="item" v-for="(i,index) in data" :key="index" @click="$router.push('/msg/'+i.Meid)">
          <div class="img">
            <!-- <img :src="i.HeadImg" v-if="i.HeadImg!='http://pic.yearnedu.com/himg.png' && i.HeadImg!=''"> -->
            <!-- <div class="headTextImg" v-else>{{i.Name.substr(0,1)}}</div> -->
            <img :src="i.HeadImg">
          </div>
          <div class="content">
            <div class="name">{{i.Name}}</div>
            <div class="time">{{i.LastTime}}</div>
            <div class="msg">{{i.Content}}</div>
            <div class="num" v-show="i.UnReadCount">{{ i.UnReadCount }}</div>
          </div>
        </li>
      </div>

      <no-data v-else></no-data>

    </div>

  </div>
</template>

<script>
import noData from '@//components/noData'
export default {
  name: 'msg',
  components: { noData },
  data() {
    return {
      data: [],
    }
  },
  methods: {
    getData() {
      this.$API.getMsgList(this.userId).then(res => {
        let msg = res.length
        this.$store.commit('setNumLength',{msg:msg})
        this.data = res
        let msgdata = this.data
        for (var i = 0; i < msgdata.length; i++) {
          let time = new Date(msgdata[i].LastTime)
          msgdata[i].LastTime = time.Format('MM-dd hh:mm')
        }
      })
    },
  },
  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.card {
  background: #fff;
  padding-bottom: 20px;
  .item {
    padding: 15px 20px;
    border-bottom: 1px dotted @border;
    cursor: pointer;
    position: relative;
    &:hover {
      // border-bottom: 1px dotted @main;
      background: @border;
    }
    .img {
      display: inline-block;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .content {
      vertical-align: top;
      display: inline-block;
      padding-left: 10px;
      max-width: calc(~"100% - 70px");
      .name {
        display: inline-block;
        line-height: 28px;
      }
      .time {
        padding-left: 20px;
        display: inline-block;
        color: #999;
        font-size: 12px;
      }
      .msg {
        color: @grey;
        font-size: 12px;
        max-height: 4em;
        overflow: hidden;
      }
      .num {
        position: absolute;
        right: 1em;
        top: 1em;
        height: 18px;
        width: 18px;
        background: #ff7e00;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        line-height: 18px;
        font-size: 12px;
      }
    }
    .btn {
      float: right;
      line-height: 60px;
    }
  }
}
</style>
