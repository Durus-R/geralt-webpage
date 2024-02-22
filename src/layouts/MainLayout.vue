<template>

  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn :class="button_classes" flat @click="menu_click" round dense icon="menu" />
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
import {useDrawerStore} from 'stores/drawerStore';

const drawerStore = useDrawerStore()

const cookie_set = Cookies.has('site_cookies_enabled')

const button_classes = {
  // Not reactive as it doesn't change during runtime
  hidden: !cookie_set
}

function disable_cookies() {
  Cookies.remove('site_cookies_enabled');
  location.reload();
}

function menu_click() {
  drawerStore.toggle()
}
</script>
