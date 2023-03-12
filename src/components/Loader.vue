<template>
    <div class="loading" v-if="props.isLoading">
        Loading tasks...
    </div>
    <slot v-if="!props.isLoading"></slot>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps([
    "isLoading"
])
</script>