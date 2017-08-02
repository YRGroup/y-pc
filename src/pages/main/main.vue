<template>
  <div style="background:#fff">
    <img class="poster" :src="poster">
  
    <!-- <div class="left panel"> -->

      <el-tabs v-model="activeName" @tab-click="handleSwitchTab">
        <el-tab-pane label=" 校 园 动 态 " name="1">

          <div class="card" v-for="(i,index) in data" :key="index">
            <div class="img" v-if="i.ImgUrl">
              <img :src="i.ImgUrl">
            </div>
            <div class="cardCon">
              <div class="cardtitle">
                <a @click="$router.push('/news?id='+i.ID)">{{i.Title}}</a>
              </div>
              <div class="content">{{i.Describtion}}
                <a @click="$router.push('/news?id='+i.ID)">[ 详情 ]</a>
              </div>
              <div class="cardfooter">
                <span class="time">{{i.AddTime}}</span>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label=" 资 料 库 " name="2">
          
          <div class="card" v-for="(i,index) in data" :key="index">
            <div class="img" v-if="i.ImgUrl">
              <img :src="i.ImgUrl">
            </div>
            <div class="cardCon">
              <div class="cardtitle">
                <a @click="$router.push('/news?id='+i.ID)">{{i.Title}}</a>
              </div>
              <div class="content">{{i.Describtion}}
                <a @click="$router.push('/news?id='+i.ID)">[ 详情 ]</a>
              </div>
              <div class="cardfooter">
                <span class="time">{{i.AddTime}}</span>
              </div>
            </div>
          </div>

        </el-tab-pane>
        
      </el-tabs>
  
     <!-- </div>
    <div class="right">
      <div class="card" v-if="$store.state.role==='家长'">
        <div class="header">
          <img src="https://modao.cc/uploads3/images/906/9062900/raw_1493176743.png">
        </div>
        <div class="content">
          <p>赵明敏 的家长</p>
          <p>孩子信息</p>
          <p>经开区育人国际学校</p>
          <p>学号：454874667</p>
        </div>
      </div>
  
      <div class="card" v-if="$store.state.role==='老师'">
        <div class="header">
          <img :src="$store.state.currentUser.Headimgurl">
        </div>
        <div class="content">
          <p class="name">{{ $store.state.currentUser.TrueName }} - {{ $store.state.currentUser.ExtendInfo.Course }}</p>
          <p>经开区育人国际学校</p>
        </div>
      </div>
  
      <div class="card" v-if="$store.state.role==='guest'">
        <div class="header">
          <div class="title">登录</div>
        </div>
        <div class="content">
          <p>000</p>
          <p>经开区育人国际学校</p>
        </div>
      </div> 
  
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      activeName: '1',
      poster: require('@/assets/img/post.jpg'),
      data: [],
      page: 1,
    }
  },
  methods: {
    handleSwitchTab(tab, event){
      this.getData()
    },
    getData() {
      let para = {
        category: this.activeName,
        currentPage: this.page,
        pagesize: 10,
      }
      this.$API.getNewsList(para).then(res => this.data = res)
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
@import '../../style/theme.less';

.poster {
  width: 100%;
  margin-bottom: 10px;
}

  .card {
    height: 130px;
    font-size: 13px;
    padding: 15px 10px;
    position: relative;
    border-bottom: 1px solid @border;
    &:hover {
      background: #fcfcfc;
    }

    .img {
      height: 100%;
      width: 225px;
      display: inline-block;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .cardCon {
      width: calc(~"100% - 240px");
      display: inline-block;
      line-height: 2rem;
      vertical-align: top;
      margin-left: 10px;
      .cardtitle {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        overflow: hidden;
        margin-top: 5px;
        a {
          color: #333;
          &:hover {
            color: @main;
          }
        }
      }
      .content {
        margin-top: 8px;
        line-height: 24px;
        color: #666;
        height: 48px;
        overflow: hidden;
        a {
          color: @main;
          margin-left: 5px;
        }
      }
      .cardfooter {
        color: @grey;
        font-size: 12px;
      }
    }
  }

// .left {
//   width: calc(~"100% - 320px");
//   float: left;
//   .title {
//     border-bottom: 1px solid @border;
//     line-height: 36px;
//     margin-bottom: -1px;
//     .active {
//       color: @main;
//       border-bottom: 3px solid @main;
//     }
//     li {
//       display: inline-block;
//       padding: 5px 15px;
//       cursor: pointer;
//       font-weight: bold;
//       font-size: 15px;
//       color: #666;
//       &:hover {
//         color: @main;
//       }
//     }
//   }

// }

// .right {
//   float: right;
//   width: 260px;
//   .card {
//     border: 1px solid @border;
//     text-align: center;
//     background: #fff;
//     margin-bottom: 20px;
//     .header {
//       height: 75px;
//       position: relative;
//       background: @main;
//       .title {
//         color: #fff;
//         line-height: 75px;
//       }
//       img {
//         width: 100px;
//         height: 100px;
//         position: absolute;
//         left: 80px;
//         top: 25px;
//         border-radius: 50%;
//         border: 3px solid rgba(255, 255, 255, .5);
//       }
//     }
//     .content {
//       margin-top: 60px;
//       line-height: 2em;
//       padding-bottom: 20px;
//       .name {
//         font-size: 16px;
//       }
//     }
//   }
// }
</style>
