<template>
  <div class="container">
    <div class="main_titel">
      <h3>艾森超市管理系统</h3>
      <div>
        <img @click="changeAvatar" :src="avatarUrl" alt />
        <span>{{ username }}</span>
        <span @click="changeuser" class="span">切换</span>
      </div>
    </div>
    <div class="main_body">
      <div class="body_list">
        <el-col :span="12" class="body_list_el">
          <el-menu
            :default-active="main_hash"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-submenu v-for="item in treelist" :index="item.index" v-show="item.setuserGroup.indexOf(userGroup) != '-1'">
              <template slot="title">
                <i :class="item.class"></i>
                <span>{{ item.options }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.child" :index="i.index">{{ i.options }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col> 
      </div>
      <div class="body_right">
        <router-view></router-view>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="inputFile">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { iftoken,getavatarUrl } from '@/apis/apis'

export default {
  mounted(){
    this.main_hash = location.hash.replace('#',"")
  },
  data(){
    return {
      action:'',
      id: '',
      userGroup: '',
      main_hash: "",
      username: '',
      tokenid: '',
      dialogFormVisible: false,
      //avatarUrl: require('@/assets/imgs/icon_head.png'),
      avatarUrl: require('@/assets/imgs/icon_head.png'),
      imageUrl: '',  
      dialogImageUrl: '',
      dialogVisible: false,
      treelist: [
        {
          index: '1',class: 'el-icon-s-grid',options: '商品管理',
          child: [
            {index: '/main/commodity', options: '商品管理'},
            {index: '/main/addcommodity', options: '添加商品'}
          ],
          setuserGroup: ['1','2']
        },
        {
          index: '2',class: 'el-icon-circle-plus',options: '进货管理',
          child: [
            {index: '/main/inventory', options: '库存管理'},
            {index: '/main/addinventory', options: '添加库存'}
          ],
          setuserGroup: ['1','2']
        },
        {
          index: '3',class: 'el-icon-remove',options: '出货管理',
          child: [
            {index: '/main/list', options: '销售列表'},
            {index: '/main/out', options: '商品出库'},
            {index: '/main/return', options: '商品退货'},
          ],
          setuserGroup: ['1','2']
        },
        {
          index: '4',class: 'el-icon-s-data',options: '统计管理',
          child: [
            {index: '/main/sales', options: '销售统计'},
            {index: '/main/incoming', options: '进货统计'}
          ],
          setuserGroup: ['1']
        },
        {
          index: '5',class: 'el-icon-user-solid',options: '账号管理',
          child: [
            {index: '/main/account', options: '账号管理'},
            {index: '/main/addaccount', options: '添加账号'},
            {index: '/main/change', options: '修改密码'},
          ],
          setuserGroup: ['1']
        },
        {
          index: '6',class: 'el-icon-user',options: '会员管理',
          child: [
            {index: '/main/vip', options: '账号管理'},
            {index: '/main/addvip', options: '添加账号'}
          ],
          setuserGroup: ['1','2']
        }
      ]
    }
  },
  created(){
    this.username = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.tokenid = localStorage.getItem('tokenid');
    this.userGroup = localStorage.getItem("userGroup");
    // this.avatarUrl = localStorage.getItem("avatarUrl");
    
    if(localStorage.getItem("avatarUrl") != 'undefined'){
      this.avatarUrl = localStorage.getItem("avatarUrl");
    } 
    this.action = 'http://192.168.0.119:3000/uploadimg?id='+this.id
    if(this.tokenid == ''){
      // this.$router.push('/')
    }
    iftoken(this.tokenid).then(res => {
      if(res.data == 'fail'){
        alert('账户信息已过期，请重新登录')
        this.$router.push('/')
      }
    })
  },
  methods: {
    changeuser(){
      this.$confirm('切换用户此用户将会退出, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.setItem('tokenid','')
          this.$router.push('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消切换'
          });          
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      getavatarUrl(this.id).then(res => {
        // console.log(res.data[0].avatarUrl)
        localStorage.setItem('avatarUrl',res.data[0].avatarUrl)
        this.avatarUrl = localStorage.getItem('avatarUrl')
      })
    },
    beforeAvatarUpload(file) {
    },
    changeAvatar(){
      this.dialogFormVisible = true
    },
    handleOpen(){

    },
    handleClose(){

    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main_titel {
    width: 100%;
    height: 6%;
    background-color: #243041;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    // padding: 0 40px;
    h3 {
      margin-left: 40px;
    }
    div {
      display: flex;
      width: 8%;
      height: 100%;
      align-items: center;
      img {
        width: 20%;
        height: 80%;
      }
      span {
        margin-left: 10px;
      }
      .span{
        cursor: pointer;
      }
    }
  }
  .main_body {
    width: 100%;
    height: 94%;
    display: flex;
    .body_list {
      width: 300px;
      height: 100%;
      .body_list_el{
        height: 100%;
        .el-menu-vertical-demo{
            width: 300px;
            height: 100%;
          }
      }
    }
    .body_right{
      width: 100%;
      height: 100%;
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>