
<template>
  <loader :isLoading="taskStore.isLoading">
    <div class="about">
      <div class="table-info">
        <h3>TASKS</h3>
        <div class="table-filter">
          <button @click="taskStore.removeFilters()">Remove Filter</button>
          <select name="Status" @change="($event) => taskStore.orderByStatus($event.target.value)">
            <option selected hidden>Status</option>
            <option value="Todo">Todo</option>
            <option value="Completed">Completed</option>
          </select>
          <select name="Status" @change="($event) => taskStore.orderByDate($event.target.value)">
            <option selected hidden>Date</option>
            <option value="asc">Newest First</option>
            <option value="dsc">Oldest First</option>
          </select>
          <select name="Tag" @change="($event) => taskStore.filterByTag($event.target.value)">
            <option selected hidden>Tag</option>
            <option v-for="(tag, i) in taskStore.tags" :value="tag" :key="i">{{ tag }}</option>
          </select>
          <input
            type="text"
            @input="($event) => taskStore.filterByQuery($event.target.value)"
            placeholder="search by title"
          />
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
          <tr v-for="task in taskStore.filtredTasks" :key="task?.id">
            <td>
              <h3>ID:</h3>
              {{ task.id }}
            </td>
            <td @click="router.push(`tasks/${task.id}`)">
              <h3 :class="{completed:task.status}">TITLE:</h3>
              {{ task.title }}
            </td>
            <td class="tags-td">
              <h3>TAGS:</h3>
              <div v-for="(tag, i) in task.tags.slice(0, 1)" :key="i">{{ tag }}</div>
            </td>
            <td>
              <h3 :class="{ completed: task.status }">EndDate:</h3>
              {{ task.endDate }}
            </td>
            <td>
              <h3>Status:</h3>
              {{ task.status }}
            </td>
            <td><button @click="onEditBtnClick(task)">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <TaskEdit v-model:isDrawerOpen="isDrawerOpen" :data="selectedForm" />
  </loader>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/store'
import TaskEdit from './TaskEdit.vue'
import Loader from '../components/Loader.vue'
const isDrawerOpen = ref(false)

const router = useRouter()
const taskStore = useTaskStore()
taskStore.getTasks()

const selectedForm = ref({})

function onEditBtnClick(param) {
  var object = {
    ...param,
    tags: [...param.tags]
  }
  selectedForm.value = object
  isDrawerOpen.value = true
}
</script>

<style lang="scss">
@mixin sm {
  @media only screen and (max-width: 790px) {
    @content;
  }
}

@mixin md {
  @media only screen and (min-width: 790px) {
    @content;
  }
}

.table-info {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 5px 0;
  gap: 20px;
}

.table-filter {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @include sm {
    flex-wrap: wrap;
  }

  button {
    @extend %button;
    white-space: nowrap;
  }

  select {
    @include sm {
      width: 43%;
      padding: 5px;
    }
  }

  input {
    width: 100%;
    border-radius: 10px;
    padding: 5px 10px;
  }
}

%button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: black;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: box-shadow 0.4s;

  &:hover {
    box-shadow: none;
    transition: all 0.4s;
  }
}

.already-added {
  background-color: rgb(255, 196, 0) !important;
}

.loading {
  padding: 30px 60px;
  width: 50%;
  font-size: 40px;
  color: #f4f9fb;
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

        @include sm {
          border: none;
        }
      }

      &:hover {
        background-color: #272727 !important;
      }
    }

    & > thead {
      @include sm {
        display: none;
      }

      tr {
        td {
          border-top: 0px;
          line-height: 50px;
        }
      }
    }

    & > tbody {
      @include sm {
        display: flex;
        flex-direction: column;
        gap: 50px;
      }
      .completed{
        text-decoration: line-through;
      }
      tr {
        box-shadow: 1px 0px 7px 0 rgba(215, 234, 243, 0.6);
        background: black;

        @include sm {
          display: flex;
          flex-direction: column;
          border-radius: 5px;
          align-items: center;
        }

        td {
          border-top: 0px;
          line-height: 50px;
          padding: 5px 20px;
          text-align: center;

          &:nth-child(2) {
            cursor: pointer;
          }

          h3 {
            display: none;

            @include sm {
              display: block;
              color: gray;
            }
          }

          @include sm {
            display: flex;
            gap: 5px;
            color: #f4f9fb;
          }

          button {
            @extend %button;
            background-color: rgb(14, 14, 14);
          }
        }

        .tags-td {
          display: flex;
          justify-content: space-around;
          gap: 4px;
          align-items: center;

          div {
            border-radius: 10px;
          }
        }
      }
    }
  }
}

.drawer-wrapper {
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.702);

  .close-btn {
    position: absolute;
    top: 20px;
    left: 50px;
    cursor: pointer;
    font-size: 30px;
    margin-bottom: 50px;
    z-index: 100;
  }

  .drawer-title {
    margin-top: 50px;
  }

  button {
    @extend %button;
    margin-top: 30px;
  }

  .addedTags {
    display: flex;
    gap: 40px;
    overflow-x: auto;
    width: 300px;
    margin-top: 10px;
    padding-bottom: 20px;

    div {
      background-color: gray;
      padding: 2px 5px;
      border-radius: 5px;
      color: white;
    }
  }
}
</style>
