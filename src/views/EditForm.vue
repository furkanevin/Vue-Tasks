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
          <a href="Javascript:;" @click="form.tags.splice(index, 1)">x</a>
        </div>
      </div>
    </div>
    <InputField v-model="form.endDate" type="Date" label="EndDate:" />
    <div v-if="errors.endDate">{{ errors.endDate }}</div>
    <label for="status" style="margin: 20px 0px">
      <input type="checkbox" v-model="status" />
    </label>
    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, watchEffect, ref, computed, watch } from 'vue'
import InputField from '../components/InputField.vue'
import { useTaskStore } from '../stores/store'

const props = defineProps(['data', 'insertMode', 'isDrawerOpen'])
const emit = defineEmits(['save'])
const taskStore = useTaskStore()
const status = ref(false)
const form = ref({
  title: '',
  tags: [],
  endDate: ''
})
const errors = ref({
  title: false,
  tags: false,
  endDate: false
})

watchEffect(() => {
  form.value = Object.assign({ ...props.data })
})

watch(status, () => {
  form.value.status = status.value ? 'Todo' : 'Complete'
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
    emit('close-method')
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
