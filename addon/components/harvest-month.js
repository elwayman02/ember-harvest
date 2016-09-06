import Component from 'ember-component';
import computed from 'ember-computed';
import Months from '../utils/harvest-months';
import layout from '../templates/components/harvest-month';

export default Component.extend({
  layout,
  tagName: 'td',

  classNameBindings: ['selectedClass'],

  month: null,

  selectedMonth: null,

  months: Months,

  selectedClass: computed('monthSelected', 'prefix', function () {
    return this.get('monthSelected') ? `${this.get('prefix')}-selected-month` : '';
  }),

  index: computed('month', 'months', function () {
    return this.get('months').indexOf(this.get('month'));
  }),

  monthSelected: computed('selectedMonth', 'index', function () {
    return this.get('selectedMonth') === this.get('index');
  }),

  click() {
    this.get('select')(this.get('index'));
  }
});
