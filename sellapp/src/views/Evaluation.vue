<template>
    <div class="evaluation">
        <div class="all_div">
            <div class="right_d">
                <p class="p_num">3.9</p>
                <p class="p">综合评分</p>
                <p>高于周边商家69.2%</p>
            </div>
            <div class="left_d">
                <div>服务态度：<Rate icon="ios-heart" v-model="valueHalf" disabled />3.9</div>
                <div>服务态度：<Rate icon="ios-heart" v-model="valueHalf1" disabled />4.0</div>
                <div>送达时长：<span>44分钟</span></div>
            </div>
        </div>
        <p></p>
        <div class="Satisfaction">
            <div>
                <Button type="primary">全部57</Button>
                <Button type="info">满意47</Button>
                <Button>不满意10</Button>
            </div>
            <p @click="checkT()"><Icon :class="check == true ? 'blue' : '' " type="md-checkbox" />只看有内容的评价</p>
        </div>
        <div class="ub_div" v-for="item in ratings">
            <img :src="item.avatar" alt="用户头像">
            <div class="inside">
                <p>{{ item.username }} <span>{{ (Date(item.rateTime)).toString().substring(11,24) }}</span></p>
                <p><Rate icon="ios-heart" v-model="item.score" disabled /> {{ item.deliveryTime }}分钟送达</p>
                <p>{{ item.text }}</p>
                <div class="in">
                    <Icon :type="item.rateType == 0 ? good : notgood" />
                     <div v-for="i in item.recommend">{{ i }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getratings } from '@/apis/apis'
    export default {
        data(){
            return {
                valueHalf: 3.9,
                valueHalf1: 4.0,
                res: [],
                ratings:[],
                good:'ios-thumbs-up',
                notgood:'ios-thumbs-down-outline',
                check: false
            }
        },
        async created(){
            let res = await getratings();
            this.ratings = this.res = res.data.data;
        },
        methods: {
            checkT(){
                this.check = !this.check
                if(this.check){
                    let arr = [];
                    for (const item of this.ratings) {
                        if(item.text){
                            arr.push(item)
                        }
                    }
                    this.ratings = arr
                }else{
                    this.ratings = this.res
                }
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
.evaluation{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .all_div{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .right_d{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border-right: 2px solid #ddd;
            .p_num{
                color: #F99804;
                font-size: 20px;
            }
            .p{
                color: black;
            }
        }
        .left_d{
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 10px;
            div{
                color: black;
                span{
                    color: #AFB4B7;
                }
            }
        }
    }
    >p{
        height: 20px;
        background-color: #f2f2f2;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    .Satisfaction{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ddd;
        div{
            display: flex;
            justify-content: space-around;
            margin: 20px;
        }
        p{
            margin: 0px 40px;
            padding: 20px 0;
            font-size: 20px;
            border-top: 1px solid #ddd;
        }
        .blue{
            color: #2DB7F5;
        }
    }
    .ub_div{
        display: flex;
        padding: 20px 20px;
        img{
            width: 40px;
            height: 40px;
            margin-right: 20px;
            border-radius: 100%;
        }
        .inside{
                width: 100%;
            p{
                display: flex;
                justify-content: space-between;
                width: 100%;
            };
            .in{
                display: flex;
                div{
                    width: 50px;
                    height: 20px;
                    margin-right: 5px;
                    border: 1px solid #ddd;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>