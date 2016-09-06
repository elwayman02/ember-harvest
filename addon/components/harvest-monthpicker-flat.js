import Component from 'ember-component';
import computed from 'ember-computed';
import YearObject from '../utils/harvest-year';
import layout from '../templates/components/harvest-monthpicker-flat';

export default Component.extend({
  layout,

  prefix: 'eh',

  classNameBindings: ['monthpickerClass'],

  monthpickerClass: computed('prefix', function () {
    return `${this.get('prefix')}-monthpicker`;
  }),

  selectedMonth: null,

  selectedYear: null,

  displayYear: null,

  init() {
    this._super(...arguments);

    if (!this.get('selectedMonth') || !this.get('selectedYear')) {
      let date = new Date();
      this.selectMonth(this.get('selectedMonth') || date.getMonth(), this.get('selectedYear') || date.getFullYear());
    }
    this.set('displayYear', YearObject.create({
      year: this.get('selectedYear')
    }));
  },

  selectMonth(month, year) {
    this.setProperties({
      selectedMonth: month,
      selectedYear: year || this.get('selectedYear')
    });
  },

  _decrementYear() {
    this.get('displayYear').decrementYear();
  },

  _incrementYear() {
    this.get('displayYear').incrementYear();
  },

  actions: {
    select(month) {
      this.selectMonth(month, this.get('displayYear.year'));
      if (this.get('select')) {
        this.get('select')(this.get('selectedMonth'), this.get('displayYear.year'));
      }
    },

    previous() {
      this._decrementYear();
    },

    next() {
      this._incrementYear();
    }
  }
});
