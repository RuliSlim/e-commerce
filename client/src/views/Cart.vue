<template>
  <v-container>
    <v-row>
      <v-col>
        <ListCart :items="getCarts"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCart from '@/components/Cart/ListCart.vue';
export default {
  name: 'Cart',
  components: { ListCart },
  computed: {
    getCarts () {
      return this.$store.state.cartsList;
    }
  }
};
</script>

<style>

</style>
