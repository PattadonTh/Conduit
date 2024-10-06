<template>
  <v-app-bar app flat>
    <v-toolbar-title>
      <router-link to="/" class="logo-font">Conduit</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text>
        <router-link to="/" class="nav-link">Home</router-link>
      </v-btn>
      <v-btn text>
        <router-link to="/login" class="nav-link">Sign In</router-link>
      </v-btn>
      <v-btn text>
        <router-link to="/signup" class="nav-link">Sign Up</router-link>
      </v-btn>
      <v-btn v-if="isLoggedIn" text>
        <router-link to="/profile" class="nav-link">Profile</router-link>
      </v-btn>
      <v-btn v-if="isLoggedIn" text @click="logout">Log Out</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Update this based on your auth state
    };
  },
  methods: {
    logout() {
      // Add your logout logic here, such as clearing tokens and redirecting
      this.isLoggedIn = false;
      this.$router.push('/login'); // Redirect to login page after logout
    },
  },
  mounted() {
    // Check user authentication state
    this.isLoggedIn = !!localStorage.getItem('token'); // Replace with your logic
  },
};
</script>

<style scoped>
.logo-font {
  font-size: 24px; /* Font size for the logo */
  font-weight: bold; /* Bold font for logo */
  color: #5c6bc0; /* Logo color */
  text-decoration: none; /* Remove underline from link */
}

.nav-link {
  text-decoration: none;
  color: inherit; /* Inherit color from the parent element */
}

.v-toolbar-title {
  margin-right: 16px; /* Space between title and buttons */
}

/* Remove border and box shadow from the app bar */
.v-app-bar {
  box-shadow: none; /* Remove shadow */
  border: none; /* Remove any borders */
}
</style>
