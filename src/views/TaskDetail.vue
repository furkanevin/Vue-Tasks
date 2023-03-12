<template>
  <EditForm :data="taskStore.singleTask" textarea= true />
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/store'
import EditForm from './EditForm.vue'

const taskStore = useTaskStore()
const route = useRoute()

onMounted(() => {
  taskStore.getSingleTask(route.params.id)
})
</script>

<style lang="scss">
h1 {
  span {
    color: rgb(255, 221, 0);
  }
}

main {
  margin: 100px auto;
  background-color: rgb(59, 59, 59);
  padding: 50px 40px;
  border-radius: 5px;

  h2 {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;

    span,
    div {
      color: azure;
    }
  }
}</style>