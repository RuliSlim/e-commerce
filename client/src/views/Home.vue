<template>
  <div class="">
    <Banner />
    <CardList />
  </div>
</template>

<script>
import Banner from '@/components/home/Banner.vue';
import CardList from '@/components/home/CardList.vue';

export default {
  name: 'Home',
  components: { Banner, CardList },
  data () {
    return {
    };
  }
};
</script>

<style scoped>

</style>
