import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    filtredTasks: [],
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
        })
        .catch((err) => console.log(err))
    },

    addNewTask(newTask) {
      axios
        .post('http://localhost:3030/tasks', newTask)
        .then(() => {
          this.tasks.push(newTask)
          // if(newTask.tags.icludes = )
          // this.tags.push()
        })
        .catch((err) => console.log(err))
    },

    filterByDone(status) {
      this.filtredTasks = this.tasks.sort((a, b) => {
        if (status === 'Todo') {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
        } else {
          if (a.title > b.title) return -1
          if (a.title < b.title) return 1
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
    removeFilters() {
      this.filtredTasks = this.tasks
    }
  }
})
