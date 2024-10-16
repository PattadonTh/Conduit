import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Education from '../views/EducationPage.vue';
import Projects from '../views/ProjectsPage.vue';
import Experience from '../views/ExperiencePage.vue';
import Skill from '../views/SkillPage.vue';
import MyResume from '@/components/MyResume.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/education',
    name: 'Education',
    component: Education,
  },
  {
    path: '/experience',
    name: 'Experience',
    component: Experience,
  },
  {
    path: '/skill',
    name: 'Skill',
    component: Skill,
  },
  {
      path: '/resume',
      name: 'Resume',
      component: MyResume,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
