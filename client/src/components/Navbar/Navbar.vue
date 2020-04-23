<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="60"
  >
    <v-app-bar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      fixed
      min-width="120px"
      color="#ffcad4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer; font-size: 2em">
        <img src="/assets/apple-touch-icon.png" width="15%" class="float-left"/>
        Artsymeup
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="group pa-2" style="margin: 0 1em; cursor: pointer"  @click="drawer = true">
        <v-badge
          color="#9d8189"
          :content="totalCarts"
          overlap
        >
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </span>
      <v-btn
        color="#9d8189"
        dark
        @click="isVisible = true"
        v-if="!isLogin"
      >
        Login/SignUp
      </v-btn>
      <v-btn
        color="#9d8189"
        dark
        v-else
        @click="logout"
      >
        Logout
      </v-btn>

      <User v-if="isVisible" @emitVisible="isVisible=false" @emitLogged="isLogin = true"/>
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
import User from './User.vue';
export default {
  components: { SideMenu, User },
  data: () => ({
    drawer: false,
    collapseOnScroll: true,
    isVisible: false,
    isLogin: false
  }),
  mounted () {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true;
      this.$store.dispatch('getCarts');
    }
  },
  computed: {
    totalCarts (total) {
      return this.$store.state.totalAmount;
    }
  },
  methods: {
    logout () {
      this.isLogin = false;
      this.$toasted.success('Bye', { duration: 4000 });
      localStorage.removeItem('access_token');
      this.$store.commit('RESET_STATE');
    }
  }
};
</script>
