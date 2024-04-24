<template>
  <div class="container py-8">
    <v-container>
      <div class="row justify-content-center">
        <v-breadcrumbs :items="items" class="text-subtitle-2 font-weight-light px-0 mt-0" color="black">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <h3 class="text-white pr-2">{{ thread.value?.title }}</h3>
        <p style="color: #8F9193;">
          <span class="text-subtitle-2">{{ thread.value?.author?.name }}</span> - 
          <span class="text-subtitle-2">Published: {{ thread.value?.createdDate }}</span>
        </p>
        <v-row>
          <v-col cols="12" md="8">
            <v-sheet class="rounded pa-4 mt-4">
              <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="paragraph"></v-skeleton-loader>
              <div v-else>
                <div>{{ thread.value?.content }}</div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-sheet class="rounded pa-4 mt-4">
              <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="paragraph"></v-skeleton-loader>
              <div v-else>
                <v-text-field v-model="comment"></v-text-field>
                <v-btn @click="addComment">comment</v-btn>
                <div v-if="thread.value.comments" v-for="(comment, index) in thread.value.comments" :key="index" class="my-4">
                  <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2 font-weight-black">{{ comment.mail }}</p>
                    <p class="text-caption font-weight-light">{{ comment.createdDate }}</p>
                  </div>
                  <div>{{ comment.value }}</div>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import {  db, auth } from '../stores/firebase'
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getThreadDetail } from '../stores/threads'
import { collection, setDoc, updateDoc, doc } from 'firebase/firestore'
import dayjs from 'dayjs';
import { useStore} from "vuex";

const loading = ref(true)
const thread = ref({})
const comments = ref([])
const comment = ref(null)
const email = ref(null)
const items = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'F17-Forum',
    disabled: false,
    href: '/f17-forum',
  },
])
const router = useRouter()
const store = useStore();

const addComment = () => {
  const commentCollection = collection(db, "threads");

  const newComment = {
    mail: email.value,
    value: comment.value,
    createdDate: dayjs().format('YYYY-MM-DD HH:mm')
  }
  if (!thread.value.value.comments.length) {
    thread.value.value.comments = [newComment]
    setDoc(doc(commentCollection, thread.value.id), { value: thread.value.value });
  } else {
    thread.value.value.comments.push(newComment)
    updateDoc(doc(commentCollection, thread.value.id), { value: thread.value.value });
  }
  comment.value = null
}

onMounted(async () => {
  email.value = store.state.user.data.email
  thread.value = await getThreadDetail(router.currentRoute.value.params.slug);
  loading.value = false
});

</script>
<style>
.v-breadcrumbs-divider {
  padding: 0 !important;
}
</style>
