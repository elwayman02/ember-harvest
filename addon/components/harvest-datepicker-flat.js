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

  showMonthView: false,

  selectedDate: null,

  selectedRange: null,

  viewDate: null,

  weekStart: 0,

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
    } else {
      let date = new Date();
      this.set('selectedDate', date);
      this.setViewDate(date);
    }
  },

  year: computed.readOnly('viewDate.year'),

  month: computed.readOnly('viewDate.month'),

  monthName: computed('month', 'months', function () {
    return this.get('months')[this.get('month')].name;
  }),

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

  _selectMonth(month) {
    this.get('viewDate').setMonth(month);
  },

  _selectWeek(week) {
    if (this.get('selectWeek')) {
      this.get('selectWeek')(week);
    } else {
      this.set('selectedRange', week);
    }
  },

  _previousMonth() {
    this.get('viewDate').decrementMonth();
  },

  _nextMonth() {
    this.get('viewDate').incrementMonth();
  },

  _previousYear() {
    this.get('viewDate').decrementYear();
  },

  _nextYear() {
    this.get('viewDate').incrementYear();
  },

  actions: {
    selectDay(day) {
      this._selectDate(day)
    },

    selectMonth(month) {
      this._selectMonth(month);
      this.set('showMonthView', false);
    },

    selectWeek(week) {
      this._selectWeek(week);
    },

    toggleView() {
      this.toggleProperty('showMonthView');
    },

    previous() {
      if (this.get('showMonthView')) {
        this._previousYear();
      } else {
        this._previousMonth();
      }
    },

    next() {
      if (this.get('showMonthView')) {
        this._nextYear();
      } else {
        this._nextMonth();
      }
    }
  }
});
