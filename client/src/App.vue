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
  }),
  mounted () {
    this.$store.dispatch('getProducts');
  },
  computed: {
    image () {
      const slides = [];
      this.$store.state.products.forEach(el => slides.push(el.image));
      return slides.slice(0, 5);
    }
  }
};
</script>

<style >
  #app{
    background-color: #a7d0b8 !important;
  }
</style>
