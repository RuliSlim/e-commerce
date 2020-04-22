<template>
  <v-app>
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue';

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  })
};
</script>
