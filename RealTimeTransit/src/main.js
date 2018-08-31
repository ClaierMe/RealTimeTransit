// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import '../node_modules/mint-ui/lib/style.css'

Vue.config.performance = true
Vue.config.productionTip = true

Vue.use(MintUI)
Vue.use(VueRouter)

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  routes: routers
})

router.beforeEach((to, from, next) => {
  next()
  document.title = to.meta.title
})
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
