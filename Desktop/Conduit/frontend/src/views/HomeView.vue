<template>
  <div class="home-page">
    <v-container fluid class="banner">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="logo-font">Conduit</h1>
          <p class="banner-description">A place to share your knowledge.</p>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="page">
      <v-row>
        <v-col cols="12" md="9">
          <v-card>
            <v-card-actions>
              <v-tabs background-color="transparent" slider-color="primary" class="feed-toggle">
                <v-tab>Your Feed</v-tab>
                <v-tab active>Global Feed</v-tab>
              </v-tabs>
            </v-card-actions>

            <!-- <v-card-text>
              <v-for="article in articles" :key="article.title">
                <v-card>
                  <v-card-title>
                    <v-avatar>
                      <img :src="article.author.image" />
                    </v-avatar>
                    <div class="info">
                      <router-link :to="`/profile/${article.author.username}`" class="author">{{ article.author.username
                        }}</router-link>
                      <span class="date">{{ article.date }}</span>
                      <v-btn icon @click="toggleFavorite(article)">
                        <v-icon>{{ article.favorited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                      </v-btn>
                    </div>
                  </v-card-title>

                  <router-link :to="`/article/${article.slug}`" class="preview-link">
                    <v-card-title>{{ article.title }}</v-card-title>
                    <v-card-text>{{ article.description }}</v-card-text>
                    <span>Read more...</span>
                    <v-list>
                      <v-list-item-group>
                        <v-list-item v-for="tag in article.tags" :key="tag">
                          <v-list-item-title class="tag-default tag-pill tag-outline">{{ tag }}</v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </router-link>
                </v-card>
                </v-for>
            </v-card-text> -->

            <v-pagination v-model="pagination" :length="totalPages" @input="fetchArticles" />
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card>
            <v-card-title>Popular Tags</v-card-title>
            <v-card-text>
              <div class="tag-list">
                <v-chip v-for="tag in popularTags" :key="tag" class="tag-pill tag-default" @click="filterByTag(tag)">
                  {{ tag }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      articles: [
        {
          title: 'How to build webapps that scale',
          description: 'This is the description for the post.',
          author: { username: 'Eric Simons', image: 'http://i.imgur.com/Qr71crq.jpg' },
          date: 'January 20th',
          slug: 'how-to-build-webapps-that-scale',
          favorited: false,
          tags: ['realworld', 'implementations'],
        },
        {
          title: 'The song you won’t ever stop singing. No matter how hard you try.',
          description: 'This is the description for the post.',
          author: { username: 'Albert Pai', image: 'http://i.imgur.com/N4VcUeJ.jpg' },
          date: 'January 20th',
          slug: 'the-song-you-wont-ever-stop-singing',
          favorited: false,
          tags: ['realworld', 'implementations'],
        },
        // Add more articles as needed...
      ],
      popularTags: ['programming', 'javascript', 'emberjs', 'angularjs', 'react', 'mean', 'node', 'rails'],
      pagination: 1,
      totalPages: 2, // Update this based on your articles length
    };
  },
  methods: {
    toggleFavorite(article) {
      article.favorited = !article.favorited; // Toggle favorite state
    },
    fetchArticles() {
      // Logic to fetch articles based on the pagination
      console.log(`Fetching articles for page: ${this.pagination}`);
    },
    filterByTag(tag) {
      // Logic to filter articles by tag
      console.log(`Filtering by tag: ${tag}`);
    },
  },
};
</script>

<style scoped>
.home-page {
  padding-top: 16px;
  /* Adjust for the app bar */
}

.banner {
  background-color: #f5f5f5;
  /* Light background for banner */
  padding: 40px 0;
  /* Padding for top and bottom */
}

.logo-font {
  font-size: 48px;
  /* Adjust logo size */
  font-weight: bold;
  color: #5c6bc0;
  /* Match the header/footer color */
}

.banner-description {
  color: #6c757d;
  /* Color for the description text */
}

.tag-default {
  margin: 4px;
  /* Space between tags */
}
</style>
