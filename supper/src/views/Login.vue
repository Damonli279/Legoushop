<template>
  <div class="container" :style="bgDiv">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>艾森生活会馆管理系统</span>
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
        <div class="err" v-show="error">用户名或密码错误</div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/apis/apis";
import Login from '../views/Login.vue'

const routeData = [
      // 账号管理
      {path:'/main/account',name:'Account',meta: { requireAuth: true },component: () => import('../views/modules/account/Account.vue')},
      {path:'/main/change',name:'change',meta: { requireAuth: true },component: () => import('../views/modules/account/ChangePwd.vue')},
      {path:'/main/addaccount',name:'Addaccount',meta: { requireAuth: true },component: () => import('../views/modules/account/AddAccount.vue')},

      // 商品管理
      {path:'/main/commodity',name:'commodity',component: () => import('../views/modules/commodity/Commodity.vue')},
      {path:'/main/addcommodity',name:'addcommodity',meta: { requireAuth: true },component: () => import('../views/modules/commodity/AddCommodity.vue')},

      // 进货管理
      {path:'/main/inventory',name:'inventory',meta: { requireAuth: true },component: () => import('../views/modules/purchase/Inventory.vue')},
      {path:'/main/addinventory',name:'addinventory',meta: { requireAuth: true },component: () => import('../views/modules/purchase/AddInventory.vue')},

      // 出货管理
      {path:'/main/return',name:'return',meta: { requireAuth: true },component: () => import('../views/modules/shipment/GoodsReturn.vue')},
      {path:'/main/list',name:'list',meta: { requireAuth: true },component: () => import('../views/modules/shipment/SalesList.vue')},
      {path:'/main/out',name:'out',meta: { requireAuth: true },component: () => import('../views/modules/shipment/OutStorage.vue')},

      // 统计管理
      {path:'/main/incoming',name:'incoming',meta: { requireAuth: true },component: () => import('../views/modules/statistics/Icoming.vue')},
      {path:'/main/sales',name:'sales',meta: { requireAuth: true },component: () => import('../views/modules/statistics/SalesStatistics.vue')},

      // 会员管理
      {path:'/main/vip',name:'vip',meta: { requireAuth: true },component: () => import('../views/modules/vip/VipAccount.vue')},
      {path:'/main/addvip',name:'addvip',meta: { requireAuth: true },component: () => import('../views/modules/vip/AddVipAccount.vue')},

    ]

const routeData1 = [
      // 商品管理
      {path:'/main/commodity',name:'commodity',component: () => import('../views/modules/commodity/Commodity.vue')},
      {path:'/main/addcommodity',name:'addcommodity',meta: { requireAuth: true },component: () => import('../views/modules/commodity/AddCommodity.vue')},

      // 进货管理
      {path:'/main/inventory',name:'inventory',meta: { requireAuth: true },component: () => import('../views/modules/purchase/Inventory.vue')},
      {path:'/main/addinventory',name:'addinventory',meta: { requireAuth: true },component: () => import('../views/modules/purchase/AddInventory.vue')},

      // 出货管理
      {path:'/main/return',name:'return',meta: { requireAuth: true },component: () => import('../views/modules/shipment/GoodsReturn.vue')},
      {path:'/main/list',name:'list',meta: { requireAuth: true },component: () => import('../views/modules/shipment/SalesList.vue')},
      {path:'/main/out',name:'out',meta: { requireAuth: true },component: () => import('../views/modules/shipment/OutStorage.vue')},

      // 统计管理
      {path:'/main/incoming',name:'incoming',meta: { requireAuth: true },component: () => import('../views/modules/statistics/Icoming.vue')},
      {path:'/main/sales',name:'sales',meta: { requireAuth: true },component: () => import('../views/modules/statistics/SalesStatistics.vue')},

]

// const router = new VueRouter({
//   routes
// })

export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (this.ruleForm.name !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
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
    return {
      error: false,
      bgDiv: {
        backgroundImage: "url(" + require("../assets/imgs/0.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  mounted() {
    // this.$router.addRoutes( routes )
               console.log(this.$router.options.routes);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // axios.post('http://localhost:3000/login',{name: this.ruleForm.name , pwd: this.ruleForm.pwd})
          login(this.ruleForm.name, this.ruleForm.pwd).then(res => {
            if (res.data.msg == "ok") {
              this.$message({
                showClose: true,
                message: "恭喜你，登录成功",
                type: "success"
              });
              localStorage.setItem('id', res.data.id)
              localStorage.setItem('name', this.ruleForm.name)
              localStorage.setItem('tokenid',  res.data.tokenid)
              localStorage.setItem('userGroup',  res.data.userGroup)
              res.data.userGroup == 1 ? this.$router.options.routes[1].children = routeData :
              this.$router.options.routes[1].children = routeData1
              this.$router.addRoutes(this.$router.options.routes) 
              console.log(this.$router.options.routes[1]);
              localStorage.setItem('avatarUrl',  res.data.avatarUrl)
              this.$router.push('/main/commodity')
            } else {
              this.error = true;
            }
          });
        } else {
           this.$message({
          showClose: true,
          message: '登录失败',
          type: 'error'
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
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .box-card {
    width: 30%;
    margin-right: 200px;
    margin-top: -50px;
    .err {
      color: red;
      margin-left: 100px;
      margin-bottom: 25px;
    }
  }
}
</style>