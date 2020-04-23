<template>
  <v-hover v-slot:default="{ hover }" >
    <v-card
      class="mx-auto"
      color="#93cdd1"
      max-width="600"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="card.image"
        @click="detail"
        style="cursor: pointer"
        class="image"
        position="top"
        :lazy-src="card.image"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            {{ card.price | currency }}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn
          absolute
          color="#9d8189"
          class="white--text"
          fab
          large
          right
          top
        >
          <v-icon @click="addToCart">mdi-cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">Stock: {{ card.stock }}</div>
        <h3 class="display-1 font-weight-light mb-2"
            @click="detail"
            color="#d8e2dc"
            style="cursor: pointer"
          >{{ card.name }}</h3>
        <div class="font-weight-light title mb-2">
          Description goes here
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['card'],
  name: 'Card',
  methods: {
    detail () {
      this.$store.commit('SET_PRODUCT', this.card);
      this.$router.push('product/' + this.card.name.replace(/ /g, '-').toLowerCase());
    },
    addToCart () {
      // console.log(this.card)
      if (!localStorage.getItem('access_token')) {
        this.$toasted.error('You have to login first', { duration: 4000 });
      } else {
        const data = {
          id: this.card.id,
          amount: 1
        };
        this.$store.dispatch('addToCart', data)
          .then(e => this.$toasted.success('Successfully added to Cart', { duration: 4000 }))
          .catch(e => {
            this.$toasted.error(e.response.data.message, { duration: 4000 });
          });
      }
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  justify-content: center;
  opacity: .5;
}
.image{
  border: 4px solid #9d8189 !important;
  border-radius: 4px;
  size: unset;
  width: auto;
  background-size: contain;
}
</style>
