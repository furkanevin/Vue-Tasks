<template>
  <div class="drawer-wrapper" v-if="isDrawerOpen">
    <div class="drawer">
      <div @click="handled" class="close-btn">X</div>
      <EditForm
        :isDrawerOpen="props.isDrawerOpen" @update:isDrawerOpen="(val)=> emit('update:isDrawerOpen', val)"
        v-model:data="props.data"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import EditForm from './EditForm.vue'

const props = defineProps(['isDrawerOpen', 'data'])
const emit = defineEmits(['update:isDrawerOpen',])

const handled = (first) => {
  console.log('first', first)
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
