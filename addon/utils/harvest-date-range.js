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
