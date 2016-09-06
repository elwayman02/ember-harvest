import EmberObject from 'ember-object';
import computed from 'ember-computed';

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

  year: null,

  init() {
    this._super(...arguments);
    let year = this.get('year');
    if (year) {
      this.setYear(year);
    } else {
      this._setDate(new Date());
    }
  },

  setYear(year) {
    let date = this.get('_date') || new Date();
    date.setFullYear(year);
    return this._setDate(date);
  },

  _setDate(date) {
    if (!date) { return; }
    this.setProperties({
      _date: date,
      year: date.getFullYear()
    });
    return date;
  },

  _modifyDate(name, number = 1) {
    let date = this.get('_date');
    date[`set${name}`](date[`get${name}`]() + number);
    this._setDate(date);
  },

  incrementYear(number = 1) {
    this._modifyDate('FullYear', number);
  },

  decrementYear(number = 1) {
    this._modifyDate('FullYear', number * -1);
  },

  isEqual(otherDate) {
    if (otherDate) {
      return otherDate.get('year') === this.get('year');
    }
    return false;
  }
});
