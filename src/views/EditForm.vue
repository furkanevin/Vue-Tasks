<template>
  <form @submit.prevent="handleSubmit">
    <h1 class="drawer-title">Update The Task</h1>
    <InputField v-model="form.title" type="text" label="Title" />
    <div v-if="errors.title">{{ errors.title }}</div>
    <div class="field">
      <InputField v-model="newTag" type="text" label="Tags" />
      <button @click.prevent="addNewTag">Add Tag</button>
      <div v-if="errors.tags">{{ errors.tags }}</div>
      <div class="addedTags">
        <div
          v-for="(tag, index) in form.tags"
          :class="props.data.tags.indexOf((x) => x == tag) > -1 ? 'already-added' : ''"
          :key="tag"
        >
          {{ tag }}
          <a href="Javascript:;" @click="form.tags.splice(index, 1) ">x</a>
        </div>
      </div>
    </div>
    <InputField v-model="form.endDate" type="Date" label="EndDate:" />
    <div v-if="errors.endDate">{{ errors.endDate }}</div>
    <label for="statusCheckbox" style="margin: 20px 0px">
      <input type="checkbox" id="statusCheckbox" v-model="status" /> Complete
    </label>
    <InputField v-if="props.textarea" v-model="form.desc" textarea=true label="Description:"/>
    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, watchEffect, ref, computed, watch } from 'vue'
import InputField from '../components/InputField.vue'
import { useTaskStore } from '../stores/store'
import { notify } from "@kyvg/vue3-notification";

const props = defineProps(['data', 'insertMode', 'isDrawerOpen',"textarea",])
const emit = defineEmits(['save','closeMethod', 'update:isDrawerOpen'])
const taskStore = useTaskStore()
const status = ref(false)
const form = ref({
  title: '',
  tags: [],
  endDate: ''
});

const errors = ref({
  title: false,
  tags: false,
  endDate: false
})

watchEffect(() => {
  form.value = Object.assign({ ...props.data })
})

watch(status, () => {
  form.value.status = status.value ? 'Complete' : 'Todo'
})

const newTag = ref('')

const addNewTag = () => {
  var letters = /^[A-Za-z]+$/
  if (newTag.value.match(letters)) {
    form.value.tags.push(newTag.value)
    errors.value.tags = ''
  } else {
    errors.value.tags = "Tags can only contain letters and can't be empty"
    return
  }
}

const handleSubmit = () => {
  if (!validateData()) {
    props.insertMode ? taskStore.addNewTask(form.value) : taskStore.updateTask(form.value)
    emit('closeMethod')
    emit('update:isDrawerOpen',false)
    taskStore.getSingleTask(form.value.id)
    props.isDrawerOpen = false;
    notify({
      title: "Your Task Successfully Saved",
      type: 'success',

      duration:5000
    });
  }
}

const hasError = computed(() => {
  return errors.value.title || errors.value.endDate
})

const validateData = () => {
  resetValidations()

  if (!form.value.title) {
    errors.value.title = 'Tittle cannot be empty'
  }

  if (!form.value.endDate) {
    errors.value.endDate = 'EndDate cannot be empty'
  }

  if (form.value.title.length > 30) {
    errors.value.title += '<br>Tittle cannot have more than 30 characters'
  }

  return hasError.value
}

const resetValidations = () => {
  errors.value.title = false
  errors.value.endDate = false
  errors.value.title = false
}
</script>
<style lang="scss">
form{
  display: flex;
  flex-direction:column ;
  gap: 30px;
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
}
.addedTags {
  margin-top: 10px;
  padding-bottom: 20px;

  div {
    margin: 5px;
    display: inline;
    float: left;
    background-color: gray;
    padding: 2px 5px;
    border-radius: 5px;
    color: white;
  }
}


</style>
