import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/WeightCalculatorView.vue')
  },
  {
    path: '/weight',
    name: 'weight',
    // route level code-spliked.
    component: () => import(/* webpackChunkName: "weight" */ '../views/WeightCalculatorView.vue')
  },
  {
    path: '/stopwatch',
    name: 'stopwatch',
    // route level code-spliked.
    component: () => import(/* webpackChunkName: "stopwatch" */ '../views/StopwatchView.vue')
  },
  {
    path: '/timer',
    name: 'timer',
    // route level code-spliked.
    component: () => import(/* webpackChunkName: "timer" */ '../views/TimerIntervalView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    // route level code-spliked.
    component: () => import(/* webpackChunkName: "setting" */ '../views/SettingView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
