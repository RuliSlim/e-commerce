<template>
  <v-container >
    <v-row>
      <v-col md="4">
        <v-img :src="item.image" aspect-ratio="1"></v-img>
      </v-col>
      <v-col md="8">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Detail',
  computed: {
    item () {
      return this.$store.state.product;
    }
  }
};
</script>

<style>

</style>
