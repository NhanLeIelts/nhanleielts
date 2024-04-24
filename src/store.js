import { createStore } from 'vuex';
import { auth } from './stores/firebase';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { updateProfile, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    }
  },
  actions: {
    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('SET_USER', response.user);
        updateProfile(auth.currentUser, {
          displayName: name
        });
      } else {
        throw new Error('Unable to register user');
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('SET_USER', response.user);
      } else {
        throw new Error('Login failed');
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit('SET_USER', null);
      context.commit('SET_LOGGED_IN', false);
    },

    async getMe(context) {
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            context.commit('SET_LOGGED_IN', true);
            context.commit('SET_USER', {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid
            });
            unsubscribe();
            resolve(user);
          } else {
            context.commit('SET_LOGGED_IN', false);
            context.commit('SET_USER', null);
            unsubscribe();
            reject(new Error('User not authenticated'));
          }
        });
      });
    },

    async signInWithGoogle({ commit }) {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((err) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    },

    async signInWithFacebook({ commit }) {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
  }
});

export default store;
