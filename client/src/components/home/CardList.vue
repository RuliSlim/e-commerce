<template>
  <div class="d-flex flex-md-row flex-sm-column flex-wrap">
    <Card v-for="(card, index) in cards" :key="'Card-' + index" class="cardProduct" :card="card"/>
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardList',
  components: { Card },
  computed: {
    cards () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
  .flexCard{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .cardProduct{
    margin: 2.5em;
    width: 30%;
    /* justify-self: self-start; */
    /* align-content: flex-start; */
    /* align-items: flex-start; */
    /* align-self: flex-start; */
  }
</style>