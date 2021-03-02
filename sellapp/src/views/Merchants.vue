<template>
  <div class="merchants">
    <div class="top_div">
      <div class="out_div">
        <div class="inside_l">
          <h3>{{ sellerdata.name }}</h3>
          <p>
            <Rate icon="ios-heart" v-model="sellerdata.ratingCount" disabled />
            <span>月售{{ sellerdata.sellCount }}单</span>
          </p>
        </div>
        <div class="inside_r">
          <Icon class="heart" type="md-heart" />
          <span>已收藏</span>
        </div>
      </div>
      <div class="out_ub">
          <div>
              <p>起送价</p>
              <p><span>{{ sellerdata.minPrice }}</span>元</p>
          </div>
          <div class="center">
              <p>商家配送</p>
              <p><span>{{ sellerdata.deliveryPrice }}</span>元</p>
          </div>
          <div>
              <p>平均配送时间</p>
              <p><span>{{ sellerdata.deliveryTime }}</span>分钟</p>
          </div>

      </div>
    </div>
    <p></p>
    <div class="activity">
        <h3>公告与活动</h3>
        <div>
            <p class="text_p">{{ sellerdata.bulletin }}</p>
            <p v-for="item in sellerdata.supports"><span :class="item.type == 0?'red':(item.type == 1?'blue':'green')">{{ item.type == 0?'减':(item.type == 1?'折':'特')}}</span>{{ item.description }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { getseller } from "@/apis/apis";
export default {
  data() {
    return {
      sellerdata: {}
    };
  },
  async created() {
    let res = await getseller();
    this.sellerdata = res.data.data;
  }
};
</script>

<style lang="less" scoped>
.merchants {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .top_div {
      margin: 0 20px;
    .out_div{
        display: flex;
        padding: 20px;
        justify-content: space-between;
        align-items: center;
        .inside_l {
            h3{
                color: black;
            }
        }
        .inside_r{
            font-size: 20px;
            display: flex;
            flex-direction: column;
            .heart{
                font-size: 30px;
                color: red;
            }
        }
    }
    .out_ub{
        display: flex;
        justify-content: space-around;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        div{
            text-align: center;
            width: 33%;
            span{
                font-size: 30px;
                color: black;
            }
        }
        .center{
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
        }
    }
  }
  >p{
      width: 100%;
      height: 20px;
      background-color: #f2f2f2;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
  }
  .activity{
      padding: 20px;
      h3{
          color: black;
      }
      div{
          font-size: 16px;
          padding: 0 15px;
          .text_p{
              color: red;
              border-top: 1px solid #fff;
          }
          p{
              padding: 10px 0;
              border-top: 1px solid #ddd;
              span{
                  display: inline-block;
                  width: 24px;
                  height: 24px;
                  color: #fff;
                  text-align: center;
                  margin-right: 20px;
              }
              .red{
                  background-color: red;
              }
              .blue{
                  background-color: #2DB7F5;
              }
              .green{
                  background-color: #01B53B;
              }
          }
      }
  }
}
</style>