<template>
  <div class="planner">
    <md-layout md-align="center" md-gutter="8">
      <md-layout md-flex-xsmall="90" md-flex-small="90" md-flex-medium="50" md-flex-large="60">
        <md-input-container>
          <label>Add a maintenance plan:</label>
          <md-input v-model="title"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-flex-xsmall="90" md-flex-small="90" md-flex-medium="40" md-flex-large="30">
        <datepicker class="datepicker" :date="duedate" :option="dateOptions"></datepicker>
        <md-button class="add-button md-icon-button md-raised md-primary" v-on:click.native="addPlan()">
          <md-icon>add</md-icon>
        </md-button>
      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter="16">
      <ul>
        <li v-for="plan in plans" v-bind:class="{ 'current-year': plan.currentYear, 'next-year': plan.nextYear }">
          <md-layout md-align="left" md-flex="70">
            <span>
              {{plan.attributes.title}}
            </span>
          </md-layout>
          <md-layout md-align="center" md-flex="20">
            <span>
              {{plan.displayDate}}
            </span>
          </md-layout>
          <md-layout md-flex="10">
            <md-button class="add-button md-icon-button md-raised md-warn md-dense" v-on:click.native="delPlan(plan.id)">
              <md-icon>delete</md-icon>
            </md-button>
          </md-layout>
        </li>
      </ul>
    </md-layout>
  </div>
</template>

<script>

import moment from 'moment'
import datepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import plans from '../services/PlansService'

export default {
  name: 'planner',
  data () {
    this.getPlans()
    return {
      msg: 'Welcome to Your Vue.js PWA',
      plans: [],
      title: '',
      duedate: {
        time: ''
      },
      dateOptions: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'Maintenance Date',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        }
      }
    }
  },
  methods: {
    getPlans () {
      return plans.get().then(plans => {
        const today = moment()
        const locale = window.navigator.userLanguage || window.navigator.language

        this.plans = plans.data.filter(plan => moment(plan.attributes.duedate).isSameOrAfter(today))
          .sort((plan1, plan2) => moment.utc(plan1.attributes.duedate).diff(moment.utc(plan2.attributes.duedate)))
          .map(plan => {
            moment.locale(locale)

            plan.currentYear = moment(plan.attributes.duedate).format('YYYY') === today.format('YYYY')
            plan.nextYear = moment(plan.attributes.duedate).isBetween(moment().endOf('year'), moment().add(1, 'years'))
            plan.displayDate = moment(plan.attributes.duedate).format('L')
            return plan
          })
      })
    },
    addPlan () {
      return plans.post({
        title: this.title,
        duedate: this.duedate.time
      })
      .then(() => this.getPlans())
    },
    delPlan (id) {
      return plans.del(id)
      .then(() => this.getPlans())
    }
  },
  components: {
    'datepicker': datepicker
  }
}
</script>

<style lang="stylus" scoped>

ul
  list-style-type: none

  li
    display: flex
    background-color: #EEE
    padding: 10px
    text-align: left
    justify-content: space-between
    border-radius: 5px
    border:solid 5px #EEE

    &.current-year
      border-color: #333

    &.next-year
      border-color: #999

    span
      word-wrap: break-word

.datepicker
  margin-top: 12px

.add-button
  margin-top: 12px

</style>
