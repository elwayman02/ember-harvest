import Component from 'ember-component';
import computed from 'ember-computed';
import { typeOf } from 'ember-utils';
import layout from '../templates/components/harvest-day';

export default Component.extend({
  layout,
  tagName: 'td',

  prefix: 'eh',

  classNameBindings: ['outOfRangeClass', 'daySelectedClass', 'todayClass', 'weekendClass'],

  daySelectedClass: computed('daySelected', 'prefix', function () {
    return this.get('daySelected') ? `${this.get('prefix')}-day-selected` : '';
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
    this.get('select')(this.get('model'));
  }
});
