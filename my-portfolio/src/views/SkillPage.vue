<template>
  <div class="skills-section">
    <h2>SKILLS</h2>

    <div class="skills-category">
      <h3>Technical Skills</h3>
      <div class="sub-category">
        <ul>
          <li v-for="(category, index) in technicalSkillsCategories" :key="index" class="category-item">
            <div class="subcategory-title">
              <h4>{{ category.title }}</h4>
            </div>
            <ul class="tech-skills-list">
              <li v-for="(techSkill, skillIndex) in category.skills" :key="skillIndex" class="tech-skill">
                <img :src="require(`@/assets/${techSkill.logo}`)" :alt="techSkill.name" class="skill-logo" />
                <div class="skill-description">{{ techSkill.name }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="skills-category">
      <h3>Soft Skills</h3>
      <div class="soft-skills-box">
        <div v-for="(skill, index) in softSkills" :key="index" class="soft-skill-item">{{ skill }}</div>
      </div>
    </div>

    <div class="skills-category">
      <h3>Languages</h3>
      <div class="languages-box">
        <div v-for="(language, index) in languages" :key="index" class="language-item">
          <div class="language-details">
            {{ language.name }} - {{ language.proficiency }} <!-- Show proficiency level -->
            <div v-if="language.certificate" class="certificate-reference">
              Certificate: {{ language.certificate }} <!-- Show certificate reference if available -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsPage',
  data() {
    return {
      technicalSkillsCategories: [
        {
          title: '1. Web Development',
          skills: [
            { name: 'HTML', logo: 'html_logo.png' },
            { name: 'CSS', logo: 'css_logo.png' },
            { name: 'JavaScript', logo: 'javascript_logo.png' },
            { name: 'Node.js', logo: 'nodejs_logo.png' },
            { name: 'Vue.js', logo: 'vuejs_logo.png' },
          ],
        },
        {
          title: '2. Data Science',
          skills: [
            { name: 'Python', logo: 'python_logo.png' },
            { name: 'Numpy', logo: 'numpy_logo.png' },
            { name: 'Pandas', logo: 'pandas_logo.png' },
            { name: 'Scikit-learn', logo: 'scikitlearn_logo.png' },
            { name: 'Matplotlib', logo: 'matplotlib_logo.png' },
          ],
        }, 
        {
          title: '3. Automation',
          skills: [
            { name: 'Automation Anywhere', logo: 'AA_logo.png' },
            { name: 'Ui Path', logo: 'UiPath_logo.png' }
          ],
        },
        {
          title: '4. Database Management',
          skills: [
            { name: 'Microsoft SQL', logo: 'microsoftsql_logo.png' },
            { name: 'MySQL', logo: 'mysql_logo.png' },
            { name: 'MongoDB', logo: 'mongodb_logo.png' },
          ],
        },
        {
          title: '5. Version Control',
          skills: [
            { name: 'Git', logo: 'git_logo.png' },
          ],
        },
        {
          title: '6. Containerization',
          skills: [
            { name: 'Docker', logo: 'docker_logo.png' },
          ],
        },
      ],
      softSkills: [
        'Communication',
        'Teamwork',
        'Problem-Solving',
        'Time Management',
        'Adaptability',
      ],
      languages: [
        { name: 'Thai', proficiency: 'Native', certificate: null },
        { name: 'English', proficiency: 'Fluent', certificate: null },
        { name: 'Chinese', proficiency: 'Intermediate', certificate: null },
      ]
    };
  },
};
</script>

<style scoped>
.skills-section {
  margin: 20px auto; /* Center the section on the page */
  font-family: 'Times New Roman', serif; /* Change to a more modern font */
  max-width: 800px; /* Limit width to avoid full width of the screen */
}

.skills-section h2 {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 26px; /* Slightly larger for emphasis */
  text-align: center;
}

.skills-section h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: black; /* Blue color for accent */
  margin: 10px auto 0;
}

.skills-category {
  margin-bottom: 20px; /* Space between categories */
}

.skills-category h3 {
  font-weight: bold;
  font-size: 22px; /* Increase size for category titles */
  margin-bottom: 10px;
  text-align: center; /* Center the category title */
  color: #333; /* Darker color for better readability */
}

.sub-category {
  margin-top: 10px; /* Space before subcategory */
  background-color: #f8f9fa; /* Light background color for the bounding box */
  padding: 10px; /* Padding around the content */
  border-radius: 8px; /* Rounded corners for the bounding box */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.category-item {
  margin-bottom: 15px; /* Space between categories */
}

.sub-category ul {
  list-style-type: none; /* Remove default bullet points */
  padding-left: 0; /* Remove padding */
}

.tech-skills-list {
  display: flex; /* Align skills in a row */
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  justify-content: center; /* Center items horizontally */
}

.tech-skill {
  display: flex;
  flex-direction: column; /* Stack logo and description vertically */
  align-items: center; /* Center items horizontally */
  margin: 0 15px; /* Equal horizontal spacing between logos */
  text-align: center; /* Center text in the skill item */
}

.skill-logo {
  width: 80px; /* Increase logo size */
  height: 80px; /* Increase logo size */
  margin-bottom: 5px; /* Space between logo and description */
}

.skill-description {
  visibility: hidden; /* Hide description by default */
  opacity: 0; /* Start with no opacity */
  transition: opacity 0.3s ease; /* Smooth transition for opacity */
  background-color: #ffffff; /* Background for the description */
  border-radius: 5px; /* Rounded corners */
  padding: 5px 10px; /* Padding for the description */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  text-align: center; /* Center the text in the description */
}

.tech-skill:hover .skill-description {
  visibility: visible; /* Show description on hover */
  opacity: 1; /* Fade in the description */
}

.soft-skills-box,
.languages-box {
  background-color: #f8f9fa; /* Light background color for the bounding box */
  padding: 10px; /* Padding around the content */
  border-radius: 8px; /* Rounded corners for the bounding box */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.soft-skill-item,
.language-item {
  margin: 10px 0; /* Increase space between items */
  text-align: center; /* Center-align text */
}
</style>
