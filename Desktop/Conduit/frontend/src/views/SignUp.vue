<template>
  <v-container class="signup-container" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline text-center">Sign Up</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="username" :rules="usernameRules" label="Username" required
                prepend-icon="mdi-account"></v-text-field>
              <v-text-field v-model="email" :rules="emailRules" label="Email" required
                prepend-icon="mdi-email"></v-text-field>
              <v-text-field v-model="password" :rules="passwordRules" label="Password" required prepend-icon="mdi-lock"
                type="password"></v-text-field>
              <v-btn :disabled="!valid" color="primary" @click="signUp" class="mx-auto d-block">Sign Up</v-btn>
              <!-- Centered button -->
            </v-form>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-row justify="center" class="w-100">
            <v-btn text to="/login" class="text-center mx-auto d-block">Already have an account? Sign In</v-btn>
          </v-row>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../axios'; // Adjust the path as necessary

export default {
  name: 'SignUp',
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3) || 'Username must be at least 3 characters long',
      ],
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
    async signUp() {
      console.log('Backend URL:', process.env.VUE_APP_BACKEND_URL);
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/users`, {
          user: {
            username: this.username,
            email: this.email,
            password: this.password,
          },
        });
        console.log('Sign Up successful:', response.data);
        // Handle successful sign-up (e.g., redirect to login)
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Sign Up error:', error);
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.signup-container {
  padding-top: 64px;
}
</style>
