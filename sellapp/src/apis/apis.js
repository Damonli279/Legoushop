
import axios from 'axios'
var ip = 'http://127.0.0.1:3333'

// 商家请求
export function getseller(){
    return axios.get( ip + '/api/seller',{})
}

// 商品请求
export function getgoods(){
    return axios.get( ip + '/api/goods',{})
}

export function getratings(){
    return axios.get( ip + '/api/ratings',{})
}