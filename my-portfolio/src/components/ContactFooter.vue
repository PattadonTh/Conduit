<template>
  <footer class="footer">
    <div class="container">
      <div class="contact-and-social">
        <!-- Contact Info and Social Links -->
        <div v-for="(contact, index) in contactInfo" :key="index" class="contact-item">
          <img :src="require(`@/assets/${contact.icon}`)" :alt="contact.name" class="contact-icon" />
          <a :href="contact.link">{{ contact.value }}</a>
        </div>
        <div v-for="(link, index) in socialLinks" :key="index" class="social-item">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            <img :src="require(`@/assets/${link.icon}`)" :alt="link.name" class="social-icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ContactFooter',
  data() {
    return {
      contactInfo: [
        { name: 'Location', icon: 'location_icon.png', value: '199/63, Siriporn 2 Village, Nongjom, Sansai, Chiangmai, 50210, Thailand', link: '#' },
        { name: 'Email', icon: 'email_icon.png', value: 'Pattadon_th@hotmail.com', link: `mailto:Pattadon_th@hotmail.com` },
        { name: 'Phone', icon: 'phone_icon.png', value: '+66 869202777', link: `tel:+66869202777` }
      ],
      socialLinks: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pattadon-thepkan-475192230/', icon: 'linkedin_icon.png' },
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-and-social {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  align-items: center; 
  gap: 1.5rem; 
}

.contact-item, .social-item {
  display: flex;
  align-items: center;
}

.contact-icon, .social-icon {
  width: 24px;  
  height: 24px; 
  margin-right: 0.5rem;
}

.contact-item a, .social-item a {
  font-size: 14px;
  color: inherit;
  text-decoration-line: none;
}

</style>
