import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import mixin from './mixins/index'

//应用 mint ui

import 'mint-ui/lib/style.css'
//引用mint
import ElementUI from 'element-ui'
import { loading } from 'element-ui'
//淡蓝色背景的
// import 'element-ui/lib/theme-chalk/index.css'
//投资背景颜色
import '../theme/index.css'
Vue.use(ElementUI)
Vue.mixin(mixin)
    //  axios.defaults.baseURL = '/engineer/';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = '/';
import axios from 'axios'
import $ from 'jquery'
import $http from './axios/http'

//开发环境
// Vue.prototype.$pathUrl = {
//   //地图 描边数据
//   division : '/devMap/permission/getDivision',
//   region : '/devMap/permission/getRegion',
//   county : '/gisDev/json/county.json',
//   province : '/gisDev/json/province.json',
//   city : '/gisDev/json/city.json',
//   chinaPart : '/gisDev/json/china.json',
//
// }
//打包环境
Vue.prototype.$pathUrl = {
    //地图 描边数据
    division: '/devMap/permission/getDivision',
    region: '/devMap/permission/getRegion',
    county: '/gis/county.json',
    province: '/gis/province.json',
    city: '/gis/city.json',
    chinaPart: '/gis/china.json',
}
Vue.prototype.$http = $http
Vue.config.productionTip = false;
Vue.use(Vuex)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    $http,
    components: { App },
    template: '<App/>'
})