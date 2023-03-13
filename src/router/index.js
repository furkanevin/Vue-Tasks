import { createRouter, createWebHistory } from 'vue-router'
import TaskDetail from '../views/TaskDetail.vue'
import TaskList from '../views/TaskList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
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
