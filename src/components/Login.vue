<template>
  <div class="container py-16">
    <div class="row justify-content-center ma-4" :class="$vuetify.display.mdAndUp && 'ma-10'">
      <div class="col-md-8">
        <div :class="$vuetify.display.mdAndUp && 'card'">
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#"  @submit.prevent="Login">
              <v-sheet
                class="text-center py-10 rounded"
                :elevation="10"
              >
                <div class="text-h4 font-weight-medium">
                  Login
                </div>

                <div class="text-center text-body-1 mb-10">
                  Please enter your email and password!
                </div>

                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        bg-color="transparent"
                        flat
                        hide-details
                        label="Email*"
                        variant="outlined"
                      />
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        bg-color="transparent"
                        flat
                        hide-details
                        label="Password*"
                        variant="outlined"
                        type="password"
                      />
                    </v-col>
                  </v-row>
                </v-container>

                <v-btn
                  class="px-10 bg-success text-body-1"
                  flat
                  height="50"
                  text="LOGIN"
                  type="submit"
                />

                <div class="text-center text-body-1 my-5">
                  Don't have an account?
                  <router-link to="/register" class="navbar-brand">Register here</router-link>
                </div>
                <SignInGoogle @click="signInWithGoogle" />
                <v-btn prepend-icon="mdi-facebook" class="btn-fb ma-2 v-btn v-btn--active v-theme--light bg-primary v-btn--size-default v-btn--variant-flat text-none font-weight-bold vo-auth-btn" @click="signInWithFacebook">Sign in Facebook</v-btn>
              </v-sheet>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: "LoginComponent",
    setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const Login = async () => {
      try {
        await store.dispatch('logIn', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }

    const signInWithGoogle = async () => {
      try {
        await store.dispatch('signInWithGoogle');
        await store.dispatch('getMe');
        console.log('signnnn innn ');
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }

    const signInWithFacebook= async () => {
      try {
        await store.dispatch('signInWithFacebook');
        await store.dispatch('getMe');
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    };

    return { Login, email, password, error, signInWithGoogle, signInWithFacebook }
  }
};
</script>
<style scoped>
.btn-fb {
  width: 181px !important;
  height: 39px !important;
  background: #0866FF !important;
}
</style>