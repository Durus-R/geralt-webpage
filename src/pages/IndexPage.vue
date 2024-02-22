<template>

  <q-page class="column items-center justify-center">
    <q-layout container style="height: 300px" class="shadow-2 rounded-borders">
    <q-drawer
      v-model="drawer_store.leftDrawerOpen"
      :width="400"
      :breakpoint="700"
      elevated
      class="bg-primary text-white"
    ></q-drawer>
    <IndexComponent v-if="cookie_set"/>
    <CookiesSelectorComponent v-else/>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import IndexComponent from 'components/IndexComponent.vue';
import { Cookies } from 'quasar';
import CookiesSelectorComponent from 'components/CookiesSelectorComponent.vue';
import { useDrawerStore } from 'stores/drawerStore';

const drawer_store = useDrawerStore()

const cookie_set = Cookies.has('site_cookies_enabled')
</script>
