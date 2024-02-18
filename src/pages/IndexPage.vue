<template>

  <q-page class="column items-center justify-center">
    <q-select v-model="select" :options="entries_names" label="Please select" style="min-width: 300px"></q-select>
    <p style="margin: 30px">{{ currentDoc? currentDoc.count : ""}}</p>
    <div class="row justify-around" style="margin: 40px">
      <q-btn color="deep-orange" :label="currentDoc? currentDoc.text : 'Select...'"
             :disable="select.value === ''" @click="button_increment" style="margin-right: 25px"></q-btn>
      <q-btn color="red" :label="-1" @click="button_decrement"
             :disable="select.value === '' || (currentDoc? currentDoc.count : 0) === 0"  rounded></q-btn>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { collection, updateDoc, doc} from 'firebase/firestore';



document.onkeydown = (e)=>{
  console.log(e.key)
  if (e.key=='End' && select.value.value != '') {
    button_increment()
  } else if (e.key=='Delete' && select.value.value != ''
      && currentDoc.value ? currentDoc.value.count > 0 : false ) {
    button_decrement()
  }
}

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

const select = ref({
  label: '',
  value: ''
}) as Ref<option>;

const currentDocSource = computed(()=>
  select.value.value ?
    doc(entries_ref, select.value.value) : null
)

const currentDoc = useDocument(currentDocSource)


async function button_add(addition : number) {
  if (!(select.value.value && currentDocSource.value && currentDoc.value)) {
    return;
  }
  await updateDoc(currentDocSource.value, {
    count: currentDoc.value.count+addition
  })
}

async function button_increment() {
  return await button_add(1)
}

async function button_decrement() {
  return await button_add(-1)
}
/*
function button_decrement() {
  if (select.value === null || currentDoc.value.value?.count === 0) {
    return;
  }
  //store.decrement(select.value);
}*/

</script>
