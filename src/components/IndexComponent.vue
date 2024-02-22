<template>
  <div class="row justify-center">
    <q-select v-model="select" :options="entries_names" label="Please select" style="min-width: 300px" />
    <q-btn flat round icon="edit" size="large" :disable="!(select.value)" @click="edit_dialog = true"></q-btn>
  </div>
  <p style="margin: 30px; font-size: 200%">{{ currentDoc ? currentDoc.count : '' }}</p>
  <div class="row justify-around" style="margin: 40px">
    <q-btn color="deep-orange" :label="currentDoc? currentDoc.text : 'Select...'"
           :disable="select.value === ''" @click="button_increment" style="margin-right: 25px"></q-btn>
    <q-btn color="red" :label="-1" @click="button_decrement"
           :disable="select.value === '' || (currentDoc? currentDoc.count : 0) === 0" rounded></q-btn>
  </div>
  <q-dialog v-model="edit_dialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Change Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="update_name" autofocus @keyup.enter="close_enter_dialog(); edit_dialog=false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Save" v-close-popup @click="close_enter_dialog"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { computed, Ref, ref } from 'vue';
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { collection, updateDoc, doc } from 'firebase/firestore';


document.onkeydown = (e) => {
  if (e.key == 'End' && select.value.value != '') {
    button_increment();
  } else if (e.key == 'Delete' && select.value.value != ''
  && currentDoc.value ? currentDoc.value.count > 0 : false) {
    button_decrement();
  }
};

const update_name = ref('')

const edit_dialog = ref(false);

const fireStore = useFirestore();

const entries_ref = collection(fireStore, 'people');

const entries = useCollection(entries_ref);

const entries_names = computed(() => {
  let res = [];
  for (const e of entries.value) {
    res.push({
      label: e.name,
      value: e.id
    });
  }
  return res;
});

interface option {
  label: string,
  value: string
}



const select = ref({
  label: '',
  value: ''
}) as Ref<option>;

const currentDocSource = computed(() =>
  select.value.value ?
    doc(entries_ref, select.value.value) : null
);

const currentDoc = useDocument(currentDocSource);

async function close_enter_dialog() {
  if (currentDocSource.value === null) {
    return
  }
  select.value.label = update_name.value
  await updateDoc(currentDocSource.value, {
    name: update_name.value
  })
}

async function button_add(addition: number) {
  if (!(select.value.value && currentDocSource.value && currentDoc.value)) {
    return;
  }
  await updateDoc(currentDocSource.value, {
    count: currentDoc.value.count + addition
  });
}

async function button_increment() {
  return await button_add(1);
}

async function button_decrement() {
  return await button_add(-1);
}

defineComponent({
  // name: 'ComponentName'
});
</script>
