<template>
  <div class="container">
    <v-main>
      <v-container fill-height class="fill-height">
        <v-row>
          <v-col cols="12" md="4" v-for="item in menu" :key="item">
            <v-sheet height="200" class="rounded cursor-pointer pa-2 mt-4" @click="redirect(item.value)">{{ item.label }}</v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { useStore} from "vuex";
import {computed, ref} from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter()

const menu = ref([
  {label: 'Blog', value: 'blog'},
  {label: 'F17', value: 'f17-forum'},
  {label: 'None', value: ''},
  {label: 'None', value: ''},
  {label: 'None', value: ''},
  {label: 'None', value: ''},
]);

const redirect = (item) => {
  router.push(`/${item}`)
}

</script>