<template>
  <div class="main">
    <div class="goodsoption">
      <ul class="content">
        <div :class="{checked_li:check == item.name}" v-for="item in getgoodslist" :key="item.name">
          <span @click="check_li(item.name)">{{ item.name }}</span>
        </div>
      </ul>
    </div>
    <div class="goodslist">
      <ul class="content">
        <div :id="i.name" v-for="i in getgoodslist">
          <h6>{{ i.name }}</h6>
          <div class="foods" v-for="food in i.foods">
            <img :src="food.icon" alt />
            <div>
              <h4>{{ food.name }}套餐</h4>
              <p>{{ food.description }}</p>
              <p>
                月售{{ food.sellCount }}份
                <span>好评率{{ food.rating }}%</span>
              </p>
              <p>
                <b>{{ food.price }}</b>
                <span class="oldprice">{{ food.oldprice }}</span>
              </p>
              <div class="goodsnum">
                <span><svg v-show="food.num > 0" @click="changeNum(-1,food.id)" t="1611155029193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1121" width="20" height="20"><path d="M512 63C263.6 63 62.3 264 62.3 512S263.6 961 512 961s449.7-201 449.7-449S760.4 63 512 63z m200.9 467.6c-4.8 4.8-11.4 7.7-18.7 7.7H329.8c-14.6 0-26.4-11.8-26.4-26.4s11.8-26.4 26.4-26.4h364.4c14.6 0 26.4 11.8 26.4 26.4 0 7.4-2.9 14-7.7 18.7z" p-id="1122" fill="#d81e06"></path></svg>
                </span>
                <label v-show="food.num > 0">{{ food.num }}</label>
                <Icon @click="changeNum(1,food.id)" class="add" type="ios-add-circle" />
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from "@/apis/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      goods_list: [],
      check: "",
      div_hight:[]
    };
  },
  created() {
    this.$store.dispatch('Getgoods','context')
    
  },
  mounted() {
    let goodsoption = new BScroll(document.querySelector(".goodsoption"), {
      click: true
    });
    this.goodslist = new BScroll(".goodslist",{
      probeType: 3,
      click: true
    }); 
    this.goodslist.on('scroll',(hight) => {
      let _y = Math.abs(hight.y)
      let hight_y = 0;
      this.div_hight.forEach((obj,i) => {
        hight_y += obj.hight;
        if(_y >= hight_y){
          this.check = this.div_hight[i+1].id
        }else if(_y < this.div_hight[0].hight){
          this.check = this.div_hight[0].id
        }
      })
    })
  },
  updated() {
    if(this.div_hight.length == 0){
      var DIV = document.querySelectorAll('.goodslist ul>div')
      // console.log(DIV[0].offsetHeight);
      for (let i = 0; i < DIV.length; i++) {
          this.div_hight.push({ id: DIV[i].id,hight: DIV[i].offsetHeight})
      }
    }
      if(!this.check){
         this.check = this.$store.state.goods_list[0].name
      }
  },
  methods: {
    check_li(val) {
      this.goodslist.scrollToElement("#" + val, 600);
      this.check = val;
    },
    changeNum(num,id){
      this.$store.commit('changeNum',{id,num})
      this.$store.commit("getcarnum");
      // console.log(this.$store.state.goods_list,this.$store.state.carnum,id,num);
    }
  },
  computed: {
    getgoodslist(){
        return this.$store.state.goods_list
    },
    getcheck(){
      // return this.$store.state.goods_list[0].name
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .goodsoption {
    width: 120px;
    // height: 100%;
    overflow: auto;
    background-color: #fff;
    ul {
      background-color: #f3f6f6;
    }
    div {   
      height: 70px;
      text-align: center;
      font-size: 16px;
      padding: 0 12px;
      span {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #e1e1e1;
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .checked_li {
      background-color: #fff;
      color: black;
    }
  }
  .goodslist {
    width: 100%;
    // height: 100%;
    overflow: auto;
    div {
      h6 {
        background-color: #f3f6f6;
        border-left: 3px solid #d8dddd;
        padding: 3px 10px;
        font-size: 16px;
      }
      .foods {
        padding: 14px;
        display: flex;
        position: relative;
        img {
          width: 80px;
          height: 80px;
        }
        div {
          margin-left: 10px;
          h4 {
            font-size: 16px;
            color: black;
          }
          p {
            b {
              color: red;
            }
            span {
              margin-left: 20px;
            }
            .oldprice {
              text-decoration: line-through;
            }
          }
        }
      .goodsnum{
        font-size: 21px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 65px;
        height: 31px;
        position: absolute;
        left: 210px;
        bottom: 0;
        span{
          text-align: center;
          width: 20px;
          height: 20px;
          display: flex;
          svg{
            margin-top: 0;
          }
        }
        label{
          margin-left: 5px;
        }
        .add{
          margin-left: 5px;
          color: #d81e06;
        }
      }
      }
    }
  }
}
</style>