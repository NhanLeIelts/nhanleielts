<template>
  <div class="container py-8">
    <v-container>
      <div class="row justify-content-center">
        <v-badge content="dn" color="#343a40">
          <h3 class="text-white mb-6 pr-3 mt-2">Tro Chuyen Linh Teen</h3>
        </v-badge>
        <div class="d-flex justify-space-between">
          <!-- <v-pagination class="text-primary" :total-visible="5" :length="9" density="'compact'"></v-pagination> -->
          <router-link to="/f17-forum/create" class="navbar-brand">
            <v-btn>Create thread</v-btn>
          </router-link>
        </div>
        <ul class="post-list mt-2">
          <div class="post-block-top rounded-t-lg"></div>
          <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="image, list-item-two-line"></v-skeleton-loader>
          <div v-else>
            <div v-for="thread in threads" :key="thread.id" class="post-item d-flex align-center ml-3">
              <v-avatar size="36px">
                <v-img
                  :src="thread.value.author?.img ?thread.value.author?.img : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=996&t=st=1713794955~exp=1713795555~hmac=8cbf34449e657dc1f65f870e60dc7c5a7ab566322105885b3109a02816d8eece' "
                  >
                </v-img>
              </v-avatar>
              <div class="ml-6">
                <router-link :to="'/f17-forum/' + thread.id" class="text-decoration-none font-weight-bold">{{ thread.value.title }}</router-link>
                <div class="d-flex">
                  <p class="author-name">{{ thread.value.author?.name }}</p>
                  <p class="author-name font-weight-medium ml-2">{{ thread.value?.createdDate }}</p>
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
import { auth } from '../stores/firebase'
import { useRouter } from 'vue-router'
import { ref, onBeforeUnmount, onMounted } from 'vue'
import {getThread} from '../stores/threads'

  const threads = ref([])
  const loading = ref(true)
  const router = useRouter()


// onBeforeUnmount(() => {
//   authListener()
// })
onMounted(async() => {
  threads.value = await getThread();
  loading.value = false
})
</script>
<style>
/* .post-block-top {
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
} */
</style>
