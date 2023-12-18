import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Pods from '../components/Pods.vue'
import Nodes from '../components/Nodes.vue'
import CreatePod from '../components/CreatePod.vue'
import Test from '../components/TestPod.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pod',
      component: Pods
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/nodes',
      name: 'nodes',
      component: Nodes
    },
    {
      path: '/pods',
      name: 'pods',
      component: Pods
    },
    {
      path: '/createpod',
      name: 'createpod',
      component: CreatePod
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
})

export default router
