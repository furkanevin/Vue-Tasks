<script setup>
import { useRouter } from 'vue-router';
import { useTaskStore } from "../stores/store";

const router = useRouter()
const taskStore = useTaskStore()
taskStore.getTasks()

</script>


<template>

<div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

  <div class="about" v-else>
    <div class="table-info">
      <h3>TASKS</h3>

      <div class="table-filter">
        <button @click="taskStore.removeFilters()">Remove Filter</button>

        <select name="Status" @change="$event => taskStore.orderByStatus($event.target.value)" >
          <option selected hidden>Status</option>
          <option value="Todo">Todo</option>
          <option value="Completed" >Completed</option>
        </select>

        <select name="Status" @change="$event => taskStore.orderByDate($event.target.value)" >
          <option selected hidden>Date</option>
          <option value="asc">Newest First</option>
          <option value="dsc" >Oldest First</option>
        </select>

        <select name="Tag" @change="$event => taskStore.filterByTag($event.target.value)" >
          <option selected hidden>Tag</option>
          <option v-for="tag,i in taskStore.tags" :value="tag" :key="i">{{ tag }}</option>
        </select>

        <input type="text" @input="$event => taskStore.filterByQuery($event.target.value)">


      </div>
    </div>

    <table class="table table-style">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Tags</th>
          <th scope="col">EndDate</th>
          <th scope="col">Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskStore.filtredTasks" :key="task?.id" @click="router.push(`tasks/${task.id}`)">
          <td>{{task.id}}</td>
          <td>{{ task.title }}</td>
          <td class="tags-td">  <div v-for="tag,i in task.tags.slice(0,3)" :key="i">{{ tag }}</div> </td>
          <td>{{ task.endDate }}</td>
          <td>{{ task.status}}</td>
          <td><button>Edit</button></td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<style lang="scss">
.table-info{
  display: flex;
  justify-content: space-between;
  margin: 40px 0 5px 0;
}
.table-filter{
  display: flex;
  gap: 20px;
}

.loading{
  background-color: yellow;
  padding: 30px 60px;
  width: 50%;
  margin: 100px auto;
}

.table {
  width: 100%;

  &.table-style {
    border-collapse: separate;
    border-spacing: 0 20px;

    tr {
      td:last-child {
        border-left: 5px solid #f4f9fb;
      }

      &:hover {
        background-color: #272727 !important;
      }
    }

    &>thead {
      tr {
        td {
          border-top: 0px;
          line-height: 50px;
        }
      }
    }

    &>tbody {
      tr {
        box-shadow: 1px 0px 7px 0 rgba(215, 234, 243, 0.6);
        background: black;
        td {
          border-top: 0px;
          line-height: 50px;
          padding: 5px 20px;
          text-align: center;
        }
        .tags-td{
          display: flex;
          justify-content: space-around;
          gap: 4px;
          align-items: center;
          div{
            border-radius: 10px;
          }
        }
      }
    }

  }
}

</style>
