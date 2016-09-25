import Component from 'ember-component';
import computed from 'ember-computed';
import { typeOf } from 'ember-utils';
import layout from '../templates/components/harvest-day';

export default Component.extend({
  layout,
  tagName: 'td',

  prefix: 'eh',

  allowedRange: null,

  classNameBindings: ['dayClass', 'disabledClass', 'outOfRangeClass', 'selectedClass', 'todayClass', 'weekendClass'],

  dayClass: computed('prefix', function () {
    return `${this.get('prefix')}-day`;
  }),

  disabledClass: computed('isDisabled', 'prefix', function () {
    return this.get('isDisabled') ? `${this.get('prefix')}-disabled-day` : '';
  }),

  selectedClass: computed('daySelected', 'prefix', function () {
    return this.get('daySelected') ? `${this.get('prefix')}-selected-day` : '';
  }),

  outOfRangeClass: computed('model.inRange', 'prefix', function () {
    return this.get('model.inRange') ? '' : `${this.get('prefix')}-out-of-range`;
  }),

  todayClass: computed('today', 'prefix', function () {
    return this.get('today') ? `${this.get('prefix')}-today` : '';
  }),

  weekendClass: computed('weekend', 'prefix', function () {
    return this.get('weekend') ? `${this.get('prefix')}-weekend` : '';
  }),

  date: computed('model.year', 'model.month', 'model.date', function () {
    return new Date(this.get('model.year'), this.get('model.month'), this.get('model.date'));
  }),

  isDisabled: computed('allowedRange', 'date', function () {
    let range = this.get('allowedRange');
    return range ? !range.inRange(this.get('date')) : false;
  }),

  daySelected: computed('selectedDate', 'model.year', 'model.month', 'model.date', function () {
    let selectedDate = this.get('selectedDate');
    let selectedDateType = typeOf(selectedDate);
    let selected;

    if (selectedDateType === 'date') {
      selected = selectedDate;
    } else {
      if (selectedDateType === 'number') {
        selected = new Date(selectedDate);
      } else if (selectedDateType === 'string') {
        selected = new Date(selectedDate.replace(/-/g, '/'));
      } else if (selectedDateType === 'instance') {
        selected = new Date(selectedDate.get('year'), selectedDate.get('month'), selectedDate.get('date'));
      }
    }

    let model = this.get('model');
    if (!selected || !model) { return false; }
    let { year, month, date } = model.getProperties('year', 'month', 'date');
    return selected.getDate() === date && selected.getMonth() === month && selected.getFullYear() === year;
  }),

  today: computed('model.year', 'model.month', 'model.date', function () {
    let today = new Date();
    let model = this.get('model');
    if (!model) { return false; }
    let { year, month, date } = model.getProperties('year', 'month', 'date');
    return today.getDate() === date && today.getMonth() === month && today.getFullYear() === year;
  }),

  weekend: computed('model.year', 'model.month', 'model.date', function () {
    let model = this.get('model');
    if (!model) {
      return false;
    }
    let { year, month, date } = model.getProperties('year', 'month', 'date');
    let day = new Date(year, month, date).getDay();
    return day === 0 || day === 6;
  }),

  click() {
    if (!this.get('isDisabled')) {
      this.get('select')(this.get('model'));
    }
  }
});
