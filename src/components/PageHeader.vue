<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import InputField from './InputField.vue'
import { useTaskStore } from '../stores/store'
import router from '../router'

const taskStore = useTaskStore()

const isModalOpen = ref(false)
const isDrawerOpen = ref(false)

const errors = ref({})

const tags = ref([])

const newTag = ref('')

const addNewTag = () => {
  var letters = /^[A-Za-z]+$/
  if (newTag.value.match(letters)) {
    tags.value.push(newTag.value)
    errors.value.tags = ''
  } else {
    errors.value.tags = "Tags can only contain letters and can't be empty"
    return
  }
}

const modalForm = ref({
  id: Math.max(...taskStore.tasks.map((i) => i.y)) + 1,
  tags: tags.value,
  status: 'Todo'
})

console.log(modalForm)

const handleSubmit = async () => {
  var letters = /^[A-Za-z\s]*$/
  if (!modalForm.value.title || !modalForm.value.endDate) {
    if (!modalForm.value.title) {
      errors.value.title = 'Tittle cannot be empty'
    } else {
      errors.value.title = ''
    }
    if (!modalForm.value.endDate) {
      errors.value.endDate = 'EndDate cannot be empty'
    } else {
      errors.value.endDate = ''
    }
    return
  } else if (modalForm.value.title.length > 30) {
    errors.value.title = 'Tittle cannot have more than 30 characters'
    return
  } else if (!modalForm.value.title.match(letters)) {
    errors.value.title = "Title can only contain letters and can't be empty"
    return
  } else {
    modalForm.value.tags = tags.value
    await taskStore.addNewTask(modalForm.value)
    // EMPTY
    modalForm.value.tags = []
    modalForm.value.endDate = ''
    modalForm.value.title = ''
    tags.value = []
    newTag.value = ''
    isModalOpen.value = false
  }
}
</script>
<template>
  <header>
    <div class="wrapper">
      <h1 @click="router.push('/')">Taskify</h1>
      <img @click="isDrawerOpen = true" src="../assets/menu-icon.png" class="menu-icon" />
      <nav class="md-nav">
        <RouterLink to="/">Tasks</RouterLink>
        <a @click="isModalOpen = true"> AddTask </a>
      </nav>

      <div class="drawer" v-if="isDrawerOpen">
        <div @click="isDrawerOpen = false" class="close-btn">X</div>
        <nav>
          <RouterLink to="/">Tasks</RouterLink>
          <a @click="isModalOpen = true"> AddTask </a>
        </nav>
      </div>
    </div>
  </header>
  <teleport to="body" v-if="isModalOpen">
    <div class="modal-wrapper">
      <form @submit.prevent="handleSubmit">
        <h1>Add New Task</h1>
        <InputField v-model="modalForm.title" type="text" label="Title" />
        <div v-if="errors.title">{{ errors.title }}</div>
        <div class="field">
          <InputField v-model="newTag" type="text" label="Tags" />
          <button @click.prevent="addNewTag">Add Tag</button>
          <div v-if="errors.tags">{{ errors.tags }}</div>
          <div class="addedTags">
            <div v-for="tag in tags" :key="tag">{{ tag }}</div>
          </div>
        </div>
        <InputField v-model="modalForm.endDate" type="Date" label="EndDate:" />
        <div v-if="errors.endDate">{{ errors.endDate }}</div>
        <div class="buttons">
          <button type="submit">Send</button>
          <button @click.prevent="isModalOpen = false">Close</button>
        </div>
      </form>
    </div>
  </teleport>
</template>
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

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.542);
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    background-color: white;
    color: black;
    z-index: 100;
    padding: 40px 100px;
    border-radius: 40px;

    fieldset {
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;

      .addedTags {
        display: flex;
        gap: 40px;
        overflow-x: auto;
        width: 300px;
        margin-top: 10px;
        padding-bottom: 20px;

        .already-added {
          background-color: rgb(255, 170, 0) !important;
        }

        div {
          background-color: gray;
          padding: 2px 5px;
          border-radius: 5px;
          color: white;
        }
      }

      .tag-field {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }

    button {
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

    .buttons {
      display: flex;
      gap: 10px;

      & button:nth-child(2) {
        background-color: gray;
      }
    }
  }
}

header {
  line-height: 1.5;
  width: 100%;
  padding: 20px 00px;
  margin-bottom: 50px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .menu-icon {
    width: 50px;
    display: none;

    @include sm {
      display: block;
    }
  }
}

.drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 50vw;
  background-color: rgb(58, 58, 58);
  padding: 150px;
  z-index: 1000;

  @include sm {
    width: 70vw;
    padding: 20px;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 40px;
    font-size: 21px;
  }
}

.md-nav {
  font-size: 19px;
  text-align: center;
  display: none;

  @include sm {
    padding: 20px;
  }

  @include md {
    display: block;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid gray;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1rem;
  }
}
</style>