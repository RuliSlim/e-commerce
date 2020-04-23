<template>
  <v-card
    max-width="850"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-toolbar-title style="display: block; width: 100%;">Checkout
        <a class="float-right" @click="checkout">
          Buy
          <v-icon>shopping_basket</v-icon>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
                <a class="float-right" @click="clear(item.CartId)"><v-icon>clear</v-icon></a>
              </v-list-item-title>
              <v-list-item-subtitle >
                Amount: {{ item.amount }}
                  <v-text-field
                    v-model="item.amount"
                    hide-details
                    single-line
                    type="number"
                    :max="item.stock"
                    @blur="updateCart(item)"
                  />
              </v-list-item-subtitle>
              <v-list-item-subtitle >Total: {{ item.amount * item.price  | currency }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
        <v-list-item >
          <v-list-item-icon>
            <v-icon>payment</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Total
            <span class="float-right">{{ totalPrice | currency }} </span></v-list-item-title>
        </v-list-item>
      </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['items'],
  name: 'ListCart',
  methods: {
    clear (id) {
      this.$store.dispatch('deleteCart', id)
        .then((data) => {
          this.$toasted.success(data.message, { duration: 4000 });
          this.$store.dispatch('getCarts');
        })
        .catch(err => this.$toasted.error(err.response.data.message, { duration: 4000 }));
    },
    updateCart (item) {
      const data = {
        id: item.CartId,
        ProductId: item.id,
        amount: item.amount
      };
      this.$store.dispatch('updateCart', data);
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(data => {
          this.$toasted.success('Thank you!', { duration: 4000 });
          this.$store.dispatch('getCarts');
          this.$store.dispatch('getProducts');
          this.$router.push('/');
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, { duration: 4000 });
        });
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.items.forEach(item => {
        total += Number(item.price * item.amount);
      });
      return total;
    }
  }
};
</script>

<style>

</style>
