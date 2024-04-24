<template>
  <div class="container py-8">
    <div class="row justify-content-center ma-12">
      <div class="d-flex justify-space-between">
        <router-link to="/blog/create" class="navbar-brand">
          <v-btn class="mr-16">Create Post</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
// import { createPost } from '../../src/contentfulClient'

const createPost = async (postData) => {
  try {
    const dataTest = {
      fields: {
        title: {
          'en-US': 'Title of the post'
        },
        content: {
          'en-US': 'Content of the post'
        },
      }
    };
    const response = await fetch('https://api.contentful.com/spaces/vne7jtup54at/environments/master/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer MYdqDYtvnpbjhjaqwI-V9lYjTS_HIxuH7znOK6xaPNw'
      },
      body: JSON.stringify(dataTest)
    });

    if (response.ok) {
      console.log('Bài viết đã được tạo thành công!');
    } else {
      console.error('Đã xảy ra lỗi khi tạo bài viết:', response.statusText);
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi khi gửi yêu cầu tạo bài viết:', error);
  }
}

onMounted(() => {
  createPost()
})

</script>