import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-datepicker';

export default Component.extend({
  layout,

  prefix: 'eh',

  isWeekpicker: false,

  formattedDate: null,
  selectedDate: null,
  selectedRange: null,

  weekStart: 0,

  inputClass: computed('prefix', function () {
    return `${this.get('prefix')}-trigger`;
  }),

  actions: {
    selectDay(day) {
      this.set('selectedDate', day);
      if (!this.get('isWeekpicker')) {
        this.set('formattedDate', day.toLocaleDateString());
        if (this.get('select')) {
          this.get('select')(day);
        }
      }
    },

    selectWeek(week) {
      this.set('selectedRange', week);
      if (this.get('isWeekpicker')) {
        this.set('formattedDate', week.toString());
        if (this.get('select')) {
          this.get('select')(week);
        }
      }
    }
  }
});
