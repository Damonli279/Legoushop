<template>
  <div class="shopcar">
    <div class="car_l">
      <img @click="clickcar()" :src="getscrurl" alt />
      <label class="allprice">总价：<span>{{ getallprice }}元</span></label>
      <label>另需配送费￥4元</label>
    </div>
    <div class="div">￥20起送</div>
    <transition name="slide-fade">
      <div class="content" v-show="isopen">
        <p v-show="getcarnuml">购物车还沒有任何商品</p>
        <div class="food_div" v-for="item of getcarnum">
          <p>{{ item.name }}</p>
          <p>价格：{{ item.num * item.price }}元</p>
          <div class="goodsnum">
            <span>
              <svg
                @click="changeNum(-1,item.id)"
                t="1611155029193"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1121"
                width="20"
                height="20"
              >
                <path
                  d="M512 63C263.6 63 62.3 264 62.3 512S263.6 961 512 961s449.7-201 449.7-449S760.4 63 512 63z m200.9 467.6c-4.8 4.8-11.4 7.7-18.7 7.7H329.8c-14.6 0-26.4-11.8-26.4-26.4s11.8-26.4 26.4-26.4h364.4c14.6 0 26.4 11.8 26.4 26.4 0 7.4-2.9 14-7.7 18.7z"
                  p-id="1122"
                  fill="#d81e06"
                />
              </svg>
            </span>
            <label v-show="item.num > 0">{{ item.num }}</label>
            <Icon @click="changeNum(1,item.id)" class="add" type="ios-add-circle" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isopen: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    clickcar() {
      this.isopen = !this.isopen;
    },
    changeNum(num, id) {
      this.$store.commit("changeNum", { id, num });
      this.$store.commit("getcarnum");
    }
  },
  updated() {},
  computed: {
    getcarnum() {
      return this.$store.state.carnum;
    },
    getcarnuml() {
      if(this.$store.state.carnum.length) return false;
      return true
    },
    getscrurl(){
      if (this.$store.state.carnum.length > 0) return require("../assets/images/shop-car1.png");
      return require("../assets/images/shop-car2.png");
    },
    getallprice(){
        let allprice = 0
        for (const obj of this.$store.state.carnum) {
            allprice += obj.num * obj.price
        }
        return allprice
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar {
  position: relative;
  display: flex;
  font-size: 18px;
  width: 100%;
  height: 70px;
  align-items: center;
  color: #989399;
  .car_l {
    background-color: #131d27;
    height: 50px;
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    .allprice {
      width: 100px;
      span{
          color: red;
      }
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
  .div {
    width: 30%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2a353a;
    z-index: 999;
  }
  .content {
    width: 100%;
    position: absolute;
    bottom: 50px;
    left: 0;
    background-color: #fff;
    color: black;
    height: 200px;
    overflow-y: scroll;
    .food_div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background-color: #f2f2f2;
      border-bottom: 1px solid #ddd;
      .goodsnum {
        font-size: 21px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 65px;
        height: 31px;
        // margin-right: 10px;
        span {
          text-align: center;
          width: 20px;
          height: 20px;
          display: flex;
          svg {
            margin-top: 0;
          }
        }
        label {
          margin-left: 5px;
        }
        .add {
          margin-left: 5px;
          color: #d81e06;
        }
      }
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.6s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(150px);
    opacity: 0;
  }
}
</style>