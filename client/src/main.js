import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toasted from 'vue-toasted';
import vuetify from './plugins/vuetify';
import moment from 'moment';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(Toasted);
Vue.config.productionTip = false;

Vue.use(VueCurrencyFilter,
  {
    symbol : 'Rp.',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM/Do/YY')
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
