<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
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
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: true,
      email: '',
      password: ''
    }),
    methods: {
      login () {
        alert('YOf')
        this.$emit('emitVisible')
      }
    }
  }
</script>