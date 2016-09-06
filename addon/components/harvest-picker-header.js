import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/harvest-picker-header';

export default Component.extend({
  layout,

  classNameBindings: ['headerClass'],

  prefix: 'eh',

  headerClass: computed('prefix', function () {
    return `${this.get('prefix')}-header`;
  }),

  actions: {
    previous() {
      if (this.get('previous')) {
        this.get('previous')();
      }
    },

    next() {
      if (this.get('next')) {
        this.get('next')();
      }
    },

    toggleView() {
      if (this.get('toggleView')) {
        this.get('toggleView')();
      }
    }
  }
});
