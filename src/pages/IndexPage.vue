<template>

  <q-page class="column items-center justify-center">
    <IndexComponent v-if="cookie_set"/>
    <CookiesSelectorComponent v-else/>

  </q-page>
</template>

<script setup lang="ts">
import IndexComponent from 'components/IndexComponent.vue';
import { Cookies } from 'quasar';
import CookiesSelectorComponent from 'components/CookiesSelectorComponent.vue';

const cookie_set = Cookies.has('site_cookies_enabled')



</script>
