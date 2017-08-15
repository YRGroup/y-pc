<template>
  <div class="panel">
    <img class="poster" :src="poster">
  
    <div class="panel">
      <el-tabs v-model="activeName" @tab-click="handleSwitchTab">
        <el-tab-pane name="1">
          <span slot="label">
            <i class="iconfont">&#xe737;</i> 校园动态</span>
          <no-data v-if="nodataImg"></no-data>
  
          <div v-else class="card" v-for="(i,index) in data" :key="index">
            <div class="img" v-if="i.ImgUrl">
              <img :src="i.ImgUrl">
            </div>
            <div class="img" v-else>
              <img :src="publicImg">
            </div>
            <div class="cardCon">
              <div class="cardtitle" @click="$router.push('/news?id='+i.ID)">
                {{i.Title}}
              </div>
              <div class="content">{{i.Describtion}}</div>
              <div class="cardfooter">
                <span class="time">
                  <i class="iconfont">&#xe621;</i>{{i.AddTime}}</span>
              </div>
            </div>
          </div>
  
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">
            <i class="iconfont">&#xe604;</i> 资料库</span>
            <no-data v-if="nodataImg"></no-data>
          <div v-else class="card" v-for="(i,index) in data" :key="index">
            <div class="img" v-if="i.ImgUrl">
              <img :src="i.ImgUrl">
            </div>
            <div class="img" v-else>
              <img :src="publicImg">
            </div>
            <div class="cardCon">
              <div class="cardtitle">
                <a @click="$router.push('/docs?id='+i.ID)">{{i.Title}}</a>
              </div>
              <div class="content">{{i.Describtion}}</div>
              <div class="cardfooter">
                <span class="time">{{i.AddTime}}</span>
              </div>
            </div>
          </div>
  
        </el-tab-pane>
      </el-tabs>
    </div>
  
  </div>
</template>

<script>
import noData from '@//components/noData'

export default {
  name: 'app',
  components: { noData },
  data() {
    return {
      activeName: '1',
      poster: require('@/assets/img/post.jpg'),
      data: [],
      page: 1,
      publicImg: require('@/assets/publicImg.png'),
      nodataImg: false
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
      }
      this.$API.getNewsList(para).then(res => {
        this.data = res
        if(this.data.length == 0 && this.page ==1){
          this.nodataImg = true
        }
      })
      
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
  padding: 15px 20px;
  position: relative;
  border-bottom: 1px solid @border;
  &:hover {
    background: @border;
    .img {
      transform: scale(1.05);
      transition: all 0.5s;
    }
    .cardtitle {
      color: @main;
    }
  }

  .img {
    height: 120px;
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
      .iconfont {
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
