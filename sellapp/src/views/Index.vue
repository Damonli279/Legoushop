<template>
    <div class="container">
        <div class="head_div">
            <div class="head_top">
                <img :src="sellerdata.pics" alt="">
                <div class="head_inside">
                    <p class="name_p"><span>品牌</span> {{ sellerdata.name }}</p>
                    <p>{{ sellerdata.description }}/{{ sellerdata.deliveryTime }}分钟到达</p>
                    <p>{{ supportsStr }}</p>
                </div>
            </div>
        </div>
        <div class="nav_div">
            <router-link to="/" ><span :class="{checked: this.checked == '商品'}" @click="check_nav('商品')">商品</span></router-link>
            <router-link to="/evaluation" ><span :class="{checked: this.checked == '评价'}" @click="check_nav('评价')">评价</span></router-link>
            <router-link to="/merchants" ><span :class="{checked: this.checked == '商家'}" @click="check_nav('商家')">商家</span></router-link>
        </div>
            <router-view></router-view >
            <shopcar />
    </div>
</template>

<script>
import shopcar from './Shopcar'
import { getseller } from '@/apis/apis'
    export default {
        data(){
            return {
                sellerdata: {},
                str:'',
                checked:'商品'
            }
        },
        components: {
            shopcar
        },
        async created(){
            let res = await getseller()
            this.sellerdata = res.data.data
        },
        methods: {
            check_nav(val){
                this.checked = val
            }
        },
        updated(){
            if(location.hash == '#/evaluation'){
                this.checked = '评价'
            }else if(location.hash == '#/merchants'){
                this.checked = '商家'
            }else{
                this.checked = '商品'
                
            }
        },
        computed: {
            supportsStr(){
                if(!this.sellerdata.supports) return;
                let str = ``;
                for (const obj of this.sellerdata.supports) {
                    str += obj.description + ''
                }
                return str
            }
        }
    }
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .head_div{
        width: 100%;
        height: 120px;
        background-color: rgba(247, 161, 161, 0.637);
        .head_top{
            height: 120px;
            padding: 20px;
            display: flex;
            color: #fff;
            img{
                width: 80px;
                height: 80px;
                margin-right: 20px;
            }
            .name_p{
                font-size: 20px;
                font-weight: bold;
                span{
                    display: inline-block;
                    background-color: red;
                    color: #fff;
                    padding: 3px;
                }
            }
        }
    }
    .nav_div{
        display: flex;
        justify-content: space-around;
        height: 50px;
        align-items: center;
        border-bottom: 2px solid #e1e1e1;
        span{
            color: rgb(78,86,92);
            font-size: 20px;
        }
        .checked{
            padding-bottom: 3px;
            color: red;
            border-bottom: 2px solid red;
        }
    }
    .foot_div{
        height: 60px;
    }
}

</style>