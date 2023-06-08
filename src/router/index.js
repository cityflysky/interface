import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/stake',
    name: 'stake',
    component: () => import( '../views/StakeView/StakeView.vue')
  },
  {
    path: '/lend',
    name: 'lend',
    component: () => import( '../views/LendView.vue')
  },
  {
    path: '/auction',
    name: 'auction',
    component: () => import( '../views/AuctionView/AuctionView.vue')
  },
  {
    path: '/mynft',
    name: 'mynft',
    component: () => import( '../views/MyNFTView/MyNFTView.vue')
  },
  {
    path: '/governance',
    name: 'governance',
    component: () => import( '../views/GovernanceView/GovernanceView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
