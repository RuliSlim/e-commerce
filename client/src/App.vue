<template>
  <v-app>
    <div class="" v-if="products.length">
      <Navbar />
      <router-view />
      <Footer />
    </div>
    <div class="" v-else>
      <atom-spinner
        :animation-duration="1000"
        :size="100"
        color="#ff1d5e"
        style="position: absolute; top: 40%; left: 50%;"
      />
    </div>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue';
import Footer from './components/Navbar/Footer.vue';
import { AtomSpinner } from 'epic-spinners';

export default {
  name: 'App',

  components: {
    Navbar,
    'atom-spinner': AtomSpinner,
    Footer
  },
  data: () => ({
    isLoading: true
  }),
  mounted () {
    this.$store.dispatch('getProducts');
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
};
</script>

<style >
  #app{
    background-color: #ffe5d9 !important;
  }
</style>
