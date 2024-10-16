<template>
  <div class="wrapper">
    <div class="resume-container" ref="resumeContent">
      <!-- Button to save PDF -->
      <div class="button-container">
        <button class="save-pdf-button" @click="downloadPDF">Save to PDF</button>
      </div>

      <!-- Top Section -->
      <header class="resume-header">
        <div class="header-background">
          <div class="profile-picture-container">
            <img class="profile-photo" src="@/assets/Profile_square.png" alt="Profile Photo" />
          </div>
          <div class="contact-info">
            <div class="contact-left">
              <h1>Pattadon Thepkan</h1>
              <p>Email: Pattadon_th@hotmail.com</p>
              <p>Phone: (+66) 869202777</p>
              <p>Date of birth: May 16, 1997</p>
            </div>
            <div class="contact-right">
              <div class="social-links">
                <a href="https://www.linkedin.com/in/pattadon-thepkan-475192230/" target="_blank">LinkedIn: Pattadon Thepkan</a>
                <a href="https://github.com/PattadonTh" target="_blank">GitHub: PattadonTh</a>
                <!-- <a href="https://yourwebsite.com" target="_blank">Website</a> -->
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Career Summary Section -->
      <section class="career-summary">
        <h2>Career Summary</h2>
        <p>
          A mechanic engineer who transitioned into the tech industry by developing self-taught programming skills. 
          These skills helped me excel in my first role as an RPA developer, where I created automation solutions 
          that integrate RPA with web technologies. Currently pursuing a master's degree in Data Science, focusing 
          on a thesis related to computer vision.
        </p>
      </section>

      <!-- Work Experience and Education Section -->
      <section class="work-education">
        <div class="work-experience">
          <div class="timeline">
            <h2>Work Experience</h2>
            <div class="experience-item" v-for="(item, index) in workExperience" :key="index">
              <h3>{{ item.position }}</h3>
              <p>{{ item.startDate }} - {{ item.endDate }}</p>
              <ul class="experience-description">
                <li v-for="(desc, dIndex) in item.description" :key="dIndex">{{ desc }}</li>
              </ul>
            </div>
          </div>
          <div class="timeline">
            <h2>Education</h2>
            <div class="education-item" v-for="(edu, index) in education" :key="index">
              <h3>{{ edu.program }}</h3>
              <p>{{ edu.institution }}, {{ edu.startDate }} - {{ edu.endDate }}</p>
              <p v-if="edu.thesis" class="thesis">
                <span>Thesis: Measuring Food Intake:</span><br />
                <span>A Computer Vision Approach to Thai Cuisine</span>
              </p>
            </div>
          </div>
        </div>

        <div class="skills-tools">
          <h2>Skills & Tools</h2>
          <div class="skills-category" v-for="(skillCategory, index) in skills" :key="index">
            <h3>{{ skillCategory.title }}</h3>
            <ul class="skills-list">
              <li v-for="(skill, sIndex) in skillCategory.skills" :key="sIndex">
                {{ skill.name }} - {{ skill.proficiency }}
              </li>
            </ul>
          </div>

          <h2>Languages</h2>
          <ul class="languages-list">
            <li v-for="(language, index) in languages" :key="index">{{ language.name }} ({{ language.proficiency }})</li>
          </ul>
        </div>
      </section>

      <footer class="resume-footer">
        <!-- Footer content can go here if needed -->
      </footer>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  name: 'MyResume',
  data() { 
    return {
      workExperience: [
        {
          position: 'RPA Developer, STelligence',
          startDate: 'May 2022',
          endDate: 'Present',
          description: [
            'Developing and deploying automation tools and scripts',
            'Collaborating with cross-functional teams',
            'Troubleshooting and maintaining automation systems',
            'Ensuring optimal performance of automated workflows',
          ],
        },
        {
          position: 'Project Engineer, Union Construction and Supply',
          startDate: 'Apr 2020',
          endDate: 'Apr 2022',
          description: [
            'Define project scope, timeline, resources, and risks.',
            'Create detailed project schedule and allocate resources.',
            'Manage teams, materials, and communication.',
            'Track progress, quality, and issues.',
          ],
        },
      ],
      education: [
        {
          program: 'MSc in Data Science',
          institution: 'Chiangmai University',
          startDate: '2023',
          endDate: 'Present',
          thesis: true,
        },
        {
          program: 'BEng in Mechanical Engineering',
          institution: 'Chiangmai University',
          startDate: '2015',
          endDate: '2019',
        },
      ],
      skills: [
        {
          title: 'Web Development',
          skills: [
            { name: 'Node.js', proficiency: 'Advanced' },
            { name: 'Vue.js', proficiency: 'Intermediate' },
            { name: 'Django', proficiency: 'Beginner' },
          ]
        },
        {
          title: 'Data Science',
          skills: [
            { name: 'Data Analysis', proficiency: 'Advanced' },
            { name: 'Data Visualization', proficiency: 'Intermediate' },
            { name: 'Data Engineering', proficiency: 'Intermediate' },
            { name: 'Machine Learning', proficiency: 'Advanced' },
            { name: 'Statistics', proficiency: 'Intermediate' },
          ]
        },
        {
          title: 'Automation',
          skills: [
            { name: 'Automation Anywhere', proficiency: 'Expert' },
            { name: 'UI Path', proficiency: 'Intermediate' },
          ]
        },
        {
          title: 'Others',
          skills: [
            { name: 'SQL', proficiency: 'Advanced' },
            { name: 'GIT', proficiency: 'Intermediate' },
            { name: 'Docker', proficiency: 'Intermediate' },
          ]
        }
      ],
      languages: [
        { name: 'Thai', proficiency: 'Native' },
        { name: 'English', proficiency: 'Proficient' },
        { name: 'Chinese', proficiency: 'Intermediate' },
      ],
    };
  },
  methods: {
    downloadPDF() {
      const element = this.$refs.resumeContent;
      
      // Hide the button temporarily
      const button = document.querySelector('.save-pdf-button');
      button.style.display = 'none'; // Hide button

      const options = {
        margin: 0, // Set all margins to 0
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        onclone: (doc) => {
          const buttonClone = doc.querySelector('.save-pdf-button');
          if (buttonClone) {
            buttonClone.style.display = 'none'; // Keep button hidden in PDF
          }
        }
      };

      html2pdf().from(element).set(options).save().then(() => {
        button.style.display = ''; // Restore button after download
      });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box; /* Include padding and border in element's total width and height */
  margin: 0; /* Remove margin from all elements */
  padding: 0; /* Remove padding from all elements */
}

.wrapper {
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Full viewport height */
}

body {
  display: flex; /* Use flexbox for centering */
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Align at the top */
  min-height: 100vh; /* Full viewport height */
  margin: 0; /* Remove default body margin */
}

.resume-container {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0;
}

.button-container {
  text-align: right; /* Align button to the right */
}

.save-pdf-button {
  background-color: #007bff; /* Button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
}

.save-pdf-button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.resume-header {
  display: flex;
  align-items: stretch; /* Stretch items to equal height */
  width: 100%; /* Full width */
}

.header-background {
  display: flex;
  width: 100%; /* Full width */
  background-color: rgba(0, 0, 0, 0.5); /* Darker background for the header */
}

.profile-picture-container {
  width: 25%; /* Ratio for the picture (1:4) */
  display: flex; /* Use flex to center the photo */
  justify-content: center; /* Center the photo horizontally */
  align-items: center; /* Center the photo vertically */
  background-color: rgba(190, 190, 190, 0.5);
}

.profile-photo {
  width: 100%; /* Adjust the size of the photo */
  height: auto; /* Maintain aspect ratio */
}

.contact-info {
  color: white; /* White font color */
  width: 75%; /* Ratio for contact info */
  display: flex; /* Use flex to arrange text */
  justify-content: space-between; /* Space out content evenly */
  padding: 10px; /* Maintain some padding */
}

.contact-left {
  display: flex;
  flex-direction: column; /* Arrange text vertically */
  justify-content: center; /* Center the content vertically */
  text-align: left; /* Align text to the left */
  width: 60%;
}

.contact-right {
  display: flex;
  flex-direction: column; /* Arrange social links vertically */
  justify-content: center; /* Center the links */
  text-align: left; /* Align text to the left */
  width: 40%;
}

.contact-info h1,
.contact-info p {
  color: white; /* Ensure font color is white for all text */
  margin: 5px 0; /* Add margin to create gaps between rows */
}

.social-links {
  display: flex;
  flex-direction: column; /* Align links vertically */
}

.social-links a {
  margin-bottom: 5px; /* Space between links */
  color: white; /* Change link color to white */
  text-decoration: none;
}

.social-links a:hover {
  text-decoration: underline; /* Underline on hover */
}

.career-summary {
  padding: 10px; /* Padding for the career summary */
  background-color: #e9ecef; /* Light grey background for the summary */
  text-align: center; /* Center align text in career summary */
  border-radius: 0;
}

.career-summary h2 {
  margin: 0 0 10px; /* Margin for heading */
  text-align: center; /* Center align the heading */
}

.work-education {
  display: flex; /* Use flexbox to layout sections */
  flex-grow: 1; /* Allow this section to grow to fill space */
}

.work-experience {
  width: 62%; /* Left section for timeline (8 parts) */
  background-color: #f6fbff; /* Light Alice Blue background for work experience */
  text-align: center;
  padding-top: 20px;
  padding-bottom: 0px; /* Add space at the bottom */
}

.experience-description {
  margin-top: 5px; /* Add space between job title and description */
  padding-left: 40px; /* Add indentation for the list as a whole */
  list-style-position: outside; /* Keep bullet outside of the block */
}

.experience-description li {
  margin-bottom: 5px; /* Add space between list items */
  text-align: justify; /* Align the text across the row */
  text-indent: -20px; /* Create a "hanging indent" effect */
  padding-left: 20px; /* Indent the text itself, not the bullet */
  font-size: 14px; /* Adjust the font size */
  line-height: 1.5; /* Adjust the line height for readability */
}

.timeline {
  margin: 0; /* Remove margin to avoid gaps */
  text-align: center;
}

.skills-tools {
  width: 38%; /* Right section for skills (2 parts) */
  display: flex;
  flex-direction: column; /* Stack skills and languages vertically */
  text-align: left;
  background-color: #f0f7fd; /* Light blue background for skills */
  padding-top: 20px; /* Add space at the top */
  padding-bottom: 0px; /* Add space at the bottom */
}

.work-experience h2,
.education h2 {
  margin: 0 0 10px; /* Margin for headings */
  text-align: center;
  text-decoration:underline;
}

.experience-item {
  margin-bottom: 20px; /* Space between experience items */
  padding-left: 30px
}

.education-item {
  margin-bottom: 20px; 
}


.experience-item h3 {
  margin: 5px 0; /* Space around job title */
}

.skills-tools h2 {
  margin: 0 0 10px; /* Margin for heading */
  text-align: center;
  text-decoration:underline;
}

.skills-tools h3 {
  margin: 0 0 10px; /* Margin for heading */
  text-align: center;
}

.skills-list,
.languages-list {
  padding-left: 50px; /* Indentation for the bullet points */
  margin-top: 10px; /* Space above the list */
  margin-bottom: 20px; /* Space below the list */
}

.languages-section {
  margin: 0; /* No margin to avoid gap */
  padding: 20px; /* Padding for the languages section */
  background-color: #ffe6e6; /* Light pink background for languages */
}

.languages-section h2 {
  margin: 0 0 10px; /* Margin for heading */
  text-decoration:underline;
}

.languages-section ul {
  padding: 0; /* Remove padding for the list */
  list-style-type: none; /* Remove bullet points */
  text-align: left;
}

.languages-section li {
  margin-bottom: 5px; /* Add space between list items */
}

.thesis {
 font-style: italic
}

</style>