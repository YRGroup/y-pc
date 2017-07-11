<template>
  <div>

    <div class="left">
      
      <div class="scoreSummary">
        <div class="title">2016-2017学年6月月考</div>
        <div class="info">
          <span>学生：赵敏</span>
          <span>年级：高二</span>
          <span>考试时间：2017-07-08</span>
        </div>
        <div class="total">
          <span class="item">
            <span>总分：</span>
            <span class="score">412.5</span>
          </span>
          <span class="item">
            <span>排名：</span>
            <span class="score">20</span>
          </span>
        </div>
        <div class="list">
            <div class="item" v-for="i in 6" :key="i">
              <div class="score">
                <span class="score">90</span>
                <span> / 120</span>
              </div>
              <div class="name">语文</div>
            </div>
          </div>
      </div>

      <div class="scoreList">
        <div class="header">历次成绩报告</div>

        <div class="item" v-for="i in 6" :key="i">
          <div class="title">2017年江西省抚州市八年级下学期期末学业水平测试（人教版）> </div>
          <div class="time">2017-06-14</div>
          <div class="score">412.5分</div>
        </div>
      </div>
    
    </div>
    <div class="right">
      <div class="card">
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

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components:{},
  data (){
    return{
      poster:require('../assets/img/post.jpg')
    }
  },
  methods:{

  },
  created(){

  },
  mounted(){

  },
}
</script>

<style lang="less" scoped>
@import '../style/theme.less';

.left{
  width:calc(~"100% - 300px");
  float: left;
  padding:10px;
  .scoreSummary{
    text-align: center;
    border:1px solid #ccc;
    padding:20px;
    background: #fff;
    margin:10px 0;
    .title{
      font-size: 20px;
      line-height:60px;
    }
    .info{
      color:#ccc;
      span{
        padding:0 20px;
      }
    }
    .total{
      .item{
        padding:0 20px;
        span{
          vertical-align: middle;
        }
        .score{
          color:@c1;
          font-size: 50px;
        }
      }
    }
    .list{
      .item{
        border:1px solid #ccc;
        display: inline-block;
        width:100px;
        height:100px;
        margin:20px;
        .score{
          line-height: 50px;
          .score{
            color:@c1;
          }
        }
        .name{
          line-height: 50px;
        }
      }
    }
  }
  .scoreList{
    background: #fff;
    border:1px solid #ccc;
    margin:10px 0;
    padding:20px;
    .header{
      line-height: 40px;
      font-weight: bold;
    }
    .item{
      padding:20px;
      position: relative;
      line-height: 30px;
      border-bottom: 1px dotted #ccc;
      .time{
        color:#ccc;
      }
      .score{
        position: absolute;
        top:20px;
        right:10px;
        color:@c1;
        font-size: 40px;
      }
    }
  }
}
.right{
  float: right;
  width:260px;
  padding:20px 10px;
  .card{
    border:1px solid #ccc;
    text-align: center;
    background: #fff;
    margin-bottom: 20px;
    .header{
      height:75px;
      position: relative;
      background: @c1;
      img{
        width:100px;
        position: absolute;
        left:80px;
        top:25px;
        border-radius: 50%;
      } 
    }
    .content{
      margin-top: 80px;
      line-height: 2em;
      padding-bottom: 20px;
    }
  }
}
</style>
