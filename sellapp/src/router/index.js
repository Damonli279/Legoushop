import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../views/Goods.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: goods
  },
  {
    path: '/merchants',
    name: 'merchants',
    component: () => import('@/views/Merchants.vue')
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: () => import('@/views/Evaluation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
