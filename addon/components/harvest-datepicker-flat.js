import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-datepicker-flat';
import DateObject from '../utils/harvest-date';
import Months from '../utils/harvest-months';

export default Component.extend({
  layout,

  classNameBindings: ['datepickerClass', 'weekpickerClass'],

  prefix: 'eh',

  isWeekpicker: false,

  selectedDate: null,

  selectedRange: null,

  viewDate: null,

  months: Months,

  datepickerClass: computed('prefix', function () {
    return `${this.get('prefix')}-datepicker`;
  }),

  weekpickerClass: computed('prefix', 'isWeekpicker', function () {
    return this.get('isWeekpicker') ? `${this.get('prefix')}-weekpicker` : '';
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

    if (this.get('selectDay')) {
      this.get('selectDay')(date);
    } else {
      this.set('selectedDate', date);
    }
  },

  _selectWeek(week) {
    if (this.get('selectWeek')) {
      this.get('selectWeek')(week);
    } else {
      this.set('selectedRange', week);
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

    selectWeek(week) {
      this._selectWeek(week);
    },

    prevMonth() {
      this._prevMonth();
    },

    nextMonth() {
      this._nextMonth();
    }
  }
});
