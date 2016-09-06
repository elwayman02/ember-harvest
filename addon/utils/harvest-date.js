import EmberObject from 'ember-object';
import computed from 'ember-computed';
import { typeOf } from 'ember-utils';

export default EmberObject.extend({
  _date: null,

  date: computed('_date', {
    get() {
      return this.get('_date');
    },
    set(key, value) {
      return this.setDate(value);
    }
  }),

  day: null,

  month: null,

  year: null,

  init() {
    this._super(...arguments);
    let date = this.get('date');
    if (date) {
      this.setDate(date);
    } else {
      this._setDate(new Date());
    }
  },

  setDate(date) {
    if (typeOf(date) === 'string') {
      date = date.replace(/-/g, '/');
    } else if (typeOf(date) === 'instance') {
      date = new Date(date.get('year'), date.get('month'), date.get('date'));
    }
    return this._setDate(new Date(date));
  },

  _setDate(date) {
    if (!date) { return; }
    this.setProperties({
      _date: date,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
    return date;
  },

  _modifyDate(name, number = 1) {
    let date = this.get('_date');
    date[`set${name}`](date[`get${name}`]() + number);
    this._setDate(date);
  },

  incrementDay(number = 1) {
    this._modifyDate('Date', number);
  },

  decrementDay(number = 1) {
    this._modifyDate('Date', number * -1);
  },

  incrementMonth(number = 1) {
    this._modifyDate('Month', number);
  },

  decrementMonth(number = 1) {
    this._modifyDate('Month', number * -1);
  },

  incrementYear(number = 1) {
    this._modifyDate('FullYear', number);
  },

  decrementYear(number = 1) {
    this._modifyDate('FullYear', number * -1);
  },

  isEqual(otherDate) {
    if (otherDate) {
      let sameYear = otherDate.get('year') === this.get('year');
      let sameMonth = otherDate.get('month') === this.get('month');
      let sameDay = otherDate.get('day') === this.get('day');

      return sameYear && sameMonth && sameDay;
    }
    return false;
  }
});
