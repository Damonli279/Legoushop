<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里查看商品库存</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">库存管理</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商品条形码" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="进价" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.stockPrice}}</p>
          </template>
        </el-table-column>
        <el-table-column label="入库" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.stockCount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.stock}}</p>
          </template>
        </el-table-column>
        <el-table-column label="已售" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.sale}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    tableData: [{
        barCode: '2016-05-02',
        name: '王小虎',
        stockPrice: '上海市普陀区金沙江路 1518 弄',
        stockCount: 0,
        stock:0,
        sale: 5
    }]
    };
  },
  created() {
    this.username = localStorage.getItem("name");
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
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
}
</style>