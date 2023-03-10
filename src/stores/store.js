import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    filtredTasks: [],
    singleTask: {},
    tags: [],
    isLoading: false
  }),

  actions: {
    getTasks() {
      this.isLoading = true
      axios
        .get('http://localhost:3030/tasks')
        .then((res) => {
          this.tasks = res.data
          this.filtredTasks = res.data
          this.isLoading = false

          res.data.forEach((task) => {
            if (this.tags.includes(...task.tags)) {
              return
            } else {
              this.tags.push(...task.tags)
            }
          })
        })
        .catch((err) => console.log(err))
    },

    getSingleTask(routeId) {
      this.isLoading = true

      axios
        .get(`http://localhost:3030/tasks/${routeId}`)
        .then((res) => {
          this.singleTask = res.data
        })
        .catch((err) => console.log(err))
    },

    addNewTask(newTask) {
      axios
        .post('http://localhost:3030/tasks', newTask)
        .then(() => {
          this.tasks.push(newTask)
          this.tags.push(...newTask.tags)
        })
        .catch((err) => console.log(err))
    },

    orderByStatus(status) {
      this.tasks.sort((a, b) => {
        if (status === 'Completed') {
          if (a.status < b.status) return -1
          if (a.status > b.status) return 1
        } else {
          if (a.status > b.status) return -1
          if (a.status < b.status) return 1
        }
        return 0
      })
    },

    orderByDate(param) {
      this.tasks.sort((a, b) => {
        if (param === 'dsc') {
          if (a.endDate < b.endDate) return -1
          if (a.endDate > b.endDate) return 1
        } else {
          if (a.endDate > b.endDate) return -1
          if (a.endDate < b.endDate) return 1
        }
        return 0
      })
    },

    filterByQuery(query) {
      if (query) {
        this.filtredTasks = this.tasks.filter((i) =>
          i.title.toLowerCase().includes(query.toLowerCase())
        )
      } else this.filtredTasks = this.tasks
    },
    filterByTag(selectedTag) {
      this.filtredTasks = this.tasks.filter((i) => i.tags.includes(selectedTag))
    },
    removeFilters() {
      this.filtredTasks = this.tasks
    }
  }
})
