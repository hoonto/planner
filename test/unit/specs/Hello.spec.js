import Vue from 'vue'
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

const Planner = require('!!vue-loader?inject!@/components/Planner')

const PlannerWithMocks = Planner({
  // mock it
  '../services/PlansService': {
    get () {
      return {
        then (cb) {
          cb({
            data: [{
              attributes: {
                duedate: '2018-03-03',
                title: 'Later Plan',
                id: 'one'
              }
            }, {
              attributes: {
                duedate: '2018-02-02',
                title: 'Former Plan',
                id: 'two'
              }
            }]
          })
        }
      }
    }
  }
})

describe('Planner.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PlannerWithMocks)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.planner label').textContent)
      .to.equal('Add a maintenance plan:')
  })

  it('should load initial plans', done => {
    const vm = new Vue({
      template: '<div><planner></planner></div>',
      components: {
        'planner': PlannerWithMocks
      },
      data: {

      }
    }).$mount()

    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('li').length).to.equal(2)
      done()
    })
  })

  it('should order plans by date ascending', done => {
    const vm = new Vue({
      template: '<div><planner></planner></div>',
      components: {
        'planner': PlannerWithMocks
      },
      data: {

      }
    }).$mount()

    Vue.nextTick(() => {
      expect(vm.$el.querySelectorAll('li .title')[0].textContent.trim()).to.equal('Former Plan')
      expect(vm.$el.querySelectorAll('li .title')[1].textContent.trim()).to.equal('Later Plan')
      done()
    })
  })
})
