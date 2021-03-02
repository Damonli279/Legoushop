
import axios from "axios";

var ip = 'http://localhost:3000'

// 登录请求
export function login( name,pwd){
    return axios.post(ip + '/login', { name, pwd })
}

// token请求
export function iftoken(tokenid){
    return axios.get(ip + '/gettokenid', { params: { tokenId: tokenid }})
}

// 获取用户头像请求
export function getavatarUrl(id){
    return axios.get(ip + '/getavatarUrl', { params: { id }})
}

// 账号管理 - 添加账号请求
export function addaccount( name,pwd,userGroup){
    return axios.post(ip + '/main/addaccount', { name, pwd , userGroup })
}

// 账号管理 - 修改密码请求
export function changePwd( pwd,newpwd,id){
    return axios.post(ip + '/main/changepwd', { pwd, newpwd , id })
}

// 账号管理 - 获取账号请求
export function getuser( currentPage, page_size ){
    return axios.get(ip + '/main/getuser', { params: { currentPage, page_size } })
}

// 账号管理 - 删除账号请求
export function deleteuser(id){
    return axios.get(ip + '/main/deleteuser', { params: { id } })
}

// 商品管理-添加商品请求
export function addcommodity(obj){
    return axios.get(ip + '/main/addcommodity', { params: obj })
}

// 商品管理-获取商品请求
export function getcommodity(currentPage,page_size){
    return axios.get(ip + '/main/commodity',{ params: { currentPage, page_size } })
}

// 商品管理-下架商品请求
export function removecommodity(id){
    return axios.get(ip + '/main/removecommodity',{ params: { id } })
}

// 商品管理-编辑商品请求
export function changecommodity(obj){
    return axios.get(ip + '/main/changecommodity',{ params: obj })
}

// 库存管理 - 添加库存请求
export function addinventory(obj){
    return axios.get(ip + '/main/addinventory',{ params: obj })
}