<template>
  <section class="home-container">
    <div class="profile">
      <img src="@/assets/Profile.png" alt="Your Name" class="profile-photo" />
    </div>
    <div class="introduction">
      <h2>Hello, my name is</h2>
      <h1 class="full-name">Pattadon Thepkan</h1>
      <p>
        Welcome to my portfolio! I am an engineer who transitioned into the tech industry 
        by developing self-taught programming skills. These skills helped me excel in my 
        first role as an RPA developer, where I created automation solutions that integrate 
        RPA with web technologies.
      </p>
      <p>
        Currently, I am pursuing a master's degree in Data Science, focusing on a thesis 
        related to computer vision. My journey in tech is fueled by a strong interest in 
        data-driven solutions, supported by logical thinking, problem-solving abilities, 
        effective communication, and teamwork.
      </p>
      <p>
        As I aim to advance my career, I invite you to explore my projects and experiences 
        that showcase my journey and expertise in these fields.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-container {
  display: flex;
  align-items: center;
  padding: 20px;
}

.profile {
  margin-right: 20px; /* Space between photo and text */
}

.profile-photo {
  width: 200px; /* Adjust the size of the photo */
  height: auto; /* Maintain aspect ratio */
  border-radius: 0%; /* Circular photo */
}

.introduction {
  max-width: 600px; /* Limit width of introduction text */
}

.full-name {
  font-size: 2em; /* Emphasize your name with a larger font */
  margin: 10px 0; /* Space around the name */
}
</style>
