<template>
  <v-card>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Email*" v-model="email" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('emitVisible')">Close</v-btn>
      <v-btn color="blue darken-1" text @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import { config } from '@/config/config.js';
axios.defaults.baseURL = config.$url;

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login () {
      const dataSend = {
        email: this.email,
        password: this.password
      };
      axios({
        method: 'POST',
        url: '/login',
        data: dataSend
      })
        .then(({ data }) => {
          this.$emit('emitVisible');
          this.$emit('emitLogged');
          localStorage.setItem('access_token', data.access_token);
          this.$store.dispatch('getCarts');
          this.$toasted.success(data.user.name, { duration: 4000 });
        })
        .catch(err => {
          this.$emit('emitVisible');
          const { data } = err.response;
          this.$toasted.error(data.message, { duration: 4000 });
        });
    }
  }
};
</script>

<style>

</style>
