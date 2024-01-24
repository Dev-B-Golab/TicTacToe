import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../views/HomeView.vue'
import Game from '../views/Game.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Game
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/Game.vue')
    }
  ]
})

export default router
