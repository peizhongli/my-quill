import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import clickOutside from './components/directive/clickOutside'


Vue.use(Element, { size: 'small' });
Vue.directive('clickOutside',clickOutside)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
