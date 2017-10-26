<template>
  <div class="main">
      <h3>美育活动叫号平台入口</h3>
      <div class="list">
          <h4>考场端入口</h4>
          <ul class="itemlist">
              <li @click="$router.push('queueset?lid=1')"><img :src="pic1" alt=""></li>
              <li @click="$router.push('queueset?lid=2')"><img :src="pic2" alt=""></li>
              <li @click="$router.push('queueset?lid=3')"><img :src="pic3" alt=""></li>
              <li @click="$router.push('queueset?lid=4')"><img :src="pic4" alt=""></li>
              <li @click="$router.push('queueset?lid=5')"><img :src="pic5" alt=""></li>
          </ul>
      </div>
      <div class="list">
          <h4>候场端入口</h4>
          <ul class="itemlist">
              <li @click="$router.push('queue?lid=1')"><img :src="pic6" alt=""></li>
              <li @click="$router.push('queue?lid=2')"><img :src="pic7" alt=""></li>
              <li @click="$router.push('queue?lid=3')"><img :src="pic8" alt=""></li>
              <li @click="$router.push('queue?lid=4')"><img :src="pic9" alt=""></li>
              <li @click="$router.push('queue?lid=5')"><img :src="pic10" alt=""></li>
          </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data() {
    return {
        pic1: require("@/assets/meiyu/考场-01.jpg"),
        pic2: require("@/assets/meiyu/考场-02.jpg"),
        pic3: require("@/assets/meiyu/考场-03.jpg"),
        pic4: require("@/assets/meiyu/考场-04.jpg"),
        pic5: require("@/assets/meiyu/考场-05.jpg"),
        pic6: require("@/assets/meiyu/考场-06.jpg"),
        pic7: require("@/assets/meiyu/考场-07.jpg"),
        pic8: require("@/assets/meiyu/考场-08.jpg"),
        pic9: require("@/assets/meiyu/考场-09.jpg"),
        pic10: require("@/assets/meiyu/考场-10.jpg"),
    };
  },

};
</script>

<style lang="less" scoped>
.main{
    background: #fff;
    min-height: 500px;
    padding: 40px;
    text-align: center;
    h3{
        font-size: 32px;
    }
    .list{
        margin-top:40px;
        margin-bottom: 40px;
        overflow: hidden;
    }
    h4{
        font-size: 24px;
        text-align: left;
    }
    .itemlist{
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li{
            float: left;
            width: 190px;
            margin:20px 10px;
            cursor: pointer;
            img{
                width: 100%;
            }
        }
    }
}
</style>
