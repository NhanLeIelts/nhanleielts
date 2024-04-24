import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Blog from '../components/Blog.vue';
import BlogDetail from '../components/BlogDetail.vue';
import BlogCreate from '@/components/BlogCreate.vue';
import Forum from '../components/Forum.vue';
import ThreadDetail from '../components/ThreadDetail.vue';
import ThreadCreate from '../components/ThreadCreate.vue';
import { auth } from '../stores/firebase'
import store from '@/store';
import { computed } from 'vue';

const routes = [
        {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog,
        meta: { requiresAuth: true }
    },
    {
        path: '/f17-forum',
        name: 'Forum',
        component: Forum,
        meta: { requiresAuth: true }
    },
    {
        path: '/blog/create',
        name: 'BlogCreate',
        component: BlogCreate,
    },
    {
        path: '/blog/:slug',
        name: 'BlogDetail',
        component: BlogDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/f17-forum/:slug',
        name: 'ThreadDetail',
        component: ThreadDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/f17-forum/create',
        name: 'ThreadCreate',
        component: ThreadCreate,
        meta: { requiresAuth: true }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const email = computed(() => store.state.user.data?.email);
    if (to.meta.requiresAuth) {
        if (email.value) {
          next();
        } else {
          next('/login');
        }
      } else {
        next();
      }
  });


export default router  