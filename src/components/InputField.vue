<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <textarea v-if="textarea" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs" />
    <input v-else :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs" />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  textarea: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  &:last-child {
    flex-direction: row;
    gap: 20px;
  }

  input {
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;

    &:focus {
      outline: 1px solid green;
    }
  }

  input[type='checkbox'] {
    width: auto;
  }
}

textarea {
  width: 100%;
  min-height: 150px;
  max-height: 250px;
  resize: vertical;
}
</style>
