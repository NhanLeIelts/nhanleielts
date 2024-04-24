<template>
  <div>
    <v-btn @click="login">Login Using Google</v-btn>
    <div v-if="userDetails">
      <h2>User Details</h2>
      <p>Name: {{ userDetails.name }}</p>
      <p>Email: {{ userDetails.email }}</p>
      <p>Profile Picture: <img :src="userDetails.picture" alt="Profile Picture"></p>
    </div>
  </div>
</template>

<script setup>
import { googleSdkLoaded } from "vue3-google-login";
import axios from "axios";
import { ref } from 'vue';

const userDetails = ref(null);

const login = () => {
  googleSdkLoaded(google => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: "403051475451-e6fl4li8e5rsojafmpe7i3ppok1vrlrv.apps.googleusercontent.com",
        scope: "email profile openid",
        redirect_uri: "http://localhost:3001/auth/callback",
        callback: response => {
          if (response.code) {
            sendCodeToBackend(response.code);
          }
        }
      })
      .requestCode();
  });
};

const sendCodeToBackend = async (code) => {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: "403051475451-e6fl4li8e5rsojafmpe7i3ppok1vrlrv.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "postmessage",
        grant_type: "authorization_code"
      }
    );
    const accessToken = response.data.access_token;

    // Fetch user details using the access token
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (userResponse && userResponse.data) {
      // Set the userDetails data property to the userResponse object
      userDetails.value = userResponse.data;
    } else {
      // Handle the case where userResponse or userResponse.data is undefined
      console.error("Failed to fetch user details.");
    }
  } catch (error) {
    console.error("Token exchange failed:", error.response.data);
  }
};
</script>
