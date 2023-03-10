import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false
  }),

  actions: {
    getTasks() {
      this.isLoading = true
      axios
        .get('http://localhost:3030/tasks')
        .then((res) => {
          this.tasks = res.data
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },
    filterByStatus(selectedStatus) {
      const filtred = this.tasks.filter(
        (task) => task.status === Boolean(selectedStatus.target.value)
      )
      this.tasks = filtred
    },

    addNewTask(formValues) {
      console.log(formValues)
      axios
        .post('http://localhost:3030/tasks', formValues)
        .then((res) => {
          this.tasks.push(formValues)
          console.log(res)
        })
        .catch((err) => console.log(err))
    }
  },

  getters: {
    filterByDone() {
      return (status) => {
        console.log(status)
      }
    }
  }
})
