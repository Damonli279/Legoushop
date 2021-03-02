<template>
    <div class="container"><h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里操作商品库存</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加库存</span>
        <el-button style="float: right; padding: 3px 0" type="text">添加库存</el-button>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品条形码" prop="barCode">
          <el-input type="text" v-model="ruleForm.barCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="stockCount">
          <el-input type="text" v-model="ruleForm.stockCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="进价" prop="stockPrice">
          <el-input v-model.number="ruleForm.stockPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
</template>

<script>
  import { addinventory } from '@/apis/apis'
    export default {
        data(){
            var checkAge = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('进价不能为空'));
              }else{
                callback()
              }
            };
            var validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('商品条形码不能为空'));
              } else {
                callback();
              }
            };
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('数量不能为空'));
              } else {
                callback();
              }
            };
          return {
              username: '',
              ruleForm: {
                barCode: '',
                stockCount: '',
                stockPrice: ''
              },
              rules: {
                barCode: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                stockCount: [
                  { validator: validatePass2, trigger: 'blur' }
                ],
                stockPrice: [
                  { validator: checkAge, trigger: 'blur' }
                ]
              }
          }
        },
        created(){
            this.username = localStorage.getItem('name')
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                addinventory(this.ruleForm).then(res => {
                  if(res.data == 'ok'){
                    this.$message({
                      message: "添加库存成功",
                      type: "success"
                    });
                  }else{
                    this.$message({
                      type: "info",
                      message: "添加库存失败"
                    });
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    }
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