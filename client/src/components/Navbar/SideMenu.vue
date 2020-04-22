<template>
  <v-list
    nav
    dense
    rounded
  >
    <v-list-item-group
      active-class="deep-purple--text text--accent-4"
      mandatory
    >
      <v-list-item >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        no-action
        sub-group
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-icon>
              <v-icon>shopping_cart</v-icon>
              Your Cart
            </v-list-item-icon>
          </v-list-item-content>
        </template>
  
        <v-list-item two-line
          v-for="(product, i) in cartList"
          :key="i"
        >
          <v-list-item-title v-text="product.name" @click="detail(product.name)"></v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item @click="checkout">
        <v-list-item-icon>
          <v-icon>payment</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Checkout</v-list-item-title>
      </v-list-item>

    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ['menuVisible'],
  data: () => ({
    isVisible: false
  }),
  mounted () {
    // this.cartList;
  },
  computed: {
    cartList () {
      return this.$store.state.cartsList
    }
  },
  watch: {
    
  },
  methods: {
    detail (name) {
      this.$router.push( {
        path: 'product/' + name.replace(/ /g, '-').toLowerCase()
      });
    },
    checkout () {
      this.$router.push('/cart')
    }
  }
};
</script>

<style>

</style>
