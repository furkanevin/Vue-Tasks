<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTaskStore } from './stores/store'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.getTasks()
})
</script>

<template >
  <div class="page-view">
    <notifications  position="bottom right"/>

    <PageHeader />

    <RouterView />

    <PageFooter />
  </div>
</template>

<style scoped>
.page-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
