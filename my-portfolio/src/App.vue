<template>
  <div id="app">
    <Navbar />
    <div class="content-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/AppNavbar.vue';
import Footer from './components/ContactFooter.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Set to 100% of the viewport height */
  overflow: hidden; /* Prevent scroll on the body */
}

.Navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #333; /* Customize as needed */
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 60px; /* Set height of Navbar */
}

.Footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #333; /* Customize as needed */
  color: white;
  padding: 10px 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 60px; /* Set height of Footer */
}

.content-wrapper {
  flex: 1;
  margin-top: 0px; /* Space for Navbar */
  margin-bottom: 0px; /* Space for Footer */
  overflow-y: auto; /* Enable scrolling in content area */
}
</style>
