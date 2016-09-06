import Component from 'ember-component';
import computed from 'ember-computed';
import Months from '../utils/harvest-months';
import layout from '../templates/components/harvest-month-view';

export default Component.extend({
  layout,

  prefix: 'eh',

  tagName: 'table',

  attributeBindings: ['isHidden:hidden'],

  classNameBindings: ['monthClass'],

  isHidden: false,

  selectedMonth: null,

  monthClass: computed('prefix', function () {
    return `${this.get('prefix')}-month-view`;
  }),

  monthList: Months,

  monthRows: computed('monthList', function () {
    let months = this.get('monthList');
    return [
      months.slice(0,4),
      months.slice(4,8),
      months.slice(8)
    ];
  }),

  actions: {
    select(month) {
      if (this.get('select')) {
        this.get('select')(month);
      } else {
        this.set('selectedMonth', month);
      }
    }
  }
});
