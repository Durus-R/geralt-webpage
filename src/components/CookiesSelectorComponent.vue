<style>
h1 {
  font-size: 300%;
}

h2 {
  font-size: 140%;
}
</style>

<template>
  <q-scroll-area style="height: 500px; width: 700px;" @scroll="updateScroll">
    <div class="q-py-xs">
      <vue-markdown :source="md_text" />
    </div>

  </q-scroll-area>
  <div class="row">
    <q-checkbox :disable="!scrolledToBottom"
                style="margin-right: 50px"
                v-model="checked"
                label="Ich habe diese Informationen zur Kenntnis genommen und verstanden.">

    </q-checkbox>
    <q-btn color="blue" :disable="!checked" label="Akzeptieren" @click="enableCookies" />

  </div>
</template>

<script lang="ts" setup>
import { Cookies } from 'quasar';
import VueMarkdown from 'vue-markdown-render';
import { computedAsync } from '@vueuse/core';
import { ref } from 'vue';

const checked = ref(false);
const scrolledToBottom = ref(false);

function updateScroll(info: { verticalPercentage: number }) {
  scrolledToBottom.value = info.verticalPercentage > 0.95;
}

function enableCookies() {
  Cookies.set('site_cookies_enabled', '1');
  location.reload();
}

const md_text = computedAsync(async () => {
  const response = await fetch('/privacy_note.md');
  return response.text();
}, 'Loading...');

</script>
