<template>
  <button @click="toggleMode()" class="edit-btn">Edit</button>
  <EditForm :data="taskStore.singleTask" textarea=true v-if="editMode"  />
    <main v-else>
      <h1 class="heading">ID: <span>{{ taskStore.singleTask.id }}</span></h1>
      <h1 class="heading">Title: <span>{{ taskStore.singleTask.title }}</span></h1>
      <h1 class="heading">EndDate: <span>{{ taskStore.singleTask.endDate }}</span></h1>
      <h1 class="heading">Status: <span>{{ taskStore.singleTask.status }}</span></h1>
      <h1 class="heading">Tags: <div v-for="(tag,i) in taskStore.singleTask.tags" :key="i">{{ tag }}</div> </h1>
      <h1 class="heading">Description: </h1>
      <p v-html="taskStore.singleTask.desc"> </p>
    </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/store'
import EditForm from './EditForm.vue'

const taskStore = useTaskStore()
const route = useRoute()

onMounted(() => {
  taskStore.getSingleTask(route.params.id)
})

// edit mode
const editMode = ref(false)

function toggleMode(){
  editMode.value = !editMode.value
}


</script>

<style lang="scss">
h1 {
  span {
    color: rgb(255, 221, 0);
  }
}
.edit-btn{
  width: 70px;
  background: black;
  color: white;
  padding: 10px 20px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  margin-bottom: 50px;
}

main {
  margin: 0px auto;
  background-color: rgb(59, 59, 59);
  padding: 50px 40px;
  border-radius: 5px;
  .heading{
    font-weight: normal;
  }
  h1 {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
    span,
    div {
      color: azure;
    }
  }
  p{
    color: white;
    font-size: 19px;
  }
}</style>