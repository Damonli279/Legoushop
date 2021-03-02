<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>查看所有管理员账号</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>账号管理</b>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmpwd">
          <el-input type="password" v-model="ruleForm.confirmpwd" autocomplete="off"></el-input>
        </el-form-item>
        <div class="select">
          <span>选择用户组</span>
          <el-select class="option" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="err" v-show="error">创建失败</div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addaccount } from "@/apis/apis";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validateCPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      error: false,
      value: "",
      username: '',
      options: [
        { value: 1, label: "超级管理员" },
        { value: 2, label: "管理员" }
      ],
      ruleForm: {
        name: "",
        pwd: "",
        confirmpwd: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        confirmpwd: [{ validator: validateCPwd, trigger: "blur" }]
      }
    };
  },
  created(){
    this.username = localStorage.getItem('name')
    this.id = localStorage.getItem('id')
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // axios.post("http://localhost:3000/main/addaccount", {
          //     name: this.ruleForm.name,
          //     pwd: this.ruleForm.pwd,
          //     userGroup: this.value
          //   })
          addaccount(this.ruleForm.name, this.ruleForm.pwd, this.value)
          .then(res => {
              if (res.data == 1) {
                // alert("账号创建成功");
                this.$message({
                  showClose: true,
                  message: "账号创建成功",
                  type: "success"
                });
              } else {
                this.error = true;
              }
            }
          );
        } else {
          // console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "创建失败",
            type: "error"
          });

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    margin: 30px 0;
    .select {
      margin-bottom: 20px;
      span {
        font-size: 14px;
        margin-left: 20px;
      }
      .option {
        margin-left: 10px;
      }
    }
  }
}
</style>