<template>
  <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcQgXMpAAAAAHsOvQpUIRZ043YDb6d1l6xkTSvY"></script>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <script>
    function onClick(e) {
      e.preventDefault();
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LcQgXMpAAAAAHsOvQpUIRZ043YDb6d1l6xkTSvY', {action: 'LOGIN'});
      });
    }
  </script>
</template>

<script setup lang="ts">


</script>
