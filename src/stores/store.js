import { defineStore } from 'pinia'
import axios from 'axios'

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
        .get(import.meta.env.VITE_API_BASE_URL + '/tasks')
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
        .get(import.meta.env.VITE_API_BASE_URL + `/tasks/${routeId}`)
        .then((res) => {
          this.singleTask = res.data
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },

    async addNewTask(newTask) {
      await axios.post(import.meta.env.VITE_API_BASE_URL + '/tasks', newTask).then(() => {
        newTask.id = this.tasks.length + 1
        this.tasks.push({ ...newTask })
        for (let i = 0; i < this.tasks.length; i++) {
          if (!(this.tags[i] == newTask.tags[i])) {
            this.tags.push(...newTask.tags)
          } else {
            return
          }
        }
      })
    },
    updateTask(newValue) {
      axios.put(import.meta.env.VITE_API_BASE_URL + `/tasks/${newValue.id}`, newValue).then(() => {
        let itemIndex = this.filtredTasks.findIndex((i) => i.id === newValue.id)
        this.filtredTasks[itemIndex] = newValue
      })
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
