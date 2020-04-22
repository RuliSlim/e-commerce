<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-account</v-icon>
            Login
          </v-tab>
          <v-tab>
            <v-icon left>mdi-lock</v-icon>
            Register
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <Login @emitVisible="$emit('emitVisible')" @emitLogged="$emit('emitLogged')"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <Register @emitVisible="$emit('emitVisible')" @emitLogged="$emit('emitLogged')"/>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  name: 'User',
  components: { Login, Register },
  data () {
    return {
      dialog: true
    }
  },
  methods: {
  }
}
</script>