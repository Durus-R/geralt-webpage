import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawerStore = defineStore('drawer', () => {
  const leftDrawerOpen = ref(false)
  function toggle() {
    leftDrawerOpen.value = !(leftDrawerOpen.value)
  }
  return {leftDrawerOpen, toggle}
})
