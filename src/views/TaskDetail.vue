<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '../stores/store';

const taskStore = useTaskStore()
const route = useRoute()

onMounted(()=>{
  taskStore.getSingleTask(route.params.id)
})

</script>

<template>
    <h1>The Selected Task is <span> {{ taskStore.singleTask.title }} </span> </h1>
    <main>
       <h2>ID: <span> {{ taskStore.singleTask.id }} </span> </h2>
       <h2>TITLE: <span> {{ taskStore.singleTask.title }} </span> </h2>
       <h2>STATUS: <span> {{ taskStore.singleTask.status }} </span> </h2>
       <h2>TAGS: <div class="list">
        <div v-for="tag,i in  taskStore.singleTask.tags" :key="i">{{ tag }}</div>
       </div>
      </h2>
      <h2 v-if="taskStore.singleTask.description">DECRIPTION: <span> {{ taskStore.singleTask.description   }} </span> </h2>
    </main>
</template>

<style lang="scss">
h1{
  span{
    color: rgb(255, 221, 0);
  }
}
main{
  margin: 100px auto;
  background-color: rgb(59, 59, 59);
  padding: 50px 40px;
  border-radius: 5px;
  h2{
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
    span,div{
      color: azure;
    }
  }

}
</style>