import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-datepicker';

export default Component.extend({
  layout,

  prefix: 'eh',

  isWeekpicker: false,

  formattedDate: computed('selectedDate', 'selectedRange', 'isWeekpicker', function () {
    if (this.get('isWeekpicker')) {
      let range = this.get('selectedRange');
      if (range) {
        return range.toString();
      }
    } else if (this.get('selectedDate')) {
      return this.get('selectedDate').toLocaleDateString();
    }
    return '';
  }),

  selectedDate: null,
  selectedRange: null,

  weekStart: 0,

  inputClass: computed('prefix', function () {
    return `${this.get('prefix')}-trigger`;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('selectedDate')) {
      this.set('selectedDate', new Date());
    }
  },

  actions: {
    selectDay(day) {
      this.set('selectedDate', day);
      if (!this.get('isWeekpicker') && this.get('select')) {
        this.get('select')(day);
      }
    },

    selectWeek(week) {
      this.set('selectedRange', week);
      if (this.get('isWeekpicker') && this.get('select')) {
        this.get('select')(week);
      }
    }
  }
});
