import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OnBoard from '@/components/pages/OnBoard'
import Welcome from '@/components/pages/Welcome'
import Dashboard from '@/components/pages/Dashboard'
import Profile from '@/components/pages/Profile'
import Presets from '@/components/pages/Presets'
import Preset from '@/components/pages/Preset'
import ViewPreset from '@/components/pages/ViewPreset'
import Api from '@/components/pages/Api'

import store from '@/store'

Vue.use(Router)

const router = new Router({
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
      redirect: {
        name: 'Home'
      },
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
          path: 'preset/',
          name: 'preset',
          component: Preset,
          redirect: {
            name: 'presets'
          },
          children: [
            {
              path: 'new',
              name: 'newPreset',
              component: ViewPreset
            },
            {
              path: ':id',
              name: 'presetId',
              component: ViewPreset
            }
          ]
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

router.beforeEach((to, from, next) => {
  async function getTimestamps () {
    await store.dispatch('getTimestampsApi')

    next()
  }

  getTimestamps()
})

export default router
