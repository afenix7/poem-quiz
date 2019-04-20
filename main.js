import Vue from 'vue'
import App from './App'
import store from './store'
import Bmob from "hydrogen-js-sdk";

Vue.config.productionTip = false

Bmob.initialize("你的Application ID", "你的REST API Key");
Vue.prototype.Bmob = Bmob;
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
