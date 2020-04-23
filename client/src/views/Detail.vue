<template>
  <v-container >
    <v-row>
      <v-col md="4">
        <v-img :src="item.image"></v-img>
      </v-col>
      <v-col md="8">
        <DetailCard :item="item" class="customHeight"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DetailCard from '@/components/home/DetailCard.vue';

export default {
  name: 'Detail',
  components: { DetailCard },
  computed: {
    item () {
      return this.$store.state.product;
    }
  }
};
</script>

<style>
  .customHeight{
    height: 100%;
  }
</style>
