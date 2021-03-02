<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里产看和操作商品</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">商品管理</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed="left" prop="name" label="商品名" width="150"></el-table-column>
        <el-table-column prop="category" label="分类" width="120"></el-table-column>
        <el-table-column prop="barCode" label="条形码" width="160"></el-table-column>
        <el-table-column prop="salePrice" label="售价" width="120"></el-table-column>
        <el-table-column prop="marketPrice" label="市场价" width="120"></el-table-column>
        <el-table-column prop="stockPrice" label="进价" width="120"></el-table-column>
        <el-table-column prop="stockCount" label="入库数量" width="120"></el-table-column>
        <el-table-column prop="commodityWeight" label="重量" width="120"></el-table-column>
        <el-table-column prop="commodityUnit" label="单位" width="120"></el-table-column>
        <el-table-column prop="vipDiscount" label="会员优惠" width="120"></el-table-column>
        <el-table-column prop="promotion" label="是否促销" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="Remuvecommodity(scope.row.id)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_div">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <div class="dialog">
        <p>商品条形码</p>
        <el-input v-model="input.barCode" disabled placeholder="请输入内容"></el-input>
        <p>商品名称</p>
        <el-input v-model="input.name" placeholder="请输入商品名"></el-input>
        <p>商品售价</p>
        <el-input v-model="input.salePrice" placeholder="请输入商品售价"></el-input>
        <p>商品市场价</p>
        <el-input v-model="input.marketPrice" placeholder="请输入商品市场价"></el-input>
        <p>商品进价</p>
        <el-input v-model="input.stockPrice" placeholder="请输入商品进价"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Changecommodity">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getcommodity, removecommodity,changecommodity } from "@/apis/apis";
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      username: "",
      currentPage: 1,
      page_size: 6,
      total: 10,
      dialogFormVisible: false,
      input: {
        barCode:'',
        name: '',
        salePrice: '',
        marketPrice: "",
        stockPrice: ''
      },
      tableData: [
        // {
        //   name: "", //商品名
        //   category: "", //分类
        //   barCode: "上", //商品条形码
        //   salePrice: "", //售价
        //   marketPrice: "2", //市场价
        //   stockPrice: '', //进价
        //   stockCount: '', //入库数量
        //   commodityWeight: '', //重量
        //   commodityUnit: '', //单位
        //   vipDiscount: '', //会员优惠
        //   promotion: '' //是否促销
        // }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.Getcommodity(this.currentPage, this.page_size);
    },
    Getcommodity(currentPage, page_size) {
      getcommodity(currentPage, page_size).then(res => {
        this.total = res.data.commodity;
        this.tableData = res.data.result;
      });
    },
    Remuvecommodity(val) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removecommodity(val).then(res => {
            if (res.data == "ok") {
              this.Getcommodity(this.currentPage, this.page_size);
              this.$message({
                message: "商品已下架",
                type: "success"
              });
            } else {
              this.$message.error("下架失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick(val) {
      this.dialogFormVisible = true
      for (const key in this.input) {
        this.input[key] = val[key]
      }
    },
    Changecommodity(){
      this.dialogFormVisible = false
      changecommodity(this.input).then(res => {
        if(res.data == 'ok'){
          this.$message({
            message: "商品修改成功",
            type: "success"
          });
          this.Getcommodity(this.currentPage, this.page_size);
        }else{
          this.$message({
            type: "info",
            message: "商品修改失败"
          });
        }
      })
    }
  },
  created() {
    this.username = localStorage.getItem("name");
    this.Getcommodity(this.currentPage, this.page_size);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
  p {
    margin-top: 10px;
  }
  .box-card {
    margin-top: 20px;
    .page_div {
      margin-top: 20px;
      text-align: center;
    }
  }
  .dialog{
    width: 70%;
    margin: 0 auto;
  }
}
</style>