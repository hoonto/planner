import Vue from 'vue'
import Router from 'vue-router'
import Planner from '@/components/Planner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Planner',
      component: Planner
    }
  ]
})
