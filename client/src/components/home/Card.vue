<template>
  <v-hover v-slot:default="{ hover }" >
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
      @click="detail"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="card.image"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            Rp {{ card.price }}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn
          absolute
          color="orange"
          class="white--text"
          fab
          large
          right
          top
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">Stock: {{ card.stock }}</div>
        <h3 class="display-1 font-weight-light orange--text mb-2">{{ card.name }}</h3>
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
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>