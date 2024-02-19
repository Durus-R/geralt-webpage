<template>

  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn unelevated flat round :class="button_classes" icon="visibility_off" @click="disable_cookies" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script setup lang="ts">
import { Cookies } from 'quasar';

const button_classes = {
  // Not reactive as it doesn't change during runtime
  hidden: !(Cookies.has('site_cookies_enabled'))
}

function disable_cookies() {
  Cookies.remove('site_cookies_enabled');
  location.reload();
}
</script>
