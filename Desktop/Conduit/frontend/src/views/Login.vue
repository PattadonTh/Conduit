<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline text-center">Sign In</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="email" :rules="emailRules" label="Email" required
                prepend-icon="mdi-email"></v-text-field>
              <v-text-field v-model="password" :rules="passwordRules" label="Password" required prepend-icon="mdi-lock"
                type="password"></v-text-field>
              <v-btn :disabled="!valid" color="primary" @click="login" class="mx-auto d-block">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-row justify="center" class="w-100">
            <v-btn text to="/signup">Don't have an account? Sign up</v-btn>
          </v-row>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../axios'; // Adjust the path as necessary

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'Password must be at least 4 characters',
      ],
    };
  },
  methods: {
    async login() {
      console.log('Backend URL:', process.env.VUE_APP_BACKEND_URL);
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/users/login`, {
          user: {
            email: this.email,
            password: this.password,
          },
        }, { withCredentials: true }); // This ensures cookies are sent with requests
        console.log('Login successful:', response.data);
        this.$router.push({ name: 'home' }); // Redirect after successful login
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.login-container {
  padding-top: 64px;
}

</style>
