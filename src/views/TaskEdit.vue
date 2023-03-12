<template>
  <div class="drawer-wrapper" v-if="isDrawerOpen">
    <div class="drawer">
      <div @click="isDrawerOpen = false" class="close-btn">X</div>
      <EditForm
        @close-method="isDrawerOpen = false"
        v-model:isDrawerOpen="props.isDrawerOpen"
        v-model:data="props.data"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import EditForm from './EditForm.vue'

const props = defineProps(['isDrawerOpen', 'data'])
const emit = defineEmits(['update:isDrawerOpen'])
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
