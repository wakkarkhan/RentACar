import Vue from 'vue'
import App from './App.vue'
import store from './store';
import axios from 'axios'
import moment from 'moment'
import AlertComponent from './components/Shared/Alert.vue';
import SuccessComponent from './components/Shared/Success.vue';
import EditCarDialog from './components/Car/Edit/EditCarDialog.vue';
import EditCompanyDialog from './components/Company/Edit/EditCompanyDialog.vue';


import Vuetify from 'vuetify'
import router from './router/index';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.use(router);
Vue.use(axios)
Vue.prototype.moment = moment;

Vue.component('alert-component', AlertComponent)
Vue.component('success-component', SuccessComponent)
Vue.component('edit-car-dialog', EditCarDialog)
Vue.component('edit-company-dialog', EditCompanyDialog)

import 'vuetify/dist/vuetify.min.css'  

new Vue({
  el: '#app',
  router,
  store,
  axios,
  VeeValidate,
  render: h => h(App), 
  created() {
    store.dispatch('setLoadingTrue');
    axios.get('http://localhost:8000/api/cars')
          .then(function (response) {
            store.dispatch('setCars', response.data.data );
            store.dispatch('setLoadingFalse');
          })
          .catch(function (error) {
            store.dispatch('setLoadingFalse');
            store.dispatch('setError', error);
          });
    this.$store.dispatch('autoSignIn');
    store.dispatch('setLoadingTrue');
    axios.get('http://localhost:8000/api/companies')
          .then(function (response) {
            store.dispatch('setCompanies', response.data.data);
            store.dispatch('setLoadingFalse');
          })
          .catch(function (error) {
            store.dispatch('setLoadingFalse');
            store.dispatch('setError', error);
          });
  }
})
