<script setup lang="ts">
// ./scr/components/VueComponent.vue
import { onMounted, onUnmounted, ref } from 'vue'
import { ReactConnector } from './Connector'

const reactRoot = ref<HTMLElement | null>(null)
let connector: ReactConnector | null = null

onMounted(() => {
  if (reactRoot.value) {
    connector = new ReactConnector(reactRoot.value)
    connector.render()
  }
})

onUnmounted(() => {
  if (connector) {
    connector.cleanup()
  }
})
</script>

<template>
  <div ref="reactRoot"></div>
</template>