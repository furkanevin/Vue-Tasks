<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import InputField from "./InputField.vue"
import { useTaskStore } from "../stores/store"

const taskStore = useTaskStore()

const isModalOpen = ref(false)

const tags = ref([])

const newTag = ref("")


function addNewTag(){
    tags.value.push(newTag.value)
}

const modalForm = ref({
  id: String(new Date().getTime()).substring(10),
  tags: tags.value,
  status: "Todo"
})

function handleSubmit() {
  taskStore.addNewTask(modalForm.value) 
  isModalOpen.value = false
}

</script>

<template>

        <header>
          <div class="wrapper">
            <h1>SOMETHING</h1>
            <nav>
              <RouterLink to="/">Tasks</RouterLink>
              <a @click="isModalOpen = true"> AddTask </a>
            </nav>
          </div>
        </header>

    <teleport to="body" v-if="isModalOpen">
      <div class="modal-wrapper" >
          <form @submit.prevent="handleSubmit">
           <h1>Add New Task</h1>

              <InputField v-model="modalForm.title" type="text" label="Title" />

              <div class="field">
                <InputField v-model="newTag"  type="text" label="Tags" />
                <button @click.prevent="addNewTag">Add Tag</button>
                <div class="addedTags">
                  <div v-for="tag in tags" :key="tag">{{ tag }}</div>
                </div>
              </div>
                 <InputField v-model="modalForm.endDate"  type="Date"  label="EndDate:" />
                 <InputField v-model="modalForm.desc" textarea="true" label="Description: " />
                 <div class="buttons">
                    <button type="submit">Send</button>
                    <button @click.prevent="isModalOpen =false ">Close</button>
                 </div>
          </form>
     </div>
  </teleport>

</template>

<style lang="scss">


.modal-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.542);
  display: flex;
  align-items: center;
  justify-content: center;

  form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: white;
  color: black;
  z-index: 100;
  padding: 40px 100px;
  border-radius: 40px;
  fieldset{
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;;
  }
  .field{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
     .addedTags{
      display: flex;
      gap: 40px;
      overflow-x: auto;
      width: 300px;
      margin-top: 10px ;
      padding-bottom: 20px;
      div{
        background-color: gray;
        padding: 2px 5px;
        border-radius: 5px;
        color: white;
      }
    }
    .tag-field{
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  button{
    padding: 10px 20px;
    border-radius: 5px;
    background-color: black;
    color: white;
    cursor: pointer;
  }
  }

}

header {
  line-height: 1.5;
  width: 100%;
  padding: 20px 00px;
  margin-bottom: 50px;
}

.wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

nav {
  font-size: 12px;
  text-align: center;
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