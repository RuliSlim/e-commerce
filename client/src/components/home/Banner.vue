<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    class="radius"
    elevation="8"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
      height="auto"
    >
      <v-img :src="image[i]" class="customImage"
        position="top"
        :lazy-src="image[i]"
      ></v-img>
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
      const slides = [];
      this.$store.state.products.forEach(el => slides.push(el.name));
      return slides.slice(0, 5);
    },
    image () {
      const slides = [];
      this.$store.state.products.forEach(el => slides.push(el.image));
      return slides.slice(0, 5);
    }
  }
};
</script>

<style>
  .customImage{
    width: 100%;
    position: absolute;
    top: 100%;
    transform: translate(0, -30%);
    z-index: -10;
    border-radius: 20px;
  }
  .radius{
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
</style>
