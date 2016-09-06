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

  selectedClass: computed('prefix', 'range', 'selectedRange', function () {
    let selectedRange = this.get('selectedRange');
    if (selectedRange && isEqual(selectedRange, this.get('range'))) {
      return `${this.get('prefix')}-selected-week`;
    }
    return '';
  }),

  weekClass: computed('prefix', function () {
    return `${this.get('prefix')}-week`;
  }),

  range: computed('week', function () {
    let week = this.get('week');
    return DateRange.create({
      startDate: week[0],
      endDate: week[6]
    });
  }),

  actions: {
    selectDay(day) {
      if (this.get('selectDay')) {
        this.get('selectDay')(day);
      }
      if (this.get('selectWeek')) {
        this.get('selectWeek')(this.get('range'));
      }
    }
  }
});
