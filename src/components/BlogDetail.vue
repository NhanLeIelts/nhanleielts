<template>
  <div class="container py-8">
    <v-container>
      <div class="row justify-content-center">
        <v-breadcrumbs :items="items" class="text-subtitle-2 font-weight-light px-0 mt-0" color="black">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <h3 class="text-white pr-2">{{ post.title }}</h3>
        <p style="color: #8F9193;">
          <span class="text-subtitle-2">{{ post.author?.fields.name }}</span> - 
          <span v-if="post.publishedDate" class="text-subtitle-2">Published: {{ post.publishedDate }}</span>
        </p>
        <v-row>
          <v-col cols="12" md="7">
            <v-sheet class="rounded pa-2 mt-4">
              <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="paragraph"></v-skeleton-loader>
              <div v-else>
                <template v-for="(content, idx) in post.content.content">
                  <template v-if="content.nodeType === 'paragraph'">
                    <div class="ma-2">{{ content.content[0].value }}</div>
                  </template>
                  <template v-else-if="content.nodeType === 'embedded-entry-block'">
                    <div class="ma-2">
                      <v-img :src="content.data.target.fields.image.fields.file.url" :width="auto" aspect-ratio="16/9" cover></v-img>
                    </div>
                  </template>
                </template>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="5">
            <v-sheet class="rounded pa-4 mt-4">
              <v-skeleton-loader :loading="loadingComment" v-if="loadingComment" height="140" type="paragraph"></v-skeleton-loader>
              <template v-else class="ml-2">
                <h4>COMMENTS:</h4>
                <div v-if="comments" v-for="(comment, index) in comments.value" :key="index" class="my-4">
                  <div class="d-flex justify-space-between">
                    <p class="text-subtitle-2 font-weight-black">{{ comment.mail }}</p>
                    <p class="text-caption font-weight-light">{{ comment.createdDate }}</p>
                  </div>
                  <div>{{ comment.value }}</div>
                </div>
                <v-text-field label="your comment" v-model="comment" class="mt-8"></v-text-field>
                <v-btn @click="addComment">Add Comment</v-btn>
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { db } from '../stores/firebase'
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { getPostDetail } from '../../src/contentfulClient'
import { collection, setDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import dayjs from 'dayjs';
import { useStore} from "vuex";
import { useRouter } from 'vue-router';

const email = ref(null)
const comment = ref(null)
const loading = ref(true)
const loadingComment = ref(true)
const post = ref({})
const comments = ref([])
const items = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'Blog',
    disabled: false,
    href: '/blog',
  },
])
const store = useStore();
const router = useRouter()

// const authListener = auth.onAuthStateChanged(async (user) => {
//   if (!user) {
//     router.push('/login')
//   } else {
//     email.value = user.email
//     const unsubscribe = onSnapshot(collection(db, 'comments'), (snapshot) => {
//       const allComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       comments.value = allComments.find(comment => comment.id === router.currentRoute.value.params.slug)
//       loadingComment.value = false
//     });
//   }
// })


const addComment = () => {
  const commentCollection = collection(db, "comments");

  const newComment = {
    mail: email.value,
    value: comment.value,
    createdDate: dayjs().format('YYYY-MM-DD HH:mm')
  }

  if (!comments.value) {
    setDoc(doc(commentCollection, post.value.slug), { value: [newComment] });
  } else {
    comments.value.value.push(newComment)
    updateDoc(doc(commentCollection, post.value.slug), { value: comments.value.value });
  }
  comment.value = null
}

onMounted(async () => {
  email.value = store.state.user.data.email
  post.value = await getPostDetail();
  loading.value = false

  //fetch comments
    onSnapshot(collection(db, 'comments'), (snapshot) => {
    const allComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    comments.value = allComments.find(comment => comment.id === router.currentRoute.value.params.slug)
    loadingComment.value = false
  });
});

</script>
<style>
.v-breadcrumbs-divider {
  padding: 0 !important;
}
</style>