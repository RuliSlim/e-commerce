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
              <v-text-field label="Name*" v-model="name" required></v-text-field>
            </v-col>
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
      <v-btn color="blue darken-1" text @click="register">Login</v-btn>
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
    name: '',
    password: ''
  }),
  methods: {
    register () {
      this.$emit('emitVisible');
      let dataSend = {
        email: this.email,
        name: this.name,
        password: this.password
      }
      axios({
        method: 'POST',
        url: '/register',
        data: dataSend
      })
        .then(({data}) => {
          localStorage.setItem('access_token', data.access_token);
          this.$toasted.success(data.user.name, {duration: 4000});
          this.$emit('emitLogged');
        })
        .catch(err => {
          let {data} = err.response
          this.$toasted.error(data.message, {duration: 4000});
        })
    }
  }
}
</script>

<style>

</style>