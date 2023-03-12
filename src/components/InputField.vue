<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <div class="editor" v-if="textarea">
     <div class="editor-menu" :editor="editor">
        <button  @click.prevent="editor.chain().focus().toggleBold().run()" >
          Bold
        </button>
        <button  @click.prevent="editor.chain().focus().toggleItalic().run()" >
          Italic
        </button>
        <button  @click.prevent="editor.chain().focus().toggleStrike().run()" >
          Strike
        </button>
        <button  @click.prevent="editor.chain().focus().toggleCode().run()" >
          Code
        </button>
      </div> 
      <editor-content
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :editor="editor"
      />
    </div>

    <input
      v-else
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'

const props = defineProps({
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

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [Document, Paragraph, Text, Bold, Italic, Strike,Code],
  content: props.modelValue,
  autofocus: true,
  editable: true,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
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
.editor-menu{
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin: 15px 0;
}
</style>
