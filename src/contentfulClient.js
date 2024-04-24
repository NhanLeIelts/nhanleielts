import { createClient } from 'contentful';
import { useRouter } from 'vue-router'

const client = createClient({
  space: 'vne7jtup54at', // Replace with your Contentful space ID
  accessToken: 'MYdqDYtvnpbjhjaqwI-V9lYjTS_HIxuH7znOK6xaPNw', // Replace with your Contentful access token
});

export const getPosts = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'pageBlogPost',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const getPostDetail = async () => {
const router = useRouter()
  try {
    const response = await client.getEntries({
      content_type: 'pageBlogPost' ,
      'fields.slug': router.currentRoute.value.params.slug // Slug của bài viết
    });
    return response.items[0].fields;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
// export const createPost = async () => {
//   const dataTest = {
//     fields: {
//       title: {
//         'en-US': 'Title of the post'
//       },
//       content: {
//         'en-US': 'Content of the post'
//       },
//     }
//   };
//   try {
//     const res = await client.contentTypes.entry.create(dataTest)
//     console.log('Bài viết đã được tạo');
//     return res
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// };


// await client.contentTypes.entry.create({})
// .then(() => {
//   console.log('Bài viết đã được tạo');
//   // Clear input fields and reset state
//   this.title = '';
//   this.content = '';
// })
// .catch(error => {
//   console.error('Lỗi khi tạo bài viết:', error);
// });