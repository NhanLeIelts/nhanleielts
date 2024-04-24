<template>
  <v-row class="ml-4">
    <v-col cols="8">
      <v-sheet class="rounded pa-4 ma-2 mt-4">
        <v-skeleton-loader :loading="loading" v-if="loading" height="240" type="paragraph"></v-skeleton-loader>
        <div v-else>
          <v-text-field v-model="comment"></v-text-field>
          <v-btn @click="addComment">comment</v-btn>
          <div v-for="comment in comments" :key="comment.id">
            {{ comment.value }}
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
const comment = ref(null)

// export { loading, comment }
</script>
