import Ember from 'ember';
import EmberObject from 'ember-object';
import computed from 'ember-computed';
import DateObject from './harvest-date';

const { isEqual } = Ember;

export default EmberObject.extend({
  _startDate: null,

  startDate: computed('_startDate', {
    get() {
      return this.get('_startDate');
    },
    set(key, value) {
      return this.setStartDate(value);
    }
  }),

  _endDate: null,

  endDate: computed('_endDate', {
    get() {
      return this.get('_endDate');
    },
    set(key, value) {
      return this.setEndDate(value);
    }
  }),

  init() {
    this._super(...arguments);

    this.setStartDate(this.get('startDate'));
    this.setEndDate(this.get('endDate'));
  },

  setStartDate(date) {
    return this.set('_startDate', this._createDate(date));
  },

  setEndDate(date) {
    return this.set('_endDate', this._createDate(date));
  },

  _createDate(date) {
    return DateObject.create({
      date: date
    });
  },

  inRange(date) {
    let year, month, day;
    if (date instanceof Date) {
      year = date.getFullYear();
      month = date.getMonth();
      day = date.getDate();
    } else if (date instanceof DateObject) {
      year = date.get('year');
      month = date.get('month');
      day = date.get('day');
    } else {
      return false;
    }

    let startYear = this.get('startDate.year');
    let startMonth = this.get('startDate.month');
    let startDay = this.get('startDate.day');

    let endYear = this.get('endDate.year');
    let endMonth = this.get('endDate.month');
    let endDay = this.get('endDate.day');

    let inYear = year >= startYear && year <= endYear;
    let inMonth = (month >= startMonth || year > startYear) && (month <= endMonth || year < endYear);
    let inDay = (day >= startDay || month > startMonth) && (day <= endDay || month < endMonth);

    return inYear && inMonth && inDay;
  },

  toString() {
    let startDate = this.get('startDate.date');
    let endDate = this.get('endDate.date');
    if (startDate || endDate) {
      return `${startDate ? startDate.toLocaleDateString() : ''} - ${endDate ? endDate.toLocaleDateString() : ''}`;
    }
    return '';
  },

  isEqual(otherRange) {
    if (otherRange) {
      let sameStart = isEqual(otherRange.get('startDate'), this.get('startDate'));
      let sameEnd = isEqual(otherRange.get('endDate'), this.get('endDate'));

      return sameStart && sameEnd;
    }
    return false;
  }
});
