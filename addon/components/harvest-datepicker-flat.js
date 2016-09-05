import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-datepicker-flat';
import DateObject from '../utils/harvest-date';
import Months from '../utils/harvest-months';

export default Component.extend({
  layout,

  classNameBindings: ['datepickerClass'],

  prefix: 'eh',

  selectedDate: null,

  viewDate: null,

  months: Months,

  datepickerClass: computed('prefix', function () {
    return `${this.get('prefix')}-datepicker`;
  }),

  init() {
    this._super(...arguments);
    let selectedDate = this.get('selectedDate');
    this.set('viewDate', DateObject.create());
    if (selectedDate) {
      this.setViewDate(selectedDate);
    }
  },

  year: computed.readOnly('viewDate.year'),

  month: computed.readOnly('viewDate.month'),

  monthName: computed('month', 'months', function () {
    return this.get('months')[this.get('month')].name;
  }),

  setToday() {
    this.setViewDate(new Date());
  },

  setViewDate(date) {
    this.set('viewDate.date', date);
  },

  _selectDate(day) {
    let date = new Date(day.year, day.month, day.date);

    if (this.get('select')) {
      this.get('select')(date);
    } else {
      this.set('selectedDate', date);
    }
  },

  _prevMonth() {
    this.get('viewDate').decrementMonth();
  },

  _nextMonth() {
    this.get('viewDate').incrementMonth();
  },

  actions: {
    selectDay(day) {
      this._selectDate(day)
    },

    prevMonth() {
      this._prevMonth();
    },

    nextMonth() {
      this._nextMonth();
    }
  }
});
