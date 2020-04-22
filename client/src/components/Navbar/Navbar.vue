<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="60"
  >
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      fixed
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        dark
        @click="isVisible = true"
      >
        Login
      </v-btn>

      <Login v-if="isVisible" @emitVisible="isVisible=false"/>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <SideMenu />
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import SideMenu from './SideMenu.vue';
import Login from './Login.vue';
export default {
  components: { SideMenu, Login },
  data: () => ({
    drawer: false,
    collapseOnScroll: true,
    isVisible: false
  })
};
</script>
