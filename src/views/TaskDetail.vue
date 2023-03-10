<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '../stores/store';

const taskStore = useTaskStore()
const route = useRoute()

onMounted(()=>{
  taskStore.getSingleTask(route.params.id)
})

const { singleTask } = storeToRefs(taskStore)
console.log("asdadadas", singleTask)
</script>

<template>
    <h1>{{ taskStore.singleTask.id}}</h1>
    <h1>BUNDAN: {{ taskStore.singleTask.title }}</h1>
    <h1>{{ taskStore.singleTask.description }}</h1>
    <h1>{{ taskStore.singleTask.status }}</h1>
</template>
