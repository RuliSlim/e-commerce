<template>
  <div class="d-flex flex-column flex-lg-row flex-md-row flex-xl-row flex-wrap">
    <Card v-for="(card, index) in cards" :key="'Card-' + index" class="cardProduct"
      :card="card"
    />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardList',
  components: { Card },
  computed: {
    cards () {
      return this.$store.state.products;
    }
  }
};
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
    /* min-width: 70%; */
    /* justify-self: self-start; */
    /* align-content: flex-start; */
    /* align-items: flex-start; */
    /* align-self: flex-start; */
  }
  @media only screen and (max-width: 1000px) {
  .cardProduct {
    width: 80%
  }
}
</style>
