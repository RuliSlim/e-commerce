<template>
  <v-card
    max-width="850"
    class="mx-auto"
  >
    <v-toolbar
      color="#d8e2dc"
    >
      <v-toolbar-title style="display: block; width: 100%;">{{item.name}}
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-list three-line>
        <template>
          <v-list-item
            :key="item.title"
          >
            <v-list-item-avatar>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
              </v-list-item-title>
              <v-list-item-subtitle >
                Amount: {{ amount }}
                  <v-text-field
                    v-model="amount"
                    hide-details
                    single-line
                    type="number"
                    :max="item.stock"
                    @blur="addToCart"
                  />
              </v-list-item-subtitle>
              <v-list-item-subtitle >Total: {{ amount * item.price  | currency }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
  </v-card>
</template>

<script>
export default {
  props: ['item'],
  name: 'DetailCard',
  data() {
    return {
      amount: 0,
    }
  },
  methods: {
    updateCart (item) {
      const data = {
        id: item.CartId,
        ProductId: item.id,
        amount: item.amount
      };
      this.$store.dispatch('updateCart', data);
    },
    addToCart () {
      // console.log(this.card)
      if (!localStorage.getItem('access_token')) {
        this.$toasted.error('You have to login first', { duration: 4000 });
      } else {
        const data = {
          id: this.item.id,
          amount: this.amount
        };
        // console.log(data, 'data cuy')
        this.$store.dispatch('addToCart', data)
          .then(e => this.$toasted.success('Successfully added to Cart', { duration: 4000 }))
          .catch(e => {
            this.$toasted.error(e.response.data.message, { duration: 4000 });
          });
      }
    }
  },
  computed: {
    checkProduct() {
      this.$store.state.cartsList.forEach(el => {
        if (el.id == this.item.id) {
          return this.amount = el.amount;
        }
      })
      // return this.amount = 0
    }
  },
  mounted () {
    this.checkProduct
  },
  beforeUpdate () {
    this.checkProduct
  }
};
</script>

<style>

</style>
