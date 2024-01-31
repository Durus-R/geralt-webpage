<template>
  <q-page class="column items-center justify-center">
    <q-select v-model="select" :options="store.names" label="Please select" style="min-width: 300px"></q-select>
    <p style="margin: 30px">{{ count_text }}</p>
    <div class="row justify-around" style="margin: 40px">
      <q-btn color="deep-orange" :label="button_text"
             :disable="select === null" @click="button_click" style="margin-right: 25px"></q-btn>
      <q-btn color="red" :label="-1" :disable="select === null || is_null" @click="button_decrement" rounded></q-btn>
    </div>
    <q-btn color="dark" label="Clear" :disable="store.is_empty" @click="reset()"></q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCounterStore } from 'stores/counterstore';

window.addEventListener('keydown', (e)=>{
  console.log(e.key)
  if (e.key=='End') {
    button_click()
  } else if (e.key=='Delete') {
    button_decrement()
  }
})

const store = useCounterStore();

if (store.is_empty) {
  store.push({
    count: 0,
    name: 'Geralt',
    cite: 'Ehh...'
  });
  store.push({
    count: 0,
    name: 'Hoff',
    cite: 'Sch*'
  });
}

const count_text = computed(() => {
  if (select.value === null) {
    return '';
  }
  return 'Count ' + store.get_single_name(select.value)?.count;
});

const button_text = computed(() => {
  if (select.value === null) {
    return 'No entry selected.';
  }
  return store.get_single_name(select.value)?.cite;
});

const is_null = computed(()=> {
  if (select.value === null) {
    return false
  }
  return (store.get_single_name(select.value)?.count ?? 0) < 1;
})

const select = ref(null);

function button_click() {
  if (select.value === null) {
    return;
  }
  store.increment(select.value);
}

function button_decrement() {
  if (select.value === null || is_null.value) {
    return;
  }
  store.decrement(select.value);
}

function reset() {
  store.clear();
  select.value = null;
}
</script>
