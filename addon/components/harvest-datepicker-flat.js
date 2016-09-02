import Component from 'ember-component';
import EmberObject from 'ember-object';
import computed from 'ember-computed';
import { A } from 'ember-array/utils';
import DateObject from '../utils/harvest-date';
import layout from '../templates/components/harvest-datepicker-flat';

export default Component.extend({
  layout,

  classNames: ['harvest-date-picker'],

  prefix: 'eh',

  months: [{
    name: 'January',
    days: 31
  }, {
    name: 'February',
    days(year) {
      year = parseInt(year, 10);

      return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28;
    }
  },{
    name: 'March',
    days: 31
  }, {
    name: 'April',
    days: 30
  },{
    name: 'May',
    days: 31
  }, {
    name: 'June',
    days: 30
  },{
    name: 'July',
    days: 31
  }, {
    name: 'August',
    days: 31
  },{
    name: 'September',
    days: 30
  }, {
    name: 'October',
    days: 31
  },{
    name: 'November',
    days: 30
  }, {
    name: 'December',
    days: 31
  }],

  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  weekStart: 0,

  numberOfWeeks: 6, // TODO: Set this dynamically to not show too many extra days

  selectedDate: null,

  viewDate: null,

  year: computed.readOnly('viewDate.year'),

  month: computed.readOnly('viewDate.month'),

  daysOfWeek: computed('weekStart', 'days', function () {
    let array = A();
    let weekStart = this.get('weekStart');
    let daysArray = this.get('days');

    if (weekStart === 1) {
      daysArray.push(daysArray.shift());
    }

    for (let i = 0, length = daysArray.length; i < length; i++) {
      array.pushObject({name:daysArray[i]});
    }
    return array;
  }),

  monthName: computed('month', 'months', function () {
    return this.get('months')[this.get('month')].name;
  }),

  daysInMonth: computed('month', 'year', 'months', function () {
    let month = this.get('months')[parseInt(this.get('month'), 10)];

    if (typeof(month.days) === 'function') {
      return month.days(this.get('year'));
    }
    return month.days;
  }),

  weeks: computed('daysOfWeek.[]', 'month', 'daysInMonth', 'year', 'numberOfWeeks', 'startDay', function () {
    let dayObj, date, intWeek, intDay, week;
    let daily = 0;
    let dailyNextMonth = 1;
    let weeksArray = A();
    let daysOfWeek = this.get('daysOfWeek.length');
    let { month, year, numberOfWeeks, startDay } = this.getProperties('month', 'year', 'numberOfWeeks', 'startDay');
    let daysInMonth = this.get('daysInMonth');

    for (intWeek = 0; intWeek < numberOfWeeks; intWeek++) {
      week = A();

      for (intDay = 0; intDay < daysOfWeek; intDay++) {
        // start the ball rolling when intDay is equal to startDay
        if ((intDay === startDay) && (daily === 0)) {
          daily = 1;
        }
        if ((daily > 0) && (daily <= daysInMonth)) {
          dayObj = {
            date: daily++,
            month: month,
            year: year,
            inRange: true
          };
        } else {
          if (daily === 0) {
            date = new Date(year, month, 1);
            date.setDate(date.getDate() - (startDay - intDay));
          } else {
            date = new Date(year, month + 1, 0);
            date.setDate(date.getDate() + dailyNextMonth++);
          }

          dayObj = {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            inRange: false
          };
        }
        week.pushObject(EmberObject.create(dayObj));
      }
      weeksArray.pushObject(week);
    }
    return weeksArray;
  }),

  startDay: computed( 'year', 'month', 'weekStart', function () {
    let { month, year } = this.getProperties('month', 'year');
    let newCal = new Date(year, month, 1);
    let startDay = newCal.getDay() - this.get('weekStart');

    if (startDay < 0) {
      startDay = 6;
    }

    return startDay;
  }),

  init() {
    this._super(...arguments);
    let selectedDate = this.get('selectedDate');
    this.set('viewDate', DateObject.create());
    if (selectedDate) {
      this.setViewDate(selectedDate);
    }
  },

  setToday() {
    this.setViewDate(new Date());
  },

  setViewDate(date) {
    this.set('viewDate.date', date);
  },

  _selectDate(day) {
    let date = new Date(day.year, day.month, day.date);

    this.set('selectedDate', date);
    if (this.get('select')) {
      this.get('select')(date);
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
