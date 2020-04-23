<template>
  <div class="">
    <div class="d-flex flex-column flex-lg-row flex-md-row flex-xl-row flex-wrap" v-if="cards.length">
        <Card v-for="(card, index) in cards" :key="'Card-' + index" class="cardProduct"
          :card="card"
        />
    </div>
    <div class="" v-else>
      <atom-spinner
        :animation-duration="1000"
        :size="80"
        color="#ff1d5e"
        style="position: absolute; top: 40%; left: 50%;"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import { AtomSpinner } from 'epic-spinners';

export default {
  name: 'CardList',
  components: { Card, 'atom-spinner': AtomSpinner },
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
