<template>
  <div class="experience-section">
    <h2>EXPERIENCES</h2>

    <!-- Employment History Section -->
    <div class="timeline">
      <div class="experience-item" v-for="(item, index) in employmentHistory" :key="index">
        <div class="timeline-content">
          <!-- No logo for employment -->
          <div class="program-details">
            <div class="date-range">{{ item.startDate }} — {{ item.endDate }}</div>
            <div class="position">{{ item.position }}, {{ item.company }}</div>
            <ul class="responsibilities">
              <li v-for="(responsibility, rIndex) in item.responsibilities" :key="rIndex">{{ responsibility }}</li>
            </ul>
            <div class="location">{{ item.location }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Internships Section -->
    <h2>INTERNSHIPS</h2>
    <div class="timeline">
      <div class="experience-item" v-for="(item, index) in internships" :key="index">
        <div class="timeline-content">
          <!-- No logo for internships -->
          <div class="program-details">
            <div class="date-range">{{ item.startDate }} — {{ item.endDate }}</div>
            <div class="position">{{ item.position }}, {{ item.company }}</div>
            <ul class="responsibilities">
              <li v-for="(responsibility, rIndex) in item.responsibilities" :key="rIndex">{{ responsibility }}</li>
            </ul>
            <div class="location">{{ item.location }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperiencePage',
  data() {
    return {
      employmentHistory: [
        {
          startDate: 'May 2022',
          endDate: 'Present',
          position: 'RPA Developer',
          company: 'STelligence',
          responsibilities: [
            'Developing and deploying automation tools and scripts',
            'Collaborating with cross-functional teams',
            'Troubleshooting and maintaining automation systems',
            'Ensuring optimal performance of automated workflows',
          ],
          location: 'Bangkok, Thailand',
        },
        {
          startDate: 'Apr 2020',
          endDate: 'Apr 2022',
          position: 'Project Engineer',
          company: 'Union Construction & Supply',
          responsibilities: [
            'Define project scope, timeline, resources, and risks.',
            'Create detailed project schedule and allocate resources.',
            'Manage teams, materials, and communication.',
            'Track progress, quality, and issues.',
          ],
          location: 'Chonburi, Thailand',
        },
      ],
      internships: [
        {
          startDate: 'Jun 2018',
          endDate: 'Aug 2018',
          position: 'Piping Engineer',
          company: 'PTT Maintenance and Engineering',
          responsibilities: [
            'Creating piping layouts, specifying materials, and developing detailed drawings.',
            'Performing calculations for pipe sizing, pressure drop, and stress analysis.',
            'Visiting construction sites to observe piping installation and fabrication.',
            'Supporting senior engineers with various tasks.',
          ],
          location: 'Rayong, Thailand',
        },
      ],
    }
  }
}
</script>

<style scoped>
.experience-section {
  margin: 20px;
  font-family: 'Times New Roman', serif;
}

.experience-section h2 {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 24px; /* Increase font size */
  text-align: center;
  position: relative;
}

.experience-section h2::after {
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

.experience-item {
  margin-bottom: 40px; /* Increase margin between items */
  position: relative;
}

.timeline-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.program-details {
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.date-range,
.location {
  font-weight: bold;
}

.position {
  font-size: 18px; 
}

.responsibilities {
  margin-top: 10px;
  padding-left: 20px;
}

.responsibilities li {
  list-style: disc;
  text-align: left;
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
