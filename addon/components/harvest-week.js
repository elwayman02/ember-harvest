import Ember from 'ember';
import Component from 'ember-component';
import computed from 'ember-computed';
import DateRange from '../utils/harvest-date-range';
import layout from '../templates/components/harvest-week';

const { isEqual } = Ember;

export default Component.extend({
  layout,
  classNameBindings: ['weekClass', 'selectedClass'],
  tagName: 'tr',

  prefix: 'eh',

  selectedDate: null,

  selectedRange: null,

  week: null,

  selectedClass: computed('prefix', 'isSelected', function () {
    return this.get('isSelected') ? `${this.get('prefix')}-selected-week` : '';
  }),

  isSelected: computed('range', 'selectedRange', 'selectedDate', function () {
    let selectedRange = this.get('selectedRange');
    let range = this.get('range');
    if (selectedRange) {
      return selectedRange && isEqual(selectedRange, range);
    }
    return range && range.inRange(this.get('selectedDate'));
  }),

  weekClass: computed('prefix', function () {
    return `${this.get('prefix')}-week`;
  }),

  range: computed('week', function () {
    let week = this.get('week');
    if (week) {
      return DateRange.create({
        startDate: week[0],
        endDate: week[6]
      });
    }
    return null;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('selectedRange') && this.get('isSelected') && this.get('selectWeek')) {
      this.get('selectWeek')(this.get('range'));
    }
  },

  actions: {
    selectDay(day) {
      if (this.get('selectDay')) {
        this.get('selectDay')(day);
      }
      if (this.get('selectWeek') && !this.get('isSelected')) {
        this.get('selectWeek')(this.get('range'));
      }
    }
  }
});
