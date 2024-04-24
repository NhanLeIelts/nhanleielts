<template>
  <div class="container py-16">
    <div class="row justify-content-center ma-4" :class="$vuetify.display.mdAndUp && 'ma-10'">
      <div class="col-md-8">
        <div :class="$vuetify.display.mdAndUp && 'card'">
          <div class="card-body">
            <v-alert
              v-if="success"
              text="Your account has been created!"
              title="Successful"
              type="success"
            ></v-alert>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form @submit.prevent="Register">
              <v-sheet
                class="text-center py-8"
                :elevation="10"
              >
                <div class="text-h4 font-weight-medium">
                  Register Form
                </div>

                <div class="text-center text-body-1 mb-10">
                  Please input your information
                </div>

                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="name"
                        bg-color="transparent"
                        flat
                        hide-details
                        label="Name*"
                        variant="outlined"
                        required
                      />
                    </v-col>
                    
                    <!-- <v-col cols="12">
                      <v-select
                        :ref="cls"
                        v-model="cls"
                        flat
                        hide-details
                        bg-color="transparent"
                        variant="outlined"
                        :items="listClass"
                        :rules="[() => !!cls || 'This field is required']"
                        label="Class*"
                        placeholder="Select..."
                        required
                      ></v-select>
                    </v-col> -->

                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        bg-color="transparent"
                        flat
                        hide-details
                        label="Email*"
                        variant="outlined"
                        required
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
                        required
                      />
                    </v-col>
                  </v-row>
                </v-container>

                <v-btn
                  class="px-10 bg-success text-body-1"
                  color="accent"
                  flat
                  height="55"
                  text="REGISTER"
                  type="submit"
                />

                <!-- <div class="text-center text-body-1 mt-10">
                  Don't have an account?
                  <router-link to="/register" class="navbar-brand">Register here</router-link>
                </div> -->
              </v-sheet>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);
const cls = ref('');
const listClass = ref(['4.0-5.5', '5.0-6.5']);
const success = ref(null)

const store = useStore();
const router = useRouter();

const Register = async () => {
  error.value = null
  try {
    await store.dispatch('register', {
      email: email.value,
      password: password.value,
      name: name.value,
      cls: cls.value,
    });
    success.value = true
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    error.value = err.message;
  }
};

</script>
