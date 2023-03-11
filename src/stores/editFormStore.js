import { defineStore } from 'pinia'
import axios from 'axios'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    form: []
  }),

  actions: {
    getTasks() {
      this.isLoading = true
      axios.get('http://localhost:3030/tasks').then((res) => {
        this.tasks = res.data
      })
    }
  }
})
