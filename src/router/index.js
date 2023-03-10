import { createRouter, createWebHistory } from 'vue-router'
import TaskDetail from '../views/TaskDetail.vue'
import TaskList from '../views/TaskList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TaskList
    },
    {
      path: '/tasks/:id',
      name: 'singleTask',
      component: TaskDetail
    }
  ]
})

export default router
