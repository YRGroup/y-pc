<template>
  <div class="panel">
    <img class="poster" :src="poster">
    <!-- <div class="left panel"> -->
    <div class="panel">
      <el-tabs v-model="activeName" @tab-click="handleSwitchTab">
        <el-tab-pane name="1">
          <span slot="label"><i class="iconfont">&#xe737;</i> 校园动态</span>
    
          <div class="card" v-for="(i,index) in data" :key="index">
            <div class="img" v-if="i.ImgUrl">
              <img :src="i.ImgUrl">
            </div>
            <div class="cardCon">
              <div class="cardtitle"  @click="$router.push('/news?id='+i.ID)">
                {{i.Title}}
              </div>
              <div class="content">{{i.Describtion}}
                <!-- <a @click="$router.push('/news?id='+i.ID)">[ 详情 ]</a> -->
              </div>
              <div class="cardfooter">
                <span class="time"><i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
              </div>
            </div>
          </div>
    
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"><i class="iconfont">&#xe604;</i> 资料库</span>
    
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
    </div>
  
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
    handleSwitchTab(tab, event) {
      this.getData()
    },
    getData() {
      let para = {
        category: this.activeName,
        currentPage: this.page,
        pagesize: 10,
        showDelete: false,
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
}

.card {
  // height: 130px;
  padding: 15px 20px;
  position: relative;
  border-bottom: 1px solid @border;
  &:hover {
    background: @border;
    .img{
      transform:scale(1.05) 
    }
    .cardtitle{
      color:@main;
    }
  }

  .img {
    height: 100%;
    width: 200px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .cardCon {
    width: calc(~"100% - 220px");
    display: inline-block;
    line-height: 2rem;
    vertical-align: top;
    margin-left: 15px;
    .cardtitle {
      font-size: 16px;
      line-height: 32px;
      overflow: hidden;
      font-weight: 600;
      cursor: pointer;
    }
    .content {
      margin-top: 8px;
      line-height: 24px;
      color: #666;
      overflow: hidden;
      a {
        color: @main;
        margin-left: 5px;
      }
    }
    .cardfooter {
      color: @grey;
      font-size: 12px;
      .iconfont{
        font-size: 14px;
        margin-right: 5px;
      }
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
