import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'name',
    component: Home,
    children: [
      {
        path: '/',
        name:'users',
        redirect:'users'
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../components/secondaryRouting/users')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('../components/secondaryRouting/roles')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('../components/secondaryRouting/rights')
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../components/secondaryRouting/reports')
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('../components/secondaryRouting/params')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../components/secondaryRouting/orders')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../components/secondaryRouting/goods')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../components/secondaryRouting/categories')
      },

    ],
  },
  {
    path: '/',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router