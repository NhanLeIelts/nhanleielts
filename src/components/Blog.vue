<template>
  <div class="container py-8">
    <v-container>
      <div class="row justify-content-center">
        <v-badge content="dn" color="#343a40">
          <h3 class="text-white mb-6 pr-3 mt-2">BLog Linh Teen</h3>
        </v-badge>
        <!-- <div class="d-flex justify-space-between">
          <v-pagination class="text-primary" :total-visible="5" :length="9" density="'compact'"></v-pagination>
        </div> -->
        <ul class="post-list mt-2">
          <div class="post-block-top rounded-t-lg"></div>
          <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="image, list-item-two-line"></v-skeleton-loader>
          <div v-else>
            <div v-for="post in posts" :key="post.sys.id" class="post-item d-flex align-center ml-3">
              <v-avatar size="36px">
                <v-img 
                  :src="post.fields.author.fields.avatar.fields.file.url.substring(2)"
                  >
                </v-img>
              </v-avatar>
              <div class="ml-6">
                <router-link :to="'/blog/' + post.fields.slug" class="text-decoration-none font-weight-bold">{{ post.fields.title }}</router-link>
                <div class="d-flex">
                  <p class="author-name">{{ post.fields.author.fields.name }}</p>
                  <p class="author-name font-weight-medium ml-2">{{ post.fields.publishedDate }}</p>
                </div>
              </div>
            </div>
          </div>
      </ul>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { auth,db } from '../stores/firebase'
import { useRouter } from 'vue-router'
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import {getPosts} from '../../src/contentfulClient'
import AppBar from "./app/AppBar.vue";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useStore} from "vuex";
import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
  const content = ref(null)
  const loading = ref(true)
  const router = useRouter()

  const store = useStore();
  onBeforeUnmount(() => {
      // authListener()
  })
  const posts = ref([]);

  onMounted(async () => {
    posts.value = await getPosts();
    loading.value = false

    for (const post of posts.value) {
      post.fields.author.fields.avatar.fields.file.url = post.fields.author.fields.avatar.fields.file.url.replace('images.ctfassets.net', 'https://images.ctfassets.net');
    }
  });
</script>
<style>
.post-block-top {
  height: 40px;
  font-size: .875rem;
  color: #ebeced;
  background: #5c7099;
  border-bottom: 1px solid #b5b9bd;
  background: linear-gradient(0deg, #dce7f5, #e3e9f1);
}
.post-list {
  background-color: #ebeced;
  border-radius: 8px;
}
.post-item {
  min-height: 65px;
  padding: 3px;
  border-top: 1px solid #d3d5d7;
}
.author-name {
  color: #8f9193;
  font-size: 12px;
}
.v-pagination__item {
  width: 20px;
}
.v-pagination__prev, .v-pagination__next {
  display: none;
}
</style>
