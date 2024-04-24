<template>
  <div class="container py-8">
    <v-container>
      <div class="row justify-content-center">
        <v-breadcrumbs :items="items" class="text-subtitle-2 font-weight-light px-0 mt-0" color="black">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <h3 class="text-white pr-2">Create Thread</h3>
        <v-row>
          <v-col cols="12" md="8">
            <v-sheet class="rounded pa-4 mt-4">
              <div>
                <p>Title: </p>
                <v-text-field label="" v-model="title"></v-text-field>
              </div>
              <div>
                <p>Content: </p>
                <!-- <QuillEditor theme="snow" v-model:content="quill" /> -->
                <v-textarea label="" v-model="content"></v-textarea>
                <!-- <div v-for="(op, index) in quill.ops" :key="index" v-html="renderOp(op)"></div> -->
                <!-- <div v-html="renderedContent()"></div> -->
              </div>
              <v-btn @click="addThread">Create</v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import {createThread} from '../stores/threads'
import dayjs from 'dayjs';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useStore} from "vuex";

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
const store = useStore();

const title = ref('')
const content = ref('')
const router = useRouter()
const author = ref({})

  const generatePostId = () => {
    const cleanTitle = title.value.toLowerCase().replace(/[^\w\s]/gi, '');
    const hyphenatedTitle = cleanTitle.replace(/\s+/g, '-');
    const timestamp = dayjs().valueOf();
    const postId = `${hyphenatedTitle}-${timestamp}`;
    return postId;
  }
  const addThread = () => {
    const newThread = {
      id: generatePostId(),
      title: title.value,
      content: content.value,
      createdDate: dayjs().format('YYYY-MM-DD HH:mm'),
      author: {
        name: author.value.name || null,
        email: author.value.email,
        img: author.value.img || null
      },
      comments: []
    }
    createThread(newThread).then((res) => {
    console.log("🚀 ~ //createThread ~ newThread:", newThread)
      if (res) {
        router.push('/f17-forum')
      }
    })
  }

  onMounted(() => {
    author.value = {...store.state.user.data}
  })

</script>
<style>
.v-breadcrumbs-divider {
  padding: 0 !important;
}
</style>