import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import List from '@/views/List.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/status/:code?',
    name: 'List',
    component: List
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
