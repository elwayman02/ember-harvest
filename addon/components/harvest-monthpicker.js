import Component from 'ember-component';
import computed from 'ember-computed';
import Months from '../utils/harvest-months';
import layout from '../templates/components/harvest-monthpicker';

export default Component.extend({
  layout,

  prefix: 'eh',

  disableInput: false,

  selectedMonth: null,

  selectedYear: null,

  months: Months,

  inputClass: computed('prefix', function () {
    return `${this.get('prefix')}-trigger`;
  }),

  formattedMonth: computed('selectedMonth', 'selectedYear', 'months', function () {
    let monthName = this.get('months')[this.get('selectedMonth')].name;
    return `${monthName} ${this.get('selectedYear')}`;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('selectedMonth') || !this.get('selectedYear')) {
      let date = new Date();
      this.selectMonth(this.get('selectedMonth') || date.getMonth(), this.get('selectedYear') || date.getFullYear());
    }
  },

  selectMonth(month, year) {
    this.setProperties({
      selectedMonth: month,
      selectedYear: year || this.get('selectedYear')
    });
  },

  actions: {
    select(month, year) {
      this.selectMonth(month, year);
      if (this.get('select')) {
        this.get('select')(month, year);
      }
    }
  }
});
