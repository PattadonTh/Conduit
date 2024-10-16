<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/education" class="nav-link">Education</router-link>
    <router-link to="/experience" class="nav-link">Experiences</router-link>
    <router-link to="/skill" class="nav-link">Skills</router-link>
    <router-link to="/projects" class="nav-link">Projects</router-link>
    <router-link to="/resume" class="nav-link">Resume</router-link> 
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #f5f5f5;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 10px;
}

.nav-link:hover {
  color: #007bff;
}
</style>