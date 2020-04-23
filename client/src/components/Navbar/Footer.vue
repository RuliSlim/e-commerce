<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="warna">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(icon, i) in icons"
          :key="icon"
          class="mx-4"
          :href="link[i]"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Artsymeup Team</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-instagram',
      ],
      link: [
        'https://web.facebook.com/ruli.hayashi',
        'https://twitter.com/Total_Slim',
        'https://instagram.com/total_slim',
      ]
    }),
  }
</script>

<style>
.warna{
  background-color: #ffcad4;
}
</style>