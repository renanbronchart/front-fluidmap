import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OnBoard from '@/components/pages/OnBoard'
import Welcome from '@/components/pages/Welcome'
import Dashboard from '@/components/pages/Dashboard'
import Profile from '@/components/pages/Profile'
import Presets from '@/components/pages/Presets'
import Preset from '@/components/pages/Preset'
import Api from '@/components/pages/Api'

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
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'user/:name',
          name: 'profile',
          component: Profile
        },
        {
          path: 'presets',
          name: 'presets',
          component: Presets
        },
        {
          path: 'preset/:id',
          name: 'preset',
          component: Preset
        },
        {
          path: 'api',
          name: 'api',
          component: Api
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
