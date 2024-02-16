<template>

  <q-page class="column items-center justify-center">
    <q-select v-model="select" :options="entries_names" label="Please select" style="min-width: 300px"></q-select>
    <p style="margin: 30px">{{ currentDoc?.count }}</p>
    <div class="row justify-around" style="margin: 40px">
      <q-btn color="deep-orange" :label="currentDoc?.text"
             :disable="select === null"  style="margin-right: 25px"></q-btn>
      <q-btn color="red" :label="-1" :disable="select === null || currentDoc?.count === 0"  rounded></q-btn>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { collection, doc, query, where, getDocs} from 'firebase/firestore';
import { computedAsync } from '@vueuse/core/index';

/*
window.addEventListener('keydown', (e)=>{
  console.log(e.key)
  if (e.key=='End') {
    button_click()
  } else if (e.key=='Delete') {
    button_decrement()
  }
})*/

const fireStore = useFirestore();

const entries_ref = collection(fireStore, 'people')

const entries = useCollection(entries_ref);

const entries_names = computed(()=> {
  let res = []
  for (const e of entries.value) {
    res.push({
      label: e.name,
      value: e.id
    })
  }
  return res;
})

interface option {
  label: string,
  value: string
}

const select = ref() as Ref<option>;

const currentDoc = useDocument(computed(()=>
  select.value ?
  doc(entries_ref, select.value.value) : null
))


/*
const button_text = computed(() => {
  if (select.value === null) {
    return 'No entry selected.';
  }
  return store.get_single_name(select.value)?.cite;
});*/


/*
function button_click() {
  if (select.value === null) {
    return;
  }
  store.increment(select.value);
}

function button_decrement() {
  if (select.value === null || currentDoc.value.value?.count === 0) {
    return;
  }
  store.decrement(select.value);
}*/

</script>
