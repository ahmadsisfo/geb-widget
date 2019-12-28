import Vue from 'vue'
import App from './app/App.vue'
import vuetify from './plugins/vuetify';
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import VueCurrencyFilter from 'vue-currency-filter'
import Moment from 'moment'

Vue.use(vueCustomElement)
Vue.config.productionTip = false
Vue.use(VueCurrencyFilter, {
  symbol : '', thousandsSeparator: '.', fractionCount: 0, fractionSeparator: ',', symbolPosition: 'front', symbolSpacing: false
})
Vue.prototype.$moment = Moment;

App.vuetify = vuetify
Vue.customElement('geb-widget', App)
