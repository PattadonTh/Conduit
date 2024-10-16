<template>
  <div class="projects-section">
    <h2>PROJECTS</h2>
    <p>Here are some of my projects.</p>
    
    <div class="projects-page">
      <div class="project-card" v-for="(project, index) in projects" :key="index">
        <h3 class="project-title">{{ project.title }}</h3>
        <ul class="project-description">
          <li v-for="(bullet, i) in project.descriptionBullets" :key="i">{{ bullet }}</li>
        </ul>
        <a :href="project.link" target="_blank" class="project-link">View on GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      projects: [
        {
          title: 'Conduit',
          descriptionBullets: [
            'Web application for creating, sharing, and interacting with articles.',
            'Built with Vue.js for a responsive frontend experience.',
            'Node.js backend for efficient data management.',
            'Features secure user authentication and seamless article management system.',
          ],
          link: 'https://github.com/PattadonTh/Conduit.git',
        },
        {
          title: 'Human Activity Recognition',
          descriptionBullets: [
            'Utilizes MediaPipe and deep learning for activity recognition.',
            'Identifies activities such as raising hands, clapping, walking, and standing.',
            'Processes video input in real-time.',
          ],
          link: 'https://github.com/PattadonTh/HUMAN-ACTIVITY-RECOGNITION.git',
        },
        {
          title: 'Data-Driven Customer Relationship Management',
          descriptionBullets: [
            'Data analytics and machine learning for CRM enhancement.',
            'Customer segmentation and profiling through clustering and classification.',
            'Automated response system and product recommendation algorithms.',
            'Sentiment analysis of customer reviews with data privacy considerations.',
            'Case study on TeamLab Borderless Shanghai to demonstrate practical applications.',
          ],
          link: 'https://github.com/PattadonTh/Data-Driven-Customer-Relationship-Management.git',
        },
      ],
    };
  },
};
</script>

<style scoped>
.projects-section {
  margin: 20px;
  font-family: 'Times New Roman', serif;
}

.projects-section h2 {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  position: relative;
}

.projects-section h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: #000;
  margin: 10px auto 0;
}

.projects-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-card {
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
}

.project-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.project-description {
  margin: 10px 0;
}

.project-link {
  color: #3498db;
  text-decoration: none;
}
</style>
