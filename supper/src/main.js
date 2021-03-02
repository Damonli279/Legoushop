import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { iftoken } from '@/apis/apis'


// 路由保护
// router.beforeEach((to, from, next) => {
//   if(to.path == '/'){
//     next()
//     var tokenid = localStorage.getItem('tokenid')
//   }else if(to.meta.requireAuth){
//     iftoken(tokenid).then(res => {
//       if(res.data == "ok"){
//         next()
//       }else{
//         next('/')
//       }
//     })
//   }else{
//     next()
//   }
// })
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
