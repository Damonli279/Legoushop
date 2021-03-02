import Vue from 'vue'
import Vuex from 'vuex'
import { getgoods } from './apis/apis'


Vue.use(Vuex)

var store = new Vuex.Store({
    // 状态，存放所有的交互数据
    state: {
        goods_list:[],
        carnum: []
    },
    // 同步通知state改变值
    mutations: {
        // changName(state,val){
        //     console.log(val);
        //     state.name = val
        // }
        Getgoods(state,data){
            state.goods_list = data
        },
        changeNum(state,data){
            for(let item of state.goods_list){
                // for (let food of item.foods) {
                    // if(food.id == 12){
                    //     food.num += 1
                    // }
                    // food.num +=data.num
                    // if(food.id == data.id ){
                    //     food.num += data.num
                    // }
                // }
                for(let i = 0;i < item.foods.length;i++){
                    if(item.foods[i].id == data.id){
                        item.foods[i].num += data.num
                    }
                }
                    return
            }
        },
        getcarnum(state){
            let arr = []
            for(let item of state.goods_list){
                for (let food of item.foods) {
                    if(food.num > 0 ){
                        arr.push(food)
                    }
                }
            }
            state.carnum = arr
        }

    },
    // 异步通知mutation再通知state改变数据
    actions: {
        async Getgoods(context){
            let res = await getgoods();
            let arr = res.data.data
            let i = 1
            for (const obj of arr) {
                for (const food of obj.foods) {
                    food.num = 0
                    food.id = i++
                }
            }
            context.commit('Getgoods',arr)
        }

    }
})
// store.commit('Getgoods', data)
// store.dispatch('Getgoods','context')
// console.log(store.state.state)
export default store