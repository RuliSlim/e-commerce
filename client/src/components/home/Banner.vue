<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
      height="auto"
    >
      <img :src="image[i]" class="customImage">
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">{{ slide }}</div>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'Banner',
  computed: {
    slides () {
      let slides = []
      this.$store.state.products.forEach(el => slides.push(el.name));
      return slides.slice(0,5);
    },
    image () {
      let slides = []
      this.$store.state.products.forEach(el => slides.push(el.image));
      return slides.slice(0,5);
    }
  }
}
</script>

<style>
  .customImage{
    width: 100%;
    position: absolute;
    /* left: 20%;               */
    top: 100%;                         
    transform: translate(0, -50%);
    z-index: -10;
  }
</style>