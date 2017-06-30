import Vue from 'vue'
import ErrorMonkey from './ErrorMonkey'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(ErrorMonkey)
})
