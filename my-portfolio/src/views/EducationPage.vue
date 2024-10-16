<template>
  <div class="education-section">
    <h2>EDUCATION</h2>
    <div class="timeline">
      <div class="education-item" v-for="(item, index) in education" :key="index">
        <div class="timeline-content">
          <!-- Logo on top -->
          <img :src="require(`@/assets/${item.logo}`)" :alt="item.program" class="university-logo" />
          <div class="program-details">
            <div class="date-range">{{ item.startDate }} — {{ item.endDate }}</div>
            <div class="program">{{ item.program }}</div>
            <div class="location">{{ item.location }}</div>

            <!-- Thesis Details -->
            <div v-if="item.thesis" class="thesis-details">
              <h5>THESIS</h5>
              <div class="thesis-title">{{ item.thesis.title }}</div>
              <div class="thesis-description">{{ item.thesis.description }}</div>
              <div class="thesis-date">{{ item.thesis.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'EducationPage',
  data() {
    return {
      education: [
        {
          startDate: 'Jun 2023',
          endDate: 'Present',
          program: 'Master of Science Program in Data Science, Chiangmai University',
          location: 'Chiang Mai, Thailand',
          logo: 'dsc_cmu_logo.png',  
          thesis: {
            title: 'Title: Measuring Food Intake: A Computer Vision Approach to Thai Cuisine',
            date: 'Expected Completion: May 2024',
            description: 'This study aims to measure food intake and analyze nutrients in Thai cuisine by using computer vision with food photos'
          }
        },
        {
          startDate: 'Aug 2015',
          endDate: 'May 2019',
          program: 'Bachelor of Engineering Program in Mechanical Engineering, Chiangmai University',
          location: 'Chiang Mai, Thailand',
          logo: 'eng_cmu_logo.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.education-section {
  margin: 20px;
  font-family: 'Times New Roman', serif;
}

.education-section h2 {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 24px; /* Increase font size */
  text-align: center;
  position: relative;
}

.education-section h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: #000;
  margin: 10px auto 0;
}

.timeline {
  position: relative;
  padding: 20px 0;
  margin-left: 50px; /* Adjust this value as necessary */
  border-left: 2px solid #ddd;
}

.education-item {
  margin-bottom: 40px; /* Increase margin between items */
  position: relative;
}

.timeline-content {
  display: flex;
  flex-direction: column; /* Change to column to stack items */
  align-items: center; 
  justify-content: center; 
}

.university-logo {
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  margin-bottom: 10px; /* Space below logo */
}

.program-details {
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* Center text in program details */
}

.date-range, .location {
  font-weight: bold;
}

.program {
  font-size: 18px; /* Larger font for program name */
}

.thesis-details {
  margin-top: 10px; /* Space between program details and thesis */
  background-color: #e2f0e2; /* Light green background for thesis */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.thesis-title {
  font-weight: bold;
  font-size: 16px; /* Adjust size as necessary */
}

.thesis-date {
  font-style: italic;
}

.thesis-description {
  margin-top: 5px;
}

.timeline:before {
  content: '';
  position: absolute;
  left: -7px;
  top: 0;
  height: 100%;
  width: 14px;
  background: #f8f9fa;
  border-radius: 50%;
}
</style>

