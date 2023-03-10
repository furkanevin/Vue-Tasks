<script setup>
import { useTaskStore } from "../stores/store"

const taskStore = useTaskStore()


</script>


<template>

<div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

  <div class="about" v-else>
    <div class="table-info">
      <h3>TASKS</h3>

      <div class="table-filter">

        <select name="Status" @change="$event => taskStore.filterByStatus($event)" >
          <option selected hidden>Status</option>
          <option value="false">TODO</option>
          <option value="true" >DONE</option>
        </select>

        <select name="Tag" >
          <option selected hidden>Tag</option>
        </select>

        <input type="text">
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
        <tr v-for="task in taskStore.tasks" :key="task?.id">
          <td>{{task.id}}</td>
          <td>{{ task.title }}</td>
          <td class="tags-td">  <div v-for="tag in task.tags.slice(0,3)" :key="tag">{{ tag }}</div> </td>
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
  width: 100%;
}


// @media (min-width: 1024px) {

// }

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
