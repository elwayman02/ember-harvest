import Component from 'ember-component';
import layout from '../templates/components/harvest-datepicker';

export default Component.extend({
  layout,

  prefix: 'eh',

  formattedDate: null,
  selectedDate: null,

  weekStart: 0,

  actions: {
    select(day) {
      this.set('selectedDate', day);
      this.set('formattedDate', day.toLocaleDateString());
      if (this.get('select')) {
        this.get('select')(day);
      }
    }
  }
});
