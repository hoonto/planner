import Vue from 'vue'
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

import Planner from '@/components/Planner'

describe('Planner.vue', () => {
  it.skip('should render correct contents', () => {
    const Constructor = Vue.extend(Planner)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js PWA')
  })
})
