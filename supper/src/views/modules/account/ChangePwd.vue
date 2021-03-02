<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>查看所有管理员账号</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <b>修改密码</b>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="pwd">
          <el-input type="text" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input type="password" v-model="ruleForm.newpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmpwd">
          <el-input type="password" v-model="ruleForm.confirmpwd" autocomplete="off"></el-input>
        </el-form-item>
        <div class="err" v-show="error">修改失败</div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePwd } from "@/apis/apis";
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validateNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validateCPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.ruleForm.newpwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      error: false,
      id: "",
      username: '',
      ruleForm: {
        pwd: "",
        newpwd: "",
        confirmpwd: ""
      },
      rules: {
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        newpwd: [{ validator: validateNewPwd, trigger: "blur" }],
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
          changePwd(this.ruleForm.pwd, this.ruleForm.newpwd, this.id)
          .then(res => {
              if (res.data == 'ok') {
                // alert("账号创建成功");
                this.$message({
                  showClose: true,
                  message: "密码修改成功",
                  type: "success"
                });
              } else {
                this.$message({
                    showClose: true,
                    message: "密码修改失败",
                    type: "error"
                });
              }
            }
          );
        } else {
          // console.log("error submit!!");
          this.$message({
            showClose: true,
            message: "密码修改失败",
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