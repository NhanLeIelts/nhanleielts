<template>
  <v-container>
    <v-app-bar prominent>
      <v-app-bar-nav-icon v-if="!$vuetify.display.mdAndUp" variant="text" class="ml-0" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="d-inline-flex align-center">
          <a v-if="$vuetify.display.mdAndUp" href="/" class="text-h4 font-weight-bold text-decoration-none mr-3 text-primary">FDWL</a>
          <span v-if="email" class="text-subtitle-1">{{ email.toLowerCase() }}</span>
        </div>
      </v-toolbar-title>
  
      <template v-if="$vuetify.display.mdAndUp" #append>
        <div class="hidden-sm-and-down">
          <v-btn
          v-for="item in menu"
          :key="item"
          class="text-body-1 blue-grey-darken-4"
          variant="text"
          @click="redirect(item.value)"
          >
          {{ item.title }}
        </v-btn>
        <v-btn v-if="email" prepend-icon="mdi-cog" class="v-btn v-btn--active v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat text-none font-weight-regular vo-auth-btn ml-2" @click.prevent="signOut">Log Out</v-btn>
        <v-btn v-else href="/login" prepend-icon="mdi-login" class="v-btn v-btn--active v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat text-none font-weight-regular vo-auth-btn">Sign in</v-btn>
        </div>
      </template>
    </v-app-bar>
  </v-container>
  <v-navigation-drawer
    :width="180"
    v-model="drawer"
    temporary
  >
    <v-list-item class="ma-2">
      <router-link to="/" class="text-decoration-none">Home</router-link>
    </v-list-item>
    <v-list-item class="ma-2">
      <router-link to="/blog" class="text-decoration-none">Blog</router-link>
    </v-list-item>
    <v-list-item class="ma-2">
      <router-link to="/f17-forum" class="text-decoration-none">F17</router-link>
    </v-list-item>
    <v-list-item v-if="email" class="ma-2">
      <v-btn prepend-icon="mdi-cog" class="v-btn v-btn--active v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat text-none font-weight-regular vo-auth-btn" @click.prevent="signOut">Log Out</v-btn>
    </v-list-item>
    <v-list-item v-if="!email" class="ma-2">
      <v-btn href="/login" prepend-icon="mdi-login" class="v-btn v-btn--active v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat text-none font-weight-regular vo-auth-btn">Sign in</v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { useStore} from "vuex";
import { ref } from 'vue';
import { useRouter } from "vue-router";
import {computed} from "vue";

const router = useRouter()
const store = useStore()

const menu = ref([
  {title: 'Blog', value: 'blog'},
  {title: 'F17', value: 'f17-forum'},
]);

const drawer = ref(false)

const email = computed(() => store.state.user.data?.email);

const redirect = (page) => {
  router.push(`/${page}`)
}

const signOut = async () => {
  await store.dispatch('logOut')
  router.push('/login')
}


</script>
