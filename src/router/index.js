import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OnBoard from '@/components/pages/OnBoard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'onboard/step/:id',
          component: OnBoard,
          name: 'OnBoard'
        }
      ]
    },
    {
      path: '/*',
      redirect: {
        name: 'Home'
      }
    }
  ]
})
