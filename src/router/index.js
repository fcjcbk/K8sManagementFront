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
      redirect: '/pod'
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
  ]
})

export default router
