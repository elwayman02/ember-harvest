import Component from 'ember-component';
import EmberObject from 'ember-object';
import computed from 'ember-computed';
import { A } from 'ember-array/utils';
import DateObject from '../utils/harvest-date';
import Months from '../utils/harvest-months';
import layout from '../templates/components/harvest-calendar-view';

export default Component.extend({
  layout,
  prefix: 'eh',
  tagName: 'table',

  classNameBindings: ['calendarClass'],

  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  months: Months,

  weekStart: 0,

  numberOfWeeks: 6, // TODO: Set this dynamically to not show too many extra days

  selectedDate: null,

  selectedRange: null,

  viewDate: null,

  year: computed.readOnly('viewDate.year'),

  month: computed.readOnly('viewDate.month'),

  calendarClass: computed('prefix', function () {
    return `${this.get('prefix')}-calendar`;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('viewDate')) {
      this.set('viewDate', DateObject.create());
    }
  },

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

  actions: {
    selectDay(day) {
      if (this.get('selectDay')) {
        this.get('selectDay')(day);
      }
    },
    selectWeek(week) {
      if (this.get('selectWeek')) {
        this.get('selectWeek')(week);
      }
    }
  }
});
