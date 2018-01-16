import Vue from 'vue'
import Router from 'vue-router'
import MapHome from '@/components/d3-components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapHome',
      component: MapHome
    }
  ]
})
