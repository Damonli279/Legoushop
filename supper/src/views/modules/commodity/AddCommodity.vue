<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里添加商品</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
        <el-button style="float: right; padding: 3px 0" type="text">商品管理</el-button>
      </div>
      <div class="card_div">
        <div class="card_div_l">
            <h3>所属分类</h3>
            <template>
            <el-select v-model="category" placeholder="请选择" class="select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </template>
            <h3>商品售价</h3>
            <el-input placeholder="请输入金额" v-model="salePrice">
                <template slot="append">元</template>
            </el-input>
            <h3>市场价</h3>
            <el-input placeholder="请输入金额" v-model="marketPrice">
                <template slot="append">元</template>
            </el-input>
            <h3>入库数量</h3>
            <el-input v-model="stockCount" placeholder="请输入数量"></el-input>
            <h3>商品单位</h3>
            <el-input v-model="commodityUnit" placeholder="请输入商品单位"></el-input>
        </div>
        <div class="card_div_r">
            <h3>商品名称</h3>
            <el-input v-model="name" placeholder="请输入商品名称"></el-input>
            <div class="discount">
                <div class="discount_vip">
                    <h3>会员优惠</h3>
                    <template>
                        <el-radio v-model="vipDiscount" label="1">享受</el-radio>
                        <el-radio v-model="vipDiscount" label="2">未享受</el-radio>
                    </template>
                </div>
                <div class="discount_">
                    <h3>是否促销</h3>
                    <template>
                        <el-radio v-model="promotion" label="1">启用</el-radio>
                        <el-radio v-model="promotion" label="2">禁用</el-radio>
                    </template>
                </div>
            </div>
            <h3>商品进价</h3>
            <el-input placeholder="请输入金额" v-model="stockPrice">
                <template slot="append">元</template>
            </el-input>
            <h3>商品重量</h3>
            <el-input v-model="commodityWeight" placeholder="请输入商品重量"></el-input>
            <h3>商品条形码</h3>
            <div class="btn_div">
                <el-input placeholder="商品条形码" v-model="barCode">
                </el-input>
                <el-button type="primary" @click="createbarCode">生成条形码</el-button>
            </div>
        </div>
      </div>
        <div class="success">
            <el-button type="success" @click="addcommodityclick">添加商品</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>
import { addcommodity } from '@/apis/apis'
export default {
  data() {
    return {
      //name,category,salePrice,marketPrice,stockCount,commodityUnit,vipDiscount,promotion,stockPrice,commodityWeight,barCode
      username: "",
      name:'',
      category:'',
      salePrice:'',
      marketPrice:'',
      stockCount:'',
      commodityUnit:'',
      vipDiscount:'1',
      promotion:'1',
      stockPrice:'',
      commodityWeight:'',
      barCode:'',
      options: [{
          value: '水果',
          label: '水果'
        }, {
          value: '零食',
          label: '零食'
        }, {
          value: '饮料',
          label: '饮料'
        }, {
          value: '烟酒',
          label: '烟酒'
        }, {
          value: '肉类',
          label: '肉类'
        }],
    };
  },
  created() {
    this.username = localStorage.getItem("name");
  },
  methods: {
    createbarCode(){
      // 最大数 999999999
      // 最小数 100000000
      this.barCode = Math.ceil(Math.random(899999999) * 100000000);
      
    },
    addcommodityclick(){
      let obj = {
        name: this.name,
        category:this.category,
        salePrice:this.salePrice,
        marketPrice:this.marketPrice,
        stockCount:this.stockCount,
        commodityUnit:this.commodityUnit,
        vipDiscount:this.vipDiscount,
        promotion:this.promotion,
        stockPrice:this.stockPrice,
        commodityWeight:this.commodityWeight,
        barCode:this.barCode
      }
      
      addcommodity(obj).then(res => {
        if(res.data == 'ok'){
          this.$message({
            message: '恭喜你，添加商品成功！',
            type: 'success'
          });
        }else{
          this.$message.error('添加商品失败！');
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
  p {
    margin-top: 10px;
  }
  .box-card {
      margin-top: 20px;
    height: 100%;
    .success{
        button{
            margin: 20px 0;
            margin-left: 660px;
            height: 50px;
            width: 200px;
        }
    }
    .card_div {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: space-around;
      h3{
          margin: 10px 0;
      }
      .card_div_l {
        width: 35%;
        height: 100%;
        .select{
            width: 100%;
        }
      }
      .card_div_r {
        width: 35%;
        height: 100%;
        .discount{
            display: flex;
            label{
                margin: 12px 30px 12px 0;
            }
        }
        .btn_div{
            position: relative;
            button{
                position: absolute;
                right: 0;
                top: 0;
            }
        }
      }
    }
  }
}
</style>