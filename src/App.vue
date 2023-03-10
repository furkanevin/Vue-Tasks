<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useTaskStore } from "./stores/store"
import TheHeader from './components/TheHeader.vue'

const taskStore = useTaskStore()


onMounted(() => {
  taskStore.getTasks()
})
</script>

<template >
  <div class="page-view">
    <TheHeader />

    <RouterView />
  </div>

</template>

<style scoped>
.page-view{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>
