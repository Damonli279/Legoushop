<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>查看所有管理员账号</p>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.userGroup }}</div>
          </template>
        </el-table-column>
        <el-table-column label="用户头像" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper"><img @click="chekimg(scope.row.avatarUrl)" :src="scope.row.avatarUrl" alt=""></div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="page_size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <img class="img" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getuser, deleteuser } from "@/apis/apis";
export default {
  data() {
    return {
      username: "",
      tableData: [],
      currentPage: 1,
      page_size: 2,
      total: 10,
      dialogVisible: false,
      imgUrl: ''
    };
  },
  created() {
    this.username = localStorage.getItem("name");
    this.Getuser(this.currentPage,this.page_size);
    // getuser().then(res => {
    //   //  {userGroup: 1, name: "admin", avatarUrl: null}
    //   this.tableData = res.data;
    // });
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = row.id;

          deleteuser(id).then(res => {
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.Getuser();
            } else {
              this.$message.error("删除失败！");
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.Getuser(this.currentPage,this.page_size);
    },
    Getuser(currentPage,page_size) {
      getuser(currentPage,page_size).then(res => {
        //   {userGroup: 1, name: "admin", avatarUrl: null}
        this.total = res.data.alluser;
        this.tableData = res.data.result;
      });
    },
    chekimg(val){
      this.dialogVisible = true;
      this.imgUrl = val
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
  img{
    width: 80%;
    height: 80%;
  }
  .img{
    margin: 0 auto;
  }
}
</style>